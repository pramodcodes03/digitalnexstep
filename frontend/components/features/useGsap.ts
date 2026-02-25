"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapFadeIn(
  options: {
    y?: number;
    x?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
    scrollTrigger?: boolean;
  } = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      y = 40,
      x = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0,
      ease = "power3.out",
      scrollTrigger: useST = true,
    } = options;

    const children = stagger
      ? ref.current.children
      : ref.current;

    const tween = gsap.fromTo(
      children,
      { opacity: 0, y, x },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        stagger,
        ease,
        ...(useST && {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }),
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  return ref;
}

export function useGsapTimeline() {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const create = useCallback(
    (options?: gsap.TimelineVars) => {
      if (tlRef.current) tlRef.current.kill();
      tlRef.current = gsap.timeline(options);
      return tlRef.current;
    },
    []
  );

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return { timeline: tlRef, create };
}

export { gsap, ScrollTrigger };
