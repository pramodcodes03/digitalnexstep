"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiStar, FiTrendingUp } from "react-icons/fi";
import Container from "../ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

const achievers = [
  {
    name: "Priya Sharma",
    role: "UPSC Topper – AIR 12",
    achievement: "Cleared UPSC CSE in her first attempt with guidance from our expert mentors and structured assessment programs.",
    image: null,
    color: "from-yellow-400 to-orange-500",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  {
    name: "Rahul Verma",
    role: "JEE Advanced – AIR 45",
    achievement: "Secured top rank in JEE Advanced with consistent practice through our adaptive testing platform.",
    image: null,
    color: "from-blue-400 to-indigo-500",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    name: "Ananya Patel",
    role: "NEET Topper – AIR 8",
    achievement: "Achieved an outstanding score in NEET with our AI-powered personalized study plans and mock tests.",
    image: null,
    color: "from-green-400 to-emerald-500",
    iconBg: "bg-green-100 dark:bg-green-900/30",
  },
  {
    name: "Arjun Mehta",
    role: "CAT 99.8 Percentile",
    achievement: "Cracked CAT with near-perfect percentile using our analytical dashboard and performance tracking.",
    image: null,
    color: "from-purple-400 to-pink-500",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    name: "Sneha Reddy",
    role: "Gate CS – AIR 3",
    achievement: "Topped GATE Computer Science with our comprehensive question bank and real-time progress analytics.",
    image: null,
    color: "from-cyan-400 to-blue-500",
    iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
  },
  {
    name: "Vikram Singh",
    role: "SSC CGL – Rank 5",
    achievement: "Achieved top rank in SSC CGL with disciplined preparation powered by our smart assessment engine.",
    image: null,
    color: "from-orange-400 to-red-500",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
  },
];

const defaultAchieverColors = [
  { color: "from-yellow-400 to-orange-500", iconBg: "bg-yellow-100 dark:bg-yellow-900/30" },
  { color: "from-blue-400 to-indigo-500", iconBg: "bg-blue-100 dark:bg-blue-900/30" },
  { color: "from-green-400 to-emerald-500", iconBg: "bg-green-100 dark:bg-green-900/30" },
  { color: "from-purple-400 to-pink-500", iconBg: "bg-purple-100 dark:bg-purple-900/30" },
  { color: "from-cyan-400 to-blue-500", iconBg: "bg-cyan-100 dark:bg-cyan-900/30" },
  { color: "from-orange-400 to-red-500", iconBg: "bg-orange-100 dark:bg-orange-900/30" },
];

const OurAchievers: React.FC = () => {
  const { data: apiAchievements } = useApi(() => api.getAchievements(), [] as any[]);
  const { data: apiSections } = useApi(() => api.getPageSections("home"), [] as any[]);
  const sectionData = apiSections.find((s: any) => s.section_key === "achievers_header");

  const displayAchievers: typeof achievers = apiAchievements.length > 0
    ? apiAchievements.map((a: any, i: number) => ({
        name: a.title,
        role: [a.value, a.suffix].filter(Boolean).join(""),
        achievement: a.description || "",
        image: null,
        color: defaultAchieverColors[i % defaultAchieverColors.length].color,
        iconBg: defaultAchieverColors[i % defaultAchieverColors.length].iconBg,
      }))
    : achievers;

  return (
    <section className="py-24 bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-yellow-300/10 to-orange-300/10 dark:from-yellow-600/10 dark:to-orange-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-blue-300/10 to-purple-300/10 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, delay: 2, repeat: Infinity, ease: "easeInOut" }}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-5"
          >
            <FiAward className="w-4 h-4" />
            {sectionData?.subtitle || "Our Achievers"}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            {(sectionData?.title || "Stars Who Shine Bright").split("Shine")[0]}
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              {(sectionData?.title || "Stars Who Shine Bright").includes("Shine") ? "Shine Bright" : ""}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {sectionData?.content || "Meet the extraordinary individuals who achieved their dreams with our platform. Their success stories inspire millions."}
          </p>
        </motion.div>

        {/* Achievers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayAchievers.map((achiever, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group"
            >
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Gradient Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${achiever.color}`} />

                {/* Trophy Watermark */}
                <div className="absolute -bottom-4 -right-4 opacity-[0.04] dark:opacity-[0.06] group-hover:opacity-[0.08] transition-opacity duration-500">
                  <FiAward className="w-36 h-36" />
                </div>

                {/* Avatar & Info */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-16 h-16 bg-gradient-to-br ${achiever.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white text-xl font-bold">
                      {achiever.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {achiever.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <FiStar className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
                        {achiever.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Achievement */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm relative">
                  {achiever.achievement}
                </p>

                {/* Bottom Stats */}
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <FiTrendingUp className="w-3.5 h-3.5 text-green-500" />
                  <span>Top performer · Verified achiever</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OurAchievers;
