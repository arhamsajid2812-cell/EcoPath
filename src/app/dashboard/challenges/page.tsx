"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useEcoStore } from "@/store/ecoStore";
import { ActiveChallenges } from "@/components/dashboard/ActiveChallenges";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Bot } from "lucide-react";

import { useChallenges } from "@/hooks/useChallenges";

export default function ChallengesPage() {
  const { activeChallenges } = useEcoStore();
  const { isGenerating, suggestedChallenges, handleGenerate, handleJoin } = useChallenges();

  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Eco Challenges</h1>
        <p className="text-muted-foreground mt-1">Turn sustainability into a daily habit.</p>
      </header>

      {/* Active Challenges */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          Your Active Quests
        </h2>
        {activeChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChallenges.map((challenge, i) => (
              <ActiveChallenges key={i} {...challenge} />
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground">You don&apos;t have any active challenges right now.</p>
          </div>
        )}
      </section>

      {/* Discover / AI Generated Challenges */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Discover New Challenges</h2>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1 disabled:opacity-50"
          >
            {isGenerating ? "Consulting AI Coach..." : "Generate Custom Challenge"} <Bot size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* AI Generator Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={handleGenerate}
            className="bg-primary/5 border-2 border-primary/20 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center h-[200px] cursor-pointer hover:bg-primary/10 transition-colors relative overflow-hidden"
          >
            {isGenerating ? (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p className="font-medium text-primary">Analyzing your habits...</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-bold text-foreground">AI Custom Challenge</h3>
                <p className="text-sm text-muted-foreground mt-1">Get a tailored quest based on your recent transport logs.</p>
              </>
            )}
          </motion.div>

          {/* Suggested Cards */}
          {suggestedChallenges.map((challenge, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card rounded-xl p-6 shadow-sm border h-[200px] flex flex-col justify-between transition-colors ${
                challenge.joined ? 'border-primary bg-primary/5' : 'border-border'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{challenge.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    challenge.impact === 'High' ? 'bg-primary/20 text-primary' : 
                    challenge.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-500' : 
                    'bg-secondary/20 text-secondary'
                  }`}>
                    {challenge.impact} Impact
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{challenge.desc}</p>
              </div>
              
              <button 
                onClick={() => handleJoin(i)}
                disabled={challenge.joined}
                className={`w-full py-2 rounded-md font-medium text-sm transition-all flex justify-center items-center gap-2 ${
                  challenge.joined 
                    ? 'bg-primary text-primary-foreground opacity-100 cursor-default' 
                    : 'bg-muted hover:bg-primary/10 hover:text-primary text-foreground'
                }`}
              >
                {challenge.joined ? (
                  <><CheckCircle2 size={16} /> Joined</>
                ) : (
                  <>Join Challenge <ArrowRight size={16} /></>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
