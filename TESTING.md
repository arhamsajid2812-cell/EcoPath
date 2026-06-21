# EcoPath Testing Strategy & Coverage

## Overview
EcoPath utilizes a comprehensive automated testing suite to guarantee the reliability, accessibility, and mathematical accuracy of the core platform. The suite is built using **Vitest** for unit/integration testing and **React Testing Library** for component rendering verification.

## 🎯 Target Goals
- **Maintain 100% Code Coverage** on mathematical engines (Carbon Engine).
- **Maintain 100% Code Coverage** on state management stores.
- **Ensure Zero Regressions** on UI refactors.

## 🗂️ Test Categories

### 1. Pure Function & Mathematical Validation (`carbonEngine.test.ts`)
Validates the core domain logic decoupled from the UI.
- Tests exact carbon weight calculations for `Diet`, `Transport`, `Electricity`, `Shopping`, and `Water`.
- Tests edge cases (e.g., negative distances, maximum possible values).

### 2. State Management & Stores (`a11yStore.test.ts`)
Validates global Zustand store functionality.
- Verifies initial states.
- Ensures actions correctly mutate state without side effects (e.g., toggling themes, changing font sizes).

### 3. Component Rendering & Accessibility (`components.test.tsx`, `AccessibilityDrawer.test.tsx`)
Validates the UI layer.
- Ensures the `DashboardLayout` properly renders children.
- Ensures semantic HTML renders correctly.
- Mocks Web Speech API (`window.speechSynthesis`) to test Accessibility Drawer interactions without triggering real browser APIs.

### 4. Custom Hooks & Services (`useChallenges.test.ts`, `mockEcoResponse.test.ts`)
Validates interactive logic separated from the View.
- Uses `vi.useFakeTimers()` to test asynchronous timeouts for AI challenge generation.
- Validates Regex matching and string fallbacks for the Mock AI response generator.

## 🚀 Running the Tests

Execute the complete suite with coverage reporting:
```bash
npm run test
```

Execute in watch mode during development:
```bash
npm run test:watch
```

## 🔒 Security in Testing
- Test suites mock sensitive APIs (`GoogleGenAI`) to ensure secrets are never executed or exposed during CI pipelines.
- Rate limiters and validation utilities are tested independently to ensure fail-secure behavior.
