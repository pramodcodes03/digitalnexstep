"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers,
  FiBook,
  FiMonitor,
  FiCalendar,
  FiClock,
  FiCheckSquare,
  FiSun,
  FiFileText,
  FiChevronRight,
} from "react-icons/fi";
import Container from "../ui/Container";

const features = [
  {
    icon: FiUsers,
    title: "Student Management",
    description: "Comprehensive student profiles, enrollment tracking, and performance monitoring all in one place.",
    gradient: "from-blue-500 via-blue-600 to-cyan-600",
    bgGlow: "blue",
  },
  {
    icon: FiBook,
    title: "Academics Management",
    description: "Streamline curriculum planning, course management, and academic scheduling effortlessly.",
    gradient: "from-purple-500 via-purple-600 to-pink-600",
    bgGlow: "purple",
  },
  {
    icon: FiMonitor,
    title: "Slider Management",
    description: "Dynamic content carousel system for announcements, events, and important updates.",
    gradient: "from-green-500 via-emerald-600 to-teal-600",
    bgGlow: "green",
  },
  {
    icon: FiCalendar,
    title: "Teacher Management",
    description: "Manage faculty schedules, assignments, workload distribution, and performance tracking.",
    gradient: "from-orange-500 via-orange-600 to-red-600",
    bgGlow: "orange",
  },
  {
    icon: FiClock,
    title: "Session Year Management",
    description: "Configure academic sessions, semesters, terms, and manage year-end transitions smoothly.",
    gradient: "from-yellow-500 via-amber-600 to-orange-600",
    bgGlow: "yellow",
  },
  {
    icon: FiSun,
    title: "Holiday Management",
    description: "Plan academic calendars, mark holidays, and schedule breaks with automated notifications.",
    gradient: "from-pink-500 via-rose-600 to-red-600",
    bgGlow: "pink",
  },
  {
    icon: FiCheckSquare,
    title: "Timetable Management",
    description: "Smart scheduling with conflict detection, automated timetable generation, and easy modifications.",
    gradient: "from-indigo-500 via-indigo-600 to-purple-600",
    bgGlow: "indigo",
  },
  {
    icon: FiCheckSquare,
    title: "Attendance Management",
    description: "Real-time attendance tracking, automated reports, and attendance pattern analysis.",
    gradient: "from-teal-500 via-cyan-600 to-blue-600",
    bgGlow: "teal",
  },
  {
    icon: FiFileText,
    title: "Exam Management",
    description: "End-to-end exam lifecycle management from scheduling to result publication and analysis.",
    gradient: "from-violet-500 via-purple-600 to-fuchsia-600",
    bgGlow: "violet",
  },
];

const ExploreFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/[0.03] to-pink-500/[0.03] dark:from-orange-500/5 dark:to-pink-500/5 rounded-full blur-3xl" />
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
            Explore Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Top Features
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful management tools designed to streamline every aspect of your educational institution
          </p>
        </motion.div>

        {/* Features Grid - Bento Box Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
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
                  className={`relative h-full bg-gradient-to-br backdrop-blur-xl rounded-2xl p-6 border transition-all-smooth ${
                    isActive
                      ? `border-transparent bg-gradient-to-br ${feature.gradient} shadow-2xl -translate-y-2`
                      : "from-white/80 to-gray-50/80 dark:from-gray-800/50 dark:to-gray-900/50 border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 blur-xl transition-opacity-smooth -z-10`} />

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all-smooth ${
                    isActive ? "bg-white/20" : "bg-gray-100 dark:bg-gray-700/50 group-hover:bg-gray-200 dark:group-hover:bg-gray-600/50"
                  }`}>
                    <Icon className={`w-7 h-7 transition-colors-smooth ${
                      isActive ? "text-white" : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-2 transition-colors-smooth ${
                    isActive ? "text-white" : "text-gray-900 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 transition-colors-smooth ${
                    isActive ? "text-white/90" : "text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                  }`}>
                    {feature.description}
                  </p>

                  {/* Arrow */}
                  <div className={`flex items-center gap-2 font-semibold transition-all-smooth ${
                    isActive ? "text-white gap-3" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:gap-3"
                  }`}>
                    <span className="text-sm">Explore</span>
                    <FiChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all-smooth">
            View All Features
          </button>
        </motion.div>
      </Container>
    </section>
  );
};

export default ExploreFeatures;
