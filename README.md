# 🌱 EcoPath

> **Track. Understand. Reduce.**
> An AI-powered sustainability insights platform designed to transform daily habits into measurable environmental impact.

![EcoPath UI Preview](./docs/preview.png)

## 🏆 Hackathon Submission
EcoPath was built as a comprehensive climate-tech MVP, featuring real-time data calculations, Gemini Vision AI integration, and a completely decoupled backend engine. 

### 🌟 Key Features
- **Vision AI Receipt Scanner**: Snap a picture of a grocery receipt. The platform uses Google Gemini 2.5 Flash to automatically extract purchased items, calculate their carbon footprint, and generate dynamic "Greener Alternatives" (e.g., swapping Beef for Plant-Based options).
- **Carbon Time Travel Simulator**: An interactive playground where users adjust lifestyle sliders (Transportation, Diet, Energy) to instantly visualize their 5-year emission trajectory alongside AI-generated impact narratives.
- **Impact Gamification**: A visual "Impact Tree" that grows from a Seedling to a Forest Guardian as users log positive actions and reduce their footprint.
- **Conversational Eco Coach**: A stateful AI assistant trained on environmental science to provide non-judgmental, actionable advice.

## 🛠️ Tech Stack & Architecture

### Frontend
- **Next.js 15 App Router**: Server-side rendering, API routes, and advanced routing.
- **TypeScript**: Strict end-to-end typing.
- **Tailwind CSS & Shadcn UI**: Premium, mobile-first glassmorphism design system.
- **Framer Motion**: Smooth, high-performance UI animations.
- **Recharts**: Accessible, interactive data visualization.
- **Zustand**: Lightweight global state management.

### Backend & AI
- **Carbon Engine Core**: A pure-function, mathematically rigorous carbon calculation engine decoupled from the UI.
- **Google Gemini API**: Multimodal extraction (Vision) and generative insights (Flash).
- **Supabase**: Fully scaffolded PostgreSQL schema, Row Level Security (RLS) policies, and authentication routing.

---

## 🚀 Quick Start (Demo Mode)

For hackathon judges, EcoPath includes a frictionless **Demo Mode** that bypasses authentication and populates the platform with a rich, realistic dataset (6 months of carbon history, active challenges, and scanned receipts).

1. Clone the repository
```bash
git clone https://github.com/yourusername/ecopath.git
cd ecopath
```

2. Install Dependencies
```bash
npm install
```

3. Configure Environment
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the Development Server
```bash
npm run dev
```

Navigate to `http://localhost:3000` and click **"Try Demo"** to experience the platform instantly!

## 🗄️ Database Setup (Production)
If you wish to deploy a fresh instance of the database:
1. Create a new Supabase project.
2. Navigate to the SQL Editor.
3. Paste and run the contents of `supabase/migrations/0000_initial.sql`.
4. Ensure the `receipts` storage bucket is created.
