import { BlueprintBackground } from "@/components/layout";
import { LogPageClient } from "@/components/log/LogPageClient";
import {
  getAllWeeklyLogs,
  getAllQuarterlyReports,
  getAllClasses,
} from "@/lib/markdown";

export default function LogPage() {
  // Fetch data on server-side
  const weeklyLogs = getAllWeeklyLogs();
  const quarterlyReports = getAllQuarterlyReports();
  const classes = getAllClasses();

  return (
    <BlueprintBackground variant="grid">
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg)]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-mono font-bold text-[var(--blueprint-text)]">
                  <span className="text-[var(--blueprint-accent)]">&lt;</span>
                  Dev Log
                  <span className="text-[var(--blueprint-accent)]">&gt;</span>
                </h1>
                <p className="text-sm text-[var(--blueprint-text-dim)] font-mono mt-1">
                  Weekly logs, quarterly reports, and class notes
                </p>
              </div>
              <div className="text-xs font-mono text-[var(--blueprint-line-dim)]">
                SYS-LOG-v1.0
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Client Component */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <LogPageClient
            weeklyLogs={weeklyLogs}
            quarterlyReports={quarterlyReports}
            classes={classes}
          />
        </main>
      </div>
    </BlueprintBackground>
  );
}
