"use client";

import React from "react";

/* ─── Types matching actual API response ─── */
export interface MarksheetVerificationData {
  verified: boolean;
  id: number;
  certificate_number: string;
  student: {
    name: string | null;
    first_name: string | null;
    last_name: string | null;
    middle_name: string | null;
    mother_name: string | null;
    dob: string | null;
    photo: string | null;
  };
  course: {
    name: string | null;
    duration: string | null;
    period: string | null;
    course_type: number;
    exam_format: string[];
  } | null;
  institute: {
    name: string | null;
  };
  batch: {
    name: string | null;
  };
  marks: {
    type: string;
    percentage: string | null;
    grade: string | null;
    total_marks?: number;
    obtained_marks?: number;
    objective_max?: number;
    objective_obtained?: number;
    practical_max?: number;
    practical_obtained?: number;
    course_subjects?: string[];
    semesters?: Array<{
      name: string;
      is_completed: boolean;
      subjects: Array<{
        name: string | null;
        max_marks: number | null;
        obtained_marks: number | null;
        practical_max: number | null;
        practical_obtained: number | null;
      }>;
    }>;
  };
  grades: Array<{
    name: string;
    performance: string;
    start_percentage: number;
    end_percentage: number;
  }>;
}

function gradeColor(name: string) {
  const map: Record<string, { bg: string; text: string; ring: string }> = {
    "A+": { bg: "bg-emerald-500", text: "text-emerald-600", ring: "ring-emerald-200" },
    A: { bg: "bg-green-500", text: "text-green-600", ring: "ring-green-200" },
    "B+": { bg: "bg-blue-500", text: "text-blue-600", ring: "ring-blue-200" },
    B: { bg: "bg-sky-500", text: "text-sky-600", ring: "ring-sky-200" },
    C: { bg: "bg-amber-500", text: "text-amber-600", ring: "ring-amber-200" },
    D: { bg: "bg-orange-500", text: "text-orange-600", ring: "ring-orange-200" },
    E: { bg: "bg-red-500", text: "text-red-600", ring: "ring-red-200" },
  };
  return map[name] ?? { bg: "bg-gray-500", text: "text-gray-600", ring: "ring-gray-200" };
}

function strokeColor(pct: number) {
  if (pct >= 85) return "#10b981";
  if (pct >= 70) return "#3b82f6";
  if (pct >= 55) return "#f59e0b";
  return "#ef4444";
}

