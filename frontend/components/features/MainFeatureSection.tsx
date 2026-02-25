"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";
import SubFeatureCard from "./SubFeatureCard";
import type { MainFeature } from "./featuresData";

interface MainFeatureSectionProps {
  feature: MainFeature;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

const MainFeatureSection: React.FC<MainFeatureSectionProps> = ({
  feature,
  index,
  isActive,
  onSelect,
}) => {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Feature Header Card */}
      <motion.button
        onClick={onSelect}
        className={cn(
          "w-full text-left rounded-2xl p-5 sm:p-6 transition-all duration-500 border-2 group relative overflow-hidden",
          isActive
            ? "border-transparent shadow-xl"
            : "border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 shadow-soft hover:shadow-lg bg-white dark:bg-gray-800"
        )}
        whileHover={!isActive ? { y: -2 } : {}}
        whileTap={{ scale: 0.995 }}
      >
        {/* Active gradient background */}
        {isActive && (
          <motion.div
            className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.08] dark:opacity-[0.15]", feature.gradient)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 0.08 : 0 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Active left border accent */}
        {isActive && (
          <motion.div
            className={cn("absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-gradient-to-b", feature.gradient)}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}

        <div className="relative flex items-start gap-4 sm:gap-5">
          {/* Icon with gradient background */}
          <motion.div
            className={cn(
              "flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center relative overflow-hidden",
              isActive ? "shadow-lg" : "shadow-md"
            )}
            animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br", feature.gradient)} />
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                {feature.title}
              </h2>
              <motion.div
                animate={{ rotate: isActive ? 90 : 0, x: isActive ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiChevronRight className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-primary-500" : "text-gray-400"
                )} />
              </motion.div>
            </div>
            <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>
            {/* Sub features count */}
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              {feature.subFeatures.map((sf) => (
                <span
                  key={sf.id}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  {sf.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.button>

      {/* Sub Features (expandable) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="pt-4 sm:pt-6 pl-4 sm:pl-8 space-y-4 sm:space-y-5">
              {/* Connecting line */}
              <div className="hidden sm:block absolute left-10 top-full w-0.5 h-4 bg-gradient-to-b from-primary-300 to-transparent" />

              {feature.subFeatures.map((subFeature, sfIndex) => (
                <SubFeatureCard
                  key={subFeature.id}
                  subFeature={subFeature}
                  index={sfIndex}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MainFeatureSection;
