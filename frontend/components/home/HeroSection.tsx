"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FiPlay,
  FiArrowDown,
  FiCheck,
  FiZap,
  FiShield,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiStar
} from "react-icons/fi";
import Button from "../ui/Button";
import Container from "../ui/Container";

// Animated counter component
const AnimatedCounter: React.FC<{ end: number; duration?: number; suffix?: string }> = ({
  end,
  duration = 2,
  suffix = ""
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

// Floating feature cards
const floatingFeatures = [
  { icon: FiZap, text: "AI-Powered", color: "from-yellow-400 to-orange-500" },
  { icon: FiShield, text: "Secure", color: "from-green-400 to-emerald-500" },
  { icon: FiAward, text: "Award Winning", color: "from-blue-400 to-cyan-500" },
  { icon: FiTrendingUp, text: "Analytics", color: "from-purple-400 to-pink-500" },
];

const HeroSection: React.FC = () => {
  const handleGetStarted = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWatchDemo = () => {
    alert("Demo video would play here!");
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Container className="relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-left space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-blue-100 text-sm font-semibold border border-white/20">
                <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                #1 Educational Assessment Platform
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                Transform Your
                <span className="block mt-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Educational Journey
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              className="text-xl text-blue-100 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Empower your institution with AI-powered assessments, real-time analytics,
              and seamless automation. Join 500+ leading educational centers worldwide.
            </motion.p>

            {/* Feature Highlights */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {[
                "AI-Powered Grading",
                "Real-time Analytics",
                "Automated Workflows",
                "99.9% Uptime",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <button
                onClick={handleGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all-smooth flex items-center justify-center gap-2"
              >
                <span>Start Free Trial</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </button>
              <button
                onClick={handleWatchDemo}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all-smooth flex items-center justify-center gap-2"
              >
                <FiPlay className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap items-center gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-blue-100 text-sm">
                  <strong className="text-white">10,000+</strong> educators trust us
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-2 text-blue-100 text-sm font-semibold">4.9/5 Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Floating Cards */}
          <div className="relative hidden lg:block h-[600px]">
            {/* Central Glassmorphic Card */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <FiUsers className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-100">Active Students</div>
                    <div className="text-3xl font-bold text-white">
                      <AnimatedCounter end={1000000} suffix="+" />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/20" />

                <div className="space-y-3">
                  {[
                    { label: "Assessments Completed", value: "5M+" },
                    { label: "Success Rate", value: "98%" },
                    { label: "Time Saved", value: "15hrs/week" },
                  ].map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-blue-100 text-sm">{stat.label}</span>
                      <span className="text-white font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Feature Cards */}
            {floatingFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const positions = [
                { top: "10%", left: "10%", delay: 0.7 },
                { top: "15%", right: "5%", delay: 0.9 },
                { bottom: "20%", left: "5%", delay: 1.1 },
                { bottom: "15%", right: "10%", delay: 1.3 },
              ];

              return (
                <motion.div
                  key={index}
                  className="absolute"
                  style={positions[index]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.6, delay: positions[index].delay },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    },
                  }}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-semibold text-sm">{feature.text}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors-smooth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          aria-label="Scroll to features"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium">Scroll to explore</span>
            <FiArrowDown className="w-6 h-6 animate-bounce-gentle" />
          </div>
        </motion.button>
      </Container>
    </section>
  );
};

export default HeroSection;
