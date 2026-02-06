"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCloud, FiTool, FiHeadphones, FiClock, FiShield, FiZap } from "react-icons/fi";
import Container from "../ui/Container";
import AnimatedSection from "../ui/AnimatedSection";

const supportFeatures = [
  {
    icon: FiCloud,
    title: "Cloud Based Solution",
    description:
      "Stay up-to-date with the latest learning materials and resources, without delays with real-time content updates.",
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: FiTool,
    title: "Simple and Trouble Free Installation",
    description:
      "Easy installation with our team of expert technicians along with access to comprehensive software suite.",
    color: "from-orange-500 to-red-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: FiHeadphones,
    title: "Training and Service Support",
    description:
      "Dedicated training, maintenance and support team to resolve any issues promptly.",
    color: "from-green-500 to-emerald-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: FiClock,
    title: "24/7 Technical Support",
    description:
      "Round-the-clock technical assistance available whenever you need help. Our team is always ready to assist.",
    color: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: FiShield,
    title: "Data Security & Backup",
    description:
      "Enterprise-grade security with automatic backups, ensuring your data is always safe and recoverable.",
    color: "from-indigo-500 to-blue-500",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    icon: FiZap,
    title: "Regular Updates & Maintenance",
    description:
      "Automatic software updates and scheduled maintenance to keep your system running smoothly and efficiently.",
    color: "from-yellow-500 to-orange-500",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

const RobustSupport: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <AnimatedSection animation="slide-right">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Robust Operational
                  </span>
                  <br />
                  Support
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Comprehensive support services to ensure your educational platform runs
                  smoothly 24/7. We're committed to your success every step of the way.
                </p>
              </div>
            </AnimatedSection>

            {/* Support Features List */}
            <div className="space-y-6">
              {supportFeatures.slice(0, 3).map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex gap-4 items-start">
                      <div
                        className={`flex-shrink-0 w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform-smooth`}
                      >
                        <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Illustration/Image Placeholder */}
          <AnimatedSection animation="slide-left" className="relative">
            <div className="relative h-[500px] lg:h-[600px]">
              {/* Main Illustration Container */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Cloud Icon */}
                <motion.div
                  className="absolute top-20 left-1/2 -translate-x-1/2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/30">
                    <FiCloud className="w-20 h-20 text-white" />
                  </div>
                </motion.div>

                {/* Server Illustration */}
                <motion.div
                  className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-80 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="space-y-4">
                    {/* Server Bars */}
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        className="h-12 bg-white/20 rounded-lg flex items-center gap-2 px-3"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      >
                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                        <div className="flex-1 h-2 bg-white/30 rounded" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating Icons */}
                {[
                  { Icon: FiShield, pos: "top-1/4 left-10", delay: 0 },
                  { Icon: FiHeadphones, pos: "top-1/3 right-10", delay: 0.5 },
                  { Icon: FiZap, pos: "bottom-1/3 left-10", delay: 1 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${item.pos}`}
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: item.delay,
                    }}
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                      <item.Icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Decorative Corner Element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl -z-10 opacity-50 blur-xl" />
            </div>
          </AnimatedSection>
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {supportFeatures.slice(3).map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all-smooth border border-gray-100 hover:-translate-y-2">
                  <div
                    className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform-smooth`}
                  >
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default RobustSupport;
