"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">EcoPath</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className={`block p-3 rounded-md transition-colors ${pathname === '/dashboard' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted/50 font-medium text-muted-foreground hover:text-foreground'}`}>
          Dashboard
        </Link>
        <Link href="/dashboard/insights" className={`block p-3 rounded-md transition-colors ${pathname === '/dashboard/insights' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted/50 font-medium text-muted-foreground hover:text-foreground'}`}>
          Insights
        </Link>
        <Link href="/dashboard/challenges" className={`block p-3 rounded-md transition-colors ${pathname === '/dashboard/challenges' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted/50 font-medium text-muted-foreground hover:text-foreground'}`}>
          Challenges
        </Link>
        <Link href="/dashboard/simulator" className={`block p-3 rounded-md transition-colors ${pathname === '/dashboard/simulator' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted/50 font-medium text-muted-foreground hover:text-foreground'}`}>
          Simulator
        </Link>
      </nav>
    </aside>
  );
}
