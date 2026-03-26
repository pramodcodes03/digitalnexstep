"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiMap,
  FiHome,
  FiInfo,
  FiBookOpen,
  FiGrid,
  FiImage,
  FiPhone,
  FiHelpCircle,
  FiCheckCircle,
  FiFileText,
  FiShield,
  FiRefreshCw,
  FiLink,
  FiAward,
  FiBriefcase,
  FiUsers,
  FiPackage,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

const sitemapSections = [
  {
    title: "Main Pages",
    gradient: "from-blue-500 to-indigo-600",
    links: [
      { name: "Home", href: "/", icon: FiHome },
      { name: "About Us", href: "/about", icon: FiInfo },
      { name: "Features", href: "/features", icon: FiGrid },
      { name: "Courses", href: "/courses", icon: FiBookOpen },
      { name: "Our Products", href: "/products", icon: FiPackage },
      { name: "Gallery", href: "/gallery", icon: FiImage },
      { name: "Contact", href: "/contact", icon: FiPhone },
    ],
  },
  {
    title: "Services",
    gradient: "from-green-500 to-emerald-600",
    links: [
      { name: "Franchise", href: "/franchise", icon: FiBriefcase },
      { name: "Student Corner", href: "/student-corner", icon: FiUsers },
      { name: "Verification", href: "/verification", icon: FiCheckCircle },
      { name: "FAQ", href: "/#faq", icon: FiHelpCircle },
    ],
  },
  {
    title: "Legal & Policies",
    gradient: "from-purple-500 to-violet-600",
    links: [
      { name: "Terms & Conditions", href: "/terms", icon: FiFileText },
      { name: "Privacy Policy", href: "/privacy", icon: FiShield },
      { name: "Refund Policy", href: "/refund", icon: FiRefreshCw },
      { name: "Our Affiliations", href: "/affiliations", icon: FiLink },
      { name: "Accreditations", href: "/accreditations", icon: FiAward },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #1e3a8a 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary-600/20 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-16 h-16 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <FiMap className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Sitemap
            </h1>
            <p className="text-white/60 text-lg">
              Quick navigation to all pages on our website
            </p>
          </motion.div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 leading-[0]">
          <svg
            viewBox="0 0 1440 56"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-14 text-white dark:text-gray-900"
          >
            <path
              d="M0,56 C360,0 1080,56 1440,0 L1440,56 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sitemapSections.map((section, si) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: si * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`h-1 bg-gradient-to-r ${section.gradient}`} />
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.links.map((link) => {
                      const LinkIcon = link.icon;
                      return (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-colors">
                              <LinkIcon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">
                              {link.name}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
