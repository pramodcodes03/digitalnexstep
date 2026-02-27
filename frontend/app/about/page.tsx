"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FiArrowRight, FiPlay, FiHeart, FiMonitor, FiBook,
  FiUsers, FiBookOpen, FiAward, FiTarget, FiZap, FiGlobe,
  FiStar, FiEye, FiX, FiTrendingUp, FiShield, FiCheckCircle,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

// ─── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const dur = 2400;
    const tick = () => {
      const t = Math.min((Date.now() - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(ease * end));
      if (t < 1) requestAnimationFrame(tick);
      else setVal(end);
    };
    requestAnimationFrame(tick);
  }, [inView, end]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── Image Collage ─────────────────────────────────────────────────────────────
function ImageCollage({ images, flip = false }: { images: string[]; flip?: boolean }) {
  return (
    <div className={`relative h-[440px] ${flip ? "pl-6" : "pr-6"}`}>
      {/* Main image */}
      <motion.div
        className={`absolute inset-0 ${flip ? "left-6" : "right-6"} bottom-6 rounded-3xl overflow-hidden shadow-2xl`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <img src={images[0]} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      </motion.div>

      {/* Floating secondary image */}
      <motion.div
        className={`absolute ${flip ? "right-0 top-8" : "left-0 top-8"} w-40 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-900 z-10`}
        initial={{ opacity: 0, scale: 0.75 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.35 }}
        whileHover={{ scale: 1.07, rotate: flip ? -3 : 3 }}
      >
        <img src={images[1]} alt="" className="w-full h-full object-cover" />
      </motion.div>

      {/* Info card */}
      <motion.div
        className={`absolute ${flip ? "left-0" : "right-0"} bottom-0 z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-strong p-4 w-52 border border-gray-100 dark:border-gray-700`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.55 }}
        whileHover={{ y: -5, boxShadow: "0 24px 48px rgba(0,0,0,0.14)" }}
      >
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
            <FiAward className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white text-sm">Certified</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">by Industry Leaders</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <FiStar key={i} className="w-3.5 h-3.5 text-warning-500 fill-current" />
          ))}
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1.5">5.0 rating</span>
        </div>
      </motion.div>

      {/* Decorative dots */}
      <div className={`absolute ${flip ? "right-10 top-14" : "left-10 top-14"} grid grid-cols-3 gap-1.5 opacity-40`}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary-400 dark:bg-primary-600" />
        ))}
      </div>
      <motion.div
        className={`absolute ${flip ? "left-20 bottom-20" : "right-20 bottom-20"} w-5 h-5 bg-orange-400 rounded-full opacity-70`}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ─── Feature Item ──────────────────────────────────────────────────────────────
function FeatureItem({ icon: Icon, title, description, color, bgColor, delay = 0 }: {
  icon: React.ElementType; title: string; description: string;
  color: string; bgColor: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ x: 5 }}
      className="flex gap-4 group cursor-default"
    >
      <motion.div
        className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}
        whileHover={{ scale: 1.18, rotate: 8 }}
        transition={{ duration: 0.22 }}
      >
        <Icon className={`w-6 h-6 ${color}`} />
      </motion.div>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">{title}</h4>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// ─── Value Card ────────────────────────────────────────────────────────────────
function ValueCard({ icon: Icon, title, description, gradient, delay = 0 }: {
  icon: React.ElementType; title: string; description: string;
  gradient: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, boxShadow: "0 28px 56px rgba(0,0,0,0.12)" }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-soft overflow-hidden group cursor-default"
    >
      {/* Hover shimmer */}
      <motion.div
        className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-400`}
      />
      {/* Icon */}
      <motion.div
        className={`w-14 h-14 ${gradient} rounded-2xl flex items-center justify-center mb-4 shadow-md`}
        whileHover={{ scale: 1.14, rotate: 8 }}
        transition={{ duration: 0.22 }}
      >
        <Icon className="w-7 h-7 text-white" />
      </motion.div>
      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>

      {/* Bottom accent line */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 ${gradient}`}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

