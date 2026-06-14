const fs = require('fs');

const fixes = [
  { file: 'src/app/dashboard/challenges/page.tsx', search: "You don't have", replace: "You don&apos;t have" },
  { file: 'src/app/dashboard/insights/page.tsx', search: 'Click "Simulate"', replace: 'Click &quot;Simulate&quot;' },
  { file: 'src/app/login/page.tsx', search: "Don't have an account?", replace: "Don&apos;t have an account?" },
  { file: 'src/app/onboarding/page.tsx', search: "Let's personalize your experience.", replace: "Let&apos;s personalize your experience." },
  { file: 'src/app/page.tsx', search: '"Carbon Time Travel"', replace: '&quot;Carbon Time Travel&quot;' },
  { file: 'src/components/simulator/FutureNarrativeCard.tsx', search: '"What if"', replace: '&quot;What if&quot;' },
  { file: 'src/components/simulator/SavingsBreakdown.tsx', search: "Here's", replace: "Here&apos;s" },
  { file: 'src/components/simulator/SimulatorResults.tsx', search: "You've", replace: "You&apos;ve" },
  { file: 'src/components/vision/SustainabilityInsights.tsx', search: "Here's", replace: "Here&apos;s" }
];

fixes.forEach(fix => {
  if (fs.existsSync(fix.file)) {
    let content = fs.readFileSync(fix.file, 'utf8');
    content = content.replace(fix.search, fix.replace);
    // Some have multiple occurrences on the line
    if (fix.file.includes('page.tsx') && fix.file.includes('page.tsx')) {
        content = content.replace(fix.search, fix.replace); // replace again just in case
    }
    fs.writeFileSync(fix.file, content);
  }
});
console.log('Fixed quotes.');
