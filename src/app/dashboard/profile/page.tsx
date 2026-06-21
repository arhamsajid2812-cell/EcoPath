"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useEcoStore } from "@/store/ecoStore";
import { ActiveChallenges } from "@/components/dashboard/ActiveChallenges";
import Link from "next/link";

/**
 * Purpose: User profile and settings management.
 * Responsibility: Display user info, show active sustainability pledges (challenges), and manage settings.
 */
export default function ProfilePage() {
  const { profile, activeChallenges } = useEcoStore();

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Profile & Pledges</h1>
          <p className="text-muted-foreground mt-1">Manage your account and track your sustainability commitments.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Settings Card */}
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6 h-fit">
            <div className="flex items-center gap-4 border-b border-border pb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                {profile?.name ? profile.name.charAt(0) : "U"}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{profile?.name || "User Name"}</h2>
                <p className="text-muted-foreground">user@example.com</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Preferences</h3>
              <div className="flex items-center justify-between">
                 <label htmlFor="pref-notifications" className="cursor-pointer">Notification Emails</label>
                 <input id="pref-notifications" type="checkbox" className="w-5 h-5 accent-primary" defaultChecked aria-label="Toggle notification emails" />
              </div>
              <div className="flex items-center justify-between">
                 <label htmlFor="pref-weekly-report" className="cursor-pointer">Weekly Report</label>
                 <input id="pref-weekly-report" type="checkbox" className="w-5 h-5 accent-primary" defaultChecked aria-label="Toggle weekly report" />
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <button className="text-destructive font-medium hover:underline">
                Log Out
              </button>
            </div>
          </div>

          {/* Active Pledges / Challenges Card */}
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-1">Your Active Pledges</h3>
              <p className="text-sm text-muted-foreground mb-4">You have committed to these behavior changes.</p>
              
              {activeChallenges && activeChallenges.length > 0 ? (
                <div className="space-y-4">
                  {activeChallenges.map((challenge, i) => (
                    <ActiveChallenges key={i} {...challenge} />
                  ))}
                </div>
              ) : (
                <div className="bg-muted/30 border border-border rounded-xl p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-4">You haven't made any sustainability pledges yet.</p>
                  <Link href="/dashboard/challenges" className="text-sm font-medium text-primary hover:underline">
                    Browse Challenges →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
