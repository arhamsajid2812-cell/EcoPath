# EcoPath Testing Strategy & Guidelines

This document outlines the testing infrastructure and QA procedures for the EcoPath Hackathon MVP. Our goal is to ensure the core business logic (carbon calculations and AI parsing) remains highly reliable, targeting >80% coverage.

## 🧪 1. Unit Testing Strategy

We use **Vitest** combined with **React Testing Library** for lightning-fast, highly accurate unit tests.

### What We Test
1. **Carbon Engine (`src/services/carbonEngine/`)**: The core mathematical engine. We rigorously test all edge cases (e.g., zero emissions for bikes, massive emission limits) to guarantee absolute mathematical accuracy before the dashboard ever sees the numbers.
2. **Vision AI Schema Validation (`src/services/vision/`)**: We use `Zod` to strictly enforce the shape of the Gemini API output. Our unit tests mock the SDK response to verify our parser correctly intercepts valid objects and safely handles malformed JSON without crashing the UI.
3. **AI Simulator Mocking (`src/services/ai/`)**: We mock `@google/genai` to ensure our internal wrapper classes correctly construct prompts and return strings without triggering real API costs during CI/CD.

### Running Tests
To run the test suite locally:
```bash
npm run test
```

To generate the coverage report:
```bash
npm run coverage
```

## 🔄 2. Integration Test Strategy

While full E2E testing (Cypress/Playwright) is overkill for a 48-hour hackathon, we rely on **Zustand State Integration** testing.

### What We Test
- **Simulator Flow**: We verify that the React components (like the `HabitControls` sliders) correctly update the `useEcoStore` state, and that the resulting `totalSavedKg` propagates through the Dashboard correctly.
- **Vision Upload Flow**: Ensuring the browser's `FileReader` correctly encodes the Base64 image, hits the `/api/vision` proxy, and populates the `ReceiptAnalysisCard` upon return.

## 🕵️ 3. Manual QA Checklist (Judging Readiness)

Before presenting the application to the judges, perform this manual checklist:

### A. The "Demo Mode" Experience
- [ ] Navigate to `/` (Landing Page).
- [ ] Ensure the **Community Impact Counter** is incrementing locally.
- [ ] Click **"Try Demo"**.
- [ ] Verify you are instantly routed to `/dashboard` without being blocked by an Auth wall.
- [ ] Ensure the Dashboard is fully populated with the `Alex Judge` profile and charts render smoothly.

### B. Carbon Time Travel Simulator
- [ ] Navigate to `/dashboard/simulator`.
- [ ] Move the "Car Usage" slider down to `0%` and "Bike" to `100%`.
- [ ] Verify the "Total Saved" metric immediately recalculates without lag.
- [ ] Wait 1.5 seconds and ensure the AI Narrative card updates with a new localized story.
- [ ] Verify accessibility: Use the `TAB` key to navigate the sliders and ensure the focus ring (`focus-visible:ring-primary`) is clearly visible.

### C. Vision AI Robustness
- [ ] Navigate to `/dashboard/vision`.
- [ ] Upload a standard JPEG receipt. Wait for the "A+ to D" grade.
- [ ] Upload a non-image file (e.g., `.txt`). Verify the UI safely rejects it with a clear error banner.
- [ ] Review the "Greener Alternatives" card to ensure the suggested swaps are logically sound.

---

*EcoPath is built to be resilient. If the AI hallucinates, Zod validation guarantees the UI will fall back gracefully rather than crash.*
