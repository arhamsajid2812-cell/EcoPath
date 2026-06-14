export const DEMO_DATA = {
  profile: {
    name: "Alex Judge",
    totalAnnualEmission: 1250,
    sustainabilityScore: 88,
    impactLevel: 'LOW',
    totalSavedKg: 1450,
    joinDate: "2023-01-15T00:00:00Z"
  },
  simulatorBaseline: {
    transportDistance: 40,
    carPercent: 80,
    publicPercent: 20,
    bikePercent: 0,
    walkPercent: 0,
    electricityKwh: 300,
    diet: 'MIXED',
    shoppingSpend: 500,
    waterLitres: 150,
  },
  trendData: [
    { date: 'Jan', emission: 180 },
    { date: 'Feb', emission: 165 },
    { date: 'Mar', emission: 150 },
    { date: 'Apr', emission: 140 },
    { date: 'May', emission: 120 },
    { date: 'Jun', emission: 110 },
  ],
  categoryData: [
    { name: 'Transport', value: 350, color: 'hsl(var(--primary))' },
    { name: 'Energy', value: 400, color: 'hsl(var(--secondary))' },
    { name: 'Diet', value: 250, color: 'hsl(var(--destructive))' },
    { name: 'Shopping', value: 150, color: 'hsl(var(--yellow-500))' },
    { name: 'Water', value: 100, color: 'hsl(var(--blue-500))' },
  ],
  aiInsights: {
    biggestEmissionSource: "Electricity (HVAC Usage)",
    mostImprovedCategory: "Transportation (-30% this month)",
    quickWinOpportunity: "Unplug idle electronics",
    recommendations: [
      {
        title: "Switch to LED Bulbs",
        description: "Replace remaining incandescent bulbs in your home.",
        difficulty: "EASY",
        carbonSavingEstimate: 45,
        timeToImplement: "1 Hour"
      },
      {
        title: "Public Transit Tuesdays",
        description: "Commit to taking the bus or train every Tuesday.",
        difficulty: "MEDIUM",
        carbonSavingEstimate: 120,
        timeToImplement: "Weekly"
      }
    ]
  },
  activeChallenges: [
    { title: "Plant-Based Week", progress: 70, expectedImpact: "High" },
    { title: "Zero Plastic Bags", progress: 100, expectedImpact: "Medium" }
  ],
  receiptHistory: [
    { id: '1', date: "Yesterday", store: "Local Organic Market", items: 12, score: 8.5, grade: "A+" },
    { id: '2', date: "Last Week", store: "MegaMart", items: 34, score: 42.1, grade: "C" },
    { id: '3', date: "2 Weeks Ago", store: "Trader Joe's", items: 18, score: 15.2, grade: "A" }
  ]
};
