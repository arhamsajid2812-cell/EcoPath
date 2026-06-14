import { ScanLine, TreePine, Activity, Bot, ArrowRight } from "lucide-react";
import { DemoLoginButton } from "./DemoLoginButton";

export function FeatureShowcase() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent features that drive action.</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">We use advanced AI and data modeling to make sustainability frictionless.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {/* Vision AI */}
        <div className="md:col-span-2 bg-gradient-to-br from-card to-background border border-border rounded-3xl p-8 relative overflow-hidden shadow-sm hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 right-0 p-8 opacity-10"><ScanLine size={120} /></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4">
                <ScanLine size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Vision AI Receipt Scanning</h3>
              <p className="text-muted-foreground max-w-md">Snap a photo of your grocery receipt. Our Gemini Vision model instantly extracts items, calculates carbon weight, and suggests greener alternatives.</p>
            </div>
            <DemoLoginButton className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit group">
              See it in action <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </DemoLoginButton>
          </div>
        </div>

        {/* Impact Tree */}
        <div className="md:col-span-1 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-8 relative overflow-hidden shadow-sm text-center flex flex-col items-center justify-center hover:-translate-y-1 transition-transform duration-300">
          <TreePine size={64} className="text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Grow Your Impact Tree</h3>
          <p className="text-sm text-muted-foreground">Watch your digital tree grow from a Seed to a Forest Guardian as you reduce your real-world emissions.</p>
        </div>

        {/* Carbon Simulator */}
        <div className="md:col-span-1 bg-card border border-border rounded-3xl p-8 relative overflow-hidden shadow-sm hover:-translate-y-1 transition-transform duration-300">
          <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 mb-4">
            <Activity size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Carbon Time Travel</h3>
          <p className="text-sm text-muted-foreground mb-4">Adjust lifestyle sliders to instantly simulate your 5-year emission trajectory.</p>
          <DemoLoginButton className="text-blue-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit mt-auto group">
            Try Simulator <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </DemoLoginButton>
        </div>

        {/* AI Coach */}
        <div className="md:col-span-2 bg-gradient-to-br from-card to-background border border-border rounded-3xl p-8 relative overflow-hidden shadow-sm hover:-translate-y-1 transition-transform duration-300">
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
        </div>

      </div>
    </section>
  );
}
