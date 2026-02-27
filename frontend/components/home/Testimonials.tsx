"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar, FiMessageCircle } from "react-icons/fi";
import Container from "../ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

const testimonials = [
  {
    name: "Dr. Anita Desai",
    role: "Principal, DPS International",
    quote: "DigitalNexStep has completely transformed how we conduct assessments. The AI-powered analytics give us insights we never had before. Our student outcomes improved by 35% in just one year.",
    rating: 5,
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Prof. Ramesh Nair",
    role: "Director, National Institute of Education",
    quote: "The platform's reliability and depth of features are unmatched. We've been using it for 3 years and it continues to exceed expectations. The support team is incredibly responsive.",
    rating: 5,
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Shalini Gupta",
    role: "Founder, LearnBridge Academy",
    quote: "As a growing ed-tech startup, we needed a robust assessment solution. DigitalNexStep provided exactly that – scalable, user-friendly, and backed by brilliant technology.",
    rating: 5,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Karthik Venkatesh",
    role: "COO, EduStar Group",
    quote: "We manage 50+ centers and DigitalNexStep handles our assessments flawlessly across all locations. The real-time reporting saves us hundreds of hours every month.",
    rating: 5,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Meera Krishnan",
    role: "Academic Head, Sunshine Schools",
    quote: "The personalized reports for each student are a game-changer. Parents love the detailed insights, and teachers can now focus on targeted improvement areas.",
    rating: 5,
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Arun Prakash",
    role: "Managing Director, TechEd Solutions",
    quote: "Integration was seamless and the team walked us through every step. Their commitment to education technology is evident in every feature they build.",
    rating: 5,
    color: "from-rose-500 to-pink-600",
  },
];

const Testimonials: React.FC = () => {
  const defaultColors = [
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-green-500 to-emerald-600",
    "from-orange-500 to-red-500",
    "from-cyan-500 to-blue-600",
    "from-rose-500 to-pink-600",
  ];

  const { data: apiTestimonials } = useApi(() => api.getTestimonials(), [] as any[]);

  const displayTestimonials: typeof testimonials = apiTestimonials.length > 0
    ? apiTestimonials.map((t: any, i: number) => ({
        name: t.name,
        role: [t.designation, t.company].filter(Boolean).join(", "),
        quote: t.content,
        rating: t.rating || 5,
        color: defaultColors[i % defaultColors.length],
      }))
    : testimonials;

  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = displayTestimonials.length - visibleCount;

  const handlePrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setActiveIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-20 w-80 h-80 bg-gradient-to-br from-blue-300/10 to-purple-300/10 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-72 h-72 bg-gradient-to-bl from-orange-300/10 to-pink-300/10 dark:from-orange-600/10 dark:to-pink-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, delay: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Quote Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] dark:opacity-[0.03]">
          <FiMessageCircle className="w-[500px] h-[500px]" />
        </div>
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-5"
          >
            <FiMessageCircle className="w-4 h-4" />
            What People Say
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Educators
            </span>{" "}
            Nationwide
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Hear from the educators and institutions who have transformed their
            assessment experience with our platform.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 dark:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handleNext}
              disabled={activeIndex >= maxIndex}
              className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 dark:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Cards */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {displayTestimonials
                  .slice(activeIndex, activeIndex + visibleCount)
                  .map((testimonial, index) => (
                    <motion.div
                      key={activeIndex + index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -6, transition: { duration: 0.25 } }}
                      className="group"
                    >
                      <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {/* Accent */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.color}`} />

                        {/* Quote Icon */}
                        <div className="mb-5">
                          <svg
                            className={`w-10 h-10 opacity-20`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <FiStar
                              key={i}
                              className="w-4 h-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center shadow-md`}>
                            <span className="text-white text-sm font-bold">
                              {testimonial.name.split(" ").filter(n => !n.includes(".")).map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                              {testimonial.name}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-gradient-to-r from-orange-500 to-pink-500"
                    : "w-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
