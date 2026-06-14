-- EcoPath Initial Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT,
    sustainability_score INTEGER DEFAULT 0,
    impact_level TEXT DEFAULT 'PENDING',
    total_saved_kg INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile." ON profiles 
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles 
    FOR UPDATE USING (auth.uid() = id);

-- 2. Carbon Records Table (Time-series log of all emissions)
CREATE TABLE public.carbon_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    category TEXT NOT NULL, -- e.g., 'TRANSPORT', 'DIET'
    emission_value_kg NUMERIC NOT NULL,
    context_data JSONB, -- Storing specific inputs (e.g., {"distanceKm": 40})
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.carbon_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own records." ON carbon_records 
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own records." ON carbon_records 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. Vision Scans (Receipts)
CREATE TABLE public.vision_scans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    image_url TEXT, -- Path in Supabase Storage bucket
    carbon_score NUMERIC NOT NULL,
    sustainability_grade TEXT NOT NULL,
    parsed_json JSONB NOT NULL, -- The exact output from Gemini
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.vision_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scans." ON vision_scans 
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scans." ON vision_scans 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Active Challenges
CREATE TABLE public.active_challenges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    title TEXT NOT NULL,
    progress INTEGER DEFAULT 0,
    expected_impact TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.active_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own challenges." ON active_challenges 
    FOR ALL USING (auth.uid() = user_id);

-- Storage Buckets Setup
-- Note: You must execute this in the Supabase SQL Editor to create the bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('receipts', 'receipts', false);

CREATE POLICY "Users can upload receipts" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'receipts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own receipts" ON storage.objects
    FOR SELECT USING (bucket_id = 'receipts' AND auth.uid()::text = (storage.foldername(name))[1]);
