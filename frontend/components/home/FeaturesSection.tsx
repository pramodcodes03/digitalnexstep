"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiCheckCircle,
  FiEdit3,
  FiShield,
  FiFileText,
  FiBarChart2,
} from "react-icons/fi";
import Card from "../ui/Card";
import Container from "../ui/Container";
import AnimatedSection from "../ui/AnimatedSection";

const features = [
  {
    icon: FiActivity,
    title: "Real-time Analytics",
    description:
      "Monitor student performance and assessment metrics in real-time with comprehensive dashboards and insights.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: FiCheckCircle,
    title: "Automated Grading",
    description:
      "Save time with intelligent automated grading for objective questions, with manual override options for complex assessments.",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: FiEdit3,
    title: "Custom Assessments",
    description:
      "Create tailored assessments with our intuitive builder. Support for multiple question types, multimedia, and adaptive testing.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: FiShield,
    title: "Secure Platform",
    description:
      "Enterprise-grade security with encrypted data, secure authentication, and compliance with educational standards.",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    icon: FiFileText,
    title: "Multi-format Support",
    description:
      "Support for various assessment formats including MCQs, essays, coding challenges, and multimedia submissions.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    icon: FiBarChart2,
    title: "Detailed Reporting",
    description:
      "Generate comprehensive reports with actionable insights. Export data for further analysis and stakeholder presentations.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <AnimatedSection animation="slide-up" className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
            Our Features
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Everything You Need for{" "}
            <span className="gradient-text">Modern Assessment</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools designed to streamline your assessment workflow,
            enhance student engagement, and provide meaningful insights.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover padding="lg" className="h-full group">
                  <div
                    className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform-smooth`}
                  >
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all-smooth">
                    <span>Learn more</span>
                    <svg
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all-smooth"
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
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
