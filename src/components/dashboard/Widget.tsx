/**
 * Purpose: Reusable dashboard widget container.
 * Responsibility: Provide consistent padding, borders, and shadows for dashboard cards.
 * Future Integrations: Add loading skeleton states, error boundary fallbacks, and generic action menus (e.g., three dots for "export data").
 */

import React from "react";

export const Widget = React.memo(function Widget({ title, children, className = '' }: { title: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-card rounded-xl shadow-sm border border-border p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
});
