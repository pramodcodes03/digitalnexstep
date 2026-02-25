"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { FiPlay, FiChevronLeft, FiChevronRight, FiMonitor, FiTablet, FiSmartphone, FiMaximize2, FiX } from "react-icons/fi";
import { gsap } from "./useGsap";
import { cn } from "@/lib/utils";
import type { SubFeature, PointItem, VideoItem } from "./featuresData";

/* ─── Video Player in Browser Frame ─── */
const VideoFrame: React.FC<{ video: VideoItem; onExpand: () => void }> = ({ video, onExpand }) => {
  const DeviceIcons = { laptop: FiMonitor, tablet: FiTablet, mobile: FiSmartphone };
  const Icon = DeviceIcons[video.deviceType];

  const aspectMap = { "16:9": "aspect-video", "4:3": "aspect-[4/3]", "9:16": "aspect-[9/16]", "1:1": "aspect-square" };

  return (
    <div className="group cursor-pointer" onClick={onExpand}>
      {/* Browser chrome */}
      <div className="bg-gray-800 rounded-t-xl px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-gray-700 rounded-md px-3 py-1 flex items-center gap-2">
          <Icon className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-400 truncate">{video.title}</span>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-700 rounded">
          <FiMaximize2 className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>

      {/* Video area */}
      <div className={cn("relative bg-gray-900 rounded-b-xl overflow-hidden", aspectMap[video.aspectRatio])}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/60 to-indigo-900/80" />

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.4),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.3),transparent_50%)]" />
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:bg-white group-hover:scale-110 transition-all duration-300">
              <FiPlay className="w-7 h-7 text-primary-700 ml-1" />
            </div>
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-md text-white text-xs font-medium">
          {video.duration}
        </div>

        {/* Device badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full">
          <Icon className="w-3 h-3 text-white/80" />
          <span className="text-[10px] text-white/80 capitalize font-medium">{video.deviceType}</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Expanded Video Modal ─── */
const VideoModal: React.FC<{ video: VideoItem; onClose: () => void }> = ({ video, onClose }) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const DeviceIcons = { laptop: FiMonitor, tablet: FiTablet, mobile: FiSmartphone };
  const Icon = DeviceIcons[video.deviceType];
  const aspectMap = { "16:9": "aspect-video", "4:3": "aspect-[4/3]", "9:16": "aspect-[9/16]", "1:1": "aspect-square" };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(contentRef.current, { scale: 0.85, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }, "-=0.15");
    return () => { tl.kill(); };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.3, ease: "power2.in" })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.15");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div ref={backdropRef} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={handleClose} />
      <div
        ref={contentRef}
        className={cn("relative z-10 w-full", video.aspectRatio === "9:16" ? "max-w-sm" : "max-w-4xl")}
      >
        <button onClick={handleClose} className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors">
          <FiX className="w-6 h-6" />
        </button>
        <div className={cn("relative w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl", aspectMap[video.aspectRatio])}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/60 to-indigo-900/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center mx-auto mb-4 cursor-pointer shadow-2xl hover:scale-110 transition-transform">
                <FiPlay className="w-8 h-8 text-primary-700 ml-1" />
              </div>
              <p className="text-white/80 text-sm">{video.title}</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Icon className="w-3.5 h-3.5 text-white/50" />
                <span className="text-white/50 text-xs capitalize">{video.deviceType} &middot; {video.aspectRatio}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Content Card ─── */
interface FeatureContentCardProps {
  subFeature: SubFeature;
}

