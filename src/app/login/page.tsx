"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, hasSupabaseConfig, isDemoConfig } from '@/lib/supabase';
import { Loader2, AlertCircle } from 'lucide-react';
import { useEcoStore } from '@/store/ecoStore';

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (!hasSupabaseConfig) {
        throw new Error("Authentication not configured.");
      }

      if (isDemoConfig) {
        console.log("Demo Mode: Simulating successful login without API call.");
        await new Promise(resolve => setTimeout(resolve, 1000));
        useEcoStore.getState().activateDemoMode();
        router.push('/dashboard');
        return;
      }

      if (!supabase) {
        throw new Error("Supabase is not initialized.");
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      if (!data.user) {
        throw new Error("Invalid login credentials.");
      }

      router.push('/dashboard');

    } catch (err: unknown) {
      console.warn("Login Error Caught:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred during login.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        
        {!hasSupabaseConfig ? (
          <div className="mb-4 p-4 rounded-md bg-muted border border-border text-muted-foreground flex flex-col items-center justify-center text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-muted-foreground mb-2" />
            <h3 className="font-semibold text-foreground">Authentication not configured.</h3>
            <p className="text-sm">EcoPath can still be used in Demo Mode. Supabase environment variables are missing.</p>
            <Link href="/" className="mt-4 text-primary hover:underline text-sm font-medium">Return to Home</Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" 
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading || !hasSupabaseConfig}
                className="w-full flex justify-center items-center bg-primary text-primary-foreground py-2 rounded-md font-medium mt-4 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log In"}
              </button>
            </form>
          </>
        )}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Don&apos;t have an account? <Link href="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
