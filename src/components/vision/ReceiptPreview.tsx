"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface ReceiptPreviewProps {
  imageSrc: string | null;
  isProcessing: boolean;
}

export function ReceiptPreview({ imageSrc, isProcessing }: ReceiptPreviewProps) {
  if (!imageSrc) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative rounded-2xl overflow-hidden border border-border shadow-sm max-h-[500px] flex justify-center bg-black/5"
    >
      <div className="relative w-full h-[500px]">
        <Image 
          src={imageSrc} 
          alt="Receipt Preview" 
          fill
          unoptimized
          className={`object-contain transition-all duration-500 ${isProcessing ? 'blur-sm brightness-50' : ''}`}
        />
      </div>
      
      {isProcessing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/20 backdrop-blur-sm z-10">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-lg font-medium text-foreground bg-background/80 px-4 py-2 rounded-lg shadow-sm">
            Gemini Vision is parsing items...
          </p>
        </div>
      )}
    </motion.div>
  );
}
