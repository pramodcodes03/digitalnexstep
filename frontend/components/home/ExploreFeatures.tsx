"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiBook,
  FiMonitor,
  FiCalendar,
  FiClock,
  FiCheckSquare,
  FiSun,
  FiFileText,
  FiArrowRight,
} from "react-icons/fi";
import Container from "../ui/Container";
import AnimatedSection from "../ui/AnimatedSection";

const features = [
  {
    icon: FiUsers,
    title: "Student Management",
    description: "Comprehensive student profiles, enrollment tracking, and performance monitoring all in one place.",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    delay: 0,
  },
  {
    icon: FiBook,
    title: "Academics Management",
    description: "Streamline curriculum planning, course management, and academic scheduling effortlessly.",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    delay: 0.1,
  },
  {
    icon: FiMonitor,
    title: "Slider Management",
    description: "Dynamic content carousel system for announcements, events, and important updates.",
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    delay: 0.2,
  },
  {
    icon: FiCalendar,
    title: "Teacher Management",
    description: "Manage faculty schedules, assignments, workload distribution, and performance tracking.",
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    delay: 0.3,
  },
  {
    icon: FiClock,
    title: "Session Year Management",
    description: "Configure academic sessions, semesters, terms, and manage year-end transitions smoothly.",
    gradient: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
    delay: 0.4,
  },
  {
    icon: FiSun,
    title: "Holiday Management",
    description: "Plan academic calendars, mark holidays, and schedule breaks with automated notifications.",
    gradient: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
    delay: 0.5,
  },
  {
    icon: FiCheckSquare,
    title: "Timetable Management",
    description: "Smart scheduling with conflict detection, automated timetable generation, and easy modifications.",
    gradient: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    delay: 0.6,
  },
  {
    icon: FiCheckSquare,
    title: "Attendance Management",
    description: "Real-time attendance tracking, automated reports, and attendance pattern analysis.",
    gradient: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    delay: 0.7,
  },
  {
    icon: FiFileText,
    title: "Exam Management",
    description: "End-to-end exam lifecycle management from scheduling to result publication and analysis.",
    gradient: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600",
    delay: 0.8,
  },
];

const ExploreFeatures: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-100/50 to-orange-100/50 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="slide-up" className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
              Explore Our{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Top Features
                </span>
                {/* Underline decoration */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 5 150 2 298 10"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#9333EA" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Powerful tools designed to streamline your educational institution's operations.
              Everything you need, all in one platform.
            </p>
          </motion.div>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: feature.delay }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Card */}
                <div
                  className={`relative h-full bg-white rounded-2xl p-8 border-2 transition-all-smooth ${
                    isHovered
                      ? "border-transparent shadow-2xl -translate-y-2"
                      : "border-gray-100 shadow-md hover:shadow-xl"
                  }`}
                >
                  {/* Gradient Border Effect on Hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity-smooth -z-10 blur-sm`}
                  />

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform-smooth relative overflow-hidden`}
                    >
                      {/* Animated gradient background on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity-smooth`}
                      />
                      <Icon
                        className={`w-8 h-8 ${feature.iconColor} relative z-10 group-hover:text-white transition-colors-smooth`}
                      />
                    </div>

                    {/* Decorative circle */}
                    <div
                      className={`absolute -inset-2 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity-smooth -z-10`}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all-smooth">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all-smooth">
                    <span className="text-sm">Learn More</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform-smooth" />
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                    <div
                      className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transform rotate-45 translate-x-20 -translate-y-20 transition-opacity-smooth`}
                    />
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
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Want to see all features in action?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all-smooth"
          >
            <span>Schedule a Demo</span>
            <FiArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default ExploreFeatures;