// ─── Video Lightbox ────────────────────────────────────────────────────────────
function VideoLightbox({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 bg-black/90 z-50" onClick={onClose} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.88, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.88, y: 20 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative w-full max-w-4xl aspect-video bg-gray-950 rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/30">
                  <FiPlay className="w-16 h-16 mx-auto mb-3 opacity-20" />
                  <p className="text-sm font-medium">Video preview plays here</p>
                </div>
              </div>
              <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors-smooth">
                <FiX className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [videoOpen, setVideoOpen] = useState(false);

  const { data: apiSections } = useApi(() => api.getPageSections("about"), [] as any[]);
  const { data: apiAboutSections } = useApi(() => api.getAboutSections(), [] as any[]);
  const { data: apiAchievements } = useApi(() => api.getAchievements(), [] as any[]);

  // Helper to get section data by key
  const getSection = (key: string) => apiSections.find((s: any) => s.section_key === key);
  const heroData = getSection("about_hero");
  const statsData = getSection("about_stats");
  const visionData = getSection("about_vision");
  const missionData = getSection("about_mission");
  const valuesData = getSection("about_values");
  const milestonesData = getSection("about_milestones");

  const defaultStats = [
    { label: "Students Enrolled",  value: 50000, suffix: "+", icon: FiUsers,      gradient: "from-blue-500 to-primary-600" },
    { label: "Premium Courses",    value: 200,   suffix: "+", icon: FiBookOpen,   gradient: "from-violet-500 to-purple-700" },
    { label: "Years of Excellence",value: 10,    suffix: "+", icon: FiAward,      gradient: "from-orange-400 to-orange-600" },
    { label: "Success Rate",       value: 98,    suffix: "%", icon: FiTrendingUp, gradient: "from-green-500 to-emerald-700" },
  ];

  const stats = statsData?.extra_data?.stats
    ? statsData.extra_data.stats.map((s: any, i: number) => ({
        ...defaultStats[i % defaultStats.length],
        value: Number(s.value) || defaultStats[i % defaultStats.length].value,
        suffix: s.suffix ?? defaultStats[i % defaultStats.length].suffix,
        label: s.label || defaultStats[i % defaultStats.length].label,
      }))
    : defaultStats;

  const defaultVisionFeatures = [
    { icon: FiHeart,   title: "Flexible Learning",  description: "Learn at your own pace with 24/7 access to course materials, live sessions, and recorded content.", color: "text-pink-600 dark:text-pink-400",   bgColor: "bg-pink-100 dark:bg-pink-900/30" },
    { icon: FiGlobe,   title: "Learn From Anywhere", description: "Access world-class education from any device, anywhere in the world, at any time that suits you.", color: "text-blue-600 dark:text-blue-400",   bgColor: "bg-blue-100 dark:bg-blue-900/30" },
    { icon: FiMonitor, title: "Expert Instructors",  description: "Learn from industry professionals with real-world experience who are passionate about teaching.", color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-100 dark:bg-purple-900/30" },
  ];

  const visionFeatures = visionData?.extra_data?.features
    ? visionData.extra_data.features.map((f: any, i: number) => ({
        ...defaultVisionFeatures[i % defaultVisionFeatures.length],
        title: f.title || defaultVisionFeatures[i % defaultVisionFeatures.length].title,
        description: f.description || defaultVisionFeatures[i % defaultVisionFeatures.length].description,
      }))
    : defaultVisionFeatures;

  const defaultMissionFeatures = [
    { icon: FiZap,      title: "Quality Content",   description: "Every course is meticulously crafted with up-to-date content, hands-on projects, and practical assignments.", color: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-100 dark:bg-yellow-900/30" },
    { icon: FiBook,     title: "Industry-Aligned",  description: "Our curriculum is designed with industry partners to ensure you learn exactly what employers need.", color: "text-teal-600 dark:text-teal-400",    bgColor: "bg-teal-100 dark:bg-teal-900/30" },
    { icon: FiAward,    title: "Career Support",    description: "Dedicated placement assistance, resume workshops, and interview preparation to launch your career.", color: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-100 dark:bg-orange-900/30" },
  ];

  const missionFeatures = missionData?.extra_data?.features
    ? missionData.extra_data.features.map((f: any, i: number) => ({
        ...defaultMissionFeatures[i % defaultMissionFeatures.length],
        title: f.title || defaultMissionFeatures[i % defaultMissionFeatures.length].title,
        description: f.description || defaultMissionFeatures[i % defaultMissionFeatures.length].description,
      }))
    : defaultMissionFeatures;

  const iconMap: Record<string, React.ElementType> = {
    FiStar, FiZap, FiGlobe, FiShield, FiHeart, FiTarget,
    FiUsers, FiBookOpen, FiAward, FiTrendingUp, FiMonitor,
    FiBook, FiEye, FiCheckCircle,
  };

  const defaultValues = [
    { icon: FiStar,    title: "Excellence",    description: "We hold ourselves to the highest standards in every course, instructor, and learning experience we deliver.", gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",   delay: 0 },
    { icon: FiZap,     title: "Innovation",    description: "We constantly evolve our teaching methods and technology to deliver the most effective learning environment.", gradient: "bg-gradient-to-br from-blue-400 to-primary-600",   delay: 0.08 },
    { icon: FiGlobe,   title: "Accessibility", description: "Quality education should be available to everyone, regardless of location, background, or financial status.", gradient: "bg-gradient-to-br from-green-400 to-teal-600",     delay: 0.16 },
    { icon: FiShield,  title: "Integrity",     description: "We build trust through transparent communication, honest feedback, and consistently ethical practices.", gradient: "bg-gradient-to-br from-purple-400 to-indigo-600",   delay: 0.24 },
    { icon: FiHeart,   title: "Community",     description: "We foster a vibrant, supportive community of learners who grow together and help each other succeed.", gradient: "bg-gradient-to-br from-pink-400 to-rose-600",       delay: 0.32 },
    { icon: FiTarget,  title: "Impact",        description: "Our measure of success is the tangible impact our education has on learners' careers and lives.", gradient: "bg-gradient-to-br from-orange-400 to-red-500",      delay: 0.4 },
  ];

  const values = valuesData?.extra_data?.values
    ? valuesData.extra_data.values.map((v: any, i: number) => ({
        ...defaultValues[i % defaultValues.length],
        icon: (v.icon && iconMap[v.icon]) || defaultValues[i % defaultValues.length].icon,
        title: v.title || defaultValues[i % defaultValues.length].title,
        description: v.description || defaultValues[i % defaultValues.length].description,
      }))
    : defaultValues;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #1e3a8a 100%)" }}>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.055]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Glow orbs */}
        <motion.div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary-600/25 rounded-full blur-3xl pointer-events-none" animate={{ scale: [1, 1.25, 1], x: [0, 40, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        <motion.div className="absolute top-1/2 right-1/3 w-56 h-56 bg-orange-500/15 rounded-full blur-2xl pointer-events-none" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} />

        {/* Floating geometric shapes */}
        {[
          { top: "15%", left: "8%",  size: "w-12 h-12", rotate: 20,  delay: 0,    shape: "rounded-2xl border-2 border-white/10" },
          { top: "70%", left: "6%",  size: "w-7 h-7",   rotate: 45,  delay: 0.8,  shape: "rounded-lg bg-primary-400/20" },
          { top: "25%", right: "7%", size: "w-10 h-10", rotate: -15, delay: 0.4,  shape: "rounded-full border-2 border-purple-400/20" },
          { top: "75%", right: "5%", size: "w-14 h-14", rotate: 30,  delay: 1.2,  shape: "rounded-3xl border border-orange-400/15" },
        ].map((el, i) => (
          <motion.div
            key={i}
            className={`absolute ${el.size} ${el.shape}`}
            style={{ top: el.top, left: "left" in el ? el.left : undefined, right: "right" in el ? el.right : undefined }}
            animate={{ y: [0, -18, 0], rotate: [el.rotate, el.rotate + 15, el.rotate] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: el.delay }}
          />
        ))}

        <Container className="relative py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: -20, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-5 py-2.5 rounded-full text-sm font-semibold mb-10 shadow-lg">
              <span className="text-xl">🏆</span>{heroData?.extra_data?.badge || "The Leader in Online Learning"}
            </motion.div>

            {/* Title — line by line reveal */}
            <div className="mb-6 space-y-1">
              {(heroData?.title
                ? [
                    { text: heroData.title, className: "text-white" },
                  ]
                : [
                    { text: "Read About Our", className: "text-white" },
                    { text: "Mission & Vision", className: "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300" },
                  ]
              ).map(({ text, className }, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight ${className}`}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.75, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {text}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }} className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {heroData?.content || "Dive in and learn from scratch! Comprehensive courses in Technology, Design, Business and more — empowering you to achieve your biggest goals."}
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}>
                <Link href="/courses" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-primary-500/30 hover:shadow-2xl transition-shadow duration-300 text-sm">
                  {heroData?.extra_data?.cta_text || "Our Courses"} <FiArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}>
                <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/35 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/55 transition-all duration-300 text-sm">
                  Contact Us <FiArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Container>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 leading-[0]">
          <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-14 text-white dark:text-gray-900">
            <path d="M0,56 C360,0 1080,56 1440,0 L1440,56 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ── Stats Strip ─────────────────────────────────────────────────────── */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map(({ label, value, suffix, icon: Icon, gradient }: any, i: number) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -7 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-soft text-center overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />
                <motion.div
                  className={`w-13 h-13 w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md`}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ duration: 0.22 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1 tabular-nums">
                  <Counter end={value} suffix={suffix} />
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-tight">{label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Video Preview ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/30">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-2xl"
            onClick={() => setVideoOpen(true)}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1280&q=80"
              alt="About DigitalNexStep"
              className="w-full h-60 sm:h-80 md:h-[420px] object-cover object-center"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5 }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/65 group-hover:via-black/35 transition-all duration-400" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              {/* Ripple Play Button */}
              <div className="relative">
                <motion.div className="absolute inset-0 rounded-full border-2 border-white/50" animate={{ scale: [1, 1.9], opacity: [0.5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} />
                <motion.div className="absolute inset-0 rounded-full border-2 border-white/30" animate={{ scale: [1, 2.5], opacity: [0.4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.5 }} />
                <motion.div className="relative w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl" whileHover={{ scale: 1.14, backgroundColor: "rgba(255,255,255,1)" }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                  <FiPlay className="w-8 h-8 text-primary-600 ml-1" />
                </motion.div>
              </div>
              <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-white font-semibold text-sm flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <FiEye className="w-4 h-4" />See How We&apos;re Changing Education
              </motion.p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Vision Section ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65 }}
            >
              <ImageCollage
                images={[
                  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&q=80",
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80",
                ]}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold uppercase tracking-widest mb-5">Our Vision</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight">
                {visionData?.title || <>Empowering Learners <br className="hidden sm:block" />
                <span className="gradient-text">Worldwide</span></>}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8">
                {visionData?.content || "We envision a world where high-quality education is accessible to everyone. Through innovative technology and world-class instructors, we're making that vision a reality — one learner at a time."}
              </p>
              <div className="space-y-6">
                {visionFeatures.map((f: any, i: number) => <FeatureItem key={f.title} {...f} delay={i * 0.1} />)}
              </div>
              {/* Highlight bar */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-100 dark:border-primary-800/40"
              >
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiCheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-sm text-primary-800 dark:text-primary-300 font-medium">
                  Trusted by <strong>50,000+</strong> learners across India and beyond
                </p>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Mission Section ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/25">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Content (left) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="order-2 lg:order-1"
            >
              <span className="inline-block px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-bold uppercase tracking-widest mb-5">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight">
                {missionData?.title || <>Transform Education, <br className="hidden sm:block" />
                <span className="gradient-text">Inspire Growth</span></>}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8">
                {missionData?.content || "Our mission is to bridge the gap between education and industry by delivering practical, skills-first learning experiences that transform how people acquire knowledge and build meaningful careers."}
              </p>
              <div className="space-y-6">
                {missionFeatures.map((f: any, i: number) => <FeatureItem key={f.title} {...f} delay={i * 0.1} />)}
              </div>
              {/* Stat highlight */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-800/30"
              >
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiAward className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-sm text-orange-800 dark:text-orange-300 font-medium">
                  <strong>98% success rate</strong> — industry-leading placement outcomes
                </p>
              </motion.div>
            </motion.div>

            {/* Image Collage (right) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65 }}
              className="order-1 lg:order-2"
            >
              <ImageCollage
                images={[
                  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80",
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
                ]}
                flip
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Core Values ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {valuesData?.title || <>Our Core <span className="gradient-text">Values</span></>}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base">
              {valuesData?.content || "The principles that guide everything we do — from how we design courses to how we support every learner."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v: any) => <ValueCard key={v.title} {...v} />)}
          </div>
        </Container>
      </section>

      {/* ── Milestones Timeline ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/25 overflow-hidden">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              {milestonesData?.title || <>Key <span className="gradient-text">Milestones</span></>}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200 dark:from-primary-800 dark:via-primary-600 dark:to-primary-800 -translate-x-1/2" />

            <div className="space-y-10 md:space-y-0">
              {(() => {
                const defaultMilestones = [
                  { year: "2014", title: "Founded with a Vision",    desc: "DigitalNexStep was born with a mission to make quality digital education accessible to every learner.", side: "left",  icon: FiTarget,  color: "from-blue-400 to-primary-600" },
                  { year: "2017", title: "Reached 5,000 Students",   desc: "Our community grew to 5,000+ active learners with a 95% course completion rate — a milestone we're proud of.", side: "right", icon: FiUsers,   color: "from-green-400 to-teal-600" },
                  { year: "2019", title: "Launched 50+ Courses",     desc: "Expanded our catalog to 50+ premium courses across web development, design, data science, and business.", side: "left",  icon: FiBookOpen, color: "from-purple-400 to-indigo-600" },
                  { year: "2022", title: "Industry Partnerships",    desc: "Partnered with top tech companies for placements, live projects, and industry-aligned curriculum development.", side: "right", icon: FiAward,   color: "from-orange-400 to-orange-600" },
                  { year: "2024", title: "50,000+ Learners Strong",  desc: "A thriving community of 50,000+ students, 200+ courses, and counting — with a 98% satisfaction rate.", side: "left",  icon: FiStar,    color: "from-yellow-400 to-orange-500" },
                ];
                const milestones = milestonesData?.extra_data?.milestones
                  ? milestonesData.extra_data.milestones.map((m: any, i: number) => ({
                      ...defaultMilestones[i % defaultMilestones.length],
                      year: m.year || defaultMilestones[i % defaultMilestones.length].year,
                      title: m.title || defaultMilestones[i % defaultMilestones.length].title,
                      desc: m.description || defaultMilestones[i % defaultMilestones.length].desc,
                      side: i % 2 === 0 ? "left" : "right",
                      icon: (m.icon && iconMap[m.icon]) || defaultMilestones[i % defaultMilestones.length].icon,
                    }))
                  : defaultMilestones;
                return milestones;
              })().map((item: any, i: number) => (
                <div key={item.year} className={`md:flex md:items-center ${item.side === "right" ? "md:flex-row-reverse" : ""} md:gap-0`}>
                  <motion.div
                    initial={{ opacity: 0, x: item.side === "left" ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: i * 0.05 }}
                    className={`md:w-[calc(50%-32px)] ${item.side === "right" ? "md:text-left md:pl-10" : "md:text-right md:pr-10"}`}
                  >
                    <motion.div
                      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-soft inline-block max-w-sm w-full text-left"
                    >
                      <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full mb-3 bg-gradient-to-r ${item.color}`}>{item.year}</span>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1.5">{item.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </motion.div>

                  {/* Center icon */}
                  <div className="hidden md:flex w-16 items-center justify-center flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 + 0.2, type: "spring", stiffness: 200 }}
                      className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-lg z-10 relative`}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>

                  <div className="hidden md:block md:w-[calc(50%-32px)]" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)" }}>
        <motion.div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, type: "spring" }} className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FiBookOpen className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Join 50,000+ learners who have transformed their careers with DigitalNexStep. Your future starts here.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
                <Link href="/courses" className="inline-flex items-center gap-2 px-9 py-4 bg-white text-primary-700 font-bold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-xl text-sm">
                  Explore Courses <FiArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
                <Link href="/" className="inline-flex items-center gap-2 px-9 py-4 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/60 transition-all duration-300 text-sm">
                  Back to Home
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      <VideoLightbox isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
      <Footer />
    </div>
  );
}
