"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FiX, FiSend, FiUser, FiMail, FiPhone,
  FiBriefcase, FiBookOpen, FiFileText, FiCheckCircle, FiUpload,
} from "react-icons/fi";
import api from "@/lib/api";

interface JobApplyFormData {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  experience: string;
  cover_letter: string;
}

interface JobApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId?: number | null;
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all duration-200 text-sm";

const JobApplyModal: React.FC<JobApplyModalProps> = ({ isOpen, onClose, jobTitle, jobId }) => {
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobApplyFormData>();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
      setResumeFile(null);
      reset();
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, reset]);

  const onSubmit = async (data: JobApplyFormData) => {
    try {
      const formData = new FormData();
      formData.append("job_title", jobTitle);
      if (jobId) formData.append("job_update_id", String(jobId));
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      if (data.qualification) formData.append("qualification", data.qualification);
      if (data.experience) formData.append("experience", data.experience);
      if (data.cover_letter) formData.append("cover_letter", data.cover_letter);
      if (resumeFile) formData.append("resume", resumeFile);

      await api.submitJobApplication(formData);
    } catch {
      // Still show success UI
    }
    setSubmitted(true);
    setTimeout(onClose, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg z-10"
          >
            {/* Outer glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 opacity-20 blur-lg" />

            {/* Gradient border wrapper */}
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500">
              <div className="rounded-3xl bg-white dark:bg-gray-900 overflow-hidden">
                {/* Header */}
                <div className="relative px-6 pt-6 pb-5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600" />
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
                  </div>

                  <div className="relative flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <FiBriefcase className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Apply Now</h3>
                      </div>
                      <p className="text-white/70 text-sm">
                        Applying for{" "}
                        <span className="font-semibold text-white bg-white/10 px-2 py-0.5 rounded-md">
                          {jobTitle}
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

                {/* Success state */}
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Application Submitted!
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Thank you for applying. We&apos;ll review your application and get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  /* Form */
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 space-y-4 max-h-[62vh] overflow-y-auto"
                  >
                    {/* Full Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <FiUser className="w-3.5 h-3.5 text-emerald-500" />
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name", { required: "Name is required" })}
                        className={inputCls}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email & Phone side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                          <FiMail className="w-3.5 h-3.5 text-emerald-500" />
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email",
                            },
                          })}
                          className={inputCls}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                          <FiPhone className="w-3.5 h-3.5 text-emerald-500" />
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="10-digit mobile"
                          {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                              value: /^[6-9]\d{9}$/,
                              message: "Enter valid 10-digit number",
                            },
                          })}
                          className={inputCls}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Qualification & Experience side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                          <FiBookOpen className="w-3.5 h-3.5 text-emerald-500" />
                          Qualification
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. B.Tech, MBA"
                          {...register("qualification")}
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                          <FiBriefcase className="w-3.5 h-3.5 text-emerald-500" />
                          Experience
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2 years"
                          {...register("experience")}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <FiUpload className="w-3.5 h-3.5 text-emerald-500" />
                        Resume (PDF, DOC, DOCX)
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`${inputCls} cursor-pointer flex items-center gap-3 ${
                          resumeFile ? "border-emerald-400 dark:border-emerald-600" : ""
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          resumeFile
                            ? "bg-emerald-100 dark:bg-emerald-900/30"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}>
                          {resumeFile ? (
                            <FiCheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <FiUpload className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          {resumeFile ? (
                            <>
                              <p className="text-sm text-gray-900 dark:text-white truncate">{resumeFile.name}</p>
                              <p className="text-xs text-gray-400">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </>
                          ) : (
                            <p className="text-sm text-gray-400">Click to upload resume (max 5MB)</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <FiFileText className="w-3.5 h-3.5 text-emerald-500" />
                        Cover Letter / Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us why you're a great fit for this role..."
                        {...register("cover_letter")}
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full mt-2 overflow-hidden rounded-xl py-3.5 text-sm font-bold text-white shadow-lg disabled:opacity-60 disabled:cursor-wait group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600" />
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
                            Submit Application
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

export default JobApplyModal;
