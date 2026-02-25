"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FiX, FiSend, FiUser, FiMail, FiPhone, FiMapPin,
  FiHash, FiMessageSquare, FiCheckCircle,
} from "react-icons/fi";

interface EnquiryFormData {
  centerName: string;
  email: string;
  mobile: string;
  state: string;
  city: string;
  pincode: string;
  remark: string;
}

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

/* Shared input class */
const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 outline-none transition-all duration-200 text-sm";

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, productName }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<EnquiryFormData>();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSubmit = async (data: EnquiryFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Enquiry submitted:", { ...data, product: productName });
    reset();
    setTimeout(onClose, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop — dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal container with animated gradient border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg z-10"
          >
            {/* Outer glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 opacity-20 blur-lg" />

            {/* Gradient border wrapper */}
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500">
              <div className="rounded-3xl bg-white dark:bg-gray-900 overflow-hidden">
                {/* ── Header ── */}
                <div className="relative px-6 pt-6 pb-5 overflow-hidden">
                  {/* Mesh bg in header */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600" />
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
                  </div>

                  {/* Content */}
                  <div className="relative flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <FiSend className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Enquiry Form</h3>
                      </div>
                      <p className="text-white/70 text-sm">
                        Interested in{" "}
                        <span className="font-semibold text-white bg-white/10 px-2 py-0.5 rounded-md">
                          {productName}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors text-white"
                      aria-label="Close"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* ── Success state ── */}
                {isSubmitSuccessful ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Thank You!
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Your enquiry has been submitted. We&apos;ll get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 space-y-4 max-h-[62vh] overflow-y-auto"
                  >
                    {/* Center Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <FiUser className="w-3.5 h-3.5 text-primary-500" />
                        Center Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter center name"
                        {...register("centerName", { required: "Center name is required" })}
                        className={inputCls}
                      />
                      {errors.centerName && (
                        <p className="text-red-500 text-xs mt-1">{errors.centerName.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <FiMail className="w-3.5 h-3.5 text-primary-500" />
                        Email Id <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                          },
                        })}
                        className={inputCls}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <FiPhone className="w-3.5 h-3.5 text-primary-500" />
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter mobile number"
                        {...register("mobile", {
                          required: "Mobile number is required",
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: "Enter a valid 10-digit mobile number",
                          },
                        })}
                        className={inputCls}
                      />
                      {errors.mobile && (
                        <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>
                      )}
                    </div>

                    {/* State & City — side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                          <FiMapPin className="w-3.5 h-3.5 text-primary-500" />
                          State
                        </label>
                        <select {...register("state")} className={inputCls}>
                          <option value="">Select state</option>
                          {indianStates.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                          <FiMapPin className="w-3.5 h-3.5 text-primary-500" />
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="Enter city"
                          {...register("city")}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <FiHash className="w-3.5 h-3.5 text-primary-500" />
                        Pincode
                      </label>
                      <input
                        type="text"
                        placeholder="Enter pincode"
                        {...register("pincode", {
                          pattern: {
                            value: /^\d{6}$/,
                            message: "Enter a valid 6-digit pincode",
                          },
                        })}
                        className={inputCls}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>
                      )}
                    </div>

                    {/* Remark */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <FiMessageSquare className="w-3.5 h-3.5 text-primary-500" />
                        Remark
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Any additional message..."
                        {...register("remark")}
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    {/* Submit button — gradient with glow */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full mt-2 overflow-hidden rounded-xl py-3.5 text-sm font-bold text-white shadow-lg disabled:opacity-60 disabled:cursor-wait group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600" />
                      {/* Shimmer */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </div>
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <FiSend className="w-4 h-4" />
                            Submit Enquiry
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
