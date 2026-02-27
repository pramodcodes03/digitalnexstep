"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMonitor, FiSmartphone, FiGlobe, FiShield, FiDatabase,
  FiCpu, FiCloud, FiLayers, FiCode, FiTrendingUp,
  FiArrowRight, FiPackage, FiSend, FiStar, FiZap,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import EnquiryModal from "@/components/ui/EnquiryModal";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

/* ─── Product data ─── */
interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  gradient: string;
  glowColor: string;
  icon: React.ElementType;
  tags: string[];
}

const products: Product[] = [
  {
    id: 1,
    title: "Smart ERP System",
    description:
      "All-in-one Enterprise Resource Planning solution — manage admissions, attendance, fees, payroll, and reporting from a single dashboard.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
    glowColor: "rgba(59,130,246,0.35)",
    icon: FiMonitor,
    tags: ["ERP", "Management"],
  },
  {
    id: 2,
    title: "Mobile Learning App",
    description:
      "Feature-rich mobile application for students to access courses, live classes, assignments, and results on the go.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    gradient: "from-emerald-500 via-emerald-600 to-teal-700",
    glowColor: "rgba(16,185,129,0.35)",
    icon: FiSmartphone,
    tags: ["Mobile", "E-Learning"],
  },
  {
    id: 3,
    title: "Institute Website Builder",
    description:
      "Professional, SEO-optimised websites for coaching centers with built-in CMS, lead forms, and online registration.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    gradient: "from-violet-500 via-purple-600 to-purple-700",
    glowColor: "rgba(139,92,246,0.35)",
    icon: FiGlobe,
    tags: ["Website", "CMS"],
  },
  {
    id: 4,
    title: "Online Exam Platform",
    description:
      "Secure online examinations with AI-proctoring, auto-evaluation, detailed analytics, and certificate generation.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
    gradient: "from-orange-500 via-orange-600 to-red-600",
    glowColor: "rgba(249,115,22,0.35)",
    icon: FiShield,
    tags: ["Exam", "AI Proctoring"],
  },
  {
    id: 5,
    title: "Student Database & CRM",
    description:
      "Powerful CRM to manage enquiries, follow-ups, admissions pipeline, and alumni relations with automated workflows.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    gradient: "from-cyan-500 via-cyan-600 to-blue-700",
    glowColor: "rgba(6,182,212,0.35)",
    icon: FiDatabase,
    tags: ["CRM", "Automation"],
  },
  {
    id: 6,
    title: "AI-Powered Analytics",
    description:
      "AI-driven insights on student performance, attendance trends, revenue forecasting, and operational efficiency.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80",
    gradient: "from-pink-500 via-rose-500 to-rose-700",
    glowColor: "rgba(236,72,153,0.35)",
    icon: FiCpu,
    tags: ["AI", "Analytics"],
  },
  {
    id: 7,
    title: "Cloud Hosting Solutions",
    description:
      "Reliable, scalable cloud infrastructure with 99.9% uptime, automatic backups, and enterprise-grade security.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    gradient: "from-sky-400 via-sky-500 to-indigo-600",
    glowColor: "rgba(56,189,248,0.35)",
    icon: FiCloud,
    tags: ["Cloud", "Hosting"],
  },
  {
    id: 8,
    title: "Digital Content Studio",
    description:
      "Create engaging e-learning content — video lectures, interactive quizzes, PDF materials, and SCORM-compliant packages.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
    gradient: "from-amber-500 via-amber-600 to-orange-700",
    glowColor: "rgba(245,158,11,0.35)",
    icon: FiLayers,
    tags: ["Content", "E-Learning"],
  },
  {
    id: 9,
    title: "Custom Software Dev",
    description:
      "Bespoke solutions tailored to your institute — from attendance kiosks to integrated payment gateways.",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop",
    gradient: "from-lime-500 via-green-600 to-emerald-700",
    glowColor: "rgba(132,204,22,0.35)",
    icon: FiCode,
    tags: ["Custom", "Development"],
  },
];

/* ─── Icon & gradient maps for API data ─── */
const iconMap: Record<string, React.ElementType> = {
  FiMonitor, FiSmartphone, FiGlobe, FiShield, FiDatabase,
  FiCpu, FiCloud, FiLayers, FiCode, FiTrendingUp, FiPackage,
};

const defaultGradients = [
  { gradient: "from-blue-500 via-blue-600 to-indigo-700", glowColor: "rgba(59,130,246,0.35)" },
  { gradient: "from-emerald-500 via-emerald-600 to-teal-700", glowColor: "rgba(16,185,129,0.35)" },
  { gradient: "from-violet-500 via-purple-600 to-purple-700", glowColor: "rgba(139,92,246,0.35)" },
  { gradient: "from-orange-500 via-orange-600 to-red-600", glowColor: "rgba(249,115,22,0.35)" },
  { gradient: "from-cyan-500 via-cyan-600 to-blue-700", glowColor: "rgba(6,182,212,0.35)" },
  { gradient: "from-pink-500 via-rose-500 to-rose-700", glowColor: "rgba(236,72,153,0.35)" },
  { gradient: "from-sky-400 via-sky-500 to-indigo-600", glowColor: "rgba(56,189,248,0.35)" },
  { gradient: "from-amber-500 via-amber-600 to-orange-700", glowColor: "rgba(245,158,11,0.35)" },
  { gradient: "from-lime-500 via-green-600 to-emerald-700", glowColor: "rgba(132,204,22,0.35)" },
];

