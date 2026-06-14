/**
 * Purpose: Client-side navigation component for the Dashboard.
 * Responsibility: Render links, highlight active routes, and handle responsive menu toggling.
 * Future Integrations: Use next/navigation hooks (usePathname) to dynamically style the active link. Integrate with mobile hamburger menu state.
 */

import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="flex flex-col gap-2">
      <Link href="/dashboard" className="px-4 py-2 text-sm font-medium rounded-md bg-muted text-foreground">
        Overview
      </Link>
      <Link href="/dashboard/insights" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted/50 text-muted-foreground transition-colors">
        AI Insights
      </Link>
      <Link href="/dashboard/challenges" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted/50 text-muted-foreground transition-colors">
        Challenges
      </Link>
      <Link href="/dashboard/simulator" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted/50 text-muted-foreground transition-colors">
        Simulator
      </Link>
      <div className="my-4 border-t border-border"></div>
      <Link href="/dashboard/profile" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted/50 text-muted-foreground transition-colors">
        Settings
      </Link>
    </nav>
  );
}
