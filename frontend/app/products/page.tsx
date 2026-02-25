"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMonitor, FiSmartphone, FiGlobe, FiShield, FiDatabase,
  FiCpu, FiCloud, FiLayers, FiCode, FiTrendingUp,
  FiArrowRight, FiPackage, FiSend,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import EnquiryModal from "@/components/ui/EnquiryModal";

/* ─── Product data ─── */
interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  gradient: string;
  icon: React.ElementType;
  tags: string[];
}

const products: Product[] = [
  {
    id: 1,
    title: "Smart ERP System",
    description:
      "All-in-one Enterprise Resource Planning solution for educational institutes — manage admissions, attendance, fees, payroll, and reporting from a single dashboard.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    gradient: "from-blue-500 to-indigo-600",
    icon: FiMonitor,
    tags: ["ERP", "Management"],
  },
  {
    id: 2,
    title: "Mobile Learning App",
    description:
      "Feature-rich mobile application enabling students to access courses, live classes, assignments, and results on the go — available on Android & iOS.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    gradient: "from-emerald-500 to-teal-600",
    icon: FiSmartphone,
    tags: ["Mobile", "E-Learning"],
  },
  {
    id: 3,
    title: "Institute Website Builder",
    description:
      "Professional, SEO-optimised websites for coaching centers and institutes with built-in CMS, lead forms, and online registration portals.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    gradient: "from-violet-500 to-purple-600",
    icon: FiGlobe,
    tags: ["Website", "CMS"],
  },
  {
    id: 4,
    title: "Online Exam Platform",
    description:
      "Conduct secure online examinations with AI-proctoring, auto-evaluation, detailed analytics, and certificate generation for competitive test preparation.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
    gradient: "from-orange-500 to-red-500",
    icon: FiShield,
    tags: ["Exam", "AI Proctoring"],
  },
  {
    id: 5,
    title: "Student Database & CRM",
    description:
      "Powerful CRM to manage student enquiries, follow-ups, admissions pipeline, and alumni relations — boost conversions with automated workflows.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    gradient: "from-cyan-500 to-blue-600",
    icon: FiDatabase,
    tags: ["CRM", "Automation"],
  },
  {
    id: 6,
    title: "AI-Powered Analytics",
    description:
      "Harness the power of data with AI-driven insights on student performance, attendance trends, revenue forecasting, and operational efficiency.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80",
    gradient: "from-pink-500 to-rose-600",
    icon: FiCpu,
    tags: ["AI", "Analytics"],
  },
  {
    id: 7,
    title: "Cloud Hosting Solutions",
    description:
      "Reliable, scalable cloud infrastructure for educational platforms with 99.9% uptime, automatic backups, and enterprise-grade security.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    gradient: "from-sky-500 to-indigo-500",
    icon: FiCloud,
    tags: ["Cloud", "Hosting"],
  },
  {
    id: 8,
    title: "Digital Content Studio",
    description:
      "Create engaging e-learning content with our studio tools — video lectures, interactive quizzes, PDF materials, and SCORM-compliant course packages.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
    gradient: "from-amber-500 to-orange-600",
    icon: FiLayers,
    tags: ["Content", "E-Learning"],
  },
  {
    id: 9,
    title: "Custom Software Development",
    description:
      "Bespoke software solutions tailored to your institute's unique requirements — from attendance kiosks to integrated payment gateways.",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop",
    gradient: "from-lime-500 to-green-600",
    icon: FiCode,
    tags: ["Custom", "Development"],
  },
];

/* ─── Card animation variants ─── */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

/* ─── Page Component ─── */
export default function ProductsPage() {
  const [enquiryProduct, setEnquiryProduct] = useState<string | null>(null);

  return (
    <>
      <Header />

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20 lg:py-28">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/30 dark:bg-primary-800/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-200/30 dark:bg-orange-800/10 rounded-full blur-3xl translate-y-1/2" />

        <Container>
          <div className="relative text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6"
            >
              <FiPackage className="w-4 h-4" />
              Our Products
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight"
            >
              Solutions That{" "}
              <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Empower
              </span>{" "}
              Education
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              Explore our comprehensive suite of digital products designed to
              transform educational institutions with cutting-edge technology.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ── Products Grid ── */}
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-950">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product, i) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-soft hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-40 group-hover:opacity-50 transition-opacity duration-300`} />

                    {/* Icon badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Enquiry Button */}
                    <button
                      onClick={() => setEnquiryProduct(product.title)}
                      className={`mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r ${product.gradient} text-white text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.97] transition-all duration-200`}
                    >
                      <FiTrendingUp className="w-4 h-4" />
                      Enquiry Now
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Can&apos;t find what you need?
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              We build custom solutions tailored to your institute. Let&apos;s discuss your requirements.
            </p>
            <button
              onClick={() => setEnquiryProduct("Custom Solution")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200"
            >
              <FiSend className="w-5 h-5" />
              Get in Touch
            </button>
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
