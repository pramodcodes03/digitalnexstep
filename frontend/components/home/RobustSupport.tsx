"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCloud, FiTool, FiHeadphones, FiClock, FiShield, FiZap } from "react-icons/fi";
import Container from "../ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

const iconMap: Record<string, React.ElementType> = {
  FiCloud,
  FiTool,
  FiHeadphones,
  FiClock,
  FiShield,
  FiZap,
};

const supportFeatures = [
  {
    icon: FiCloud,
    title: "Cloud Based Solution",
    description:
      "Stay up-to-date with the latest learning materials and resources, without delays with real-time content updates.",
    gradient: "from-blue-500 via-blue-600 to-cyan-600",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: FiTool,
    title: "Simple and Trouble Free Installation",
    description:
      "Easy installation with our team of expert technicians along with access to comprehensive software suite.",
    gradient: "from-orange-500 via-orange-600 to-red-600",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: FiHeadphones,
    title: "Training and Service Support",
    description:
      "Dedicated training, maintenance and support team to resolve any issues promptly.",
    gradient: "from-green-500 via-emerald-600 to-teal-600",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: FiClock,
    title: "24/7 Technical Support",
    description:
      "Round-the-clock technical assistance available whenever you need help. Our team is always ready to assist.",
    gradient: "from-purple-500 via-purple-600 to-pink-600",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: FiShield,
    title: "Data Security & Backup",
    description:
      "Enterprise-grade security with automatic backups, ensuring your data is always safe and recoverable.",
    gradient: "from-indigo-500 via-indigo-600 to-blue-600",
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: FiZap,
    title: "Regular Updates & Maintenance",
    description:
      "Automatic software updates and scheduled maintenance to keep your system running smoothly and efficiently.",
    gradient: "from-yellow-500 via-amber-600 to-orange-600",
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
  },
];

const defaultGradients = [
  { gradient: "from-blue-500 via-blue-600 to-cyan-600", iconBg: "bg-blue-500/20", iconColor: "text-blue-400" },
  { gradient: "from-orange-500 via-orange-600 to-red-600", iconBg: "bg-orange-500/20", iconColor: "text-orange-400" },
  { gradient: "from-green-500 via-emerald-600 to-teal-600", iconBg: "bg-green-500/20", iconColor: "text-green-400" },
  { gradient: "from-purple-500 via-purple-600 to-pink-600", iconBg: "bg-purple-500/20", iconColor: "text-purple-400" },
  { gradient: "from-indigo-500 via-indigo-600 to-blue-600", iconBg: "bg-indigo-500/20", iconColor: "text-indigo-400" },
  { gradient: "from-yellow-500 via-amber-600 to-orange-600", iconBg: "bg-yellow-500/20", iconColor: "text-yellow-400" },
];

const RobustSupport: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const { data: apiSections } = useApi(() => api.getPageSections("home"), [] as any[]);
  const sectionData = apiSections.find((s: any) => s.section_key === "robust_support");

  const displayFeatures = sectionData?.extra_data?.items?.length > 0
    ? sectionData.extra_data.items.map((item: any, i: number) => ({
        icon: iconMap[item.icon] || FiCloud,
        title: item.title,
        description: item.description,
        gradient: defaultGradients[i % defaultGradients.length].gradient,
        iconBg: defaultGradients[i % defaultGradients.length].iconBg,
        iconColor: defaultGradients[i % defaultGradients.length].iconColor,
      }))
    : supportFeatures;

  const displayStats = sectionData?.extra_data?.stats?.length > 0
    ? sectionData.extra_data.stats
    : [
        { label: "Uptime Guarantee", value: "99.9%" },
        { label: "Response Time", value: "<5min" },
        { label: "Support Rating", value: "4.9/5" },
      ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/[0.03] to-purple-500/[0.03] dark:from-blue-500/5 dark:to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent">
              {sectionData?.title || "Robust Operational"}
            </span>
            <br />
            {sectionData?.subtitle || "Support"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {sectionData?.content || "Comprehensive support services to ensure your educational platform runs smoothly 24/7. We're committed to your success every step of the way."}
          </p>
        </motion.div>

        {/* Support Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayFeatures.map((feature: any, index: number) => {
            const Icon = feature.icon;
            const isActive = activeFeature === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => setActiveFeature(index)}
                className="group relative"
              >
                {/* Card */}
                <div
                  className={`relative h-full bg-gradient-to-br backdrop-blur-xl rounded-2xl p-8 border transition-all-smooth ${
                    isActive
                      ? `border-transparent bg-gradient-to-br ${feature.gradient} shadow-2xl -translate-y-2`
                      : "from-white/80 to-gray-50/80 dark:from-gray-800/50 dark:to-gray-900/50 border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 blur-xl transition-opacity-smooth -z-10`} />

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all-smooth ${
                    isActive ? "bg-white/20" : `bg-gray-100 dark:${feature.iconBg} group-hover:bg-gray-200 dark:group-hover:bg-white/10`
                  }`}>
                    <Icon className={`w-8 h-8 transition-colors-smooth ${
                      isActive ? "text-white" : `text-gray-700 dark:${feature.iconColor} group-hover:text-gray-900 dark:group-hover:text-white`
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-3 transition-colors-smooth ${
                    isActive ? "text-white" : "text-gray-900 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors-smooth ${
                    isActive ? "text-white/90" : "text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayStats.map((stat: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700/50 text-center hover:border-gray-300 dark:hover:border-gray-600 transition-all-smooth"
              >
                <div className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-pink-600 dark:from-orange-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold rounded-xl shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all-smooth">
            Contact Support Team
          </button>
        </motion.div>
      </Container>
    </section>
  );
};

export default RobustSupport;
