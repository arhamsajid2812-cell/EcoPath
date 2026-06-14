# EcoPath Accessibility Guide

Welcome to the EcoPath Accessibility Guide! EcoPath is designed with a strict zero-external-API policy for its accessibility features to guarantee privacy, performance, and offline capabilities. We target WCAG 2.2 AA compliance.

## 🌟 Native Web Speech APIs
EcoPath utilizes native browser APIs instead of paid or external cloud providers.
- **Text-to-Speech (TTS)**: Built using `window.speechSynthesis`. Available in English, Hindi, and Urdu (dependent on local OS voice packs). You can control speed, volume, and voice selection from the Accessibility Drawer.
- **Speech-to-Text (STT)**: Voice transcription relies on `webkitSpeechRecognition`.

## ⌨️ Global Keyboard Shortcuts
You can navigate the core accessibility features without a mouse:
- `Alt + A`: Open / Close the Accessibility Drawer
- `Alt + T`: Read aloud the current main content via TTS
- `Alt + D`: Toggle between Default and Dark themes instantly

## 🎨 Theme & Contrast Options
We support a variety of colorblind-safe and high-contrast CSS variable themes:
- **Default**: The standard EcoPath Sage/Forest design.
- **Dark Mode**: Optimized low-light theme.
- **High Contrast**: Pure blacks, whites, and high-visibility accent colors.
- **Protanopia**: Adjusts reds and greens for red-weakness.
- **Deuteranopia**: Adjusts reds and greens for green-weakness.
- **Tritanopia**: Adjusts blues and yellows.

## 📖 Reading Mode & Typography
- **Fonts**: We support *OpenDyslexic* and *Atkinson Hyperlegible*. Note: These fonts are self-hosted via local `.woff2` files to ensure privacy and eliminate reliance on Google Fonts.
- **Reading Mode**: Increases line height (1.8), letter spacing, highlights hyperlinks, and restricts paragraph widths to an optimal 65 characters to reduce eye strain.

## 📊 Accessible Charts
All Recharts SVGs have been marked as `aria-hidden="true"`. To ensure screen readers have full access to the data, a visually hidden `<table>` dynamically mirrors the exact dataset in semantic HTML behind every chart.

## 🏃 Reduced Motion
EcoPath respects the system-level `prefers-reduced-motion` flag by default. If enabled (or toggled manually in the drawer), all CSS and Framer Motion animations immediately snap to their final states to prevent motion sickness.

## 🛠️ Testing & Audits
We utilize `@axe-core/react` during development and run Lighthouse Accessibility Audits on every major build to ensure our zero-API constraint does not compromise quality.
