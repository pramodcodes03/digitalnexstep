"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiShield,
  FiSearch,
} from "react-icons/fi";
import Container from "@/components/ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";
import CertificateResult, { type VerificationData } from "@/components/verification/CertificateResult";
import AtcResult, { type AtcVerificationData } from "@/components/verification/AtcResult";

type VerificationType = "student" | "atc";

const VerificationSection: React.FC = () => {
  const { data: apiSections } = useApi(() => api.getPageSections("verification"), [] as any[]);
  const heroData = apiSections.find((s: any) => s.section_key === "verification_hero");

  const [activeTab, setActiveTab] = useState<VerificationType>("student");
  const [formData, setFormData] = useState({
    certificateNumber: "",
    atcCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationData | null>(null);
  const [atcResult, setAtcResult] = useState<AtcVerificationData | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const clearResults = () => {
    setVerificationResult(null);
    setAtcResult(null);
    setVerificationError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    clearResults();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearResults();

    try {
      switch (activeTab) {
        case "student": {
          const { data } = await api.verifyStudent(formData.certificateNumber.trim());
          setVerificationResult(data);
          break;
        }
        case "atc": {
          const { data } = await api.verifyAtc(formData.atcCode.trim());
          setAtcResult(data);
          break;
        }
      }
    } catch (err: any) {
      const status = err?.response?.status;
      const notFoundMessages: Record<VerificationType, string> = {
        student: "No student found with this certificate number. Please check and try again.",
        atc: "No ATC found with this code. Please check and try again.",
      };
      if (status === 404) {
        setVerificationError(notFoundMessages[activeTab]);
      } else {
        setVerificationError("Verification service is currently unavailable. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs: {
    id: VerificationType;
    label: string;
    icon: typeof FiUser;
    description: string;
    color: string;
    lightBg: string;
    inputName: string;
    inputLabel: string;
    placeholder: string;
  }[] = [
    {
      id: "student",
      label: "Student",
      icon: FiUser,
      description: "Verify student certificates",
      color: "from-blue-500 to-indigo-600",
      lightBg: "bg-blue-50 dark:bg-blue-900/20",
      inputName: "certificateNumber",
      inputLabel: "Student ID / Admission ID",
      placeholder: "Enter your Student / Admission ID",
    },
    {
      id: "atc",
      label: "ATC",
      icon: FiShield,
      description: "Verify Training Center status",
      color: "from-orange-500 to-red-500",
      lightBg: "bg-orange-50 dark:bg-orange-900/20",
      inputName: "atcCode",
      inputLabel: "ATC Code",
      placeholder: "e.g., DNS-ATC-XXXXX",
    },
  ];

  const activeTabData = tabs.find((t) => t.id === activeTab)!;
  const inputValue = formData[activeTabData.inputName as keyof typeof formData];

  return (
    <section id="verification" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/40 to-indigo-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-blue-300/15 to-purple-300/15 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-orange-300/15 to-pink-300/15 dark:from-orange-600/10 dark:to-pink-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-5"
          >
            <FiShield className="w-4 h-4" />
            Verification Portal
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            {heroData?.title || "Verify Your"}{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {heroData?.subtitle || "Credentials"}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {heroData?.content || "Instantly verify student certificates and ATC status with our secure verification system."}
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-start sm:justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    clearResults();
                  }}
                  className={`relative flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl border-2 transition-all duration-300 ${isActive
                      ? "border-transparent shadow-xl scale-[1.02]"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="verificationActiveTabBg"
                      className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-2xl`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive
                          ? "bg-white/20"
                          : tab.lightBg
                        }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${isActive
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-400"
                          }`}
                      />
                    </div>
                    <div className="text-left">
                      <h3
                        className={`font-bold text-sm ${isActive ? "text-white" : "text-gray-900 dark:text-white"
                          }`}
                      >
                        {tab.label}
                      </h3>
                      <p
                        className={`text-xs hidden sm:block ${isActive
                            ? "text-white/80"
                            : "text-gray-500 dark:text-gray-400"
                          }`}
                      >
                        {tab.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Verification Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              {/* Accent Border */}
              <motion.div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${activeTabData.color}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />

              {/* Form Header */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${activeTabData.color} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <activeTabData.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activeTabData.label} Verification
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activeTabData.description}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {activeTabData.inputLabel}
                  </label>
                  <input
                    type="text"
                    name={activeTabData.inputName}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={activeTabData.placeholder}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-lg"
                    required
                  />
                </div>

                {/* Verify Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r ${activeTabData.color} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <FiSearch className="w-5 h-5" />
                      Verify Now
                    </>
                  )}
                </motion.button>
              </form>

              {/* Error State */}
              <AnimatePresence>
                {verificationError && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="mt-6 p-5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiSearch className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-red-800 dark:text-red-300">Verification Failed</h4>
                        <p className="text-sm text-red-600 dark:text-red-400">{verificationError}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {verificationResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto mt-8"
            >
              <CertificateResult data={verificationResult} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {atcResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto mt-8"
            >
              <AtcResult data={atcResult} />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default VerificationSection;
