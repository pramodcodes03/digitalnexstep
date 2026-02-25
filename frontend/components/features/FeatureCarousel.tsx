"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";
import ResponsiveVideoPlayer from "./ResponsiveVideoPlayer";
import type { VideoItem, PointItem } from "./featuresData";

interface FeatureCarouselProps {
  point: PointItem;
  className?: string;
}

/* ─── Layout: Cards ─── */
const CardsLayout: React.FC<{ videos: VideoItem[]; current: number }> = ({ videos, current }) => (
  <div className="flex items-end justify-center gap-4 sm:gap-6 py-4">
    {videos.map((video, i) => (
      <motion.div
        key={video.id}
        animate={{
          scale: i === current ? 1 : 0.85,
          opacity: i === current ? 1 : 0.5,
          y: i === current ? 0 : 20,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-shrink-0"
      >
        <ResponsiveVideoPlayer video={video} />
      </motion.div>
    ))}
  </div>
);

/* ─── Layout: Filmstrip ─── */
const FilmstripLayout: React.FC<{ videos: VideoItem[]; current: number }> = ({ videos, current }) => (
  <div className="relative overflow-hidden">
    <motion.div
      className="flex gap-4"
      animate={{ x: `${-current * 280}px` }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {videos.map((video, i) => (
        <motion.div
          key={video.id}
          className="flex-shrink-0 w-[260px]"
          animate={{ opacity: i === current ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          <ResponsiveVideoPlayer video={video} />
        </motion.div>
      ))}
    </motion.div>
    {/* Fade edges */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white dark:from-gray-800 to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white dark:from-gray-800 to-transparent" />
  </div>
);

/* ─── Layout: Grid ─── */
const GridLayout: React.FC<{ videos: VideoItem[] }> = ({ videos }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
    {videos.map((video, i) => (
      <motion.div
        key={video.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, duration: 0.4 }}
        className="flex justify-center"
      >
        <ResponsiveVideoPlayer video={video} />
      </motion.div>
    ))}
  </div>
);

/* ─── Layout: Spotlight ─── */
const SpotlightLayout: React.FC<{ videos: VideoItem[]; current: number }> = ({ videos, current }) => (
  <div className="flex flex-col items-center gap-6">
    {/* Main spotlight */}
    <AnimatePresence mode="wait">
      <motion.div
        key={videos[current].id}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <ResponsiveVideoPlayer video={videos[current]} />
      </motion.div>
    </AnimatePresence>

    {/* Thumbnails */}
    {videos.length > 1 && (
      <div className="flex gap-3 justify-center">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            className={cn(
              "w-16 h-10 rounded-lg overflow-hidden border-2 cursor-pointer transition-all",
              i === current
                ? "border-primary-500 shadow-glow"
                : "border-gray-300 dark:border-gray-600 opacity-50 hover:opacity-80"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary-800/60 to-indigo-800/60" />
          </motion.div>
        ))}
      </div>
    )}
  </div>
);

const FeatureCarousel: React.FC<FeatureCarouselProps> = ({ point, className }) => {
  const [current, setCurrent] = useState(0);
  const { videos, carouselLayout } = point;

  const goTo = useCallback(
    (dir: -1 | 1) => {
      setCurrent((prev) => (prev + dir + videos.length) % videos.length);
    },
    [videos.length]
  );

  const showNav = videos.length > 1 && carouselLayout !== "grid";

  return (
    <div className={cn("relative", className)}>
      {/* Carousel Content */}
      <div className="relative px-8 sm:px-12">
        {carouselLayout === "cards" && <CardsLayout videos={videos} current={current} />}
        {carouselLayout === "filmstrip" && <FilmstripLayout videos={videos} current={current} />}
        {carouselLayout === "grid" && <GridLayout videos={videos} />}
        {carouselLayout === "spotlight" && <SpotlightLayout videos={videos} current={current} />}
      </div>

      {/* Navigation Arrows */}
      {showNav && (
        <>
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
            onClick={() => goTo(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
            onClick={() => goTo(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronRight className="w-5 h-5" />
          </motion.button>
        </>
      )}

      {/* Dots Indicator */}
      {showNav && (
        <div className="flex justify-center gap-2 mt-4">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === current
                  ? "w-6 h-2 bg-primary-500"
                  : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              )}
            />
          ))}
        </div>
      )}

      {/* Layout indicator */}
      <div className="mt-3 flex justify-center">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-medium">
          {carouselLayout} view
        </span>
      </div>
    </div>
  );
};

export default FeatureCarousel;
