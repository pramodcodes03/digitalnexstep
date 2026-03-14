"use client";

import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiGlobe,
  FiHash,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiUser,
} from "react-icons/fi";

/* ─── Types ─── */
export interface StaffVerificationData {
  verified: boolean;
  staff: {
    name: string | null;
    employee_id: string | null;
    mobile: string | null;
    department: string | null;
    designation: string | null;
    qualification: string | null;
    date_of_joining: string | null;
    is_active: boolean;
    address: string | null;
  };
  institute: {
    name: string | null;
    email: string | null;
    mobile: string | null;
    address: string | null;
  };
}

/* ─── Main component ─── */
export default function StaffResult({ data }: { data: StaffVerificationData }) {
  const initial = (data.staff?.name ?? "S").charAt(0).toUpperCase();
  const isActive = data.staff?.is_active ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-10 space-y-5"
    >
      {/* Verified Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg text-white ${
          isActive
            ? "bg-gradient-to-r from-teal-500 to-cyan-500"
            : "bg-gradient-to-r from-gray-500 to-gray-600"
        }`}
      >
        <FiCheckCircle className="w-6 h-6 flex-shrink-0" />
        <div>
          <p className="font-extrabold text-lg leading-tight">Staff Verified</p>
          <p className="text-sm text-white/80">
            {isActive
              ? "This staff member is currently active and verified."
              : "This staff member record was verified but is currently inactive."}
          </p>
        </div>
        <span className="ml-auto text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
          {isActive ? "Active" : "Inactive"}
        </span>
      </motion.div>

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500" />

        <div className="p-8 md:p-10 space-y-8">

          {/* Staff Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative w-[100px] h-[100px] flex-shrink-0"
            >
              <div
                className="absolute inset-[-4px] rounded-full animate-spin-slow z-0"
                style={{ background: "conic-gradient(from 0deg,#14b8a6,#06b6d4,#3b82f6,#14b8a6)" }}
              />
              <div className="relative z-10 w-[100px] h-[100px] rounded-full overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center"
                style={{ border: "3px solid white" }}>
                <span className="text-[2.5rem] font-black text-teal-600 dark:text-teal-400 leading-none select-none">{initial}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center sm:text-left"
            >
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-teal-600 dark:text-teal-400 mb-1">
                Staff Name
              </p>
              <h3 className="text-[1.8rem] font-black text-gray-900 dark:text-white tracking-[0.03em] mb-3 leading-tight">
                {(data.staff?.name ?? "N/A").toUpperCase()}
              </h3>
              {data.staff?.employee_id && (
                <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-xl px-4 py-2">
                  <FiHash className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-bold text-teal-800 dark:text-teal-300">{data.staff.employee_id}</span>
                </div>
              )}
            </motion.div>
          </div>

          <Divider />

          {/* Staff Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="space-y-4"
          >
            <SectionLabel>Staff Details</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoCard label="Department" value={data.staff?.department} icon={<FiBriefcase />} color="teal" />
              <InfoCard label="Designation" value={data.staff?.designation} icon={<FiUser />} color="cyan" />
              <InfoCard label="Qualification" value={data.staff?.qualification} icon={<FiShield />} color="blue" />
              <InfoCard label="Date of Joining" value={data.staff?.date_of_joining} icon={<FiCalendar />} color="violet" />
            </div>
          </motion.div>

          {/* Contact */}
          {(data.staff?.mobile || data.staff?.address) && (
            <>
              <Divider />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-4"
              >
                <SectionLabel>Contact Information</SectionLabel>
                <div className="bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden">
                  {data.staff?.mobile && (
                    <ContactRow
                      icon={<FiPhone className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                      iconBg="bg-teal-100 dark:bg-teal-900/40"
                      label="Mobile"
                      value={data.staff.mobile}
                    />
                  )}
                  {data.staff?.address && (
                    <ContactRow
                      icon={<FiMapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />}
                      iconBg="bg-orange-100 dark:bg-orange-900/40"
                      label="Address"
                      value={data.staff.address}
                      isLast
                    />
                  )}
                </div>
              </motion.div>
            </>
          )}

          {/* Institute */}
          {data.institute?.name && (
            <>
              <Divider />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="space-y-4"
              >
                <SectionLabel>Institute Details</SectionLabel>
                <div className="bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-b border-gray-200 dark:border-gray-600 px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-[46px] h-[46px] bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                        <FiGlobe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black tracking-[0.16em] uppercase text-teal-600 dark:text-teal-400 mb-1">Institute</p>
                        <p className="text-[1.05rem] font-black text-gray-900 dark:text-white leading-tight">
                          {data.institute.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  {data.institute?.email && (
                    <ContactRow
                      icon={<FiMail className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                      iconBg="bg-blue-100 dark:bg-blue-900/40"
                      label="Email"
                      value={data.institute.email}
                    />
                  )}
                  {data.institute?.mobile && (
                    <ContactRow
                      icon={<FiPhone className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                      iconBg="bg-teal-100 dark:bg-teal-900/40"
                      label="Contact"
                      value={data.institute.mobile}
                    />
                  )}
                  {data.institute?.address && (
                    <ContactRow
                      icon={<FiMapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />}
                      iconBg="bg-orange-100 dark:bg-orange-900/40"
                      label="Address"
                      value={data.institute.address}
                      isLast
                    />
                  )}
                </div>
              </motion.div>
            </>
          )}

          <p className="text-center text-[10px] font-bold tracking-[0.12em] uppercase text-gray-300 dark:text-gray-600">
            Online Staff Verification ·{" "}
            <span className="text-teal-500">www.ditrpindia.org</span>
          </p>
        </div>
      </div>
    </motion.div>
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

function Divider() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        <span className="w-[7px] h-[7px] rounded-full inline-block" style={{ background: "#14b8a6" }} />
        <span className="w-[7px] h-[7px] rounded-full inline-block" style={{ background: "#06b6d4" }} />
      </div>
      <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent rounded-full" />
    </div>
  );
}

const statColors = {
  teal:   { label: "text-teal-600 dark:text-teal-400",     value: "text-teal-800 dark:text-teal-300" },
  cyan:   { label: "text-cyan-600 dark:text-cyan-400",     value: "text-cyan-800 dark:text-cyan-300" },
  blue:   { label: "text-blue-600 dark:text-blue-400",     value: "text-blue-800 dark:text-blue-300" },
  violet: { label: "text-violet-600 dark:text-violet-400", value: "text-violet-800 dark:text-violet-300" },
} as const;

function InfoCard({
  label, value, icon, color,
}: {
  label: string;
  value: string | null | undefined;
  icon: React.ReactNode;
  color: keyof typeof statColors;
}) {
  const c = statColors[color];
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg cursor-default">
      <p className={`text-[10px] font-black tracking-[0.13em] uppercase ${c.label} flex items-center gap-1.5 mb-2`}>
        <span className="w-3 h-3">{icon}</span>
        {label}
      </p>
      <p className={`text-base font-bold ${c.value} leading-snug`}>{value ?? "N/A"}</p>
    </div>
  );
}

function ContactRow({
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
