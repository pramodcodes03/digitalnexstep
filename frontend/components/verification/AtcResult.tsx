"use client";

import { motion } from "framer-motion";
import {
  FiAward,
  FiCalendar,
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiUser,
} from "react-icons/fi";

/* ─── Types ─── */
export interface AtcVerificationData {
  verified: boolean;
  atc_code: string;
  center: {
    name: string | null;
    owner_name: string | null;
    designation: string | null;
    date_of_issue: string | null;
    date_of_renewal: string | null;
    status: string | null;
    is_verified: boolean;
    logo: string | null;
  };
  contact: {
    address: string | null;
    email: string | null;
    mobile: string | null;
    state: string | null;
    city: string | null;
    pincode: string | null;
  };
}

/* ─── Sub-components ─── */
const statColors = {
  blue:    { label: "text-blue-600 dark:text-blue-400",    value: "text-blue-800 dark:text-blue-300" },
  orange:  { label: "text-orange-600 dark:text-orange-400", value: "text-orange-800 dark:text-orange-300" },
  emerald: { label: "text-emerald-600 dark:text-emerald-400", value: "text-emerald-800 dark:text-emerald-300" },
  violet:  { label: "text-violet-600 dark:text-violet-400",  value: "text-violet-800 dark:text-violet-300" },
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

/* ─── Main component ─── */
export default function AtcResult({ data }: { data: AtcVerificationData }) {
  const initial = (data.center?.name ?? "A").charAt(0).toUpperCase();
  const fullAddress = [
    data.contact?.address,
    data.contact?.city,
    data.contact?.state,
    data.contact?.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-10"
    >
      {/* Verified Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-6 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-lg text-white"
      >
        <FiCheckCircle className="w-6 h-6 flex-shrink-0" />
        <div>
          <p className="font-extrabold text-lg leading-tight">ATC Verified</p>
          <p className="text-sm text-white/80">This Authorized Training Center is registered and valid.</p>
        </div>
        <span className="ml-auto text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
          {data.atc_code}
        </span>
      </motion.div>

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

        <div className="p-8 md:p-10">
          {/* Center identity */}
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg flex-shrink-0">
              {data.center?.logo ? (
                <img src={data.center.logo} alt="logo" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                initial
              )}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {data.center?.name ?? "Unknown Center"}
              </h2>
              {fullAddress && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <FiMapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  {fullAddress}
                </p>
              )}
              <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                <FiShield className="w-3 h-3" />
                Authorized Training Center
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <InfoCard label="ATC Code"       value={data.atc_code}                  icon={<FiAward />}    color="orange" />
            <InfoCard label="Applicant Name" value={data.center?.owner_name}        icon={<FiUser />}     color="blue"   />
            <InfoCard label="Date Issued"    value={data.center?.date_of_issue}     icon={<FiCalendar />} color="violet" />
            <InfoCard label="Valid Until"    value={data.center?.date_of_renewal}   icon={<FiCalendar />} color="emerald" />
          </div>

          {/* Divider */}
          <div className="relative flex items-center mb-8">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent" />
            <div className="mx-4 w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-600" />
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent" />
          </div>

          {/* Two-col detail section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Certification Type */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/40">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Certification Type</p>
              <p className="text-base font-bold text-gray-800 dark:text-gray-100">Authorized Training Center (ATC)</p>
              {data.center?.designation && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{data.center.designation}</p>
              )}
            </div>

            {/* Verification Status */}
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6 bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">Verification Status</p>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 text-white font-bold text-base shadow-lg">
                  <FiCheckCircle className="w-5 h-5" />
                  Valid
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          {(data.contact?.email || data.contact?.mobile) && (
            <div className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/40">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Contact Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.contact.email && (
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</p>
                      <p className="text-sm font-medium">{data.contact.email}</p>
                    </div>
                  </div>
                )}
                {data.contact.mobile && (
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Contact</p>
                      <p className="text-sm font-medium">{data.contact.mobile}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
