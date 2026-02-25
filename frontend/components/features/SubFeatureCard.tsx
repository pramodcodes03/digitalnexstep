"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiLayers } from "react-icons/fi";
import { cn } from "@/lib/utils";
import FeaturePoint from "./FeaturePoint";
import type { SubFeature } from "./featuresData";

interface SubFeatureCardProps {
  subFeature: SubFeature;
  index: number;
}

const SubFeatureCard: React.FC<SubFeatureCardProps> = ({ subFeature, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = subFeature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group"
    >
      <div
        className={cn(
          "rounded-2xl border-2 transition-all duration-500 overflow-hidden",
          isExpanded
            ? "border-primary-400/50 dark:border-primary-600/50 shadow-xl shadow-primary-100/30 dark:shadow-primary-900/20"
            : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 shadow-soft"
        )}
      >
        {/* Sub Feature Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-5 sm:p-6 text-left"
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            <motion.div
              className={cn(
                "flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                subFeature.bgColor
              )}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className={cn("w-6 h-6 sm:w-7 sm:h-7", subFeature.color)} />
            </motion.div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {subFeature.title}
                </h3>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <FiChevronDown className={cn(
                    "w-5 h-5 transition-colors",
                    isExpanded ? "text-primary-500" : "text-gray-400"
                  )} />
                </motion.div>
              </div>
              <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {subFeature.description}
              </p>
              {/* Points count */}
              <div className="mt-3 flex items-center gap-1.5">
                <FiLayers className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                  {subFeature.points.length} point{subFeature.points.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Expandable Points */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="px-4 sm:px-6 pb-5 sm:pb-6">
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent mb-5" />

                {/* Points List */}
                <div className="space-y-3">
                  {subFeature.points.map((point, pointIndex) => (
                    <FeaturePoint
                      key={point.id}
                      point={point}
                      index={pointIndex}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SubFeatureCard;
