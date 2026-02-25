"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiMaximize2, FiMonitor, FiTablet, FiSmartphone, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";
import type { VideoItem } from "./featuresData";

interface ResponsiveVideoPlayerProps {
  video: VideoItem;
  className?: string;
}

const deviceFrameStyles: Record<VideoItem["deviceType"], string> = {
  laptop: "rounded-lg",
  tablet: "rounded-2xl",
  mobile: "rounded-3xl",
};

const aspectRatioStyles: Record<VideoItem["aspectRatio"], string> = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
};

const deviceMaxWidths: Record<VideoItem["deviceType"], string> = {
  laptop: "max-w-full",
  tablet: "max-w-md",
  mobile: "max-w-[240px]",
};

const DeviceIcon: Record<VideoItem["deviceType"], React.ElementType> = {
  laptop: FiMonitor,
  tablet: FiTablet,
  mobile: FiSmartphone,
};

const ResponsiveVideoPlayer: React.FC<ResponsiveVideoPlayerProps> = ({
  video,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = DeviceIcon[video.deviceType];

  return (
    <>
      {/* Video Card */}
      <motion.div
        className={cn("group relative cursor-pointer", deviceMaxWidths[video.deviceType], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsExpanded(true)}
        layout
      >
        {/* Device Frame */}
        <div
          className={cn(
            "relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl",
            deviceFrameStyles[video.deviceType],
            video.deviceType === "mobile" && "border-[6px] border-gray-700",
            video.deviceType === "tablet" && "border-[8px] border-gray-700",
            video.deviceType === "laptop" && "border-[4px] border-gray-700"
          )}
        >
          {/* Notch for mobile */}
          {video.deviceType === "mobile" && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-700 rounded-b-xl z-10" />
          )}

          {/* Video Area */}
          <div className={cn("relative w-full bg-gray-900", aspectRatioStyles[video.aspectRatio])}>
            {/* Placeholder gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/60 to-indigo-900/80" />

            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.3),transparent_50%)]" />
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ margin: "-8px" }}
                />
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:bg-white transition-colors duration-300">
                  <FiPlay className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700 ml-1" />
                </div>
              </motion.div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-white text-xs font-medium">
              {video.duration}
            </div>

            {/* Device type badge */}
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-full">
              <Icon className="w-3 h-3 text-white/80" />
              <span className="text-[10px] text-white/80 capitalize">{video.deviceType}</span>
            </div>

            {/* Expand icon */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
                <FiMaximize2 className="w-3.5 h-3.5 text-white/80" />
              </div>
            </div>
          </div>

          {/* Laptop base */}
          {video.deviceType === "laptop" && (
            <div className="h-3 bg-gradient-to-b from-gray-700 to-gray-600 rounded-b-lg" />
          )}
        </div>

        {/* Video Title */}
        <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center truncate px-1">
          {video.title}
        </p>
      </motion.div>

      {/* Expanded Video Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsExpanded(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className={cn(
                "relative z-10 w-full",
                video.aspectRatio === "9:16" ? "max-w-sm" : "max-w-4xl",
                video.aspectRatio === "1:1" && "max-w-2xl"
              )}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>

              {/* Video Container */}
              <div
                className={cn(
                  "relative w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl",
                  aspectRatioStyles[video.aspectRatio]
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/60 to-indigo-900/80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center mx-auto mb-4 cursor-pointer shadow-2xl"
                    >
                      <FiPlay className="w-8 h-8 text-primary-700 ml-1" />
                    </motion.div>
                    <p className="text-white/80 text-sm">{video.title}</p>
                    <p className="text-white/50 text-xs mt-1">{video.duration}</p>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="mt-4 text-center">
                <h4 className="text-white font-semibold">{video.title}</h4>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <Icon className="w-4 h-4 text-white/60" />
                  <span className="text-white/60 text-sm capitalize">
                    Optimized for {video.deviceType} ({video.aspectRatio})
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResponsiveVideoPlayer;
