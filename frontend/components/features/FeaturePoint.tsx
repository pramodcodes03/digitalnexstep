"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiFilm } from "react-icons/fi";
import { cn } from "@/lib/utils";
import FeatureCarousel from "./FeatureCarousel";
import type { PointItem } from "./featuresData";

interface FeaturePointProps {
  point: PointItem;
  index: number;
}

const FeaturePoint: React.FC<FeaturePointProps> = ({ point, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        className={cn(
          "rounded-xl border transition-all duration-500 overflow-hidden",
          isOpen
            ? "border-primary-300 dark:border-primary-700 bg-gradient-to-br from-primary-50/50 via-white to-indigo-50/30 dark:from-primary-900/20 dark:via-gray-800 dark:to-indigo-900/10 shadow-lg shadow-primary-100/50 dark:shadow-primary-900/20"
            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-md"
        )}
      >
        {/* Point Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-start gap-4 p-4 sm:p-5 text-left group"
        >
          {/* Number Badge */}
          <motion.div
            className={cn(
              "flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300",
              isOpen
                ? "bg-primary-500 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400"
            )}
            animate={isOpen ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {index + 1}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4
              className={cn(
                "text-base sm:text-lg font-semibold transition-colors duration-300",
                isOpen
                  ? "text-primary-700 dark:text-primary-400"
                  : "text-gray-800 dark:text-gray-200"
              )}
            >
              {point.title}
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {point.description}
            </p>
            {/* Video count badge */}
            <div className="mt-2 flex items-center gap-1.5">
              <FiFilm className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {point.videos.length} video{point.videos.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 mt-1"
          >
            <FiChevronDown
              className={cn(
                "w-5 h-5 transition-colors duration-300",
                isOpen ? "text-primary-500" : "text-gray-400 dark:text-gray-500"
              )}
            />
          </motion.div>
        </button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="px-4 sm:px-5 pb-5 pt-1">
                {/* Full description */}
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 pl-12 sm:pl-13"
                >
                  {point.description}
                </motion.p>

                {/* Carousel */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  <FeatureCarousel point={point} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FeaturePoint;
