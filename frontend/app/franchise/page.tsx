"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiCalendar,
  FiMonitor, FiUsers, FiCheck, FiArrowRight,
  FiArrowLeft, FiAward, FiShield, FiGlobe, FiStar, FiZap,
  FiTrendingUp, FiHome, FiMap, FiLock, FiRefreshCw,
  FiCheckCircle, FiAlertCircle,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import api from "@/lib/api";

/* ─── Types ─── */
interface State { id: number; name: string; }

interface FranchiseFormData {
  institution_name: string;
  owner_name: string;
  designation_id: string;
  dob: string;
  email: string;
  mobile: string;
  address: string;
  taluka: string;
  pincode: string;
  state_id: string;
  city: string;
  total_computers: string;
  total_staff: string;
  agreeTerms: boolean;
}

type OtpStatus = "idle" | "sending" | "sent" | "verifying" | "verified" | "error";

const fallbackDesignations = [
  "Director", "Principal", "Manager", "Owner",
  "Co-Founder", "Coordinator", "Administrator", "Trustee", "Other",
];

const steps = [
  { id: 1, title: "Personal Info", icon: FiUser,    description: "Basic details"   },
  { id: 2, title: "Address",       icon: FiMapPin,  description: "Location info"   },
  { id: 3, title: "Center Info",   icon: FiMonitor, description: "Infrastructure"  },
  { id: 4, title: "Confirm",       icon: FiCheck,   description: "Review & submit" },
];

const benefits = [
  { icon: FiAward,      title: "Brand Recognition", desc: "Leverage our established brand name" },
  { icon: FiShield,     title: "Full Support",       desc: "Training, marketing & tech support"  },
  { icon: FiTrendingUp, title: "Proven Model",       desc: "Tested business model with high ROI" },
  { icon: FiGlobe,      title: "Pan-India Network",  desc: "Join 200+ centers nationwide"        },
];

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200/80 dark:border-gray-700/60 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 dark:focus:border-primary-400 outline-none transition-all duration-200 text-sm backdrop-blur-sm";

const labelCls = "flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

