"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

export interface BannerSlide {
  id: string;
  image: string;
  alt: string;
  link: string;
  mobileImage?: string;
}

// Replace these with your real offer / notice banner images
const bannerSlides: BannerSlide[] = [
  {
    id: "offer-1",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1400&h=400&fit=crop&crop=center&q=80",
    alt: "Special Offer - Limited Time",
    link: "/#pricing",
    mobileImage: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=400&fit=crop&crop=center&q=80",
  },
  {
    id: "offer-2",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1400&h=400&fit=crop&crop=center&q=80",
    alt: "New Course Launch",
    link: "/courses",
    mobileImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop&crop=center&q=80",
  },
  {
    id: "notice-1",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400&h=400&fit=crop&crop=center&q=80",
    alt: "Important Notice - Admissions Open",
    link: "/#contact",
    mobileImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop&crop=center&q=80",
  },
];

const PromoBanner: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = bannerSlides.length;

  // Slide the track to show current slide
  const slideTo = useCallback(
    (index: number, animate = true) => {
      if (!trackRef.current) return;
      const offset = -(index * 100);
      if (animate) {
        gsap.to(trackRef.current, {
          xPercent: offset,
          duration: 0.7,
          ease: "power3.inOut",
        });
      } else {
        gsap.set(trackRef.current, { xPercent: offset });
      }
    },
    []
  );

  // Progress bar
  useEffect(() => {
    if (!progressRef.current || dismissed) return;
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 5, ease: "none", transformOrigin: "left center" }
    );
  }, [current, dismissed]);

  // Entrance
  useEffect(() => {
    if (!wrapperRef.current || dismissed) return;
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
    );
  }, [dismissed]);

  // Autoplay
  useEffect(() => {
    if (dismissed || count <= 1) return;

    const start = () => {
      autoplayRef.current = setInterval(() => {
        setCurrent((prev) => {
          const next = (prev + 1) % count;
          slideTo(next);
          return next;
        });
      }, 5000);
    };

    start();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [count, dismissed, slideTo]);

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setCurrent(index);
      slideTo(index);
      // Reset autoplay
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        setCurrent((prev) => {
          const next = (prev + 1) % count;
          slideTo(next);
          return next;
        });
      }, 5000);
    },
    [current, count, slideTo]
  );

  const goPrev = useCallback(() => goTo((current - 1 + count) % count), [current, count, goTo]);
  const goNext = useCallback(() => goTo((current + 1) % count), [current, count, goTo]);

  const handleDismiss = useCallback(() => {
    if (!wrapperRef.current) { setDismissed(true); return; }
    gsap.to(wrapperRef.current, {
      opacity: 0, y: -20, height: 0, duration: 0.35, ease: "power2.in",
      onComplete: () => setDismissed(true),
    });
  }, []);

  if (dismissed) return null;

  return (
    <div ref={wrapperRef} className="relative overflow-hidden opacity-0">
      {/* Slides track — all slides side by side, translateX to move */}
      <div ref={trackRef} className="flex" style={{ width: `${count * 100}%` }}>
        {bannerSlides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <Link href={slide.link} className="block group relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.mobileImage || slide.image}
                alt={slide.alt}
                className="w-full h-auto block sm:hidden group-hover:brightness-110 transition-all duration-500"
                draggable={false}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-auto hidden sm:block group-hover:brightness-110 transition-all duration-500"
                draggable={false}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {count > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all hover:scale-110"
            aria-label="Previous banner"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-10 sm:right-14 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all hover:scale-110"
            aria-label="Next banner"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Close */}
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 sm:top-3 sm:right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-black/50 hover:text-white transition-all hover:scale-110"
        aria-label="Dismiss banner"
      >
        <FiX className="w-4 h-4" />
      </button>

      {/* Dots */}
      {count > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === current
                  ? "w-7 h-2 bg-white shadow-lg"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to banner ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-10">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
};

export default PromoBanner;
