"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiShield,
  FiSearch,
  FiCheckCircle,
  FiMapPin,
  FiPhone,
  FiMail,
  FiArrowRight,
  FiExternalLink,
  FiAward,
  FiGlobe,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

/* ─── Types ─── */
type VerificationType = "student" | "atc";

/* ─── Branch Data ─── */
const branches = [
  {
    name: "Delhi (Head Office)",
    address: "123, Connaught Place, New Delhi - 110001",
    phone: "+91 11-2345-6789",
    email: "delhi@digitalnexstep.com",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Mumbai",
    address: "456, Bandra West, Mumbai - 400050",
    phone: "+91 22-3456-7890",
    email: "mumbai@digitalnexstep.com",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Bangalore",
    address: "789, Koramangala, Bangalore - 560034",
    phone: "+91 80-4567-8901",
    email: "bangalore@digitalnexstep.com",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Hyderabad",
    address: "321, HITEC City, Hyderabad - 500081",
    phone: "+91 40-5678-9012",
    email: "hyderabad@digitalnexstep.com",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Chennai",
    address: "654, Anna Nagar, Chennai - 600040",
    phone: "+91 44-6789-0123",
    email: "chennai@digitalnexstep.com",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Kolkata",
    address: "987, Salt Lake City, Kolkata - 700091",
    phone: "+91 33-7890-1234",
    email: "kolkata@digitalnexstep.com",
    color: "from-rose-500 to-pink-600",
  },
];

