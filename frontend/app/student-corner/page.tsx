"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiBookOpen,
  FiAward,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiBarChart2,
  FiTarget,
  FiUsers,
  FiZap,
  FiShield,
  FiSmartphone,
  FiGlobe,
  FiStar,
  FiArrowRight,
  FiPlay,
  FiMessageCircle,
  FiHeart,
  FiThumbsUp,
  FiLayers,
  FiCpu,
  FiRefreshCw,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

/* ═══════════════════════════════════════════════════════
   COUNTER COMPONENT — animated number on scroll
   ═══════════════════════════════════════════════════════ */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    const duration = 2200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

/* ─── Hero Stats ─── */
const heroStats = [
  { label: "Active Students", value: 50000, suffix: "+", icon: FiUsers, color: "from-blue-500 to-indigo-600" },
  { label: "Courses Completed", value: 120000, suffix: "+", icon: FiBookOpen, color: "from-purple-500 to-pink-600" },
  { label: "Success Rate", value: 96, suffix: "%", icon: FiTrendingUp, color: "from-green-500 to-emerald-600" },
  { label: "Avg. Score Boost", value: 34, suffix: "%", icon: FiBarChart2, color: "from-orange-500 to-red-500" },
];

/* ─── Benefits ─── */
const benefits = [
  {
    icon: FiTarget,
    title: "Personalized Learning Path",
    description:
      "AI analyzes your strengths and weaknesses to build a study plan tailored to you — no generic syllabus, just what you need.",
    color: "from-blue-500 to-indigo-600",
    accent: "blue",
  },
  {
    icon: FiBarChart2,
    title: "Real-Time Progress Tracking",
    description:
      "Visual dashboards show exactly where you stand. Track scores, streaks, time spent, and improvement trends at a glance.",
    color: "from-purple-500 to-pink-600",
    accent: "purple",
  },
  {
    icon: FiClock,
    title: "Practice Anytime, Anywhere",
    description:
      "Access mock tests, quizzes, and study material 24/7 from any device. Your classroom fits in your pocket.",
    color: "from-green-500 to-emerald-600",
    accent: "green",
  },
  {
    icon: FiZap,
    title: "Instant Result & Feedback",
    description:
      "Get detailed scores, correct answers, and explanations the moment you submit — no waiting, no guessing.",
    color: "from-orange-500 to-red-500",
    accent: "orange",
  },
  {
    icon: FiAward,
    title: "Certificates & Badges",
    description:
      "Earn verifiable digital certificates and achievement badges that boost your resume and college applications.",
    color: "from-yellow-500 to-amber-600",
    accent: "yellow",
  },
  {
    icon: FiShield,
    title: "Secure & Fair Exams",
    description:
      "AI-proctored assessments ensure a level playing field. Your hard work is rewarded, not someone else's shortcuts.",
    color: "from-cyan-500 to-blue-600",
    accent: "cyan",
  },
];

/* ─── How It Works Steps ─── */
const steps = [
  {
    step: 1,
    title: "Sign Up & Set Goals",
    description: "Create your free account, pick your exam or course, and tell us your target score.",
    icon: FiUsers,
    color: "from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title: "Get Your Smart Plan",
    description: "Our AI builds a day-by-day schedule with topics, quizzes, and revision checkpoints.",
    icon: FiCpu,
    color: "from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title: "Practice & Learn",
    description: "Solve questions, take mock tests, and watch concept videos at your own pace.",
    icon: FiBookOpen,
    color: "from-green-500 to-emerald-600",
  },
  {
    step: 4,
    title: "Track & Improve",
    description: "Review analytics, spot weak areas, and let AI adjust your plan in real-time.",
    icon: FiRefreshCw,
    color: "from-orange-500 to-red-500",
  },
  {
    step: 5,
    title: "Ace Your Exam",
    description: "Walk into your exam confident, prepared, and ahead of the curve.",
    icon: FiAward,
    color: "from-yellow-500 to-amber-600",
  },
];

/* ─── Features Grid ─── */
const features = [
  { icon: FiSmartphone, title: "Mobile Friendly", desc: "Full experience on phone, tablet, or desktop." },
  { icon: FiGlobe, title: "Multi-Language", desc: "Switch between English, Hindi, and regional languages." },
  { icon: FiLayers, title: "Chapter-Wise Tests", desc: "Practice by chapter, topic, or full-length mock exam." },
  { icon: FiCpu, title: "AI Doubt Solver", desc: "Stuck on a question? Get instant AI-powered explanations." },
  { icon: FiStar, title: "Leaderboard", desc: "Compete with peers and climb the ranks for extra motivation." },
  { icon: FiMessageCircle, title: "Discussion Forum", desc: "Ask questions, share tips, and learn from the community." },
];