const FeatureContentCard: React.FC<FeatureContentCardProps> = ({ subFeature }) => {
  const [activePointIndex, setActivePointIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [expandedVideo, setExpandedVideo] = useState<VideoItem | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const activePoint = subFeature.points[activePointIndex];
  const activeVideo = activePoint?.videos[activeVideoIndex];

  // Reset when subFeature changes
  useEffect(() => {
    setActivePointIndex(0);
    setActiveVideoIndex(0);
  }, [subFeature.id]);

  // Animate card entrance
  useEffect(() => {
    if (!cardRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(cardRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });

    if (pointsRef.current) {
      tl.fromTo(
        pointsRef.current.children,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" },
        "-=0.3"
      );
    }

    if (videoRef.current) {
      tl.fromTo(
        videoRef.current,
        { opacity: 0, x: 30, scale: 0.97 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    }

    return () => { tl.kill(); };
  }, [subFeature.id]);

  // Animate video change
  useEffect(() => {
    if (!videoRef.current) return;
    gsap.fromTo(
      videoRef.current,
      { opacity: 0.5, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
    );
  }, [activeVideoIndex, activePointIndex]);

  const handlePointSelect = useCallback((index: number) => {
    setActivePointIndex(index);
    setActiveVideoIndex(0);

    // Animate point highlight
    if (pointsRef.current) {
      const items = pointsRef.current.children;
      gsap.to(items, {
        x: 0,
        duration: 0.2,
        ease: "power2.out",
      });
      if (items[index]) {
        gsap.fromTo(items[index], { x: -5 }, { x: 0, duration: 0.3, ease: "elastic.out(1, 0.5)" });
      }
    }
  }, []);

  const cycleVideo = useCallback(
    (dir: number) => {
      if (!activePoint) return;
      const count = activePoint.videos.length;
      setActiveVideoIndex((prev) => (prev + dir + count) % count);
    },
    [activePoint]
  );

  if (!activePoint || !activeVideo) return null;

  const Icon = subFeature.icon;

  return (
    <>
      <div ref={cardRef} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden opacity-0">
        {/* Card Header */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
          <div className="flex items-start gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", subFeature.bgColor)}>
              <Icon className={cn("w-6 h-6", subFeature.color)} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{subFeature.title}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{subFeature.description}</p>
            </div>
          </div>
        </div>

        {/* Split Content: Points + Video */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left: Points List */}
            <div ref={pointsRef} className="lg:w-[45%] space-y-2">
              {subFeature.points.map((point, i) => (
                <button
                  key={point.id}
                  onClick={() => handlePointSelect(i)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl transition-all duration-300 group border",
                    i === activePointIndex
                      ? "bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 shadow-md"
                      : "bg-gray-50 dark:bg-gray-900/50 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:border-gray-200 dark:hover:border-gray-600"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Number */}
                    <span
                      className={cn(
                        "flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all",
                        i === activePointIndex
                          ? "bg-primary-500 text-white shadow-sm"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600"
                      )}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={cn(
                          "text-sm font-semibold transition-colors",
                          i === activePointIndex
                            ? "text-primary-700 dark:text-primary-400"
                            : "text-gray-800 dark:text-gray-200"
                        )}
                      >
                        {point.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {point.description}
                      </p>
                      {/* Video count */}
                      <div className="mt-1.5 flex items-center gap-1">
                        <FiPlay className="w-3 h-3 text-gray-400" />
                        <span className="text-[10px] text-gray-400 font-medium">
                          {point.videos.length} video{point.videos.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Video Player */}
            <div className="lg:w-[55%]">
              <div ref={videoRef}>
                <VideoFrame video={activeVideo} onExpand={() => setExpandedVideo(activeVideo)} />
              </div>

              {/* Video navigation (if multiple) */}
              {activePoint.videos.length > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => cycleVideo(-1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                    Prev
                  </button>
                  <div className="flex gap-1.5">
                    {activePoint.videos.map((_, vi) => (
                      <button
                        key={vi}
                        onClick={() => setActiveVideoIndex(vi)}
                        className={cn(
                          "rounded-full transition-all duration-300",
                          vi === activeVideoIndex
                            ? "w-6 h-2 bg-primary-500"
                            : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                        )}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => cycleVideo(1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Next
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Video Modal */}
      {expandedVideo && (
        <VideoModal video={expandedVideo} onClose={() => setExpandedVideo(null)} />
      )}
    </>
  );
};

export default FeatureContentCard;