/* ─── Main Page ─── */
export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState<VerificationType>("student");
  const [formData, setFormData] = useState({
    name: "",
    registrationId: "",
    email: "",
    phone: "",
    centerName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate verification
    setTimeout(() => {
      setIsSubmitting(false);
      setIsVerified(true);
      setTimeout(() => setIsVerified(false), 5000);
    }, 2000);
  };

  const tabs = [
    {
      id: "student" as VerificationType,
      label: "Student Verification",
      icon: FiUser,
      description: "Verify your student credentials and certificates",
      color: "from-blue-500 to-indigo-600",
      lightBg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: "atc" as VerificationType,
      label: "ATC Verification",
      icon: FiShield,
      description: "Verify Authorized Training Center status",
      color: "from-orange-500 to-red-500",
      lightBg: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  const activeTabData = tabs.find((t) => t.id === activeTab)!;

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 bg-gradient-to-br from-gray-50 via-blue-50/40 to-indigo-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
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
          <div
            className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <Container className="relative z-10">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-5"
            >
              <FiShield className="w-4 h-4" />
              Verification Portal
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              Verify Your{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Credentials
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Instantly verify student certificates and Authorized Training Center
              (ATC) status with our secure verification system.
            </p>
          </motion.div>

          {/* Tab Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-2xl mx-auto"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsVerified(false);
                  }}
                  className={`relative flex-1 flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                    isActive
                      ? "border-transparent shadow-xl scale-[1.02]"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-2xl`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isActive
                          ? "bg-white/20"
                          : tab.lightBg
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isActive
                            ? "text-white"
                            : tab.id === "student"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-orange-600 dark:text-orange-400"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-bold text-lg ${
                          isActive ? "text-white" : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {tab.label}
                      </h3>
                      <p
                        className={`text-sm ${
                          isActive
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
                    {activeTab === "student" ? (
                      <FiUser className="w-6 h-6 text-white" />
                    ) : (
                      <FiShield className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {activeTab === "student"
                        ? "Student Verification"
                        : "ATC Verification"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activeTab === "student"
                        ? "Enter your details to verify your certificate"
                        : "Enter your center details to verify ATC status"}
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {activeTab === "student" ? "Full Name" : "Center Name"}
                      </label>
                      <input
                        type="text"
                        name={activeTab === "student" ? "name" : "centerName"}
                        value={
                          activeTab === "student"
                            ? formData.name
                            : formData.centerName
                        }
                        onChange={handleInputChange}
                        placeholder={
                          activeTab === "student"
                            ? "Enter your full name"
                            : "Enter center name"
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {activeTab === "student"
                          ? "Registration ID"
                          : "ATC License Number"}
                      </label>
                      <input
                        type="text"
                        name="registrationId"
                        value={formData.registrationId}
                        onChange={handleInputChange}
                        placeholder={
                          activeTab === "student"
                            ? "e.g., DNS-STU-2024-XXXXX"
                            : "e.g., DNS-ATC-XXXXX"
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
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

                {/* Success State */}
                <AnimatePresence>
                  {isVerified && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="mt-6 p-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                            delay: 0.2,
                          }}
                          className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <FiCheckCircle className="w-5 h-5 text-white" />
                        </motion.div>
                        <div>
                          <h4 className="font-bold text-green-800 dark:text-green-300">
                            Verification Successful!
                          </h4>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            {activeTab === "student"
                              ? "Your student credentials have been verified."
                              : "This ATC is authorized and verified."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Domain-Based Verification Portals */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                Verify via{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Partner Portals
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                If you are registered through one of our partner domains, use the
                dedicated portal for faster verification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* ditrindia.com Portal */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group"
              >
                <div className="relative h-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
                  {/* Gradient Accent */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ transformOrigin: "left" }}
                  />

                  {/* Background Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/5 via-cyan-500/5 to-transparent dark:from-blue-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />

                  {/* Icon & Badge */}
                  <div className="relative flex items-center justify-between mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 group-hover:scale-110 transition-all duration-300">
                        <FiGlobe className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
                    </motion.div>
                    <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wide">
                      DITR India
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="relative text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                    ditrindia.com
                  </h3>
                  <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    Registered through DITR India? Verify your credentials directly
                    through the DITR India verification portal for instant results.
                  </p>

                  {/* Features List */}
                  <div className="relative space-y-3 mb-8">
                    {["Instant certificate verification", "Download verified badge", "Share on LinkedIn"].map(
                      (item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <FiCheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {item}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href="https://ditrindia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Verify on ditrindia.com
                    <FiExternalLink className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>

              {/* ditrpindiaindia.com Portal */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group"
              >
                <div className="relative h-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
                  {/* Gradient Accent */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{ transformOrigin: "right" }}
                  />

                  {/* Background Glow */}
                  <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-transparent dark:from-orange-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />

                  {/* Icon & Badge */}
                  <div className="relative flex items-center justify-between mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 group-hover:scale-110 transition-all duration-300">
                        <FiAward className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
                    </motion.div>
                    <span className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold rounded-full uppercase tracking-wide">
                      DITRP India
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="relative text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                    ditrpindiaindia.com
                  </h3>
                  <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    Registered through DITRP India? Access the dedicated verification
                    portal for seamless credential validation.
                  </p>

                  {/* Features List */}
                  <div className="relative space-y-3 mb-8">
                    {["Quick ATC verification", "Bulk certificate check", "API integration support"].map(
                      (item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <FiCheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {item}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href="https://ditrpindiaindia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Verify on ditrpindiaindia.com
                    <FiExternalLink className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Our Branches Section */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/3 -right-32 w-80 h-80 bg-gradient-to-bl from-indigo-200/10 to-purple-200/10 dark:from-indigo-600/5 dark:to-purple-600/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <Container className="relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-5"
            >
              <FiMapPin className="w-4 h-4" />
              Our Branches
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              Visit Us{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Nationwide
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We have branches across India to serve you better. Visit your nearest
              center for in-person assistance.
            </p>
          </motion.div>

          {/* Branches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group"
              >
                <div className="relative h-full bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
                  {/* Accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${branch.color}`}
                  />

                  {/* Pin Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${branch.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <FiMapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {branch.name}
                    </h3>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2.5 text-gray-600 dark:text-gray-300">
                      <FiMapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-600 dark:text-gray-300">
                      <FiPhone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                      <span>{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-600 dark:text-gray-300">
                      <FiMail className="w-4 h-4 flex-shrink-0 text-gray-400" />
                      <span>{branch.email}</span>
                    </div>
                  </div>

                  {/* Hover Action */}
                  <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Get Directions</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