/* ─── Testimonials ─── */
const testimonials = [
  {
    name: "Priya Sharma",
    role: "JEE Advanced — AIR 342",
    quote:
      "DigitalNexStep's mock tests were almost identical to the real paper. The analytics showed me exactly where I was losing marks, and I fixed those gaps in just 3 weeks.",
    avatar: "PS",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Rahul Verma",
    role: "NEET UG — 680/720",
    quote:
      "The personalized study plan saved me from wasting time on topics I already knew. I focused on weak areas and saw a 45-mark jump in my last mock test.",
    avatar: "RV",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Ananya Iyer",
    role: "UPSC Prelims — Cleared",
    quote:
      "The current affairs section and daily quizzes kept me updated without information overload. The certificates also helped during my interview round.",
    avatar: "AI",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Mohammed Faisal",
    role: "CAT — 99.2 percentile",
    quote:
      "I loved the timed sectional tests. They trained me to manage time under pressure. The leaderboard kept me competitive every single day.",
    avatar: "MF",
    color: "from-orange-500 to-red-500",
  },
];

/* ═══════════════════════════════════════════════════════
   ANIMATED SECTION WRAPPER
   ═══════════════════════════════════════════════════════ */
function AnimatedBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */
/* ─── Icon map for API data ─── */
const iconMap: Record<string, React.ElementType> = {
  FiBookOpen, FiAward, FiTrendingUp, FiClock, FiCheckCircle,
  FiBarChart2, FiTarget, FiUsers, FiZap, FiShield,
  FiSmartphone, FiGlobe, FiStar, FiLayers, FiCpu, FiRefreshCw,
  FiMessageCircle,
};

