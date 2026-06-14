/**
 * Purpose: User profile and settings management.
 * Responsibility: Display user info, allow editing of settings, and manage logout functionality.
 * Future Integrations: Connect to Supabase Auth to fetch session data, implement profile image uploads via Supabase Storage.
 */

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Profile & Settings</h1>
      </header>

      <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
            U
          </div>
          <div>
            <h2 className="text-xl font-semibold">User Name</h2>
            <p className="text-muted-foreground">user@example.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Preferences</h3>
          <div className="flex items-center justify-between">
             <span>Notification Emails</span>
             <input type="checkbox" className="w-5 h-5 accent-primary" />
          </div>
          <div className="flex items-center justify-between">
             <span>Dark Mode</span>
             <input type="checkbox" className="w-5 h-5 accent-primary" />
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <button className="text-destructive font-medium hover:underline">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
