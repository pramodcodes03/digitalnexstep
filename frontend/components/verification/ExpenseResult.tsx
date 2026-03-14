"use client";

import { motion } from "framer-motion";
import {
  FiCalendar,
  FiCheckCircle,
  FiCreditCard,
  FiDollarSign,
  FiFileText,
  FiHash,
  FiShield,
  FiUser,
} from "react-icons/fi";

/* ─── Types ─── */
export interface ExpenseVerificationData {
  verified: boolean;
  expense: {
    receipt_number: string | null;
    receiver_name: string | null;
    issue_person_name: string | null;
    amount: string | number | null;
    payment_mode: string | null;
    date: string | null;
    gst_number: string | null;
    remark: string | null;
    type: string | null;
    sub_type: string | null;
  };
}

/* ─── Main component ─── */
export default function ExpenseResult({ data }: { data: ExpenseVerificationData }) {
  const amount = data.expense?.amount;
  const formattedAmount = amount != null
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(Number(amount))
    : "N/A";

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
        className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg text-white"
      >
        <FiCheckCircle className="w-6 h-6 flex-shrink-0" />
        <div>
          <p className="font-extrabold text-lg leading-tight">Expense Receipt Verified</p>
          <p className="text-sm text-white/80">This expense receipt has been verified and is authentic.</p>
        </div>
        {data.expense?.receipt_number && (
          <span className="ml-auto text-sm font-bold bg-white/20 px-3 py-1 rounded-full hidden sm:inline-block">
            {data.expense.receipt_number}
          </span>
        )}
      </motion.div>

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

        <div className="p-8 md:p-10 space-y-8">

          {/* Amount highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400 mb-2">
              Amount
            </p>
            <p className="text-[3rem] font-black text-gray-900 dark:text-white leading-none mb-2">
              {formattedAmount}
            </p>
            {data.expense?.payment_mode && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-full text-sm font-bold text-amber-700 dark:text-amber-400">
                <FiCreditCard className="w-3.5 h-3.5" />
                {data.expense.payment_mode}
              </span>
            )}
          </motion.div>

          <Divider />

          {/* Receipt Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4"
          >
            <SectionLabel>Receipt Details</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoCard label="Receipt Number" value={data.expense?.receipt_number} icon={<FiHash />} color="amber" />
              <InfoCard label="Date" value={data.expense?.date} icon={<FiCalendar />} color="orange" />
              <InfoCard label="Receiver Name" value={data.expense?.receiver_name} icon={<FiUser />} color="rose" />
              <InfoCard label="Issued By" value={data.expense?.issue_person_name} icon={<FiUser />} color="amber" />
            </div>
          </motion.div>

          {/* Category Details */}
          {(data.expense?.type || data.expense?.sub_type) && (
            <>
              <Divider />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="space-y-4"
              >
                <SectionLabel>Category</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.expense.type && (
                    <InfoCard label="Expense Type" value={data.expense.type} icon={<FiFileText />} color="orange" />
                  )}
                  {data.expense.sub_type && (
                    <InfoCard label="Sub Type" value={data.expense.sub_type} icon={<FiFileText />} color="rose" />
                  )}
                </div>
              </motion.div>
            </>
          )}

          {/* Additional Info */}
          {(data.expense?.gst_number || data.expense?.remark) && (
            <>
              <Divider />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-4"
              >
                <SectionLabel>Additional Information</SectionLabel>
                <div className="bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden">
                  {data.expense?.gst_number && (
                    <DetailRow
                      icon={<FiShield className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                      iconBg="bg-amber-100 dark:bg-amber-900/40"
                      label="GST Number"
                      value={data.expense.gst_number}
                    />
                  )}
                  {data.expense?.remark && (
                    <DetailRow
                      icon={<FiFileText className="w-4 h-4 text-orange-600 dark:text-orange-400" />}
                      iconBg="bg-orange-100 dark:bg-orange-900/40"
                      label="Remark"
                      value={data.expense.remark}
                      isLast
                    />
                  )}
                </div>
              </motion.div>
            </>
          )}

          <p className="text-center text-[10px] font-bold tracking-[0.12em] uppercase text-gray-300 dark:text-gray-600">
            Online Expense Verification ·{" "}
            <span className="text-amber-500">www.ditrpindia.org</span>
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
        <span className="w-[7px] h-[7px] rounded-full inline-block" style={{ background: "#f59e0b" }} />
        <span className="w-[7px] h-[7px] rounded-full inline-block" style={{ background: "#f97316" }} />
      </div>
      <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent rounded-full" />
    </div>
  );
}

const statColors = {
  amber:  { label: "text-amber-600 dark:text-amber-400",   value: "text-amber-800 dark:text-amber-300" },
  orange: { label: "text-orange-600 dark:text-orange-400", value: "text-orange-800 dark:text-orange-300" },
  rose:   { label: "text-rose-600 dark:text-rose-400",     value: "text-rose-800 dark:text-rose-300" },
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

function DetailRow({
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
