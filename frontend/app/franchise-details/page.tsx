"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  FiAward, FiShield, FiGlobe, FiCheckCircle, FiUsers, FiBookOpen,
  FiArrowRight, FiStar, FiZap, FiTrendingUp, FiFileText, FiSearch,
  FiPhone, FiMail, FiLayers, FiTarget, FiUserCheck, FiClock,
  FiBriefcase, FiCpu,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

/* ─── Animated counter ─── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = React.useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  React.useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const dur = 2200;
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

/* ─── Floating orbs ─── */
function FloatingOrbs() {
  const orbs = [
    { size: 350, x: "5%", y: "15%", color: "bg-primary-500/15", dur: 9 },
    { size: 280, x: "85%", y: "55%", color: "bg-purple-500/15", dur: 11 },
    { size: 220, x: "45%", y: "75%", color: "bg-pink-500/10", dur: 8 },
    { size: 200, x: "70%", y: "10%", color: "bg-cyan-500/10", dur: 10 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${orb.color} blur-[100px]`}
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ y: [0, -35, 0], x: [0, 15, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: orb.dur, delay: i * 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Section fade-in wrapper ─── */
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */
const stats = [
  { value: 200, suffix: "+", label: "Courses Offered", icon: FiBookOpen },
  { value: 500, suffix: "+", label: "Franchise Centers", icon: FiGlobe },
  { value: 10000, suffix: "+", label: "Students Placed", icon: FiUsers },
  { value: 15, suffix: "+", label: "Years Experience", icon: FiClock },
];

const certifications = [
  {
    title: "ISO 9001:2008 (JAS-ANZ)",
    body: "Certified via The Joint Accreditation System of Australia and New Zealand by Equalitas Certifications Ltd.",
    certNo: "Q-02151028",
    icon: FiShield,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "ISO 9001:2008 (UASL)",
    body: "Certified by United Ackreditering Services Limited (UASL).",
    certNo: "QMS/02920/1015",
    icon: FiAward,
    gradient: "from-purple-500 to-violet-600",
  },
  {
    title: "Employment Exchange",
    body: "DITRP Certificate is accepted by Employment Exchange, Government of Maharashtra for Student Registration as Educated Unemployed.",
    certNo: "Govt. Recognized",
    icon: FiFileText,
    gradient: "from-emerald-500 to-teal-600",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Enquiry & Application",
    desc: "Fill our franchise form or write to us. Our team will reach out to explain various aspects including operational and legal angles.",
    icon: FiMail,
    color: "primary",
  },
  {
    step: 2,
    title: "Verification & Assessment",
    desc: "We verify infrastructure, medium of instruction (English, Hindi, or regional language), qualified staff, and adherence to prescribed rules.",
    icon: FiSearch,
    color: "purple",
  },
  {
    step: 3,
    title: "Documentation",
    desc: "Complete the documentation process including legal agreements, brand usage terms, and operational guidelines.",
    icon: FiFileText,
    color: "pink",
  },
  {
    step: 4,
    title: "Approval & Launch",
    desc: "On successful verification, we grant rights to promote DITRP courses, use our brand & logo as an authorized franchise center.",
    icon: FiCheckCircle,
    color: "emerald",
  },
];

const whyChoose = [
  { icon: FiLayers, title: "200+ Courses", desc: "Vast library of vocational & career-focused courses designed for modern times." },
  { icon: FiTarget, title: "Quality Assurance", desc: "ISO certified with strict conformity assessment criteria for all centers." },
  { icon: FiUserCheck, title: "Placement Support", desc: "Students successfully placed in secure jobs across industries." },
  { icon: FiBriefcase, title: "Industry Tie-ups", desc: "Partnerships with IT firms delivering latest market knowledge." },
  { icon: FiCpu, title: "IT Association", desc: "Business partnerships with IT companies for up-to-date training." },
  { icon: FiTrendingUp, title: "Growth Together", desc: "Rising demand for career-focused curriculum drives mutual growth." },
];

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function FranchiseDetailsPage() {
  return (
    <>
      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gray-950 py-24 lg:py-32">
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
          <div className="relative text-center max-w-4xl mx-auto">
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
                Franchise Details
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6"
            >
              Partner With{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  DITRP
                </span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                >
                  <motion.path
                    d="M2 8 C50 2, 150 2, 198 8"
                    stroke="url(#detail-underline)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                  <defs>
                    <linearGradient id="detail-underline" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="50%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>{" "}
              India
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto"
            >
              DITRP (Digital Information Technology & Research for Professionals) is an{" "}
              <span className="text-primary-400 font-semibold">ISO 9001:2008 Certified</span>{" "}
              Educational Organisation engaged in designing vocational & career-focused courses for
              institutes countrywide.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5"
            >
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
                    className="relative group p-5 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                      <Counter end={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-xs text-gray-500 mt-1 tracking-wide uppercase font-medium">{s.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── ABOUT DITRP ── */}
      <section className="relative py-20 lg:py-28 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-950 to-transparent dark:block hidden" />

        <Container>
          <div className="relative max-w-5xl mx-auto">
            <FadeInSection>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3">
                  <FiZap className="w-4 h-4" />
                  ABOUT DITRP
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                  Empowering Education{" "}
                  <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                    Nationwide
                  </span>
                </h2>
              </div>
            </FadeInSection>

            {/* Two-column about text with accent card */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              {/* Left content — 3 cols */}
              <FadeInSection className="lg:col-span-3 space-y-6">
                <div className="relative p-6 rounded-2xl border border-primary-100 dark:border-primary-900/30 bg-primary-50/50 dark:bg-primary-900/10">
                  <div className="absolute -top-3 left-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-600 text-white">
                      Our Mission
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
                    DITRP has tie-ups with related educational organisations, supported by other IT firms
                    that enables us to provide better services. Its associations with IT industry companies,
                    as business partners, gratify up-to-date, latest updated knowledge of the IT market
                    from time to time.
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We offer franchisee of over <span className="font-bold text-gray-900 dark:text-white">200+ courses</span>.
                  Our courses are suitable for new institutes as well as existing ones wanting to improve the quality
                  of education they offer. The quality of our courses is bound to strengthen your reputation amid
                  target audience.
                </p>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our courses are relevant for modern times, working environment, and demand of employers.
                  We have a Conformity Assessment criteria that institutes interested in getting affiliated
                  with us are required to undergo.
                </p>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  When we are convinced about specified standards & quality, we allow institutes to use our brand,
                  logo and approve them under{" "}
                  <span className="font-bold text-primary-600 dark:text-primary-400">
                    DITRP Certified Courses
                  </span>{" "}
                  franchisee centers.
                </p>
              </FadeInSection>

              {/* Right accent column — 2 cols */}
              <FadeInSection className="lg:col-span-2 space-y-5" delay={0.2}>
                {/* Accreditation card */}
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary-500/40 via-purple-500/20 to-pink-500/40" />
                  <div className="relative rounded-2xl bg-white dark:bg-gray-900 p-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center mb-4">
                      <FiShield className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Accreditation</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Accreditation for us is nothing but a symbol of assurance, a confirmation that you
                      adhere to specified standards to make the process of learning interesting and effective.
                    </p>
                  </div>
                </div>

                {/* Placement card */}
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-emerald-500/40 via-teal-500/20 to-cyan-500/40" />
                  <div className="relative rounded-2xl bg-white dark:bg-gray-900 p-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
                      <FiBriefcase className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Placement Track Record</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Students who have successfully completed our programs through various Authorized
                      Training Centers are placed in good, secure jobs. We have thus played an important
                      role in each other&apos;s growth!
                    </p>
                  </div>
                </div>

                {/* Growth card */}
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-500/40 via-orange-500/20 to-rose-500/40" />
                  <div className="relative rounded-2xl bg-white dark:bg-gray-900 p-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4">
                      <FiTrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Marching Forward</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      With rising awareness and demand for career-focused curriculum, we march forward
                      together with our franchise partners toward a brighter future!
                    </p>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="relative py-20 lg:py-28 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <Container>
          <FadeInSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3">
              <FiAward className="w-4 h-4" />
              CERTIFICATIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Internationally{" "}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Recognized
              </span>
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <FadeInSection key={i} delay={i * 0.12}>
                  <div className="group relative h-full" style={{ perspective: "1000px" }}>
                    {/* Glow on hover */}
                    <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                    <div className="relative h-full rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cert.gradient} p-[2px] mb-5`}>
                        <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                          <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>

                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                        {cert.body}
                      </p>

                      {/* Certificate number badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                        <FiFileText className="w-3.5 h-3.5 text-primary-500" />
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300 tracking-wide">
                          {cert.certNo}
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="relative py-20 lg:py-28 bg-white dark:bg-gray-950 overflow-hidden">
        <Container>
          <FadeInSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3">
              <FiStar className="w-4 h-4" />
              WHY CHOOSE DITRP
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              What Makes Us{" "}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Different
              </span>
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyChoose.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeInSection key={i} delay={i * 0.08}>
                  <div className="group relative p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    {/* Spotlight glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1.5">{item.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── FRANCHISE PROCESS ── */}
      <section className="relative py-20 lg:py-28 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <Container>
          <FadeInSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3">
              <FiLayers className="w-4 h-4" />
              FRANCHISEE PROCESS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              How It{" "}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              For institutes interested in getting more information about our courses or franchisee
              process, here is how the journey unfolds.
            </p>
          </FadeInSection>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] bg-gray-200 dark:bg-gray-800 md:-translate-x-[1.5px]" />

            {processSteps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              const colorMap: Record<string, string> = {
                primary: "from-primary-500 to-primary-600",
                purple: "from-purple-500 to-purple-600",
                pink: "from-pink-500 to-pink-600",
                emerald: "from-emerald-500 to-emerald-600",
              };
              const gradient = colorMap[step.color];

              return (
                <FadeInSection
                  key={i}
                  delay={i * 0.15}
                  className={`relative flex items-start gap-6 mb-12 last:mb-0 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 md:w-[calc(50%-2rem)] ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="group relative p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} text-white text-sm font-bold`}>
                          {step.step}
                        </span>
                        <h4 className="font-bold text-gray-900 dark:text-white">{step.title}</h4>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex-shrink-0 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.15 + 0.2, type: "spring" }}
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block flex-1 md:w-[calc(50%-2rem)]" />
                </FadeInSection>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── REAL-TIME VERIFICATION ── */}
      <section className="relative py-20 lg:py-28 bg-white dark:bg-gray-950 overflow-hidden">
        <Container>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <FadeInSection>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 mb-4">
                <FiSearch className="w-4 h-4" />
                REAL-TIME VERIFICATION
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                Instant Certificate{" "}
                <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Verification
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Any private or public sector organization hiring candidates based on certificates
                issued by DITRP can verify details online in real time from our website by typing
                the registration number of the certificate.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                If it is a genuine document awarded by DITRP, all the information about the candidate
                will appear on screen within seconds. Quick, transparent, and trusted.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/verification"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:brightness-110 transition-all"
                >
                  <FiSearch className="w-4 h-4" />
                  Verify Certificate
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  <FiPhone className="w-4 h-4" />
                  Contact Us
                </Link>
              </div>
            </FadeInSection>

            {/* Right — verification illustration */}
            <FadeInSection delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-500/10 via-purple-500/5 to-pink-500/10 blur-2xl" />
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-8 overflow-hidden">
                  {/* Mock verification UI */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                        <FiSearch className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">Certificate Verification</p>
                        <p className="text-xs text-gray-500">Enter registration number below</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-400 font-mono">
                        DITRP-2024-XXXXX
                      </div>
                      <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white text-sm font-semibold">
                        Verify
                      </div>
                    </div>

                    {/* Mock result */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      whileInView={{ opacity: 1, height: "auto" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="rounded-xl border border-green-200 dark:border-green-800/30 bg-green-50 dark:bg-green-900/10 p-4"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="font-bold text-green-700 dark:text-green-400 text-sm">Certificate Verified</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-gray-400 uppercase tracking-wider font-medium">Name</p>
                          <p className="text-gray-700 dark:text-gray-300 font-semibold mt-0.5">John Doe</p>
                        </div>
                        <div>
                          <p className="text-gray-400 uppercase tracking-wider font-medium">Course</p>
                          <p className="text-gray-700 dark:text-gray-300 font-semibold mt-0.5">Web Development</p>
                        </div>
                        <div>
                          <p className="text-gray-400 uppercase tracking-wider font-medium">Center</p>
                          <p className="text-gray-700 dark:text-gray-300 font-semibold mt-0.5">Mumbai Branch</p>
                        </div>
                        <div>
                          <p className="text-gray-400 uppercase tracking-wider font-medium">Status</p>
                          <p className="text-green-600 dark:text-green-400 font-bold mt-0.5">Completed</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </Container>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary-900 to-purple-900" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(96,165,250,0.3), transparent 50%), radial-gradient(circle at 80% 50%, rgba(168,85,247,0.3), transparent 50%)",
          }}
        />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative py-20 lg:py-24 text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
              <FiStar className="w-4 h-4 text-amber-400" />
              <span className="text-white/70 text-sm font-medium">Start Your Journey</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              Ready to Become a Partner?
            </h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              We welcome you to explore and join our growing network. Fill the registration form
              or contact us to learn more.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/franchise">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 p-[2px]">
                    <div className="w-full h-full rounded-2xl bg-gray-900" />
                  </div>
                  <span className="relative text-white flex items-center gap-3">
                    <FiFileText className="w-5 h-5" />
                    Apply Now
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
              >
                <FiPhone className="w-5 h-5" />
                Talk to Us
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
