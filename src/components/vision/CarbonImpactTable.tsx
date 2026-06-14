"use client";

import { motion } from "framer-motion";
import { ReceiptItem } from "@/services/vision/types";

interface CarbonImpactTableProps {
  items: ReceiptItem[];
}

export function CarbonImpactTable({ items }: CarbonImpactTableProps) {
  const getImpactColor = (level: string) => {
    switch (level) {
      case 'VERY_HIGH': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'HIGH': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'MEDIUM': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'LOW': return 'bg-primary/10 text-primary border-primary/20';
      case 'VERY_LOW': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Scanned Items Breakdown</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
            <tr>
              <th className="px-6 py-3 font-medium">Item</th>
              <th className="px-6 py-3 font-medium">Qty</th>
              <th className="px-6 py-3 font-medium text-right">Price</th>
              <th className="px-6 py-3 font-medium text-center">Impact Level</th>
              <th className="px-6 py-3 font-medium text-right">Est. CO₂ (kg)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <motion.tr 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={index} 
                className="border-b border-border last:border-0 hover:bg-muted/20"
              >
                <td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4 text-right">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getImpactColor(item.impactLevel)}`}>
                    {item.impactLevel.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-medium">{item.estimatedCO2Kg.toFixed(2)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
