"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiStar, FiUsers, FiArrowRight, FiBookOpen, FiSearch, FiFilter } from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

const categories = ["All", "Web Development", "Data Science", "Design", "Business", "Marketing", "AI & ML"];

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2024",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=600&q=80",
    rating: 4.8,
    reviews: 12430,
    mrp: 4999,
    price: 499,
    instructor: "Sarah Johnson",
    level: "Beginner",
    badge: "Bestseller",
    badgeColor: "bg-orange-500",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning with Python",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    rating: 4.9,
    reviews: 9850,
    mrp: 5999,
    price: 599,
    instructor: "Dr. Michael Chen",
    level: "Intermediate",
    badge: "Top Rated",
    badgeColor: "bg-primary-600",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass: From Beginner to Pro",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    rating: 4.7,
    reviews: 7210,
    mrp: 3999,
    price: 399,
    instructor: "Emily Rodriguez",
    level: "All Levels",
    badge: "New",
    badgeColor: "bg-success-600",
  },
  {
    id: 4,
    title: "Advanced React & Next.js: Build Real Projects",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&q=80",
    rating: 4.9,
    reviews: 8540,
    mrp: 4499,
    price: 449,
    instructor: "Alex Turner",
    level: "Advanced",
    badge: "Bestseller",
    badgeColor: "bg-orange-500",
  },
  {
    id: 5,
    title: "Digital Marketing Strategy & Growth Hacking",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    rating: 4.6,
    reviews: 5320,
    mrp: 3499,
    price: 349,
    instructor: "Priya Sharma",
    level: "Intermediate",
    badge: "Hot",
    badgeColor: "bg-error-600",
  },
  {
    id: 6,
    title: "AI & Deep Learning with TensorFlow",
    category: "AI & ML",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    rating: 4.8,
    reviews: 6780,
    mrp: 6999,
    price: 699,
    instructor: "Prof. David Kim",
    level: "Advanced",
    badge: "Top Rated",
    badgeColor: "bg-primary-600",
  },
  {
    id: 7,
    title: "Business Analytics & Financial Modeling",
    category: "Business",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    rating: 4.5,
    reviews: 4190,
    mrp: 3999,
    price: 399,
    instructor: "James Wilson",
    level: "Intermediate",
    badge: null,
    badgeColor: "",
  },
  {
    id: 8,
    title: "Graphic Design Fundamentals with Adobe Suite",
    category: "Design",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    rating: 4.7,
    reviews: 3870,
    mrp: 2999,
    price: 299,
    instructor: "Mia Anderson",
    level: "Beginner",
    badge: "New",
    badgeColor: "bg-success-600",
  },
  {
    id: 9,
    title: "Full-Stack Python: Django, REST APIs & Deployment",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
    rating: 4.8,
    reviews: 7640,
    mrp: 4999,
    price: 499,
    instructor: "Carlos Martinez",
    level: "Intermediate",
    badge: "Bestseller",
    badgeColor: "bg-orange-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating >= star - 0.5;
        return (
          <span key={star} className="relative inline-block w-4 h-4">
            <FiStar className="w-4 h-4 text-gray-300 dark:text-gray-600 fill-current absolute inset-0" />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : "50%" }}
              >
                <FiStar className="w-4 h-4 text-warning-500 fill-current" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function CourseCard({ course, index }: { course: typeof courses[0]; index: number }) {
  const discount = Math.round(((course.mrp - course.price) / course.mrp) * 100);

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-strong dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <motion.img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          loading="lazy"
        />
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Badge */}
        {course.badge && (
          <div
            className={`absolute top-3 left-3 ${course.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide`}
          >
            {course.badge}
          </div>
        )}

        {/* Discount Badge */}
        <div className="absolute top-3 right-3 bg-success-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
          -{discount}%
        </div>

        {/* Level badge on hover */}
        <motion.div
          className="absolute bottom-3 left-3"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            {course.level}
          </span>
        </motion.div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {/* Category */}
        <div className="mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
            <FiBookOpen className="w-3.5 h-3.5" />
            {course.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-gray-900 dark:text-white font-bold text-base leading-snug mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          by <span className="font-medium text-gray-700 dark:text-gray-300">{course.instructor}</span>
        </p>

        {/* Rating Row */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-warning-600 dark:text-warning-500 font-bold text-sm tabular-nums">
            {course.rating.toFixed(1)}
          </span>
          <StarRating rating={course.rating} />
          <span className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1">
            <FiUsers className="w-3.5 h-3.5" />
            {course.reviews.toLocaleString()} reviews
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-700 mb-4" />

        {/* Price Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
              ₹{course.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-500 line-through font-medium">
              ₹{course.mrp.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Learn More Button */}
        <Link href={`/courses/${course.id}`}>
          <motion.div
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-colors duration-200 group/btn cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <span>Learn More</span>
            <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </motion.div>
        </Link>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ boxShadow: "0 0 0px rgba(37, 99, 235, 0)" }}
        whileHover={{ boxShadow: "0 0 30px rgba(37, 99, 235, 0.12)" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 dark:from-gray-900 dark:via-primary-900 dark:to-primary-800">
        {/* Background Orbs */}
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

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <Container>
          <div className="relative text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-sm font-semibold uppercase tracking-widest mb-6 border border-white/20">
                World-Class Learning
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Explore Our{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Premium Courses
                </span>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Unlock your potential with expert-led courses. Learn at your own pace
              and gain industry-recognized skills.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                { label: "Expert Courses", value: "200+" },
                { label: "Students Enrolled", value: "50K+" },
                { label: "Avg. Rating", value: "4.8 ★" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-white/60 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-[72px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-navbar border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <Container>
          <div className="py-4 flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full sm:max-w-sm">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-hide">
              <FiFilter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="flex gap-2 flex-nowrap">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-primary-600 text-white shadow-md shadow-primary-500/25"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <Container>
          {/* Results Count */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {filteredCourses.length}
              </span>{" "}
              {filteredCourses.length === 1 ? "course" : "courses"}
              {activeCategory !== "All" && (
                <> in <span className="text-primary-600 dark:text-primary-400 font-semibold">{activeCategory}</span></>
              )}
            </p>
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filteredCourses.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
              >
                {filteredCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiBookOpen className="w-9 h-9 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No courses found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
                <motion.button
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  className="px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors duration-200"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-gray-900">
        <Container>
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join 50,000+ learners already advancing their careers with DigitalNexStep.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg"
                >
                  Get Started Free
                  <FiArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 transition-colors duration-200"
                >
                  Learn More
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
