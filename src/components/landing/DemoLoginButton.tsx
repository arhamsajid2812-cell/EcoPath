"use client";

import { useEcoStore } from "@/store/ecoStore";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import React from "react";

export function DemoLoginButton({ 
  className, 
  children,
  showArrow = false
}: { 
  className?: string, 
  children: React.ReactNode,
  showArrow?: boolean
}) {
  const router = useRouter();
  const activateDemoMode = useEcoStore(state => state.activateDemoMode);

  const handleDemoLogin = () => {
    activateDemoMode();
    router.push('/dashboard');
  };

  return (
    <button 
      onClick={handleDemoLogin}
      className={className}
    >
      {children} {showArrow && <ArrowRight size={16} className={showArrow ? "w-4 h-4" : ""} />}
    </button>
  );
}
