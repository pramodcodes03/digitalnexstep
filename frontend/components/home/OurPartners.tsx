"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import Container from "../ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

const partners = [
  {
    name: "EduTech Foundation",
    category: "Academic Partner",
    description: "Collaborative research in adaptive learning and AI-based assessments.",
    color: "from-blue-500 to-indigo-600",
    initials: "EF",
  },
  {
    name: "National Board of Education",
    category: "Government Partner",
    description: "Supporting nationwide digital assessment initiatives for public schools.",
    color: "from-green-500 to-emerald-600",
    initials: "NBE",
  },
  {
    name: "CloudNet Systems",
    category: "Technology Partner",
    description: "Enterprise-grade cloud infrastructure powering our assessment platform.",
    color: "from-purple-500 to-pink-600",
    initials: "CN",
  },
  {
    name: "SkillBridge Institute",
    category: "Training Partner",
    description: "Joint certification programs in educational technology and assessment design.",
    color: "from-orange-500 to-red-500",
    initials: "SB",
  },
  {
    name: "DataMinds Analytics",
    category: "Analytics Partner",
    description: "Advanced learning analytics and predictive student performance modeling.",
    color: "from-cyan-500 to-blue-600",
    initials: "DM",
  },
  {
    name: "Global Ed Alliance",
    category: "International Partner",
    description: "Expanding quality assessment solutions across 30+ countries worldwide.",
    color: "from-rose-500 to-pink-600",
    initials: "GEA",
  },
  {
    name: "SecureTest Labs",
    category: "Security Partner",
    description: "Ensuring bank-level security and compliance for all assessment data.",
    color: "from-amber-500 to-orange-600",
    initials: "ST",
  },
  {
    name: "LearnPath AI",
    category: "AI Partner",
    description: "Co-developing next-generation AI tutoring and assessment algorithms.",
    color: "from-teal-500 to-cyan-600",
    initials: "LP",
  },
];

const OurPartners: React.FC = () => {
  const defaultColors = [
    "from-blue-500 to-indigo-600",
    "from-green-500 to-emerald-600",
    "from-purple-500 to-pink-600",
    "from-orange-500 to-red-500",
    "from-cyan-500 to-blue-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-teal-500 to-cyan-600",
  ];

  const { data: apiPartners } = useApi(() => api.getPartners(), [] as any[]);

  const displayPartners: typeof partners = apiPartners.length > 0
    ? apiPartners.map((p: any, i: number) => ({
        name: p.name,
        category: "",
        description: "",
        color: defaultColors[i % defaultColors.length],
        initials: p.name.split(" ").map((w: string) => w[0]).join("").slice(0, 3),
      }))
    : partners;

  return (
    <section className="py-24 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/10 to-blue-300/10 dark:from-purple-600/10 dark:to-blue-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 right-1/4 w-80 h-80 bg-gradient-to-tl from-pink-300/10 to-orange-300/10 dark:from-pink-600/10 dark:to-orange-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, delay: 2, repeat: Infinity, ease: "easeInOut" }}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-5"
          >
            Our Partners
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Powered by{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Strategic Partnerships
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We collaborate with industry leaders and institutions to deliver world-class
            educational assessment solutions.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPartners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              className="group cursor-pointer"
            >
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden text-center">
                {/* Gradient Top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${partner.color}`} />

                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.06] transition-opacity duration-500`} />

                {/* Logo Placeholder */}
                <div className="flex justify-center mb-5">
                  <div className="relative">
                    <div className={`w-20 h-20 bg-gradient-to-br ${partner.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <span className="text-white text-xl font-bold tracking-wider">
                        {partner.initials}
                      </span>
                    </div>
                    {/* Glow */}
                    <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${partner.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 relative">
                  {partner.name}
                </h3>
                <span className={`inline-block text-xs font-semibold bg-gradient-to-r ${partner.color} bg-clip-text text-transparent mb-3`}>
                  {partner.category}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed relative">
                  {partner.description}
                </p>

                {/* Hover Link */}
                <div className="mt-4 flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn More</span>
                  <FiExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            And many more organizations trust us with their assessment needs.{" "}
            <a href="#contact" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Become a partner →
            </a>
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default OurPartners;
