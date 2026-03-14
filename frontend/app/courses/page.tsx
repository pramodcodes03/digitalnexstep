"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiBookOpen, FiSearch, FiFilter, FiClock, FiEye, FiHeart, FiArrowRight } from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

interface TenantCourse {
  id: number;
  title: string;
  course_name: string;
  course_image: string | null;
  rating: number;
  duration: string;
  total_views: number;
  total_likes: number;
  category?: string;
}

function CourseCard({ course }: { course: TenantCourse }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-strong dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-primary-800/40 flex-shrink-0">
        {course.course_image ? (
          <motion.img
            src={course.course_image}
            alt={course.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiBookOpen className="w-12 h-12 text-primary-400 dark:text-primary-500" />
          </div>
        )}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {course.category && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-2">
            <FiBookOpen className="w-3.5 h-3.5" />
            {course.category}
          </span>
        )}

        <h3 className="text-gray-900 dark:text-white font-bold text-base leading-snug mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 flex-1">
          {course.title}
        </h3>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
          {course.duration && (
            <span className="flex items-center gap-1">
              <FiClock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
          )}
          {course.total_views > 0 && (
            <span className="flex items-center gap-1">
              <FiEye className="w-3.5 h-3.5" />
              {course.total_views.toLocaleString()}
            </span>
          )}
          {course.total_likes > 0 && (
            <span className="flex items-center gap-1">
              <FiHeart className="w-3.5 h-3.5" />
              {course.total_likes.toLocaleString()}
            </span>
          )}
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          <Link href={`/courses/${course.id}`}>
            <motion.div
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-colors duration-200 group/btn cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <span>View Details</span>
              <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl mt-4" />
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: apiResponse, loading } = useApi(() => api.getTenantCourses(), null as any);
  const { data: apiSections } = useApi(() => api.getPageSections("courses"), [] as any[]);
  const heroData = apiSections.find((s: any) => s.section_key === "courses_hero");

  const tenantCourses: TenantCourse[] = apiResponse?.data ?? [];

  const filtered = tenantCourses.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return c.title.toLowerCase().includes(q) || (c.category || "").toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 dark:from-gray-900 dark:via-primary-900 dark:to-primary-800">
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <Container>
          <div className="relative text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-sm font-semibold uppercase tracking-widest mb-6 border border-white/20">
                {heroData?.subtitle || "Professional Courses"}
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {heroData?.title || (
                <>
                  Explore Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                    Courses
                  </span>
                </>
              )}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {heroData?.content || "Unlock your potential with expert-led courses. Learn at your own pace and gain industry-recognized certifications."}
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Search Bar */}
      <section className="sticky top-[72px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-navbar border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <Container>
          <div className="py-4 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            {!loading && tenantCourses.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> course{filtered.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <Container>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={searchQuery}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
              >
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBookOpen className="w-9 h-9 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No courses found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {tenantCourses.length === 0
                  ? "No courses are currently available. Please check back later."
                  : "Try adjusting your search to find what you're looking for."}
              </p>
              {searchQuery && (
                <motion.button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors duration-200"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Clear Search
                </motion.button>
              )}
            </motion.div>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-gray-900">
        <Container>
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Start Learning?</h2>
            <p className="text-white/80 text-lg mb-8">Join thousands of students already advancing their careers.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg">
                  Contact Us <FiArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
