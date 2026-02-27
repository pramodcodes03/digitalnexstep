"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiImage,
  FiFileText,
  FiAward,
  FiVideo,
  FiGrid,
  FiPlay,
  FiExternalLink,
  FiCalendar,
  FiEye,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

/* ─── Types ─── */
type GalleryCategory = "all" | "images" | "news" | "awards" | "videos";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  category: "images" | "news" | "awards" | "videos";
  date: string;
  color: string;
  accent: string;
}

/* ─── Gallery Data ─── */
const galleryItems: GalleryItem[] = [
  // Images
  {
    id: 1,
    title: "Annual Day Celebration 2024",
    description: "Students and faculty celebrating the grand annual day event with cultural performances.",
    category: "images",
    date: "Dec 15, 2024",
    color: "from-blue-500 to-indigo-600",
    accent: "blue",
  },
  {
    id: 2,
    title: "New Campus Inauguration",
    description: "Grand opening of our state-of-the-art Bangalore campus with modern facilities.",
    category: "images",
    date: "Nov 20, 2024",
    color: "from-cyan-500 to-blue-600",
    accent: "cyan",
  },
  {
    id: 3,
    title: "Student Workshop on AI",
    description: "Hands-on workshop on Artificial Intelligence and Machine Learning for students.",
    category: "images",
    date: "Oct 10, 2024",
    color: "from-teal-500 to-green-600",
    accent: "teal",
  },
  {
    id: 4,
    title: "Teacher Training Program",
    description: "Intensive training sessions for educators on modern assessment methodologies.",
    category: "images",
    date: "Sep 5, 2024",
    color: "from-indigo-500 to-purple-600",
    accent: "indigo",
  },
  // News
  {
    id: 5,
    title: "DigitalNexStep Expands to 5 New Cities",
    description: "We are thrilled to announce expansion to Pune, Jaipur, Lucknow, Chandigarh, and Kochi.",
    category: "news",
    date: "Jan 10, 2025",
    color: "from-green-500 to-emerald-600",
    accent: "green",
  },
  {
    id: 6,
    title: "Partnership with National Education Board",
    description: "Signed MoU with the National Board for digital assessment infrastructure across 10,000 schools.",
    category: "news",
    date: "Dec 22, 2024",
    color: "from-emerald-500 to-teal-600",
    accent: "emerald",
  },
  {
    id: 7,
    title: "1 Million Assessments Milestone",
    description: "Our platform has successfully delivered over 1 million assessments nationwide.",
    category: "news",
    date: "Nov 15, 2024",
    color: "from-lime-500 to-green-600",
    accent: "lime",
  },
  {
    id: 8,
    title: "New AI-Powered Analytics Launched",
    description: "Introducing intelligent analytics dashboard with predictive student performance insights.",
    category: "news",
    date: "Oct 28, 2024",
    color: "from-green-600 to-emerald-700",
    accent: "green",
  },
  // Awards
  {
    id: 9,
    title: "Best EdTech Platform 2024",
    description: "Recognized as the Best EdTech Platform at the India Education Awards 2024.",
    category: "awards",
    date: "Dec 5, 2024",
    color: "from-yellow-500 to-orange-500",
    accent: "yellow",
  },
  {
    id: 10,
    title: "Innovation in Assessment Award",
    description: "Awarded for pioneering AI-driven adaptive testing at Global Ed Summit.",
    category: "awards",
    date: "Nov 1, 2024",
    color: "from-amber-500 to-yellow-600",
    accent: "amber",
  },
  {
    id: 11,
    title: "Excellence in Student Engagement",
    description: "Honored for achieving 98% student satisfaction rate across partner institutions.",
    category: "awards",
    date: "Sep 18, 2024",
    color: "from-orange-500 to-red-500",
    accent: "orange",
  },
  {
    id: 12,
    title: "Top 10 Startups to Watch",
    description: "Featured in Forbes India's Top 10 EdTech Startups to Watch in 2024.",
    category: "awards",
    date: "Aug 25, 2024",
    color: "from-yellow-600 to-amber-600",
    accent: "yellow",
  },
  // Videos
  {
    id: 13,
    title: "Platform Demo: Smart Assessments",
    description: "Complete walkthrough of our AI-powered assessment creation and management system.",
    category: "videos",
    date: "Jan 5, 2025",
    color: "from-purple-500 to-pink-600",
    accent: "purple",
  },
  {
    id: 14,
    title: "Student Success Stories",
    description: "Watch inspiring stories of students who achieved their dreams using our platform.",
    category: "videos",
    date: "Dec 18, 2024",
    color: "from-pink-500 to-rose-600",
    accent: "pink",
  },
  {
    id: 15,
    title: "CEO Talk: Future of Education",
    description: "Our CEO shares the vision for transforming education through technology and innovation.",
    category: "videos",
    date: "Nov 8, 2024",
    color: "from-rose-500 to-red-600",
    accent: "rose",
  },
  {
    id: 16,
    title: "Annual Conference Highlights",
    description: "Best moments from the DigitalNexStep Annual Conference 2024 with 500+ attendees.",
    category: "videos",
    date: "Oct 20, 2024",
    color: "from-violet-500 to-purple-600",
    accent: "violet",
  },
];

