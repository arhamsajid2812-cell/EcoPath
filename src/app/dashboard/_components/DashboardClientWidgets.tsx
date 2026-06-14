"use client";

import { useEffect } from "react";
import { useEcoStore } from "@/store/ecoStore";
import { isDemoConfig } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import dynamic from 'next/dynamic';

import { CarbonScoreCard } from "@/components/dashboard/CarbonScoreCard";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { ImpactTree } from "@/components/dashboard/ImpactTree";
import { ActiveChallenges } from "@/components/dashboard/ActiveChallenges";

const EmissionTrendChart = dynamic(() => import("@/components/dashboard/EmissionTrendChart").then(mod => mod.EmissionTrendChart), { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center bg-muted/20 animate-pulse rounded-2xl">Loading Chart...</div> });
const CategoryBreakdownChart = dynamic(() => import("@/components/dashboard/CategoryBreakdownChart").then(mod => mod.CategoryBreakdownChart), { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center bg-muted/20 animate-pulse rounded-2xl">Loading Chart...</div> });

export function DashboardDataLoader({ children }: { children: React.ReactNode }) {
  const profile = useEcoStore(state => state.profile);
  const aiInsights = useEcoStore(state => state.aiInsights);
  const activateDemoMode = useEcoStore(state => state.activateDemoMode);

  useEffect(() => {
    if (!profile && isDemoConfig) {
      console.log("Dashboard detected Demo Mode with no profile. Auto-activating Demo Mode.");
      activateDemoMode();
    }
  }, [profile, activateDemoMode]);

  if (!profile || !aiInsights) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p>Loading your sustainability profile...</p>
      </div>
    );
  }

  return <>{children}</>;
}

export function DashboardHeaderWidget() {
  const profile = useEcoStore(state => state.profile);
  if (!profile) return null;
  return (
    <header className="mb-2">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back, {profile.name?.split(' ')[0] || 'Eco Warrior'}</h1>
      <p className="text-muted-foreground mt-1">Here is your environmental impact overview.</p>
    </header>
  );
}

export function CarbonScoreWidget() {
  const profile = useEcoStore(state => state.profile);
  if (!profile) return null;
  return (
    <CarbonScoreCard 
      annualEmission={profile.totalAnnualEmission || 0} 
      sustainabilityScore={profile.sustainabilityScore || 0} 
      impactLevel={(profile.impactLevel || 'LOW') as 'LOW' | 'MODERATE' | 'HIGH'} 
    />
  );
}

export function ImpactTreeWidget() {
  const totalSavedKg = useEcoStore(state => state.profile?.totalSavedKg) || 0;
  return <ImpactTree totalSavedKg={totalSavedKg} />;
}

export function EmissionTrendWidget() {
  const trendData = useEcoStore(state => state.trendData);
  return <EmissionTrendChart data={trendData || []} />;
}

export function CategoryBreakdownWidget() {
  const categoryData = useEcoStore(state => state.categoryData);
  return <CategoryBreakdownChart data={categoryData || []} />;
}

export function AIInsightsWidget() {
  const aiInsights = useEcoStore(state => state.aiInsights);
  if (!aiInsights) return null;
  return (
    <AIInsightsCard 
      biggestEmissionSource={aiInsights.biggestEmissionSource}
      mostImprovedCategory={aiInsights.mostImprovedCategory}
      quickWinOpportunity={aiInsights.quickWinOpportunity}
    />
  );
}

export function RecommendationsWidget() {
  const aiInsights = useEcoStore(state => state.aiInsights);
  if (!aiInsights || !Array.isArray(aiInsights.recommendations)) return null;
  return (
    <>
      {aiInsights.recommendations.map((rec, i) => (
        <RecommendationCard key={i} {...rec} difficulty={rec.difficulty as any} />
      ))}
    </>
  );
}

export function ActiveChallengesWidget() {
  const activeChallenges = useEcoStore(state => state.activeChallenges);
  if (!Array.isArray(activeChallenges)) return null;
  return (
    <>
      {activeChallenges.map((challenge, i) => (
        <ActiveChallenges key={i} {...challenge} />
      ))}
    </>
  );
}
