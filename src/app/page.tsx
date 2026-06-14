import Link from "next/link";
import { 
  ArrowRight, 
  Leaf, 
  ScanLine, 
  Activity, 
  Bot, 
  TreePine 
} from "lucide-react";
import { DemoLoginButton } from "@/components/landing/DemoLoginButton";
import { ImpactCounter } from "@/components/landing/ImpactCounter";
import { AnimatedHero } from "@/components/landing/AnimatedHero";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";

export default function LandingPage() {
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
            <DemoLoginButton className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
              Try Demo <ArrowRight className="w-4 h-4" />
            </DemoLoginButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <AnimatedHero />
      </section>

      {/* Community Impact Counter */}
      <section className="py-12 border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Collective Impact</p>
          <div className="flex flex-col items-center justify-center gap-2">
            <ImpactCounter />
            <p className="text-lg text-muted-foreground">Reduced by the EcoPath community to date</p>
          </div>
        </div>
      </section>

      {/* Feature Showcase (Bento Box) */}
      <FeatureShowcase />

      {/* How it Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to shrink your footprint?</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg max-w-lg mx-auto">
              Join the EcoPath community today and start tracking, understanding, and reducing your impact.
            </p>
            <DemoLoginButton className="bg-white text-primary px-8 py-4 rounded-full text-base font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Try EcoPath Demo
            </DemoLoginButton>
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
