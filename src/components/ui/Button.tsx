/**
 * Purpose: Reusable Button component (Shadcn UI style).
 * Responsibility: Provide consistent button styling, variants, and states (loading, disabled) across the app.
 * Future Integrations: Expand with Class Variance Authority (CVA) for multiple size and color variants.
 */

import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    // Basic placeholder implementation. Will be replaced by Shadcn CVA config.
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants: Record<string, string> = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} px-4 py-2 ${className || ''}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
