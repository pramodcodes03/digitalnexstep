"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiPlay, FiArrowDown } from "react-icons/fi";
import Button from "../ui/Button";
import Container from "../ui/Container";

const HeroSection: React.FC = () => {
  const handleGetStarted = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWatchDemo = () => {
    // This would open a video modal in a real implementation
    alert("Demo video would play here!");
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-900/50" />

      <Container className="relative z-10 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-100 text-sm font-medium uppercase tracking-wide">
              Welcome to Educational Excellence
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Transform Assessment,{" "}
            <span className="block mt-2 bg-gradient-to-r from-primary-200 to-white bg-clip-text text-transparent">
              Elevate Learning
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Empower your educational institution with our comprehensive assessment platform.
            Real-time analytics, automated grading, and seamless integration.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleGetStarted}
              className="w-full sm:w-auto bg-white text-primary-700 hover:bg-primary-50"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleWatchDemo}
              leftIcon={<FiPlay />}
              className="w-full sm:w-auto border-white text-white hover:bg-white/10"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="pt-12 flex flex-wrap items-center justify-center gap-8 text-primary-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="h-4 w-px bg-primary-400" />
            <div>
              <span className="font-semibold">500+ Centers</span>
            </div>
            <div className="h-4 w-px bg-primary-400" />
            <div>
              <span className="font-semibold">1M+ Assessments</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors-smooth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          aria-label="Scroll to features"
        >
          <FiArrowDown className="w-8 h-8 animate-bounce-gentle" />
        </motion.button>
      </Container>
    </section>
  );
};

export default HeroSection;
