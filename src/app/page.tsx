"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEcoStore } from "@/store/ecoStore";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  Leaf, 
  ScanLine, 
  Activity, 
  Bot, 
  TreePine, 
  CheckCircle2, 
  Globe2 
} from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const activateDemoMode = useEcoStore(state => state.activateDemoMode);
  const [impactCounter, setImpactCounter] = useState(1450230);

  const handleDemoLogin = () => {
    activateDemoMode();
    router.push('/dashboard');
  };

  // Simple incrementing counter effect for the community impact
  useEffect(() => {
    const interval = setInterval(() => {
      setImpactCounter(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
            <Leaf className="w-6 h-6" /> EcoPath
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block">Sign In</Link>
            <button 
              onClick={handleDemoLogin}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              Try Demo <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
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
            <button 
              onClick={handleDemoLogin}
              className="w-full sm:w-auto bg-foreground text-background px-8 py-4 rounded-full text-base font-bold hover:bg-foreground/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Start Free Trial
            </button>
            <button 
              onClick={handleDemoLogin}
              className="w-full sm:w-auto bg-card border border-border text-foreground px-8 py-4 rounded-full text-base font-bold hover:bg-muted transition-all"
            >
              Explore Demo Experience
            </button>
          </motion.div>
        </div>
      </section>

      {/* Community Impact Counter */}
      <section className="py-12 border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Collective Impact</p>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-5xl md:text-6xl font-black text-foreground tabular-nums tracking-tighter">
              {impactCounter.toLocaleString()} <span className="text-3xl text-primary font-bold">kg CO₂</span>
            </span>
            <p className="text-lg text-muted-foreground">Reduced by the EcoPath community to date</p>
          </div>
        </div>
      </section>

      {/* Feature Showcase (Bento Box) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent features that drive action.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We use advanced AI and data modeling to make sustainability frictionless.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Vision AI */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-gradient-to-br from-card to-background border border-border rounded-3xl p-8 relative overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10"><ScanLine size={120} /></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4">
                  <ScanLine size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Vision AI Receipt Scanning</h3>
                <p className="text-muted-foreground max-w-md">Snap a photo of your grocery receipt. Our Gemini Vision model instantly extracts items, calculates carbon weight, and suggests greener alternatives.</p>
              </div>
              <button onClick={handleDemoLogin} className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit">See it in action <ArrowRight size={16}/></button>
            </div>
          </motion.div>

          {/* Impact Tree */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-1 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-8 relative overflow-hidden shadow-sm text-center flex flex-col items-center justify-center"
          >
            <TreePine size={64} className="text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Grow Your Impact Tree</h3>
            <p className="text-sm text-muted-foreground">Watch your digital tree grow from a Seed to a Forest Guardian as you reduce your real-world emissions.</p>
          </motion.div>

          {/* Carbon Simulator */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-1 bg-card border border-border rounded-3xl p-8 relative overflow-hidden shadow-sm"
          >
            <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 mb-4">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Carbon Time Travel</h3>
            <p className="text-sm text-muted-foreground mb-4">Adjust lifestyle sliders to instantly simulate your 5-year emission trajectory.</p>
            <button onClick={handleDemoLogin} className="text-blue-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit mt-auto">Try Simulator <ArrowRight size={16}/></button>
          </motion.div>

          {/* AI Coach */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-gradient-to-br from-card to-background border border-border rounded-3xl p-8 relative overflow-hidden shadow-sm"
          >
             <div className="absolute bottom-0 right-0 p-8 opacity-5"><Bot size={180} /></div>
             <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center text-secondary mb-4">
                  <Bot size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Conversational Eco Coach</h3>
                <p className="text-muted-foreground max-w-md">Chat with a personalized AI sustainability expert. Ask questions, get tailored challenges, and receive science-backed advice on reducing your footprint without the guilt.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-muted/30 border-y border-border/50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How EcoPath Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0"></div>
            
            {[
              { step: "01", title: "Establish Baseline", desc: "Complete a quick onboarding assessment to determine your starting carbon footprint." },
              { step: "02", title: "Log & Analyze", desc: "Scan receipts and log activities. Our AI automatically classifies and calculates the impact." },
              { step: "03", title: "Reduce & Grow", desc: "Follow personalized AI recommendations to lower your score and grow your Impact Tree." }
            ].map((item, i) => (
              <div key={i} className="relative z-10 bg-card border border-border p-8 rounded-2xl shadow-sm text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Loved by early adopters.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "The Vision AI receipt scanner blew my mind. I didn't realize how much carbon was in my weekly grocery haul.", author: "Sarah J." },
              { quote: "The Carbon Simulator convinced me to start biking to work. Seeing the 5-year projection made it real for me.", author: "Marcus T." },
              { quote: "Finally, a sustainability app that doesn't make me feel guilty, but actually gives actionable, realistic advice.", author: "Elena R." }
            ].map((t, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                <div className="flex text-yellow-500 mb-4">★★★★★</div>
                <p className="text-foreground/80 italic mb-6">"{t.quote}"</p>
                <p className="font-bold text-sm">— {t.author}</p>
              </div>
            ))}
          </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to shrink your footprint?</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg max-w-lg mx-auto">
              Join the EcoPath community today and start tracking, understanding, and reducing your impact.
            </p>
            <button onClick={handleDemoLogin} className="bg-white text-primary px-8 py-4 rounded-full text-base font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Try EcoPath Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <Leaf className="w-5 h-5" /> EcoPath
          </div>
          <p className="text-sm text-muted-foreground">© 2026 EcoPath Hackathon Project. All rights reserved.</p>
          <div className="flex gap-4 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
