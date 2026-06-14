"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";

interface ReceiptHistoryProps {
  history: { date: string; store: string; items: number; score: number; grade: string; id: string }[];
}

export function ReceiptHistory({ history }: ReceiptHistoryProps) {
  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'text-primary bg-primary/10';
    if (grade.includes('B')) return 'text-yellow-500 bg-yellow-500/10';
    if (grade.includes('C')) return 'text-orange-500 bg-orange-500/10';
    return 'text-destructive bg-destructive/10';
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <FileText className="text-muted-foreground w-5 h-5" />
        Scan History
      </h3>
      <div className="space-y-3">
        {history.map((entry, i) => (
          <motion.div 
            whileHover={{ x: 4 }}
            key={i} 
            className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
          >
            <div>
              <p className="font-medium text-sm text-foreground">{entry.store}</p>
              <p className="text-xs text-muted-foreground">{entry.date} • {entry.items} items</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className={`font-bold text-sm px-2 py-0.5 rounded-md ${getGradeColor(entry.grade)}`}>{entry.grade}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{entry.score}kg CO₂</p>
              </div>
              <ArrowRight className="text-muted-foreground/50 w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