function FloatingOrbs() {
  const orbs = [
    { size: 300, x: "10%", y: "20%", color: "bg-primary-500/15", delay: 0, dur: 8 },
    { size: 250, x: "80%", y: "60%", color: "bg-purple-500/15",  delay: 2, dur: 10 },
    { size: 200, x: "50%", y: "80%", color: "bg-pink-500/10",    delay: 4, dur: 9  },
    { size: 180, x: "20%", y: "70%", color: "bg-cyan-500/10",    delay: 1, dur: 7  },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div key={i}
          className={`absolute rounded-full ${orb.color} blur-[80px]`}
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Req() { return <span className="text-red-500 ml-0.5">*</span>; }

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="w-3 h-3" />{msg}</p>;
}

function StepHeader({ icon: Icon, title, sub, color }: { icon: React.ElementType; title: string; sub: string; color: string }) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400",
    purple:  "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    cyan:    "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  };
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color] ?? colorMap.primary}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════ */
export default function FranchisePage() {
  const [currentStep, setCurrentStep]     = useState(1);
  const [direction, setDirection]         = useState(1);
  const [isSubmitted, setIsSubmitted]     = useState(false);
  const [submittedData, setSubmittedData] = useState<{ id?: number; name?: string; email?: string } | null>(null);
  const [submitError, setSubmitError]     = useState<string | null>(null);
  const [states, setStates]               = useState<State[]>([]);

  /* OTP state */
  const [otpStatus, setOtpStatus]               = useState<OtpStatus>("idle");
  const [otpError, setOtpError]                 = useState("");
  const [otpValue, setOtpValue]                 = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [verifiedEmail, setVerifiedEmail]       = useState("");
  const [resendCooldown, setResendCooldown]     = useState(0);

  const formRef = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, trigger, watch, getValues, setValue, formState: { errors, isSubmitting } } =
    useForm<FranchiseFormData>({});

  const emailValue = watch("email");

  /* Load states */
  useEffect(() => {
    api.franchiseFormData().then(({ data }) => {
      if (data?.states?.length) setStates(data.states);
    }).catch(() => {});
  }, []);

  /* Resend cooldown */
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  /* Reset OTP when email changes */
  useEffect(() => {
    if (verifiedEmail && emailValue !== verifiedEmail) {
      setOtpStatus("idle"); setOtpValue(""); setVerificationToken(""); setVerifiedEmail(""); setOtpError("");
    }
  }, [emailValue, verifiedEmail]);

  /* ── OTP handlers ── */
  const sendOtp = async () => {
    const valid = await trigger("email");
    if (!valid) return;
    const email = getValues("email").trim();
    setOtpStatus("sending"); setOtpError("");
    try {
      await api.franchiseSendOtp(email);
      setOtpStatus("sent"); setResendCooldown(60);
    } catch (err: any) {
      setOtpStatus("error");
      setOtpError(err?.response?.data?.message ?? "Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    if (otpValue.length !== 6) { setOtpError("Enter the 6-digit OTP."); return; }
    const email = getValues("email").trim();
    setOtpStatus("verifying"); setOtpError("");
    try {
      const { data } = await api.franchiseVerifyOtp(email, otpValue);
      setVerificationToken(data.verification_token); setVerifiedEmail(email); setOtpStatus("verified");
    } catch (err: any) {
      setOtpStatus("sent");
      setOtpError(err?.response?.data?.message ?? "Invalid OTP. Please try again.");
    }
  };

  /* ── Step nav ── */
  const stepFields: Record<number, (keyof FranchiseFormData)[]> = {
    1: ["institution_name", "owner_name", "designation_id", "dob", "email", "mobile"],
    2: ["address", "taluka", "pincode", "state_id", "city"],
    3: ["total_computers", "total_staff", "agreeTerms"],
  };

  const goNext = useCallback(async () => {
    if (currentStep === 1 && otpStatus !== "verified") {
      setOtpError("Please verify your email before proceeding."); return;
    }
    const fields = stepFields[currentStep];
    if (fields) { const valid = await trigger(fields); if (!valid) return; }
    setCurrentStep((s) => Math.min(s + 1, 4));
  }, [currentStep, trigger, otpStatus]);

  const handleNext = () => { setDirection(1);  goNext(); };
  const handleBack = () => { setDirection(-1); setCurrentStep((s) => Math.max(s - 1, 1)); };

  /* ── Submit ── */
  const onSubmit = async (data: FranchiseFormData) => {
    setSubmitError(null);
    if (!verificationToken) { setSubmitError("Email not verified. Please go back and verify your email."); return; }
    try {
      const res = await api.franchiseSubmit({
        institution_name:   data.institution_name,
        owner_name:         data.owner_name,
        designation_id:     data.designation_id   ? Number(data.designation_id)   : undefined,
        dob:                data.dob              || undefined,
        email:              verifiedEmail,
        verification_token: verificationToken,
        mobile:             data.mobile,
        address:            data.address,
        taluka:             data.taluka,
        pincode:            data.pincode,
        state_id:           data.state_id         ? Number(data.state_id)          : undefined,
        city:               data.city,
        total_computers:    data.total_computers  ? Number(data.total_computers)   : undefined,
        total_staff:        data.total_staff      ? Number(data.total_staff)        : undefined,
      });
      setSubmittedData({ id: res.data?.request_id, name: data.owner_name, email: verifiedEmail });
      setIsSubmitted(true);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        (Object.values(err?.response?.data?.errors ?? {}).flat()[0] as string) ??
        "Submission failed. Please try again.";
      setSubmitError(msg);
    }
  };

  const slideVariants = {
    enter:  (d: number) => ({ x: d > 0 ?  80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -80 :  80, opacity: 0 }),
  };

  const fallbackStates = ["Andhra Pradesh","Bihar","Delhi","Goa","Gujarat","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","West Bengal"];

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950 py-20 lg:py-28">
        <FloatingOrbs />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <Container>
          <div className="relative text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 backdrop-blur-sm mb-8">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" /></span>
              <span className="text-primary-300 text-sm font-semibold tracking-wide">Franchise Partner</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Become a{" "}
              <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Franchise</span>{" "}
              Partner
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Join our growing network of 200+ education centers across India. Start your own institute with our proven business model.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {benefits.map((b, i) => { const Icon = b.icon; return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="group p-4 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <p className="text-white font-bold text-sm">{b.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{b.desc}</p>
                </motion.div>
              ); })}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="relative py-16 lg:py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-950 to-transparent dark:block hidden" />
        <Container>
          <div className="relative max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3"><FiZap className="w-4 h-4" />REGISTRATION FORM</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                Start Your <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
              </h2>
            </motion.div>

            {/* Step progress */}
            {!isSubmitted && (
              <div className="mb-10">
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-6 left-[12%] right-[12%] h-[3px] bg-gray-200 dark:bg-gray-800 rounded-full" />
                  <motion.div className="absolute top-6 left-[12%] h-[3px] bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-full origin-left"
                    animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 76}%` }} transition={{ duration: 0.5, ease: "easeInOut" }} />
                  {steps.map((step) => { const Icon = step.icon; const isActive = currentStep === step.id; const isDone = currentStep > step.id; return (
                    <div key={step.id} className="relative z-10 flex flex-col items-center w-1/4">
                      <motion.div animate={{ scale: isActive ? 1.1 : 1, boxShadow: isActive ? "0 0 0 6px rgba(99,102,241,0.15)" : "none" }} transition={{ duration: 0.3 }}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDone || isActive ? "bg-gradient-to-br from-primary-500 to-purple-600 text-white shadow-lg" : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-400"}`}>
                        {isDone ? <FiCheck className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </motion.div>
                      <p className={`mt-2 text-xs font-bold tracking-wide ${isActive || isDone ? "text-primary-600 dark:text-primary-400" : "text-gray-400"}`}>{step.title}</p>
                      <p className={`text-[10px] ${isActive || isDone ? "text-gray-500" : "text-gray-300 dark:text-gray-700"}`}>{step.description}</p>
                    </div>
                  ); })}
                </div>
              </div>
            )}

            {/* Card */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 blur-lg" />
              <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-primary-500/50 via-purple-500/30 to-pink-500/50">
                <div className="rounded-3xl bg-white dark:bg-gray-900 overflow-hidden">

                  {/* ── SUCCESS ── */}
                  {isSubmitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="py-16 px-8 text-center">
                      <div className="relative mb-8">
                        {[...Array(8)].map((_, i) => (
                          <motion.div key={i} className="absolute w-3 h-3 rounded-full"
                            style={{ background: ["#4f46e5","#7c3aed","#ec4899","#10b981","#f59e0b","#3b82f6","#8b5cf6","#ef4444"][i], left: `${10 + i * 11}%`, top: "0%" }}
                            animate={{ y: [0, -40, 20], opacity: [0, 1, 0], scale: [0, 1.2, 0.5] }}
                            transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }} />
                        ))}
                        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                          className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
                          <FiCheckCircle className="w-12 h-12 text-white" />
                        </motion.div>
                      </div>
                      <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
                        Application Submitted! 🎉
                      </motion.h3>
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-2">
                        Thank you, <strong className="text-gray-700 dark:text-gray-200">{submittedData?.name}</strong>! Your franchise application has been received.
                      </motion.p>
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                        A confirmation has been sent to{" "}
                        <span className="font-semibold text-primary-600 dark:text-primary-400">{submittedData?.email}</span>.
                        Our team will contact you within <span className="font-bold text-primary-600 dark:text-primary-400">24–48 hours</span>.
                      </motion.p>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                        {[
                          { icon: FiCheckCircle, title: "Reviewed",  desc: "Within 24 hrs",    color: "from-emerald-400 to-green-500"  },
                          { icon: FiPhone,       title: "Contacted", desc: "Within 24–48 hrs",  color: "from-blue-400 to-indigo-500"    },
                          { icon: FiStar,        title: "Onboarded", desc: "After approval",    color: "from-purple-400 to-pink-500"    },
                        ].map((s, i) => { const Icon = s.icon; return (
                          <div key={i} className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2 shadow-md`}><Icon className="w-5 h-5 text-white" /></div>
                            <p className="font-bold text-sm text-gray-800 dark:text-gray-100">{s.title}</p>
                            <p className="text-xs text-gray-400">{s.desc}</p>
                          </div>
                        ); })}
                      </motion.div>
                      {submittedData?.id && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-sm font-semibold border border-primary-200 dark:border-primary-800">
                          <FiAward className="w-4 h-4" />Application ID: FR-{String(submittedData.id).padStart(6, "0")}
                        </motion.div>
                      )}
                    </motion.div>

                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                      <div className="p-6 sm:p-8 min-h-[420px]">
                        <AnimatePresence mode="wait" custom={direction}>

                          {/* ═══ STEP 1 ═══ */}
                          {currentStep === 1 && (
                            <motion.div key="step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: "easeInOut" }} className="space-y-5">
                              <StepHeader icon={FiUser} title="Personal Information" sub="Tell us about yourself and your institution" color="primary" />

                              <div>
                                <label className={labelCls}><FiHome className="w-3.5 h-3.5 text-primary-500" />Institution Name <Req /></label>
                                <input type="text" placeholder="Enter institution name" {...register("institution_name", { required: "Institution name is required" })} className={inputCls} />
                                <Err msg={errors.institution_name?.message} />
                              </div>

                              <div>
                                <label className={labelCls}><FiUser className="w-3.5 h-3.5 text-primary-500" />Center Owner Name <Req /></label>
                                <input type="text" placeholder="Enter owner name" {...register("owner_name", { required: "Owner name is required" })} className={inputCls} />
                                <Err msg={errors.owner_name?.message} />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelCls}><FiAward className="w-3.5 h-3.5 text-primary-500" />Designation <Req /></label>
                                  <select {...register("designation_id", { required: "Designation is required" })} className={inputCls}>
                                    <option value="">Select designation</option>
                                    {fallbackDesignations.map((d) => <option key={d} value={d}>{d}</option>)}
                                  </select>
                                  <Err msg={errors.designation_id?.message} />
                                </div>
                                <div>
                                  <label className={labelCls}><FiCalendar className="w-3.5 h-3.5 text-primary-500" />Date of Birth <Req /></label>
                                  <input type="date" {...register("dob", { required: "Date of birth is required" })} className={inputCls} />
                                  <Err msg={errors.dob?.message} />
                                </div>
                              </div>

                              {/* Email + OTP */}
                              <div>
                                <label className={labelCls}><FiMail className="w-3.5 h-3.5 text-primary-500" />Email Address <Req /></label>
                                <div className="flex gap-2">
                                  <div className="relative flex-1">
                                    <input type="email" placeholder="Enter email address"
                                      {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
                                      readOnly={otpStatus === "verified"}
                                      className={`${inputCls} ${otpStatus === "verified" ? "bg-emerald-50/60 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700 pr-10" : ""}`} />
                                    {otpStatus === "verified" && <FiLock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />}
                                  </div>
                                  {otpStatus === "verified" ? (
                                    <button type="button" onClick={() => { setOtpStatus("idle"); setOtpValue(""); setVerificationToken(""); setVerifiedEmail(""); setValue("email", ""); }}
                                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-orange-600 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 transition-colors">
                                      <FiRefreshCw className="w-3.5 h-3.5" />Change
                                    </button>
                                  ) : (
                                    <button type="button" onClick={sendOtp} disabled={otpStatus === "sending"}
                                      className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 transition-all shadow-sm disabled:opacity-60">
                                      <FiMail className="w-3.5 h-3.5" />
                                      {otpStatus === "sending" ? "Sending…" : otpStatus === "sent" ? "Resend" : "Send OTP"}
                                    </button>
                                  )}
                                </div>
                                <Err msg={errors.email?.message} />

                                <AnimatePresence>
                                  {(otpStatus === "sent" || otpStatus === "verifying") && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                      className="mt-3 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
                                      <p className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold mb-3">
                                        Enter the 6-digit OTP sent to <strong>{emailValue}</strong>
                                      </p>
                                      <div className="flex gap-2">
                                        <input type="text" inputMode="numeric" maxLength={6} value={otpValue}
                                          onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                          placeholder="000000"
                                          className="flex-1 px-4 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-xl font-bold tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                                        <button type="button" onClick={verifyOtp} disabled={otpStatus === "verifying" || otpValue.length !== 6}
                                          className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 transition-all">
                                          {otpStatus === "verifying" ? "Verifying…" : "Verify"}
                                        </button>
                                      </div>
                                      {resendCooldown > 0 && <p className="text-xs text-gray-400 mt-2">Resend OTP in {resendCooldown}s</p>}
                                    </motion.div>
                                  )}
                                  {otpStatus === "verified" && (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                      className="mt-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                                      <FiCheckCircle className="w-4 h-4" />Email verified successfully
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                                {otpError && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><FiAlertCircle className="w-3.5 h-3.5" />{otpError}</p>}
                              </div>

                              <div>
                                <label className={labelCls}><FiPhone className="w-3.5 h-3.5 text-primary-500" />Mobile Number <Req /></label>
                                <input type="tel" placeholder="10-digit mobile number"
                                  {...register("mobile", { required: "Mobile is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit number" } })}
                                  className={inputCls} />
                                <Err msg={errors.mobile?.message} />
                              </div>
                            </motion.div>
                          )}

                          {/* ═══ STEP 2 ═══ */}
                          {currentStep === 2 && (
                            <motion.div key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: "easeInOut" }} className="space-y-5">
                              <StepHeader icon={FiMapPin} title="Address Details" sub="Where is your center located?" color="purple" />

                              <div>
                                <label className={labelCls}><FiMapPin className="w-3.5 h-3.5 text-primary-500" />Full Address <Req /></label>
                                <textarea rows={3} placeholder="Landmark, Road, Building/House no." {...register("address", { required: "Address is required" })} className={`${inputCls} resize-none`} />
                                <Err msg={errors.address?.message} />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelCls}><FiMap className="w-3.5 h-3.5 text-primary-500" />Taluka <Req /></label>
                                  <input type="text" placeholder="Enter taluka" {...register("taluka", { required: "Taluka is required" })} className={inputCls} />
                                  <Err msg={errors.taluka?.message} />
                                </div>
                                <div>
                                  <label className={labelCls}><FiMapPin className="w-3.5 h-3.5 text-primary-500" />Pincode <Req /></label>
                                  <input type="text" placeholder="6-digit pincode" {...register("pincode", { required: "Pincode is required", pattern: { value: /^\d{6}$/, message: "Enter valid 6-digit pincode" } })} className={inputCls} />
                                  <Err msg={errors.pincode?.message} />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelCls}><FiGlobe className="w-3.5 h-3.5 text-primary-500" />State <Req /></label>
                                  <select {...register("state_id", { required: "State is required" })} className={inputCls}>
                                    <option value="">Select state</option>
                                    {(states.length > 0 ? states : fallbackStates.map((n) => ({ id: n, name: n }))).map((s: any) => (
                                      <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                  </select>
                                  <Err msg={errors.state_id?.message} />
                                </div>
                                <div>
                                  <label className={labelCls}><FiHome className="w-3.5 h-3.5 text-primary-500" />City <Req /></label>
                                  <input type="text" placeholder="Enter city" {...register("city", { required: "City is required" })} className={inputCls} />
                                  <Err msg={errors.city?.message} />
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* ═══ STEP 3 ═══ */}
                          {currentStep === 3 && (
                            <motion.div key="step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: "easeInOut" }} className="space-y-5">
                              <StepHeader icon={FiMonitor} title="Center Information" sub="Tell us about your infrastructure" color="cyan" />

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelCls}><FiMonitor className="w-3.5 h-3.5 text-primary-500" />Total Computers <Req /></label>
                                  <input type="number" min="0" placeholder="e.g. 10" {...register("total_computers", { required: "Required", min: { value: 0, message: "Min 0" } })} className={inputCls} />
                                  <Err msg={errors.total_computers?.message} />
                                </div>
                                <div>
                                  <label className={labelCls}><FiUsers className="w-3.5 h-3.5 text-primary-500" />Total Staff <Req /></label>
                                  <input type="number" min="0" placeholder="e.g. 5" {...register("total_staff", { required: "Required", min: { value: 0, message: "Min 0" } })} className={inputCls} />
                                  <Err msg={errors.total_staff?.message} />
                                </div>
                              </div>

                              <div className="space-y-3 pt-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                  <input type="checkbox" {...register("agreeTerms", { required: "You must agree to the terms" })}
                                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                                    I agree to the <span className="text-primary-600 dark:text-primary-400 font-semibold">Terms and Conditions</span> and confirm all information provided is accurate. <Req />
                                  </span>
                                </label>
                                <Err msg={errors.agreeTerms?.message} />
                              </div>
                            </motion.div>
                          )}

                          {/* ═══ STEP 4 — Review ═══ */}
                          {currentStep === 4 && (
                            <motion.div key="step4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: "easeInOut" }} className="space-y-3">
                              <StepHeader icon={FiCheck} title="Review & Submit" sub="Verify your details before submitting" color="emerald" />

                              {submitError && (
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                                  <FiAlertCircle className="w-4 h-4 flex-shrink-0" />{submitError}
                                </div>
                              )}

                              {[
                                { label: "Institution",  value: getValues("institution_name") },
                                { label: "Owner Name",   value: getValues("owner_name")       },
                                { label: "Designation",  value: getValues("designation_id")   },
                                { label: "Date of Birth",value: getValues("dob")              },
                                { label: "Email",        value: verifiedEmail                  },
                                { label: "Mobile",       value: getValues("mobile")            },
                                { label: "Address",      value: getValues("address")           },
                                { label: "City",         value: getValues("city")              },
                                { label: "Pincode",      value: getValues("pincode")           },
                                { label: "Taluka",       value: getValues("taluka")            },
                                { label: "Computers",    value: getValues("total_computers")   },
                                { label: "Staff",        value: getValues("total_staff")       },
                              ].map(({ label, value }) => value ? (
                                <div key={label} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
                                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-28 flex-shrink-0 pt-0.5">{label}</span>
                                  <span className="text-sm text-gray-800 dark:text-gray-100 font-medium">{value}</span>
                                </div>
                              ) : null)}

                              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                                <FiCheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                <span className="text-sm text-emerald-700 dark:text-emerald-300 font-semibold">Email verified: {verifiedEmail}</span>
                              </div>
                            </motion.div>
                          )}

                        </AnimatePresence>
                      </div>

                      {/* Navigation */}
                      <div className="px-6 sm:px-8 pb-8 flex items-center justify-between gap-4">
                        {currentStep > 1 ? (
                          <button type="button" onClick={handleBack}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <FiArrowLeft className="w-4 h-4" />Back
                          </button>
                        ) : <div />}
                        {currentStep < 4 ? (
                          <button type="button" onClick={handleNext}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 transition-all shadow-lg shadow-primary-500/25">
                            Next <FiArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button type="submit" disabled={isSubmitting}
                            className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-60">
                            {isSubmitting ? "Submitting…" : <><FiCheck className="w-4 h-4" />Submit Application</>}
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
