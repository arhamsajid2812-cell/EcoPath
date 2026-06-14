"use client";

import { useEffect } from "react";
import { useEcoStore } from "@/store/ecoStore";
import { isDemoConfig } from "@/lib/supabase";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CarbonScoreCard } from "@/components/dashboard/CarbonScoreCard";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { ImpactTree } from "@/components/dashboard/ImpactTree";
import dynamic from 'next/dynamic';

const EmissionTrendChart = dynamic(() => import("@/components/dashboard/EmissionTrendChart").then(mod => mod.EmissionTrendChart), { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center bg-muted/20 animate-pulse rounded-2xl">Loading Chart...</div> });
const CategoryBreakdownChart = dynamic(() => import("@/components/dashboard/CategoryBreakdownChart").then(mod => mod.CategoryBreakdownChart), { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center bg-muted/20 animate-pulse rounded-2xl">Loading Chart...</div> });

import { ActiveChallenges } from "@/components/dashboard/ActiveChallenges";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { profile, trendData, categoryData, aiInsights, activeChallenges, activateDemoMode } = useEcoStore();

  useEffect(() => {
    if (!profile && isDemoConfig) {
      console.log("Dashboard detected Demo Mode with no profile. Auto-activating Demo Mode.");
      activateDemoMode();
    }
  }, [profile, activateDemoMode]);

  if (!profile || !aiInsights) {
    return (
      <DashboardLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center text-muted-foreground">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <p>Loading your sustainability profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <header className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {profile.name.split(' ')[0]}</h1>
        <p className="text-muted-foreground mt-1">Here is your environmental impact overview.</p>
      </header>

      {/* Top Row: Hero Stats & Impact Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CarbonScoreCard 
            annualEmission={profile.totalAnnualEmission} 
            sustainabilityScore={profile.sustainabilityScore} 
            impactLevel={profile.impactLevel as 'LOW' | 'MODERATE' | 'HIGH'} 
          />
        </div>
        <div className="lg:col-span-1">
          <ImpactTree totalSavedKg={profile.totalSavedKg} />
        </div>
      </div>

      <QuickActions />

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[350px]">
          <EmissionTrendChart data={trendData} />
        </div>
        <div className="h-[350px]">
          <CategoryBreakdownChart data={categoryData} />
        </div>
      </div>

      {/* AI Hub Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-full">
          <AIInsightsCard 
            biggestEmissionSource={aiInsights.biggestEmissionSource}
            mostImprovedCategory={aiInsights.mostImprovedCategory}
            quickWinOpportunity={aiInsights.quickWinOpportunity}
          />
        </div>
        
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Recommended Actions</h3>
            <button className="text-sm font-medium text-primary hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {aiInsights.recommendations.map((rec, i) => (
              <RecommendationCard key={i} {...rec} difficulty={rec.difficulty as any} />
            ))}
          </div>
        </div>
      </div>

      {/* Challenges Row */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-10">
        <h3 className="text-lg font-semibold mb-6">Active Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeChallenges.map((challenge, i) => (
            <ActiveChallenges key={i} {...challenge} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
