"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiShield,
  FiZap,
  FiUsers,
  FiTrendingUp,
  FiHeart,
  FiClock,
  FiGlobe,
} from "react-icons/fi";
import Container from "../ui/Container";
import AnimatedSection from "../ui/AnimatedSection";

const reasons = [
  {
    icon: FiAward,
    title: "Industry-Leading Expertise",
    description:
      "Over 10 years of experience in educational technology with award-winning solutions trusted by top institutions worldwide.",
    color: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: FiShield,
    title: "Uncompromising Security",
    description:
      "Bank-level encryption, FERPA & GDPR compliance, and regular security audits to keep your data safe and secure.",
    color: "from-green-500 to-green-600",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: FiZap,
    title: "Lightning-Fast Performance",
    description:
      "Cloud-based infrastructure with 99.9% uptime guarantee. Assessments load instantly, even with thousands of students.",
    color: "from-yellow-500 to-yellow-600",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    icon: FiUsers,
    title: "Exceptional Support",
    description:
      "24/7 dedicated support team ready to help. Get answers within minutes, not days. We're here whenever you need us.",
    color: "from-purple-500 to-purple-600",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: FiTrendingUp,
    title: "Proven Results",
    description:
      "Institutions using our platform see 40% increase in student engagement and 30% reduction in grading time.",
    color: "from-orange-500 to-orange-600",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: FiHeart,
    title: "Student-Centered Design",
    description:
      "Intuitive interface designed with students in mind. Reduce anxiety, increase accessibility, and promote fairness.",
    color: "from-pink-500 to-pink-600",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    icon: FiClock,
    title: "Save Valuable Time",
    description:
      "Automated workflows and smart features save educators 15+ hours per week, letting you focus on teaching.",
    color: "from-indigo-500 to-indigo-600",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    icon: FiGlobe,
    title: "Global Reach, Local Support",
    description:
      "Available in 25+ languages with local support teams. Serving institutions across 50+ countries worldwide.",
    color: "from-teal-500 to-teal-600",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
];

const stats = [
  { number: "500+", label: "Educational Institutions", suffix: "" },
  { number: "1M+", label: "Assessments Completed", suffix: "" },
  { number: "98%", label: "Customer Satisfaction", suffix: "" },
  { number: "15+", label: "Hours Saved Per Week", suffix: "" },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-400/20 to-pink-400/20 rounded-full blur-3xl" />
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
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              The Smart Choice for{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Modern Education
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of educational institutions that trust us to transform their
              assessment experience. Here's why we're the #1 choice for educators worldwide.
            </p>
          </motion.div>
        </AnimatedSection>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all-smooth border border-gray-100"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all-smooth border border-gray-100">
                  {/* Icon Container */}
                  <div className="relative mb-4">
                    <div
                      className={`w-16 h-16 ${reason.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform-smooth`}
                    >
                      <Icon className={`w-8 h-8 ${reason.iconColor}`} />
                    </div>
                    {/* Decorative gradient blob */}
                    <div
                      className={`absolute -inset-2 bg-gradient-to-r ${reason.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity-smooth -z-10`}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors-smooth">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {reason.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity-smooth">
                    <span className="text-sm">Learn more</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform-smooth"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all-smooth"
            >
              Start Your Free Trial
            </a>
            <a
              href="#pricing"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-md hover:shadow-lg border-2 border-blue-600 hover:bg-blue-50 transition-all-smooth"
            >
              View Pricing Plans
            </a>
          </div>
          <p className="mt-6 text-gray-600">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
