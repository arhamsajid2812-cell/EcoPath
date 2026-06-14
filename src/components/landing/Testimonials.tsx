export function Testimonials() {
  return (
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
  );
}
