"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MainFeature } from "./featuresData";

interface FeaturesSidebarProps {
  features: MainFeature[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

const FeaturesSidebar: React.FC<FeaturesSidebarProps> = ({
  features,
  activeId,
  onSelect,
}) => {
  return (
    <nav className="sticky top-28 space-y-1.5">
      <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-4 px-3">
        Modules
      </p>
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isActive = activeId === feature.id;
        return (
          <motion.button
            key={feature.id}
            onClick={() => onSelect(feature.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 group relative",
              isActive
                ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
            whileHover={{ x: 4 }}
          >
            {/* Active indicator */}
            {isActive && (
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary-500"
                layoutId="sidebarActive"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <div
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                isActive
                  ? "bg-primary-100 dark:bg-primary-800/40"
                  : "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  isActive
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-500 dark:text-gray-400"
                )}
              />
            </div>
            <span className="text-sm font-medium truncate">{feature.title}</span>
          </motion.button>
        );
      })}
    </nav>
  );
};

export default FeaturesSidebar;