/* ═══════════════════════════════════════════════════════════════════════ */
export default function MarksheetResult({ data }: { data: MarksheetVerificationData }) {
  const studentName =
    data.student?.name ||
    [data.student?.first_name, data.student?.last_name].filter(Boolean).join(" ") ||
    "N/A";
  const initial = studentName.charAt(0).toUpperCase();
  const pct = data.marks?.percentage ? parseFloat(data.marks.percentage) : 0;
  const grade = data.marks?.grade ?? "N/A";
  const hasObj = data.course?.exam_format?.includes("objective_marks");
  const hasPrac = data.course?.exam_format?.includes("practical_marks");
  const gc = gradeColor(grade);

  return (
    <div className="max-w-5xl mx-auto space-y-5">

      {/* ══════ VERIFIED BANNER ══════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-[1px]">
        <div className="rounded-2xl bg-white/95 backdrop-blur-sm px-5 py-4 sm:px-7 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent leading-tight">
                {data.institute?.name ?? "Institute"}
              </h1>
              <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Verified Examination Record
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold leading-none">Certificate</p>
              <p className="text-sm font-bold text-gray-800 tracking-wide">{data.certificate_number}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ STUDENT CARD ══════ */}
      <div className="rounded-2xl bg-white shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">

        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Photo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity" />
                {data.student?.photo ? (
                  <img
                    src={data.student.photo}
                    alt={studentName}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-white shadow-lg"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-white shadow-lg flex items-center justify-center">
                    <span className="text-3xl font-black text-indigo-500">{initial}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">{studentName}</h2>
                {data.course?.name && (
                  <p className="text-sm sm:text-base text-gray-500 font-medium mt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>
                    {data.course.name}
                    {data.course?.duration && (
                      <span className="text-gray-300">|</span>
                    )}
                    {data.course?.duration && (
                      <span className="text-gray-400">{data.course.duration}</span>
                    )}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                <Tag color="indigo" label={`ID: ${data.id}`} />
                {data.student?.dob && <Tag color="purple" label={`DOB: ${data.student.dob}`} />}
                {data.batch?.name && <Tag color="emerald" label={`Batch: ${data.batch.name}`} />}
              </div>

              {/* Family + Period */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <InfoTile icon="👤" label="Father / Husband" value={data.student?.middle_name || "Not provided"} />
                <InfoTile icon="👩" label="Mother" value={data.student?.mother_name || "Not provided"} />
                {data.course?.period && <InfoTile icon="📅" label="Course Period" value={data.course.period} />}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SCORE HIGHLIGHT ═══ */}
        <div className="mx-5 sm:mx-7 lg:mx-8 mb-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/80 border border-blue-100/80 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Circle */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
                <circle
                  cx="18" cy="18" r="15.9155" fill="none"
                  stroke={strokeColor(pct)} strokeWidth="2.5"
                  strokeDasharray={`${pct} ${100 - pct}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">{pct.toFixed(1)}<span className="text-base font-bold text-gray-400">%</span></span>
              </div>
            </div>

            {/* Grade + Stats */}
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Grade</span>
                <span className={`${gc.bg} text-white text-xl font-black px-5 py-1.5 rounded-xl shadow-lg`}>
                  {grade}
                </span>
              </div>
              {data.marks?.type === "single" && (
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-gray-900">{data.marks.obtained_marks ?? 0}</span>
                  <span className="text-lg text-gray-400 font-semibold">/ {data.marks.total_marks ?? 0} marks</span>
                </div>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Examination Completed
              </span>
            </div>

            {/* Theory / Practical cards (single course) */}
            {data.marks?.type === "single" && (hasObj || hasPrac) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full sm:w-auto">
                {hasObj && (
                  <MiniScoreCard
                    label="Theory"
                    scored={data.marks.objective_obtained ?? 0}
                    max={data.marks.objective_max ?? 0}
                    color="blue"
                  />
                )}
                {hasPrac && (
                  <MiniScoreCard
                    label="Practical"
                    scored={data.marks.practical_obtained ?? 0}
                    max={data.marks.practical_max ?? 0}
                    color="green"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* ═══ SEMESTERS / SUBJECTS ═══ */}
        <div className="px-5 sm:px-7 lg:px-8 pb-6 space-y-6">

          {data.marks?.type === "semester" && data.marks.semesters?.map((sem, i) => (
            <div key={i} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{sem.name}</h3>
                {sem.is_completed ? (
                  <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">Completed</span>
                ) : (
                  <span className="ml-auto text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">In Progress</span>
                )}
              </div>

              {sem.is_completed ? (
                <SubjectsTable subjects={sem.subjects} hasObj={!!hasObj} hasPrac={!!hasPrac} />
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                  Results for <strong>{sem.name}</strong> will be available after completion of all examinations.
                </div>
              )}
            </div>
          ))}

          {data.marks?.type === "single" && data.marks.course_subjects && data.marks.course_subjects.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                Course Subjects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {data.marks.course_subjects.map((sub, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 rounded-xl transition-all">
                    <span className="w-7 h-7 rounded-lg bg-indigo-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{idx + 1}</span>
                    <span className="text-sm font-medium text-gray-700">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grading System */}
          {data.grades?.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                Grading System
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {data.grades.map((g, i) => {
                  const c = gradeColor(g.name);
                  return (
                    <div key={i} className={`flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow ring-1 ${c.ring}`}>
                      <span className={`w-9 h-9 rounded-full ${c.bg} text-white text-sm font-black flex items-center justify-center shadow`}>{g.name}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{g.performance}</p>
                        <p className="text-[11px] text-gray-400 font-medium">{g.start_percentage}% – {g.end_percentage}%</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50/80 px-5 sm:px-7 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            Digitally verified through DITRP India
          </p>
          <p className="text-xs text-gray-400">
            <span className="font-semibold text-indigo-500">ditrpindia.org</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Reusable pieces ─── */

function Tag({ color, label }: { color: string; label: string }) {
  const styles: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${styles[color] ?? styles.indigo}`}>
      {label}
    </span>
  );
}

function InfoTile({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{icon} {label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  );
}

function MiniScoreCard({ label, scored, max, color }: { label: string; scored: number; max: number; color: "blue" | "green" }) {
  const pct = max > 0 ? (scored / max) * 100 : 0;
  const barColor = color === "blue" ? "bg-blue-500" : "bg-emerald-500";
  const bgColor = color === "blue" ? "bg-blue-50 border-blue-100" : "bg-emerald-50 border-emerald-100";
  const textColor = color === "blue" ? "text-blue-600" : "text-emerald-600";
  return (
    <div className={`p-3.5 rounded-xl border ${bgColor}`}>
      <p className={`text-[11px] font-bold uppercase tracking-wide ${textColor} mb-1`}>{label}</p>
      <p className="text-xl font-black text-gray-900">{scored}<span className="text-sm text-gray-400 font-semibold">/{max}</span></p>
      <div className="mt-2 h-1.5 bg-white rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function SubjectsTable({
  subjects,
  hasObj,
  hasPrac,
}: {
  subjects: Array<{ name: string | null; max_marks: number | null; obtained_marks: number | null; practical_max: number | null; practical_obtained: number | null }>;
  hasObj: boolean;
  hasPrac: boolean;
}) {
  const valid = subjects.filter((s) => s.name || s.max_marks || s.obtained_marks || s.practical_max || s.practical_obtained);
  if (valid.length === 0) return null;

  let tObjMax = 0, tObjScored = 0, tPracMax = 0, tPracScored = 0;
  valid.forEach((s) => {
    tObjMax += s.max_marks ?? 0;
    tObjScored += s.obtained_marks ?? 0;
    tPracMax += s.practical_max ?? 0;
    tPracScored += s.practical_obtained ?? 0;
  });

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <th className="text-left px-4 py-3 font-semibold">Subject</th>
              {hasObj && <th className="text-center px-4 py-3 font-semibold">Theory</th>}
              {hasPrac && <th className="text-center px-4 py-3 font-semibold">Practical</th>}
              <th className="text-center px-4 py-3 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {valid.map((s, i) => {
              const oM = s.max_marks ?? 0, oS = s.obtained_marks ?? 0;
              const pM = s.practical_max ?? 0, pS = s.practical_obtained ?? 0;
              const total = oS + pS, totalMax = oM + pM;
              return (
                <tr key={i} className={`border-t border-gray-100 transition-colors hover:bg-indigo-50/40 ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <span className="font-medium text-gray-800">{s.name || `Subject ${i + 1}`}</span>
                    </div>
                  </td>
                  {hasObj && (
                    <td className="text-center px-4 py-3">
                      <span className="font-semibold text-gray-700">{oS}</span>
                      <span className="text-gray-400">/{oM}</span>
                      <BarMini pct={oM > 0 ? (oS / oM) * 100 : 0} color="bg-blue-500" />
                    </td>
                  )}
                  {hasPrac && (
                    <td className="text-center px-4 py-3">
                      <span className="font-semibold text-gray-700">{pS}</span>
                      <span className="text-gray-400">/{pM}</span>
                      <BarMini pct={pM > 0 ? (pS / pM) * 100 : 0} color="bg-emerald-500" />
                    </td>
                  )}
                  <td className="text-center px-4 py-3">
                    <span className="font-bold text-gray-900">{total}</span>
                    <span className="text-gray-400">/{totalMax}</span>
                    <BarMini pct={totalMax > 0 ? (total / totalMax) * 100 : 0} color="bg-purple-500" />
                  </td>
                </tr>
              );
            })}
            <tr className="bg-gray-100 font-bold border-t-2 border-gray-200">
              <td className="px-4 py-3 text-gray-900">Total</td>
              {hasObj && <td className="text-center px-4 py-3 text-gray-900">{tObjScored}/{tObjMax}</td>}
              {hasPrac && <td className="text-center px-4 py-3 text-gray-900">{tPracScored}/{tPracMax}</td>}
              <td className="text-center px-4 py-3 text-gray-900">{tObjScored + tPracScored}/{tObjMax + tPracMax}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BarMini({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto max-w-[80px]">
      <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  );
}
