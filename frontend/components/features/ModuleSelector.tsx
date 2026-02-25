"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "./useGsap";
import { cn } from "@/lib/utils";
import type { MainFeature } from "./featuresData";

interface ModuleSelectorProps {
  features: MainFeature[];
  activeId: string;
  onSelect: (id: string) => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({
  features,
  activeId,
  onSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Entrance animation
  useEffect(() => {
    if (hasAnimated.current || !containerRef.current) return;
    hasAnimated.current = true;

    gsap.fromTo(
      pillsRef.current.filter(Boolean),
      { opacity: 0, y: 15, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "back.out(1.4)",
      }
    );
  }, []);

  // Slide indicator to active pill
  useEffect(() => {
    const idx = features.findIndex((f) => f.id === activeId);
    const pill = pillsRef.current[idx];
    if (!pill || !indicatorRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();

    gsap.to(indicatorRef.current, {
      x: pillRect.left - containerRect.left,
      width: pillRect.width,
      duration: 0.45,
      ease: "power3.out",
    });

    // Scroll pill into view
    pill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId, features]);

  return (
    <div className="relative">
      {/* Scrollable pills container */}
      <div
        ref={containerRef}
        className="relative flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Active indicator (sliding background) */}
        <div
          ref={indicatorRef}
          className="absolute top-0 left-0 h-[calc(100%-8px)] rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 shadow-lg shadow-primary-500/25 pointer-events-none z-0"
          style={{ width: 0 }}
        />

        {features.map((feature, i) => {
          const Icon = feature.icon;
          const isActive = feature.id === activeId;
          return (
            <button
              key={feature.id}
              ref={(el) => { pillsRef.current[i] = el; }}
              onClick={() => onSelect(feature.id)}
              className={cn(
                "relative z-10 flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 whitespace-nowrap opacity-0",
                isActive
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
              )}
            >
              <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-white" : "")} />
              <span>{feature.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleSelector;
