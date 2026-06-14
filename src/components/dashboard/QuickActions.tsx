"use client";

import { motion } from "framer-motion";
import { PlusCircle, Bot, Activity, Target } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const actions = [
    { title: "Log Activity", icon: PlusCircle, color: "bg-primary text-primary-foreground", href: "/dashboard" },
    { title: "AI Coach", icon: Bot, color: "bg-secondary text-secondary-foreground", href: "/dashboard/insights" },
    { title: "Simulator", icon: Activity, color: "bg-blue-500 text-white", href: "/dashboard/simulator" },
    { title: "Challenges", icon: Target, color: "bg-yellow-500 text-white", href: "/dashboard/challenges" },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <Link key={action.title} href={action.href}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${action.color} rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer h-24 shadow-sm`}
                aria-label={action.title}
              >
                <Icon size={24} />
                <span className="text-xs font-semibold">{action.title}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
