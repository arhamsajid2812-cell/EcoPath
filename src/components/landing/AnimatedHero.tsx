"use client";

import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";
import { DemoLoginButton } from "./DemoLoginButton";

export function AnimatedHero() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20"
      >
        <Globe2 className="w-4 h-4" /> Hackathon Finalist
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
      >
        Track. Understand. <br/>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Reduce.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
      >
        AI-powered sustainability insights that help you build a greener future. Transform your daily habits into measurable environmental impact.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <DemoLoginButton className="w-full sm:w-auto bg-foreground text-background px-8 py-4 rounded-full text-base font-bold hover:bg-foreground/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
          Start Free Trial
        </DemoLoginButton>
        <DemoLoginButton className="w-full sm:w-auto bg-card border border-border text-foreground px-8 py-4 rounded-full text-base font-bold hover:bg-muted transition-all">
          Explore Demo Experience
        </DemoLoginButton>
      </motion.div>
    </div>
  );
}
