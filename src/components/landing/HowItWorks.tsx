export function HowItWorks() {
  return (
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
  );
}
