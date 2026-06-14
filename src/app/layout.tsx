/**
 * Purpose: Root layout for the entire Next.js application.
 * Responsibility: Setup HTML structure, inject global CSS, define fonts, and provide top-level providers.
 * Future Integrations: Add Next-Auth/Supabase Auth Providers, ThemeProvider for dark mode, and global error boundaries.
 */

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider';
import { AccessibilityFab } from '@/components/accessibility/AccessibilityFab';
import { SkipLinks } from '@/components/accessibility/SkipLinks';
import { WebVitals } from "@/components/WebVitals";

export const metadata: Metadata = {
  title: 'EcoPath - AI Carbon Footprint Platform',
  description: 'Understand, track, and reduce your carbon footprint with AI-powered insights.',
  manifest: '/manifest',
};

export const viewport: Viewport = {
  themeColor: '#16a34a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <SkipLinks />
        <AccessibilityProvider>
          <WebVitals />
          {children}
          <AccessibilityFab />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
