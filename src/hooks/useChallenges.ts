import { useState } from "react";
import { DEFAULT_CHALLENGES, AI_SUGGESTED_CHALLENGES } from "@/constants/challenges";

export function useChallenges() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedChallenges, setSuggestedChallenges] = useState(DEFAULT_CHALLENGES);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomSuggested = AI_SUGGESTED_CHALLENGES[Math.floor(Math.random() * AI_SUGGESTED_CHALLENGES.length)];
      setSuggestedChallenges(prev => [
        randomSuggested,
        ...prev
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleJoin = (index: number) => {
    setSuggestedChallenges(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], joined: true };
      return copy;
    });
    // In a real app, this would also add to the ecoStore activeChallenges or trigger an API call.
  };

  return {
    isGenerating,
    suggestedChallenges,
    handleGenerate,
    handleJoin
  };
}
