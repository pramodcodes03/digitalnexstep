"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";
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

// Demo banners — replace images/links with real offer or notice banners
const bannerSlides: BannerSlide[] = [
  {
    id: "offer-1",
    image: "/banners/offer-1.svg",
    alt: "Special Offer - Limited Time",
    link: "/#pricing",
  },
  {
    id: "offer-2",
    image: "/banners/offer-2.svg",
    alt: "New Course Launch",
    link: "/courses",
  },
  {
    id: "notice-1",
    image: "/banners/notice-1.svg",
    alt: "Important Notice",
    link: "/#contact",
  },
];

const PromoBanner: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = bannerSlides.length;

  // Animate slide transition
  const animateSlide = useCallback((direction: "left" | "right" = "left") => {
    if (!slideRef.current) return;

    const xFrom = direction === "left" ? 60 : -60;

    gsap.timeline()
      .to(slideRef.current, {
        opacity: 0,
        x: direction === "left" ? -40 : 40,
        scale: 0.97,
        duration: 0.3,
        ease: "power2.in",
      })
      .set(slideRef.current, { x: xFrom, scale: 0.97 })
      .to(slideRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });
  }, []);

  // Auto shimmer sweep
  useEffect(() => {
    if (!shimmerRef.current || dismissed) return;

    gsap.fromTo(
      shimmerRef.current,
      { x: "-100%" },
      {
        x: "200%",
        duration: 2.5,
        repeat: -1,
        repeatDelay: 4,
        ease: "power2.inOut",
      }
    );
  }, [dismissed]);

  // Progress bar per slide
  useEffect(() => {
    if (!progressRef.current || dismissed) return;

    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 5,
        ease: "none",
        transformOrigin: "left center",
      }
    );
  }, [current, dismissed]);

  // Entrance animation
  useEffect(() => {
    if (!sectionRef.current || dismissed) return;

    gsap.fromTo(
      sectionRef.current,
      { height: 0, opacity: 0 },
      {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, [dismissed]);

  // Autoplay
  useEffect(() => {
    if (dismissed) return;

    autoplayRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % count;
        animateSlide("left");
        return next;
      });
    }, 5000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [count, dismissed, animateSlide]);

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      const direction = index > current ? "left" : "right";
      setCurrent(index);
      animateSlide(direction);

      // Reset autoplay
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        setCurrent((prev) => {
          animateSlide("left");
          return (prev + 1) % count;
        });
      }, 5000);
    },
    [current, count, animateSlide]
  );

  const goPrev = useCallback(() => {
    goTo((current - 1 + count) % count);
  }, [current, count, goTo]);

  const goNext = useCallback(() => {
    goTo((current + 1) % count);
  }, [current, count, goTo]);

  // Dismiss banner
  const handleDismiss = useCallback(() => {
    if (!sectionRef.current) {
      setDismissed(true);
      return;
    }

    gsap.to(sectionRef.current, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setDismissed(true),
    });
  }, []);

  if (dismissed) return null;

  const slide = bannerSlides[current];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-r from-primary-900 via-indigo-900 to-violet-900"
      style={{ height: 0, opacity: 0 }}
    >
      {/* Animated border glow */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-40" />

      {/* Banner Content */}
      <div className="relative">
        {/* Main slide */}
        <div ref={slideRef}>
          <Link
            href={slide.link}
            className="block relative group"
          >
            {/* Desktop image */}
            <div className="relative w-full h-[120px] sm:h-[160px] md:h-[200px] lg:h-[260px] xl:h-[300px] hidden sm:block">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                sizes="100vw"
                priority
                onError={(e) => {
                  // Fallback: hide broken image, show gradient placeholder
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Gradient placeholder (shown when no image) */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-indigo-700 to-violet-800 -z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
            </div>

            {/* Mobile image */}
            <div className="relative w-full h-[140px] sm:hidden">
              <Image
                src={slide.mobileImage || slide.image}
                alt={slide.alt}
                fill
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                sizes="100vw"
                priority
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-indigo-700 to-violet-800 -z-10" />
            </div>

            {/* Shimmer sweep overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                ref={shimmerRef}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
              />
            </div>

            {/* Hover glow edges */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
            </div>
          </Link>
        </div>

        {/* Navigation Arrows */}
        {count > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all hover:scale-110"
              aria-label="Previous banner"
            >
              <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-10 sm:right-14 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all hover:scale-110"
              aria-label="Next banner"
            >
              <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {/* Close / Dismiss */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 sm:top-3 sm:right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-black/50 hover:text-white transition-all hover:scale-110"
          aria-label="Dismiss banner"
        >
          <FiX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Dot indicators */}
        {count > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {bannerSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "rounded-full transition-all duration-400",
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
    </section>
  );
};

export default PromoBanner;
