"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LogTabs,
  WeeklyLogCard,
  QuarterlyReportCard,
  ClassCard,
} from "@/components/log";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { WeeklyLog, QuarterlyReport, ClassPage } from "@/lib/markdown";

type TabType = "weekly" | "quarterly" | "classes";

interface LogPageClientProps {
  weeklyLogs: WeeklyLog[];
  quarterlyReports: QuarterlyReport[];
  classes: ClassPage[];
}

export function LogPageClient({
  weeklyLogs,
  quarterlyReports,
  classes,
}: LogPageClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("weekly");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {/* Tab Navigation */}
      <motion.div variants={fadeInUp}>
        <LogTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </motion.div>

      {/* Content Grid */}
      <motion.div variants={fadeInUp}>
        {/* Weekly Logs */}
        {activeTab === "weekly" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {weeklyLogs.length > 0 ? (
              weeklyLogs.map((log, index) => (
                <WeeklyLogCard key={log.slug} log={log} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-[var(--blueprint-text-dim)]">
                <p className="font-mono">No weekly logs yet.</p>
                <p className="text-sm mt-2">
                  Add markdown files to `content/weekly/` to see them here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quarterly Reports */}
        {activeTab === "quarterly" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quarterlyReports.length > 0 ? (
              quarterlyReports.map((report, index) => (
                <QuarterlyReportCard
                  key={report.slug}
                  report={report}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-[var(--blueprint-text-dim)]">
                <p className="font-mono">No quarterly reports yet.</p>
                <p className="text-sm mt-2">
                  Add markdown files to `content/quarterly/` to see them here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Classes */}
        {activeTab === "classes" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classes.length > 0 ? (
              classes.map((classPage, index) => (
                <ClassCard
                  key={classPage.slug}
                  classPage={classPage}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-[var(--blueprint-text-dim)]">
                <p className="font-mono">No class pages yet.</p>
                <p className="text-sm mt-2">
                  Add markdown files to `content/classes/` to see them here.
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
