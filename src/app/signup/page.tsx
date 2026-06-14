"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, hasSupabaseConfig, isDemoConfig } from '@/lib/supabase';
import { Loader2, AlertCircle } from 'lucide-react';
import { useEcoStore } from '@/store/ecoStore';

export default function SignupPage() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    console.log("Form submitted");

    try {
      if (!hasSupabaseConfig) {
        throw new Error("Authentication not configured.");
      }

      if (isDemoConfig) {
        console.log("Demo Mode: Simulating successful signup without API call.");
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network latency
        useEcoStore.getState().activateDemoMode();
        router.push('/dashboard');
        return;
      }

      console.log("Calling Supabase signup...");

      if (!supabase) {
        throw new Error("Supabase is not initialized.");
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      console.log("API response:", { data, error: signUpError });

      if (signUpError) {
        throw signUpError;
      }

      if (!data.user) {
        throw new Error("Signup failed. Please try again.");
      }

      console.log("Redirecting to dashboard...");
      router.push('/dashboard');

    } catch (err: unknown) {
      console.warn("Signup Error Caught:", err); // Use warn instead of error to avoid Next.js overlay
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred during signup.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        
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
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" 
                />
              </div>
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
                  minLength={6}
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
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
              </button>
            </form>
          </>
        )}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
