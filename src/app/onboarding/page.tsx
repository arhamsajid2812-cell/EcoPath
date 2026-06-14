/**
 * Purpose: Initial onboarding flow for new users.
 * Responsibility: Collect initial carbon baseline data (transport, diet, energy) via a step-by-step form.
 * Future Integrations: Implement multi-step form state (Zustand/React Hook Form), save baseline to Supabase Assessments table, and generate initial AI insights.
 */

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl bg-card rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Let's calculate your baseline</h2>
        <p className="text-muted-foreground mb-8">
          Answer a few quick questions so we can personalize your EcoPath experience.
        </p>
        
        {/* Placeholder for Multi-step Form */}
        <div className="space-y-6">
          <div className="p-4 border border-border rounded-lg bg-muted/50">
            <h3 className="font-semibold mb-2">Step 1: Transportation</h3>
            <p className="text-sm text-muted-foreground">How do you usually commute?</p>
            {/* Form inputs will go here */}
          </div>
          
          <div className="flex justify-between mt-8">
            <button className="px-6 py-2 border border-input rounded-md text-foreground font-medium">Back</button>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
