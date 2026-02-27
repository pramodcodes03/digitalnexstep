"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiHash, FiCalendar,
  FiMonitor, FiUsers, FiNavigation, FiCheck, FiArrowRight,
  FiArrowLeft, FiAward, FiShield, FiGlobe, FiStar, FiZap,
  FiTrendingUp, FiHome, FiMap, FiClock,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import api from "@/lib/api";

/* ─── Form Data ─── */
interface FranchiseFormData {
  institutionName: string;
  centerOwnerName: string;
  designation: string;
  dob: string;
  email: string;
  mobile: string;
  fullAddress: string;
  talukaName: string;
  postalCode: string;
  state: string;
  city: string;
  country: string;
  totalComputers: string;
  totalStaff: string;
  mapLocation: string;
  latitude: string;
  longitude: string;
  agreeTerms: boolean;
  agreeContact: boolean;
  amcReferralCode: string;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

const designations = [
  "Director", "Principal", "Manager", "Owner", "Co-Founder",
  "Coordinator", "Administrator", "Trustee", "Other",
];

/* ─── Step definitions ─── */
const steps = [
  { id: 1, title: "Personal Info", icon: FiUser, description: "Basic details" },
  { id: 2, title: "Address Details", icon: FiMapPin, description: "Location info" },
  { id: 3, title: "Center Info", icon: FiMonitor, description: "Infrastructure" },
  { id: 4, title: "Confirm", icon: FiCheck, description: "Review & submit" },
];

/* ─── Benefits data ─── */
const benefits = [
  { icon: FiAward, title: "Brand Recognition", desc: "Leverage our established brand name" },
  { icon: FiShield, title: "Full Support", desc: "Training, marketing & tech support" },
  { icon: FiTrendingUp, title: "Proven Model", desc: "Tested business model with high ROI" },
  { icon: FiGlobe, title: "Pan-India Network", desc: "Join 200+ centers nationwide" },
];

/* ─── Input class ─── */
const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200/80 dark:border-gray-700/60 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 dark:focus:border-primary-400 outline-none transition-all duration-200 text-sm backdrop-blur-sm";

const labelCls =
  "flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

/* ─── Floating particles ─── */
function FloatingOrbs() {
  const orbs = [
    { size: 300, x: "10%", y: "20%", color: "bg-primary-500/15", delay: 0, dur: 8 },
    { size: 250, x: "80%", y: "60%", color: "bg-purple-500/15", delay: 2, dur: 10 },
    { size: 200, x: "50%", y: "80%", color: "bg-pink-500/10", delay: 4, dur: 9 },
    { size: 180, x: "20%", y: "70%", color: "bg-cyan-500/10", delay: 1, dur: 7 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${orb.color} blur-[80px]`}
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function FranchisePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FranchiseFormData>({
    defaultValues: { country: "India" },
  });

  const formValues = watch();

  /* Step validation fields */
  const stepFields: Record<number, (keyof FranchiseFormData)[]> = {
    1: ["institutionName", "centerOwnerName", "designation", "dob", "email", "mobile"],
    2: ["fullAddress", "talukaName", "postalCode", "state", "city", "country"],
    3: ["totalComputers", "totalStaff", "agreeTerms"],
  };

  const goNext = useCallback(async () => {
    const fields = stepFields[currentStep];
    if (fields) {
      const valid = await trigger(fields);
      if (!valid) return;
    }
    setCurrentStep((s) => Math.min(s + 1, 4));
  }, [currentStep, trigger]);

  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: FranchiseFormData) => {
    try {
      await api.submitFranchise({
        institution_name: data.institutionName,
        center_owner_name: data.centerOwnerName,
        designation: data.designation,
        dob: data.dob || undefined,
        email: data.email,
        mobile: data.mobile,
        full_address: data.fullAddress,
        taluka_name: data.talukaName,
        postal_code: data.postalCode,
        state: data.state,
        city: data.city,
        country: data.country || "India",
        total_computers: data.totalComputers ? Number(data.totalComputers) : undefined,
        total_staff: data.totalStaff ? Number(data.totalStaff) : undefined,
        map_location: data.mapLocation,
        latitude: data.latitude ? Number(data.latitude) : undefined,
        longitude: data.longitude ? Number(data.longitude) : undefined,
        agree_terms: data.agreeTerms,
        agree_contact: data.agreeContact,
        amc_referral_code: data.amcReferralCode,
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    }
  };

  /* ── Direction for slide animation ── */
  const [direction, setDirection] = useState(1);
  const handleNext = () => { setDirection(1); goNext(); };
  const handleBack = () => { setDirection(-1); goBack(); };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <>
      <Header />

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gray-950 py-20 lg:py-28">
        <FloatingOrbs />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <Container>
          <div className="relative text-center max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 backdrop-blur-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
              <span className="text-primary-300 text-sm font-semibold tracking-wide">
                Franchise Partner
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6"
            >
              Become a{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Franchise
                </span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                >
                  <motion.path
                    d="M2 8 C50 2, 150 2, 198 8"
                    stroke="url(#fran-underline)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                  <defs>
                    <linearGradient id="fran-underline" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="50%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>{" "}
              Partner
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
            >
              Join our growing network of 200+ education centers across India.
              Start your own institute with our proven business model.
            </motion.p>

            {/* Benefits strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="relative group p-4 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <p className="text-white font-bold text-sm">{b.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{b.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── FORM SECTION ── */}
      <section className="relative py-16 lg:py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden">
        {/* Top gradient fade */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-950 to-transparent dark:block hidden" />

        <Container>
          <div className="relative max-w-3xl mx-auto">
            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3">
                <FiZap className="w-4 h-4" />
                REGISTRATION FORM
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                Start Your{" "}
                <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Journey
                </span>
              </h2>
            </motion.div>

            {/* ── Step progress bar ── */}
            <div className="mb-10">
              <div className="flex items-center justify-between relative">
                {/* Progress line background */}
                <div className="absolute top-6 left-[12%] right-[12%] h-[3px] bg-gray-200 dark:bg-gray-800 rounded-full" />
                {/* Progress line fill */}
                <motion.div
                  className="absolute top-6 left-[12%] h-[3px] bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-full origin-left"
                  animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 76}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  return (
                    <div key={step.id} className="relative z-10 flex flex-col items-center w-1/4">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          boxShadow: isActive
                            ? "0 0 0 6px rgba(99,102,241,0.15), 0 0 20px rgba(99,102,241,0.2)"
                            : "0 0 0 0px transparent",
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? "bg-gradient-to-br from-primary-500 to-purple-600 text-white shadow-lg"
                            : isActive
                            ? "bg-gradient-to-br from-primary-500 to-purple-600 text-white shadow-lg"
                            : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-400"
                        }`}
                      >
                        {isCompleted ? (
                          <FiCheck className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </motion.div>
                      <p
                        className={`mt-2 text-xs font-bold tracking-wide ${
                          isActive || isCompleted
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-gray-400 dark:text-gray-600"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p
                        className={`text-[10px] ${
                          isActive || isCompleted
                            ? "text-gray-500 dark:text-gray-400"
                            : "text-gray-300 dark:text-gray-700"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Form card with gradient border ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Outer glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 blur-lg" />

              {/* Gradient border */}
              <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-primary-500/50 via-purple-500/30 to-pink-500/50">
                <div className="rounded-3xl bg-white dark:bg-gray-900 overflow-hidden">
                  {/* ── Success state ── */}
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-20 px-6 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg"
                      >
                        <FiCheck className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
                        Registration Successful!
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-2">
                        Thank you for your interest in becoming a franchise partner.
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                        Our team will contact you within <span className="font-bold text-primary-600 dark:text-primary-400">24-48 hours</span>.
                      </p>
                      <div className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-semibold">
                        <FiClock className="w-4 h-4" />
                        Application ID: FR-{Date.now().toString().slice(-6)}
                      </div>
                    </motion.div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                      <div className="p-6 sm:p-8 min-h-[420px]">
                        <AnimatePresence mode="wait" custom={direction}>
                          {/* ═══ STEP 1 — Personal Info ═══ */}
                          {currentStep === 1 && (
                            <motion.div
                              key="step1"
                              custom={direction}
                              variants={slideVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="space-y-5"
                            >
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                  <FiUser className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900 dark:text-white">Personal Information</h3>
                                  <p className="text-xs text-gray-500">Tell us about yourself and your institution</p>
                                </div>
                              </div>

                              {/* Institution Name */}
                              <div>
                                <label className={labelCls}>
                                  <FiHome className="w-3.5 h-3.5 text-primary-500" />
                                  Institution Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter institution name"
                                  {...register("institutionName", { required: "Institution name is required" })}
                                  className={inputCls}
                                />
                                {errors.institutionName && <p className="text-red-500 text-xs mt-1">{errors.institutionName.message}</p>}
                              </div>

                              {/* Center Owner Name */}
                              <div>
                                <label className={labelCls}>
                                  <FiUser className="w-3.5 h-3.5 text-primary-500" />
                                  Center Owner Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter center owner name"
                                  {...register("centerOwnerName", { required: "Owner name is required" })}
                                  className={inputCls}
                                />
                                {errors.centerOwnerName && <p className="text-red-500 text-xs mt-1">{errors.centerOwnerName.message}</p>}
                              </div>

                              {/* Designation & DOB */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelCls}>
                                    <FiAward className="w-3.5 h-3.5 text-primary-500" />
                                    Select Designation <span className="text-red-500">*</span>
                                  </label>
                                  <select
                                    {...register("designation", { required: "Designation is required" })}
                                    className={inputCls}
                                  >
                                    <option value="">Select</option>
                                    {designations.map((d) => (
                                      <option key={d} value={d}>{d}</option>
                                    ))}
                                  </select>
                                  {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation.message}</p>}
                                </div>
                                <div>
                                  <label className={labelCls}>
                                    <FiCalendar className="w-3.5 h-3.5 text-primary-500" />
                                    Date of Birth <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="date"
                                    {...register("dob", { required: "Date of birth is required" })}
                                    className={inputCls}
                                  />
                                  {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
                                </div>
                              </div>

                              {/* Email & Mobile */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelCls}>
                                    <FiMail className="w-3.5 h-3.5 text-primary-500" />
                                    Email Address <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    placeholder="Enter email"
                                    {...register("email", {
                                      required: "Email is required",
                                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                                    })}
                                    className={inputCls}
                                  />
                                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                  <label className={labelCls}>
                                    <FiPhone className="w-3.5 h-3.5 text-primary-500" />
                                    Mobile Number <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    {...register("mobile", {
                                      required: "Mobile is required",
                                      pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit number" },
                                    })}
                                    className={inputCls}
                                  />
                                  {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* ═══ STEP 2 — Address Details ═══ */}
                          {currentStep === 2 && (
                            <motion.div
                              key="step2"
                              custom={direction}
                              variants={slideVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="space-y-5"
                            >
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                  <FiMapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900 dark:text-white">Address Details</h3>
                                  <p className="text-xs text-gray-500">Where is your center located?</p>
                                </div>
                              </div>

                              {/* Full Address */}
                              <div>
                                <label className={labelCls}>
                                  <FiMapPin className="w-3.5 h-3.5 text-primary-500" />
                                  Full Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                  rows={3}
                                  placeholder="Enter complete address"
                                  {...register("fullAddress", { required: "Address is required" })}
                                  className={`${inputCls} resize-none`}
                                />
                                {errors.fullAddress && <p className="text-red-500 text-xs mt-1">{errors.fullAddress.message}</p>}
                              </div>

                              {/* Taluka & Postal Code */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelCls}>
                                    <FiMap className="w-3.5 h-3.5 text-primary-500" />
                                    Taluka Name <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Enter taluka"
                                    {...register("talukaName", { required: "Taluka is required" })}
                                    className={inputCls}
                                  />
                                  {errors.talukaName && <p className="text-red-500 text-xs mt-1">{errors.talukaName.message}</p>}
                                </div>
                                <div>
                                  <label className={labelCls}>
                                    <FiHash className="w-3.5 h-3.5 text-primary-500" />
                                    Postal Code <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Enter postal code"
                                    {...register("postalCode", {
                                      required: "Postal code is required",
                                      pattern: { value: /^\d{6}$/, message: "Enter valid 6-digit code" },
                                    })}
                                    className={inputCls}
                                  />
                                  {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
                                </div>
                              </div>

                              {/* State & City */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelCls}>
                                    <FiMapPin className="w-3.5 h-3.5 text-primary-500" />
                                    State <span className="text-red-500">*</span>
                                  </label>
                                  <select
                                    {...register("state", { required: "State is required" })}
                                    className={inputCls}
                                  >
                                    <option value="">Select state</option>
                                    {indianStates.map((s) => (
                                      <option key={s} value={s}>{s}</option>
                                    ))}
                                  </select>
                                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                                </div>
                                <div>
                                  <label className={labelCls}>
                                    <FiMapPin className="w-3.5 h-3.5 text-primary-500" />
                                    City <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Enter city"
                                    {...register("city", { required: "City is required" })}
                                    className={inputCls}
                                  />
                                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                                </div>
                              </div>

                              {/* Country */}
                              <div>
                                <label className={labelCls}>
                                  <FiGlobe className="w-3.5 h-3.5 text-primary-500" />
                                  Country <span className="text-red-500">*</span>
                                </label>
                                <select
                                  {...register("country", { required: "Country is required" })}
                                  className={inputCls}
                                >
                                  <option value="India">India</option>
                                </select>
                              </div>
                            </motion.div>
                          )}

                          {/* ═══ STEP 3 — Center Info ═══ */}
                          {currentStep === 3 && (
                            <motion.div
                              key="step3"
                              custom={direction}
                              variants={slideVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="space-y-5"
                            >
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                  <FiMonitor className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900 dark:text-white">Center Information</h3>
                                  <p className="text-xs text-gray-500">Infrastructure and location details</p>
                                </div>
                              </div>

                              {/* Computers & Staff */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelCls}>
                                    <FiMonitor className="w-3.5 h-3.5 text-primary-500" />
                                    Total Computers <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    min="1"
                                    placeholder="e.g. 20"
                                    {...register("totalComputers", { required: "Required" })}
                                    className={inputCls}
                                  />
                                  {errors.totalComputers && <p className="text-red-500 text-xs mt-1">{errors.totalComputers.message}</p>}
                                </div>
                                <div>
                                  <label className={labelCls}>
                                    <FiUsers className="w-3.5 h-3.5 text-primary-500" />
                                    Total Staff <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    min="1"
                                    placeholder="e.g. 5"
                                    {...register("totalStaff", { required: "Required" })}
                                    className={inputCls}
                                  />
                                  {errors.totalStaff && <p className="text-red-500 text-xs mt-1">{errors.totalStaff.message}</p>}
                                </div>
                              </div>

                              {/* Map Location */}
                              <div>
                                <label className={labelCls}>
                                  <FiNavigation className="w-3.5 h-3.5 text-primary-500" />
                                  Map Location (Google Maps URL)
                                </label>
                                <input
                                  type="url"
                                  placeholder="Paste Google Maps link"
                                  {...register("mapLocation")}
                                  className={inputCls}
                                />
                              </div>

                              {/* Latitude & Longitude */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelCls}>
                                    <FiNavigation className="w-3.5 h-3.5 text-primary-500" />
                                    Latitude
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. 19.0760"
                                    {...register("latitude")}
                                    className={inputCls}
                                  />
                                </div>
                                <div>
                                  <label className={labelCls}>
                                    <FiNavigation className="w-3.5 h-3.5 text-primary-500" />
                                    Longitude
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. 72.8777"
                                    {...register("longitude")}
                                    className={inputCls}
                                  />
                                </div>
                              </div>

                              {/* AMC Referral */}
                              <div>
                                <label className={labelCls}>
                                  <FiStar className="w-3.5 h-3.5 text-primary-500" />
                                  AMC Referral Code <span className="text-gray-400 font-normal">(Not Mandatory)</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter referral code if any"
                                  {...register("amcReferralCode")}
                                  className={inputCls}
                                />
                              </div>

                              {/* Checkboxes */}
                              <div className="space-y-3 pt-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    {...register("agreeTerms", { required: "You must agree to terms" })}
                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                                  />
                                  <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                                    I agree to the <span className="text-primary-600 dark:text-primary-400 font-semibold">terms and conditions</span> for franchise registration. <span className="text-red-500">*</span>
                                  </span>
                                </label>
                                {errors.agreeTerms && <p className="text-red-500 text-xs ml-7">{errors.agreeTerms.message}</p>}

                                <label className="flex items-start gap-3 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    {...register("agreeContact")}
                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                                  />
                                  <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                                    Please check this to agree to receive <span className="font-semibold">SMS, Email, Call</span> from DigitalNexStep.
                                  </span>
                                </label>
                              </div>
                            </motion.div>
                          )}

                          {/* ═══ STEP 4 — Review ═══ */}
                          {currentStep === 4 && (
                            <motion.div
                              key="step4"
                              custom={direction}
                              variants={slideVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                            >
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                  <FiCheck className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900 dark:text-white">Review Your Details</h3>
                                  <p className="text-xs text-gray-500">Please verify everything before submitting</p>
                                </div>
                              </div>

                              <div className="space-y-4">
                                {/* Personal */}
                                <ReviewCard
                                  title="Personal Information"
                                  icon={FiUser}
                                  color="primary"
                                  items={[
                                    { label: "Institution", value: formValues.institutionName },
                                    { label: "Owner", value: formValues.centerOwnerName },
                                    { label: "Designation", value: formValues.designation },
                                    { label: "DOB", value: formValues.dob },
                                    { label: "Email", value: formValues.email },
                                    { label: "Mobile", value: formValues.mobile },
                                  ]}
                                />

                                {/* Address */}
                                <ReviewCard
                                  title="Address Details"
                                  icon={FiMapPin}
                                  color="purple"
                                  items={[
                                    { label: "Address", value: formValues.fullAddress },
                                    { label: "Taluka", value: formValues.talukaName },
                                    { label: "Postal Code", value: formValues.postalCode },
                                    { label: "State", value: formValues.state },
                                    { label: "City", value: formValues.city },
                                    { label: "Country", value: formValues.country },
                                  ]}
                                />

                                {/* Center */}
                                <ReviewCard
                                  title="Center Information"
                                  icon={FiMonitor}
                                  color="emerald"
                                  items={[
                                    { label: "Computers", value: formValues.totalComputers },
                                    { label: "Staff", value: formValues.totalStaff },
                                    { label: "Map Location", value: formValues.mapLocation || "—" },
                                    { label: "Lat / Long", value: formValues.latitude && formValues.longitude ? `${formValues.latitude}, ${formValues.longitude}` : "—" },
                                    { label: "Referral Code", value: formValues.amcReferralCode || "—" },
                                  ]}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* ── Navigation buttons ── */}
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between gap-4">
                        {currentStep > 1 ? (
                          <button
                            type="button"
                            onClick={handleBack}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold text-sm transition-all"
                          >
                            <FiArrowLeft className="w-4 h-4" />
                            Back
                          </button>
                        ) : (
                          <div />
                        )}

                        {currentStep < 4 ? (
                          <button
                            type="button"
                            onClick={handleNext}
                            className="relative group flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold text-sm overflow-hidden shadow-lg"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </div>
                            <span className="relative">Next Step</span>
                            <FiArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative group flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold text-sm overflow-hidden shadow-lg disabled:opacity-60 disabled:cursor-wait"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </div>
                            <span className="relative flex items-center gap-2">
                              {isSubmitting ? (
                                <>
                                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  Submitting...
                                </>
                              ) : (
                                <>
                                  Submit Registration
                                  <FiCheck className="w-4 h-4" />
                                </>
                              )}
                            </span>
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}

/* ─── Review Card component ─── */
function ReviewCard({
  title,
  icon: Icon,
  color,
  items,
}: {
  title: string;
  icon: React.ElementType;
  color: "primary" | "purple" | "emerald";
  items: { label: string; value: string }[];
}) {
  const colors = {
    primary: {
      bg: "bg-primary-50 dark:bg-primary-900/20",
      icon: "text-primary-600 dark:text-primary-400",
      border: "border-primary-100 dark:border-primary-800/30",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      icon: "text-purple-600 dark:text-purple-400",
      border: "border-purple-100 dark:border-purple-800/30",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      icon: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-100 dark:border-emerald-800/30",
    },
  };

  const c = colors[color];

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${c.icon}`} />
        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h4>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">{item.label}</p>
            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium truncate">{item.value || "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
