"use client";

import { motion } from "framer-motion";
import {
  FiActivity,
  FiAward,
  FiBook,
  FiCalendar,
  FiClock,
  FiFileText,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
} from "react-icons/fi";

/* ─── Types ─── */
export interface VerificationData {
  verified: boolean;
  certificate_number: string;
  student: {
    full_name: string;
    photo: string | null;
  };
  course: {
    name: string | null;
    duration: string | null;
    period: string | null;
    issue_date: string | null;
    marks_percent: string | null;
    grade: string | null;
  } | null;
  institute: {
    name: string | null;
    city: string | null;
    state: string | null;
    email: string | null;
    mobile: string | null;
    address: string | null;
  };
}

const gradeLabel: Record<string, string> = {
  "A+": "Outstanding",
  A: "Excellent",
  "B+": "Very Good",
  B: "Good",
  C: "Average",
};

/* ─── Main component ─── */
export default function CertificateResult({ data }: { data: VerificationData }) {
  const initial = (data.student?.full_name ?? "S").charAt(0).toUpperCase();
  const marksNum = data.course?.marks_percent ? parseFloat(data.course.marks_percent) : null;

  // course_period may be null if the PHP accessor couldn't compute it;
  // display issue_date alone as a readable fallback so the field never shows N/A
  // when issue_date is available.
  const displayPeriod = data.course?.period ?? data.course?.issue_date ?? null;

  return (
    <div className="space-y-5 mt-8">

      {/* ══════════════════ HEADER TICKET ══════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
      >
        {/* Rainbow top stripe */}
        <div
          className="h-1 animate-rainbow bg-[length:300%_100%]"
          style={{ background: "linear-gradient(90deg,#10b981,#6366f1,#f59e0b,#ef4444,#10b981)" }}
        />

        <div className="flex flex-col md:flex-row">

          {/* LEFT — Animated seal */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center gap-3 px-8 py-7 bg-emerald-50 dark:bg-emerald-900/20 border-b md:border-b-0 md:border-r border-emerald-200 dark:border-emerald-800 min-w-[148px]">
            <div className="relative w-[88px] h-[88px] flex items-center justify-center">
              {/* Outer dashed spinning ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-300 dark:border-emerald-600 animate-spin-slow" />
              {/* Inner ring, reverse */}
              <div className="absolute inset-[9px] rounded-full border border-emerald-400 dark:border-emerald-500 animate-spin-slow-rev" />
              {/* Centre shield */}
              <div className="absolute inset-5 rounded-full bg-emerald-50 dark:bg-emerald-900/40 border-2 border-emerald-400 dark:border-emerald-500 flex items-center justify-center shadow-[0_0_12px_rgba(52,211,153,.25)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" className="text-emerald-600 dark:text-emerald-400">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              {/* Pulse outer ring */}
              <div className="absolute inset-[-5px] rounded-full border border-emerald-300 dark:border-emerald-700 animate-pulse-ring" />
            </div>

            <div className="text-center">
              <p className="text-2xl font-black tracking-[0.1em] text-emerald-600 dark:text-emerald-400 leading-none">DITRP</p>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400 dark:text-emerald-500 mt-1">INDIA</p>
            </div>
          </div>

          {/* CENTER — Title */}
          <div className="flex-1 px-7 py-6 flex flex-col justify-center">
            <p className="text-[10px] font-black tracking-[0.26em] uppercase text-emerald-600 dark:text-emerald-400 mb-2">
              ● &nbsp;Digital Certificate Authority
            </p>
            <h2 className="text-[2rem] font-black leading-[1.12] text-gray-900 dark:text-white tracking-[0.02em] mb-3">
              STUDENT RECORD<br />
              <span className="text-emerald-600 dark:text-emerald-400">VERIFICATION</span>
              <span className="text-gray-300 dark:text-gray-600 text-[1.35rem] font-bold"> REPORT</span>
            </h2>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-[2.5px] w-8 bg-emerald-500 rounded-full" />
              <div className="h-[1.5px] flex-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
            <p className="text-[11px] font-semibold tracking-[0.04em] text-gray-400 dark:text-gray-500">
              Directorate of Information Technology &amp; Research Promotion
            </p>
          </div>

          {/* RIGHT — Status badge */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center px-8 py-6 gap-3 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 min-w-[130px]">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-emerald-50 dark:bg-emerald-900/30 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl px-5 py-4 text-center shadow-md"
            >
              <div className="w-11 h-11 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                <FiShield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-600 dark:text-emerald-400">AUTHENTIC</p>
              <p className="text-[9px] font-bold tracking-wide text-emerald-400 dark:text-emerald-500 mt-1">VERIFIED ✓</p>
            </motion.div>
            <p className="text-[9px] text-gray-400 dark:text-gray-500 text-center tracking-wider font-semibold">
              www.ditrpindia.org
            </p>
          </div>

        </div>
      </motion.div>

      {/* ══════════════════ MAIN CARD ══════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <div className="px-6 md:px-9 py-8 space-y-8">

          {/* ─── STUDENT PROFILE ─── */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-7">

            {/* Spinning photo ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
              className="relative w-[136px] h-[136px] flex-shrink-0"
            >
              {/* Conic gradient spinning ring */}
              <div
                className="absolute inset-[-4px] rounded-full animate-spin-slow z-0"
                style={{ background: "conic-gradient(from 0deg,#10b981,#6366f1,#f59e0b,#ef4444,#10b981)" }}
              />
              {/* White gap ring */}
              <div
                className="absolute inset-[-1px] rounded-full z-[1]"
                style={{ background: "inherit" }}
              />
              {/* Photo circle */}
              <div className="relative z-10 w-[136px] h-[136px] rounded-full overflow-hidden bg-gradient-to-br from-emerald-100 to-violet-100 dark:from-emerald-900/30 dark:to-violet-900/30 flex items-center justify-center"
                style={{ border: "3px solid white" }}>
                {data.student?.photo ? (
                  <img
                    src={data.student.photo}
                    alt={data.student.full_name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <span className="text-[3.4rem] font-black text-emerald-600 dark:text-emerald-400 leading-none select-none">{initial}</span>
                )}
              </div>
            </motion.div>

            {/* Name + cert number chip */}
            <motion.div
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex-1 text-center md:text-left"
            >
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-600 dark:text-emerald-400 mb-1">
                Name of Student
              </p>
              <h3 className="text-[2rem] font-black text-gray-900 dark:text-white tracking-[0.03em] mb-4 leading-tight">
                {(data.student?.full_name ?? "N/A").toUpperCase()}
              </h3>

              {/* Certificate number chip */}
              <div
                className="inline-flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-2xl px-5 py-3 cursor-default transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-indigo-900/30"
              >
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiFileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-[0.16em] uppercase text-indigo-500 dark:text-indigo-400 leading-none mb-1">
                    Certificate Number
                  </p>
                  <p className="text-[1.1rem] font-black text-indigo-800 dark:text-indigo-300 leading-none tracking-[0.04em]">
                    {data.certificate_number}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Divider */}
          <Divider dots={["#10b981", "#6366f1", "#f59e0b"]} />

          {/* ─── COURSE DETAILS ─── */}
          {data.course && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="space-y-4"
            >
              <SectionLabel>Course Details</SectionLabel>

              {/* Course name banner */}
              <div className="bg-gradient-to-r from-emerald-50 to-indigo-50 dark:from-emerald-900/20 dark:to-indigo-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
                <p className="text-[10px] font-black tracking-[0.13em] uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-2">
                  <FiBook className="w-3 h-3" /> Course Name
                </p>
                <p className="text-[1.5rem] font-black text-gray-900 dark:text-white tracking-[0.03em] leading-tight">
                  {(data.course.name ?? "N/A").toUpperCase()}
                </p>
              </div>

              {/* 4-stat grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <StatCard label="Certificate Number" value={data.certificate_number}  icon={<FiFileText />} color="indigo"  />
                <StatCard label="Course Duration"    value={data.course.duration}     icon={<FiClock />}    color="violet"  />
                <StatCard label="Certificate Period" value={displayPeriod}            icon={<FiCalendar />} color="cyan"    />
                <StatCard label="Issue Date"         value={data.course.issue_date}   icon={<FiCalendar />} color="emerald" />
              </div>

              {/* Marks + Grade */}
              {(data.course.marks_percent || data.course.grade) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  {/* Marks bar */}
                  {data.course.marks_percent && (
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 dark:from-emerald-900/20 dark:to-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
                      <p className="text-[10px] font-black tracking-[0.13em] uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-2">
                        <FiActivity className="w-3 h-3" /> Marks Obtained
                      </p>
                      <p className="text-[2.5rem] font-black text-emerald-600 dark:text-emerald-400 leading-none mb-3">
                        {data.course.marks_percent}
                        <span className="text-[1.5rem] font-bold text-emerald-400 dark:text-emerald-500">%</span>
                      </p>
                      {marksNum !== null && (
                        <div className="bg-emerald-200 dark:bg-emerald-900/50 rounded-full h-[7px] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(marksNum, 100)}%` }}
                            transition={{ delay: 0.7, duration: 1.1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Grade ring */}
                  {data.course.grade && (
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
                      <div
                        className="w-[72px] h-[72px] rounded-full flex items-center justify-center flex-shrink-0 shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-12 bg-amber-50 dark:bg-amber-900/30"
                        style={{ border: "3px solid #fbbf24" }}
                      >
                        <span className="text-[2.2rem] font-black text-amber-600 dark:text-amber-400 leading-none">
                          {data.course.grade}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black tracking-[0.14em] uppercase text-amber-600 dark:text-amber-400 mb-2">
                          Grade Secured
                        </p>
                        <p className="text-sm font-bold text-amber-800 dark:text-amber-300 leading-snug">
                          {gradeLabel[data.course.grade.toUpperCase()] ?? "Completed"}
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </motion.div>
          )}

          {/* Divider */}
          <Divider dots={["#6366f1", "#10b981"]} />

          {/* ─── INSTITUTE DETAILS ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="space-y-4"
          >
            <SectionLabel>Institute Details</SectionLabel>

            <div className="bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden shadow-sm">

              {/* Institute header */}
              <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-indigo-900/20 dark:to-emerald-900/20 border-b border-gray-200 dark:border-gray-600 px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-[46px] h-[46px] bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <FiGlobe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.16em] uppercase text-indigo-600 dark:text-indigo-400 mb-1">
                      Name of Institute
                    </p>
                    <p className="text-[1.05rem] font-black text-gray-900 dark:text-white leading-tight">
                      {data.institute?.name ?? "N/A"}
                    </p>
                    {(data.institute?.city || data.institute?.state) && (
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                        {[data.institute.city, data.institute.state].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact rows */}
              {data.institute?.email && (
                <InstituteRow
                  icon={<FiMail className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                  iconBg="bg-blue-100 dark:bg-blue-900/40"
                  label="Institute Email"
                  value={data.institute.email}
                />
              )}
              {data.institute?.mobile && (
                <InstituteRow
                  icon={<FiPhone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  iconBg="bg-emerald-100 dark:bg-emerald-900/40"
                  label="Institute Contact"
                  value={data.institute.mobile}
                />
              )}
              {data.institute?.address && (
                <InstituteRow
                  icon={<FiMapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />}
                  iconBg="bg-orange-100 dark:bg-orange-900/40"
                  label="Institute Address"
                  value={data.institute.address}
                  isLast
                />
              )}
            </div>
          </motion.div>

          {/* Footer */}
          <p className="text-center text-[10px] font-bold tracking-[0.12em] uppercase text-gray-300 dark:text-gray-600">
            Online Certificate Verification ·{" "}
            <span className="text-emerald-500">www.ditrpindia.org</span>
          </p>

        </div>
      </motion.div>
    </div>
  );
}

/* ─── Sub-components ─── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-black tracking-[0.22em] uppercase text-gray-400 dark:text-gray-500">
      {children}
    </p>
  );
}

function Divider({ dots }: { dots: string[] }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        {dots.map((color, i) => (
          <span key={i} className="w-[7px] h-[7px] rounded-full inline-block" style={{ background: color }} />
        ))}
      </div>
      <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent rounded-full" />
    </div>
  );
}

const statColors = {
  indigo:  { label: "text-indigo-600 dark:text-indigo-400",  value: "text-indigo-800 dark:text-indigo-300" },
  violet:  { label: "text-violet-600 dark:text-violet-400",  value: "text-violet-800 dark:text-violet-300" },
  cyan:    { label: "text-cyan-600 dark:text-cyan-400",      value: "text-cyan-800 dark:text-cyan-300" },
  emerald: { label: "text-emerald-600 dark:text-emerald-400", value: "text-emerald-800 dark:text-emerald-300" },
} as const;

function StatCard({
  label, value, icon, color,
}: {
  label: string;
  value: string | null | undefined;
  icon: React.ReactNode;
  color: keyof typeof statColors;
}) {
  const c = statColors[color];
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 cursor-default">
      <p className={`text-[10px] font-black tracking-[0.13em] uppercase ${c.label} flex items-center gap-1.5 mb-2`}>
        <span className="w-3 h-3">{icon}</span>
        {label}
      </p>
      <p className={`text-base font-bold ${c.value} leading-snug`}>{value ?? "N/A"}</p>
    </div>
  );
}

function InstituteRow({
  icon, iconBg, label, value, isLast = false,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <div className={`flex items-start gap-4 px-6 py-4 transition-all duration-200 hover:translate-x-[5px] hover:bg-gray-100/70 dark:hover:bg-gray-700/40 ${!isLast ? "border-b border-gray-100 dark:border-gray-700" : ""}`}>
      <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black tracking-[0.12em] uppercase text-gray-400 dark:text-gray-500 mb-1">
          {label}
        </p>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">{value}</p>
      </div>
    </div>
  );
}
