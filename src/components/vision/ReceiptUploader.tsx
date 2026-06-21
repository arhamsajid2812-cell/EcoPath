"use client";

import { useCallback, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { motion } from "framer-motion";

interface ReceiptUploaderProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function ReceiptUploader({ onFileSelect, isProcessing }: ReceiptUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    if (isProcessing) return;
    
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a JPG, PNG, WEBP, or PDF.");
      return;
    }

    const { downscaleImage } = await import("@/utils/imageOptimization");
    const optimizedFile = await downscaleImage(file, 1600, 1600);

    if (optimizedFile.size > 5 * 1024 * 1024) {
      alert("File too large. Maximum size is 5MB.");
      return;
    }

    onFileSelect(optimizedFile);
  }, [isProcessing, onFileSelect]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
    else if (e.type === "dragleave") setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors cursor-pointer relative
        ${isDragging ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-muted/50'}
        ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => document.getElementById('receipt-upload')?.click()}
      role="button"
      tabIndex={0}
      aria-label="Upload a receipt image"
    >
      <input 
        id="receipt-upload" 
        type="file" 
        className="hidden" 
        accept="image/jpeg, image/png, image/webp, application/pdf"
        onChange={handleChange}
        disabled={isProcessing}
      />
      
      <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
        <div className="bg-primary/10 p-4 rounded-full text-primary">
          <UploadCloud size={40} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Click or Drag & Drop</h3>
          <p className="text-sm text-muted-foreground mt-1">Upload a grocery receipt or shopping bill (JPG, PNG, PDF)</p>
          <p className="text-xs text-muted-foreground mt-2">Max file size: 5MB</p>
        </div>
      </div>
    </motion.div>
  );
}
