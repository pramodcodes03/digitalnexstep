"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import FeaturesHero from "@/components/features/FeaturesHero";
import FeaturesSidebar from "@/components/features/FeaturesSidebar";
import MainFeatureSection from "@/components/features/MainFeatureSection";
import { featuresData } from "@/components/features/featuresData";
import { cn } from "@/lib/utils";

export default function FeaturesPage() {
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Filter features based on search
  const filteredFeatures = searchQuery.trim()
    ? featuresData.filter((feature) => {
        const q = searchQuery.toLowerCase();
        if (feature.title.toLowerCase().includes(q)) return true;
        if (feature.description.toLowerCase().includes(q)) return true;
        return feature.subFeatures.some(
          (sf) =>
            sf.title.toLowerCase().includes(q) ||
            sf.description.toLowerCase().includes(q) ||
            sf.points.some(
              (p) =>
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
            )
        );
      })
    : featuresData;

  // Auto-expand first result on search
  useEffect(() => {
    if (searchQuery.trim() && filteredFeatures.length > 0 && !activeFeatureId) {
      setActiveFeatureId(filteredFeatures[0].id);
    }
  }, [searchQuery, filteredFeatures, activeFeatureId]);

  const handleFeatureSelect = (id: string) => {
    setActiveFeatureId((prev) => (prev === id ? null : id));
    setIsMobileSidebarOpen(false);
  };

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <FeaturesHero />

        {/* Features Content */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50/50 dark:bg-gray-900 min-h-screen">
          <Container size="xl">
            {/* Search & Filter Bar */}
            <motion.div
              className="mb-10 sm:mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search features, modules, or capabilities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-soft transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveFeatureId(null);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Mobile sidebar toggle */}
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="lg:hidden flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-soft transition-all"
                >
                  <FiFilter className="w-4 h-4" />
                  <span className="text-sm font-medium">Modules</span>
                </button>
              </div>

              {/* Results count on search */}
              <AnimatePresence>
                {searchQuery.trim() && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Found{" "}
                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                      {filteredFeatures.length}
                    </span>{" "}
                    module{filteredFeatures.length !== 1 ? "s" : ""} matching &ldquo;{searchQuery}&rdquo;
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Main Layout: Sidebar + Content */}
            <div className="flex gap-8 lg:gap-12">
              {/* Desktop Sidebar */}
              <div className="hidden lg:block w-72 flex-shrink-0">
                <FeaturesSidebar
                  features={filteredFeatures}
                  activeId={activeFeatureId}
                  onSelect={handleFeatureSelect}
                />
              </div>

              {/* Mobile Sidebar Overlay */}
              <AnimatePresence>
                {isMobileSidebarOpen && (
                  <motion.div
                    className="fixed inset-0 z-50 lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div
                      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                      onClick={() => setIsMobileSidebarOpen(false)}
                    />
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-800 shadow-2xl p-6 overflow-y-auto"
                      initial={{ x: "-100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Feature Modules
                        </h3>
                        <button
                          onClick={() => setIsMobileSidebarOpen(false)}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <FiX className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                      <FeaturesSidebar
                        features={filteredFeatures}
                        activeId={activeFeatureId}
                        onSelect={handleFeatureSelect}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content Area */}
              <div ref={contentRef} className="flex-1 min-w-0">
                {filteredFeatures.length === 0 ? (
                  <motion.div
                    className="text-center py-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                      <FiSearch className="w-7 h-7 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      No features found
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Try adjusting your search terms
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    {filteredFeatures.map((feature, index) => (
                      <MainFeatureSection
                        key={feature.id}
                        feature={feature}
                        index={index}
                        isActive={activeFeatureId === feature.id}
                        onSelect={() => handleFeatureSelect(feature.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Bottom CTA Section */}
        <section className="relative py-20 sm:py-28 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-indigo-900 to-violet-900">
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139,92,246,0.3) 0%, transparent 50%)",
              }}
            />
          </div>

          <Container className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                Ready to Transform Your Institution?
              </h2>
              <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                Get started with DigitalNexStep and unlock every feature for your
                educational management needs.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="/#contact"
                  className="px-8 py-4 rounded-xl bg-white text-primary-700 font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started Free
                </motion.a>
                <motion.a
                  href="/#pricing"
                  className="px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Pricing
                </motion.a>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
