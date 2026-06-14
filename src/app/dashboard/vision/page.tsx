"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ReceiptUploader } from "@/components/vision/ReceiptUploader";
import { ReceiptPreview } from "@/components/vision/ReceiptPreview";
import { ReceiptAnalysisCard } from "@/components/vision/ReceiptAnalysisCard";
import { CarbonImpactTable } from "@/components/vision/CarbonImpactTable";
import { GreenAlternatives } from "@/components/vision/GreenAlternatives";
import { SustainabilityInsights } from "@/components/vision/SustainabilityInsights";
import { ReceiptHistory } from "@/components/vision/ReceiptHistory";
import { VisionAnalysisResult } from "@/services/vision/types";
import { useEcoStore } from "@/store/ecoStore";

export default function VisionPage() {
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
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Vision AI Scanner</h1>
        <p className="text-muted-foreground mt-1 text-lg">Upload a grocery receipt to instantly analyze the carbon footprint of your shopping basket.</p>
      </header>

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
              <p className="text-lg font-medium mb-2">Upload your first receipt to begin reducing your carbon footprint.</p>
              <p className="text-sm max-w-sm">Once you upload a receipt, Gemini Vision will automatically extract and grade every item in your basket, suggesting greener alternatives.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