export default function StudentCornerPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { data: apiSections } = useApi(() => api.getPageSections("student-corner"), [] as any[]);
  const getSection = (key: string) => apiSections.find((s: any) => s.section_key === key);
  const heroData = getSection("student_hero");
  const benefitsData = getSection("student_benefits");
  const howItWorksData = getSection("student_how_it_works");
  const featuresData = getSection("student_features");
  const testimonialsData = getSection("student_testimonials");

  /* Dynamic data with static fallbacks */
  const displayHeroStats = heroData?.extra_data?.stats?.length > 0
    ? heroData.extra_data.stats.map((stat: any, i: number) => ({
        label: stat.label || heroStats[i]?.label || "",
        value: Number(stat.value) || heroStats[i]?.value || 0,
        suffix: stat.suffix || heroStats[i]?.suffix || "",
        icon: iconMap[stat.icon] || heroStats[i]?.icon || FiUsers,
        color: heroStats[i]?.color || "from-blue-500 to-indigo-600",
      }))
    : heroStats;

  const displayBenefits = benefitsData?.extra_data?.benefits?.length > 0
    ? benefitsData.extra_data.benefits.map((b: any, i: number) => ({
        icon: iconMap[b.icon] || benefits[i]?.icon || FiTarget,
        title: b.title || benefits[i]?.title || "",
        description: b.description || benefits[i]?.description || "",
        color: benefits[i]?.color || "from-blue-500 to-indigo-600",
        accent: benefits[i]?.accent || "blue",
      }))
    : benefits;

  const displaySteps = howItWorksData?.extra_data?.steps?.length > 0
    ? howItWorksData.extra_data.steps.map((s: any, i: number) => ({
        step: s.step || i + 1,
        title: s.title || steps[i]?.title || "",
        description: s.description || steps[i]?.description || "",
        icon: iconMap[s.icon] || steps[i]?.icon || FiUsers,
        color: steps[i]?.color || "from-blue-500 to-indigo-600",
      }))
    : steps;

  const displayFeatures = featuresData?.extra_data?.features?.length > 0
    ? featuresData.extra_data.features.map((f: any, i: number) => ({
        icon: iconMap[f.icon] || features[i]?.icon || FiSmartphone,
        title: f.title || features[i]?.title || "",
        desc: f.description || features[i]?.desc || "",
      }))
    : features;

  const displayTestimonials = testimonialsData?.extra_data?.testimonials?.length > 0
    ? testimonialsData.extra_data.testimonials.map((t: any, i: number) => ({
        name: t.name || testimonials[i]?.name || "",
        role: t.achievement || testimonials[i]?.role || "",
        quote: t.quote || testimonials[i]?.quote || "",
        avatar: (t.name || "").split(" ").map((w: string) => w[0]).join("").slice(0, 2) || testimonials[i]?.avatar || "",
        color: testimonials[i]?.color || "from-blue-500 to-indigo-600",
      }))
    : testimonials;

  return (
    <>
      <Header />

      {/* ──────────────────── HERO ──────────────────── */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a]">
        {/* Animated Glow Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 11, delay: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-400/8 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <Container className="relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/15 text-white rounded-full text-sm font-semibold tracking-wider">
              <FiBookOpen className="w-4 h-4 text-yellow-400" />
              STUDENT CORNER
            </span>
          </motion.div>

          {/* Title */}
          <div className="text-center overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
            >
              {heroData?.title || "Your Success Starts"}{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                {heroData?.extra_data?.highlight || "Here"}
              </span>
            </motion.h1>
          </div>
          <div className="text-center overflow-hidden mb-8">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
              className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed"
            >
              {heroData?.content || "Everything you need to prepare smarter, practice harder, and score higher — all in one powerful student panel."}
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/35 transition-all duration-300 hover:-translate-y-0.5">
              Start Learning Free
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5">
              <FiPlay className="w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {displayHeroStats.map((stat: any, i: number) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative bg-white/[0.06] backdrop-blur-lg border border-white/10 rounded-2xl p-5 text-center group hover:bg-white/[0.1] transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-blue-200/70 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ──────────────────── WHY STUDENTS LOVE US ──────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 -right-40 w-80 h-80 bg-purple-200/20 dark:bg-purple-600/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 -left-40 w-80 h-80 bg-blue-200/20 dark:bg-blue-600/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 12, delay: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <Container className="relative z-10">
          <AnimatedBlock className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold mb-4">
              <FiHeart className="w-4 h-4" />
              Why Students Love Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
              Built for{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Student Success
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Every feature is designed with one goal — helping you learn faster,
              retain more, and achieve your dream score.
            </p>
          </AnimatedBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayBenefits.map((benefit: any, i: number) => {
              const Icon = benefit.icon;
              return (
                <AnimatedBlock key={benefit.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="group relative h-full bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500 overflow-hidden"
                  >
                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-purple-50/50 group-hover:via-transparent group-hover:to-pink-50/50 dark:group-hover:from-purple-900/10 dark:group-hover:via-transparent dark:group-hover:to-pink-900/10 transition-all duration-700" />
                    {/* Bottom accent line */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    />

                    <div className="relative z-10">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatedBlock>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ──────────────────── HOW IT WORKS ──────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(139,92,246,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <Container className="relative z-10">
          <AnimatedBlock className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
              <FiTarget className="w-4 h-4" />
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
              From Sign-Up to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Success
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Five simple steps to transform your preparation and crush your exams.
            </p>
          </AnimatedBlock>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 opacity-20 md:-translate-x-px" />

            {displaySteps.map((item: any, i: number) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;
              return (
                <AnimatedBlock key={item.step} delay={i * 0.1}>
                  <div
                    className={`relative flex items-start gap-6 mb-12 md:mb-16 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content Card */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`flex-1 ml-16 md:ml-0 ${isLeft ? "md:pr-16" : "md:pl-16"}`}
                    >
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-600 transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} text-white text-sm font-bold shadow`}
                          >
                            {item.step}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Center Circle */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>

                    {/* Spacer */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </AnimatedBlock>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ──────────────────── FEATURES GRID ──────────────────── */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        <Container className="relative z-10">
          <AnimatedBlock className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold mb-4">
              <FiZap className="w-4 h-4" />
              Packed with Power
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
              Everything You{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Need
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A toolkit built by students, for students — every feature solves a
              real problem.
            </p>
          </AnimatedBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayFeatures.map((feat: any, i: number) => {
              const Icon = feat.icon;
              return (
                <AnimatedBlock key={feat.title} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    className="group flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {feat.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatedBlock>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ──────────────────── TESTIMONIALS ──────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <Container className="relative z-10">
          <AnimatedBlock className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-semibold mb-4">
              <FiThumbsUp className="w-4 h-4" />
              Student Stories
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
              Hear from{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Toppers
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real students, real scores, real results. See how DigitalNexStep made a difference.
            </p>
          </AnimatedBlock>

          {/* Testimonial Cards — horizontally scrollable on mobile, tabs on desktop */}
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              {displayTestimonials.map((t: any, i: number) => (
                <button
                  key={t.name}
                  onClick={() => setActiveTestimonial(i)}
                  className="relative"
                >
                  {activeTestimonial === i && (
                    <motion.div
                      layoutId="activeTestimonialBg"
                      className={`absolute inset-0 bg-gradient-to-r ${t.color} rounded-full shadow-lg`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                      activeTestimonial === i
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        activeTestimonial === i
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {t.avatar}
                    </span>
                    <span className="hidden sm:inline">{t.name.split(" ")[0]}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-700/30 rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 dark:border-gray-600"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${displayTestimonials[activeTestimonial].color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                  >
                    {displayTestimonials[activeTestimonial].avatar}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {displayTestimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      {displayTestimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed italic">
                  &ldquo;{displayTestimonials[activeTestimonial].quote}&rdquo;
                </blockquote>
                <div className="flex gap-1 mt-5">
                  {[...Array(5)].map((_, j) => (
                    <FiStar key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* ──────────────────── CTA ──────────────────── */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-400/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, delay: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <Container className="relative z-10 text-center">
          <AnimatedBlock>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 mb-8 shadow-2xl shadow-yellow-500/25"
            >
              <FiBookOpen className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Preparation?
              </span>
            </h2>
            <p className="text-lg text-indigo-200/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join 50,000+ students who are already studying smarter. Sign up now
              and get your personalized study plan — it&apos;s completely free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="group inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-lg rounded-xl shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/35 transition-all duration-300 hover:-translate-y-0.5">
                Get Started for Free
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center gap-2 px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5">
                <FiMessageCircle className="w-5 h-5" />
                Talk to Us
              </button>
            </div>
          </AnimatedBlock>
        </Container>
      </section>

      <Footer />
    </>
  );
}
