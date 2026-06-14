import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import DashboardPage from '@/app/dashboard/page';
import { AccessibilityDrawer } from '@/components/accessibility/AccessibilityDrawer';

// Mock Zustand Store
vi.mock('@/store/ecoStore', () => ({
  useEcoStore: vi.fn(() => ({
    profile: { name: 'Hackathon Judge', totalAnnualEmission: 5000, sustainabilityScore: 85, impactLevel: 'LOW', totalSavedKg: 200 },
    trendData: [],
    categoryData: [],
    aiInsights: { biggestEmissionSource: 'Car', mostImprovedCategory: 'Diet', quickWinOpportunity: 'Switch to LEDs', recommendations: [] },
    activeChallenges: [],
    activateDemoMode: vi.fn()
  }))
}));

// Mock ResizeObserver for Recharts
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe('Component Snapshot Tests', () => {
  it('renders Dashboard correctly', () => {
    const { container } = render(<DashboardPage />);
    expect(screen.getByText(/Welcome back, Hackathon/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders AccessibilityDrawer correctly', () => {
    const { container } = render(<AccessibilityDrawer isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/Accessibility/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
