"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { gsap } from "./useGsap";
import { cn } from "@/lib/utils";
import type { SubFeature } from "./featuresData";

interface SubFeatureTabsProps {
  subFeatures: SubFeature[];
  activeId: string;
  onSelect: (id: string) => void;
}

const SubFeatureTabs: React.FC<SubFeatureTabsProps> = ({
  subFeatures,
  activeId,
  onSelect,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  // Reset tabs ref array when subFeatures change
  useEffect(() => {
    tabsRef.current = tabsRef.current.slice(0, subFeatures.length);
  }, [subFeatures]);

  // Entrance animation
  useEffect(() => {
    const validTabs = tabsRef.current.filter(Boolean);
    gsap.fromTo(
      validTabs,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
      }
    );
  }, [subFeatures]);

  // Move underline to active tab using offsetLeft (scroll-safe)
  const updateLine = useCallback(
    (animate = true) => {
      const idx = subFeatures.findIndex((sf) => sf.id === activeId);
      const tab = tabsRef.current[idx];
      if (!tab || !lineRef.current) return;

      const left = tab.offsetLeft;
      const width = tab.offsetWidth;

      if (animate) {
        gsap.to(lineRef.current, { x: left, width, duration: 0.4, ease: "power3.out" });
      } else {
        gsap.set(lineRef.current, { x: left, width });
      }

      tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    },
    [activeId, subFeatures]
  );

  useEffect(() => {
    const raf = requestAnimationFrame(() => updateLine(true));
    return () => cancelAnimationFrame(raf);
  }, [updateLine]);

  const scroll = useCallback((dir: number) => {
    if (!scrollRef.current) return;
    gsap.to(scrollRef.current, {
      scrollLeft: scrollRef.current.scrollLeft + dir * 250,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white dark:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-all"
      >
        <FiChevronLeft className="w-4 h-4" />
      </button>

      {/* Scrollable tabs */}
      <div
        ref={scrollRef}
        className="mx-12 overflow-x-auto relative"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-1 min-w-max pb-3 relative">
          {subFeatures.map((sf, i) => {
            const Icon = sf.icon;
            const isActive = sf.id === activeId;
            return (
              <button
                key={sf.id}
                ref={(el) => { tabsRef.current[i] = el; }}
                onClick={() => onSelect(sf.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-t-lg text-sm font-medium whitespace-nowrap transition-all duration-300 opacity-0 relative",
                  isActive
                    ? "text-primary-700 dark:text-primary-400 bg-primary-50/80 dark:bg-primary-900/20"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-primary-600 dark:text-primary-400" : "")} />
                {sf.title}
              </button>
            );
          })}

          {/* Active underline */}
          <div
            ref={lineRef}
            className="absolute bottom-0 left-0 h-[3px] rounded-full bg-gradient-to-r from-primary-500 to-indigo-500"
            style={{ width: 0 }}
          />
        </div>

        {/* Full width bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white dark:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-all"
      >
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SubFeatureTabs;
