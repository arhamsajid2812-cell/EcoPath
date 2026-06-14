"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
const ReceiptUploader = dynamic(() => import('@/components/vision/ReceiptUploader').then(mod => mod.ReceiptUploader), { ssr: false, loading: () => <div className="h-64 w-full flex items-center justify-center bg-muted/20 animate-pulse rounded-2xl border-2 border-dashed border-border">Loading Scanner...</div> });
import { ReceiptPreview } from "@/components/vision/ReceiptPreview";
import { ReceiptAnalysisCard } from "@/components/vision/ReceiptAnalysisCard";
import { CarbonImpactTable } from "@/components/vision/CarbonImpactTable";
import { GreenAlternatives } from "@/components/vision/GreenAlternatives";
import { SustainabilityInsights } from "@/components/vision/SustainabilityInsights";
import { ReceiptHistory } from "@/components/vision/ReceiptHistory";
import { VisionAnalysisResult } from "@/services/vision/types";
import { useEcoStore } from "@/store/ecoStore";

export function VisionClientContent() {
  const receiptHistory = useEcoStore((state) => state.receiptHistory);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<VisionAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    // 1. Preview Image
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      setImageSrc(base64Data);

      // 2. Call API
      setIsProcessing(true);
      setError(null);
      setResult(null);

      try {
        const response = await fetch('/api/vision', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data, mimeType: file.type })
        });

        const data = await response.json();

        if (data.success && data.data) {
          setResult(data.data);
        } else {
          setError(data.error || "Failed to analyze the receipt. Please try again.");
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "A network error occurred.";
        setError(errorMessage);
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Left Column: Input & Preview */}
      <div className="lg:col-span-1 space-y-6">
        <ReceiptUploader onFileSelect={handleFileSelect} isProcessing={isProcessing} />

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-xl text-sm font-medium border border-destructive/20">
            {error}
          </div>
        )}

        <ReceiptPreview imageSrc={imageSrc} isProcessing={isProcessing} />

        {!isProcessing && !result && (
          <ReceiptHistory history={receiptHistory} />
        )}
      </div>

      {/* Right Column: Results */}
      <div className="lg:col-span-2 space-y-6">
        {result && !isProcessing ? (
          <>
            <ReceiptAnalysisCard result={result} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SustainabilityInsights
                highestImpactItems={result.highestImpactItems}
                recommendations={result.recommendations}
                estimatedSavings={result.estimatedSavings}
              />
              <GreenAlternatives alternatives={result.greenerAlternatives} />
            </div>

            <CarbonImpactTable items={result.receiptItems} />
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-2xl bg-card/50 text-muted-foreground text-center">
            <p className="text-lg font-medium mb-2">Awaiting Upload</p>
            <p className="text-sm max-w-sm">Once you upload a receipt, Gemini Vision will automatically extract and grade every item in your basket.</p>
          </div>
        )}
      </div>
    </div>
  );
}