/* ─── 3D Tilt Product Card ─── */
function ProductCard({
  product,
  index,
  onEnquiry,
}: {
  product: Product;
  index: number;
  onEnquiry: (name: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
    setTilt({
      x: ((y - 50) / 50) * -8,
      y: ((x - 50) / 50) * 8,
    });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const Icon = product.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: "easeOut" }}
      className="group"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
        }}
        className="relative rounded-2xl overflow-hidden will-change-transform"
      >
        {/* Animated gradient border */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_3s_linear_infinite] blur-[1px]" />

        {/* Spotlight glow on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 z-10 pointer-events-none rounded-2xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(350px circle at ${mousePos.x}% ${mousePos.y}%, ${product.glowColor}, transparent 60%)`,
            }}
          />
        )}

        {/* Card body */}
        <div className="relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-700/50 overflow-hidden">
          {/* Image section */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Mesh gradient overlay on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-multiply`}
            />

            {/* Floating icon */}
            <motion.div
              className="absolute top-4 left-4 z-20"
              whileHover={{ rotate: 12, scale: 1.15 }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${product.gradient} p-[1px] shadow-lg`}>
                <div className="w-full h-full rounded-2xl bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Tags — bottom of image */}
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2 z-20">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/15 text-white backdrop-blur-md border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-purple-500 transition-all duration-300">
              {product.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
              {product.description}
            </p>

            {/* Enquiry Button — shimmer effect */}
            <button
              onClick={() => onEnquiry(product.title)}
              className="relative w-full overflow-hidden rounded-xl py-3 text-sm font-bold text-white shadow-lg active:scale-[0.97] transition-transform duration-150"
            >
              {/* Button gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient}`} />
              {/* Shimmer sweep */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </div>
              <span className="relative flex items-center justify-center gap-2">
                <FiSend className="w-4 h-4" />
                Enquiry Now
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Floating particles for hero ─── */
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary-400/20 dark:bg-primary-400/10"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Stats counter ─── */
const stats = [
  { value: "50+", label: "Products Delivered" },
  { value: "200+", label: "Happy Clients" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function ProductsPage() {
  const [enquiryProduct, setEnquiryProduct] = useState<string | null>(null);

  const { data: apiSections } = useApi(() => api.getPageSections("products"), [] as any[]);
  const heroData = apiSections.find((s: any) => s.section_key === "products_hero");

  const { data: apiProducts } = useApi(() => api.getProducts(), [] as any[]);

  const displayProducts: Product[] = apiProducts.length > 0
    ? apiProducts.map((item: any, i: number) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image || products[i % products.length]?.image || "",
        gradient: defaultGradients[i % defaultGradients.length].gradient,
        glowColor: defaultGradients[i % defaultGradients.length].glowColor,
        icon: iconMap[item.icon] || FiPackage,
        tags: item.tags || [],
      }))
    : products;

  return (
    <>
      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gray-950 py-24 lg:py-32">
        {/* Animated mesh background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <FloatingParticles />

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
                Our Products
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6"
            >
              {heroData?.title || "Digital Solutions That"}{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {heroData?.subtitle || "Transform"}
                </span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <motion.path
                    d="M2 8 C50 2, 150 2, 198 8"
                    stroke="url(#underline-grad)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                  <defs>
                    <linearGradient id="underline-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="50%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
              {" "}{heroData?.extra_data?.highlight || "Education"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
            >
              {heroData?.content || "Explore our comprehensive suite of cutting-edge products designed to empower educational institutions with technology."}
            </motion.p>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10"
            >
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 tracking-wide uppercase font-medium">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section className="relative py-20 lg:py-28 bg-gray-50 dark:bg-gray-950 overflow-hidden">
        {/* Subtle top gradient fade from hero */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-950 to-transparent dark:block hidden" />

        <Container>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3">
              <FiZap className="w-4 h-4" />
              EXPLORE OUR RANGE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Products Built for{" "}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {displayProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onEnquiry={setEnquiryProduct}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden">
        {/* Full-width gradient bg */}
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
              <span className="text-white/70 text-sm font-medium">Custom Solutions</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              Can&apos;t find what you need?
            </h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              We build bespoke software tailored to your institute. Tell us your requirements.
            </p>

            <motion.button
              onClick={() => setEnquiryProduct("Custom Solution")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg overflow-hidden"
            >
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 p-[2px]">
                <div className="w-full h-full rounded-2xl bg-gray-900" />
              </div>
              <span className="relative text-white flex items-center gap-3">
                <FiSend className="w-5 h-5" />
                Get in Touch
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </Container>
      </section>

      <Footer />

      {/* ── Enquiry Modal ── */}
      <EnquiryModal
        isOpen={!!enquiryProduct}
        onClose={() => setEnquiryProduct(null)}
        productName={enquiryProduct || ""}
      />
    </>
  );
}