/* ─── Filter Tabs ─── */
const filterTabs = [
  { id: "all" as GalleryCategory, label: "All", icon: FiGrid, color: "from-gray-600 to-gray-700" },
  { id: "images" as GalleryCategory, label: "Images", icon: FiImage, color: "from-blue-500 to-indigo-600" },
  { id: "news" as GalleryCategory, label: "News", icon: FiFileText, color: "from-green-500 to-emerald-600" },
  { id: "awards" as GalleryCategory, label: "Award Show", icon: FiAward, color: "from-yellow-500 to-orange-500" },
  { id: "videos" as GalleryCategory, label: "Videos", icon: FiVideo, color: "from-purple-500 to-pink-600" },
];

/* ─── Category Icon Map ─── */
const categoryIcon: Record<string, React.ElementType> = {
  images: FiImage,
  news: FiFileText,
  awards: FiAward,
  videos: FiVideo,
};

const categoryLabel: Record<string, string> = {
  images: "Image",
  news: "News",
  awards: "Award",
  videos: "Video",
};

/* ─── Main Page ─── */
export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("all");

  const categoryColors: Record<string, { color: string; accent: string }> = {
    images: { color: "from-blue-500 to-indigo-600", accent: "blue" },
    news: { color: "from-green-500 to-emerald-600", accent: "green" },
    awards: { color: "from-yellow-500 to-orange-500", accent: "yellow" },
    videos: { color: "from-purple-500 to-pink-600", accent: "purple" },
  };

  const { data: apiSections } = useApi(() => api.getPageSections("gallery"), [] as any[]);
  const heroData = apiSections.find((s: any) => s.section_key === "gallery_hero");

  const { data: apiItems } = useApi(() => api.getGalleryItems(), [] as any[]);

  const items: GalleryItem[] = apiItems.length > 0
    ? apiItems.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        date: item.date ? new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "",
        color: categoryColors[item.category]?.color || "from-gray-500 to-gray-600",
        accent: categoryColors[item.category]?.accent || "gray",
      }))
    : galleryItems;

  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.category === activeFilter);

  const activeTab = filterTabs.find((t) => t.id === activeFilter)!;

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative pt-12 pb-8 bg-gradient-to-br from-gray-50 via-purple-50/40 to-pink-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-purple-300/15 to-pink-300/15 dark:from-purple-600/10 dark:to-pink-600/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-blue-300/15 to-indigo-300/15 dark:from-blue-600/10 dark:to-indigo-600/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, delay: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <Container className="relative z-10">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-5"
            >
              <FiImage className="w-4 h-4" />
              Gallery
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              {heroData?.title || "Our"}{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                {heroData?.subtitle || "Gallery"}
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {heroData?.content || "Explore our journey through images, latest news, prestigious awards, and insightful videos."}
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-4"
          >
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className="relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl shadow-lg`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Active count */}
          <motion.p
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2"
          >
            Showing {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
            {activeFilter !== "all" && ` in ${activeTab.label}`}
          </motion.p>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/3 -right-32 w-80 h-80 bg-gradient-to-bl from-purple-200/10 to-pink-200/10 dark:from-purple-600/5 dark:to-pink-600/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <Container className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredItems.map((item, index) => {
                const CatIcon = categoryIcon[item.category];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                    className="group cursor-pointer"
                  >
                    <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                      {/* Image / Thumbnail Area */}
                      <div className={`relative h-48 bg-gradient-to-br ${item.color} overflow-hidden`}>
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
                              backgroundSize: "30px 30px",
                            }}
                          />
                        </div>

                        {/* Center Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                            whileHover={{ rotate: 5 }}
                          >
                            {item.category === "videos" ? (
                              <FiPlay className="w-10 h-10 text-white" />
                            ) : (
                              <CatIcon className="w-10 h-10 text-white" />
                            )}
                          </motion.div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                              <FiEye className="w-5 h-5 text-gray-800" />
                            </div>
                          </motion.div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-xs font-bold rounded-lg text-gray-800 dark:text-gray-200">
                            <CatIcon className="w-3 h-3" />
                            {categoryLabel[item.category]}
                          </span>
                        </div>

                        {/* Video Play Badge */}
                        {item.category === "videos" && (
                          <div className="absolute bottom-3 right-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-md">
                              <FiPlay className="w-3 h-3 fill-white" />
                              Play
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">
                          {item.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <FiCalendar className="w-3 h-3" />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span>View</span>
                            <FiExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FiImage className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">
                No items found
              </h3>
              <p className="text-gray-400 dark:text-gray-500 mt-2">
                Try selecting a different category.
              </p>
            </motion.div>
          )}
        </Container>
      </section>

      <Footer />
    </>
  );
}
