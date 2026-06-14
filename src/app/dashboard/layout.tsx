import { Sidebar } from '@/components/dashboard/Sidebar';

/**
 * Purpose: Layout wrapper for all dashboard routes.
 * Responsibility: Provide the main application shell, including the Navigation sidebar/topbar and main content area.
 * Future Integrations: Add authentication boundary wrapper to protect routes, integrate dynamic Navigation component.
 */

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
