"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import Link from "next/link";
import { FiX } from "react-icons/fi";

export interface PopupData {
  id: string;
  image: string;
  alt: string;
  link: string;
  mobileImage?: string;
}

// Replace with your real popup image and link
const popupData: PopupData = {
  id: "popup-1",
  image: "/banners/offer-1.svg",
  alt: "Special Offer",
  link: "/#pricing",
};

// How many seconds after page load before popup appears
const POPUP_DELAY = 2;

const PromoPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Show popup after delay (only once per session)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyShown = sessionStorage.getItem("popup_dismissed");
    if (alreadyShown) return;

    const timer = setTimeout(() => setVisible(true), POPUP_DELAY * 1000);
    return () => clearTimeout(timer);
  }, []);

  // GSAP entrance
  useEffect(() => {
    if (!visible || !backdropRef.current || !cardRef.current) return;

    const tl = gsap.timeline();

    // Backdrop fade in
    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );

    // Card entrance — scale + bounce from center
    tl.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.7, y: 40, rotateX: 15 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        ease: "back.out(1.4)",
      },
      "-=0.15"
    );

    // Glow pulse loop
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => { tl.kill(); };
  }, [visible]);

  // GSAP close animation
  const handleClose = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("popup_dismissed", "true");
    }

    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    if (cardRef.current) {
      tl.to(cardRef.current, {
        opacity: 0,
        scale: 0.85,
        y: 30,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    if (backdropRef.current) {
      tl.to(
        backdropRef.current,
        { opacity: 0, duration: 0.25, ease: "power2.in" },
        "-=0.15"
      );
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ perspective: "800px" }}>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0"
        onClick={handleClose}
      />

      {/* Popup Card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-lg sm:max-w-xl md:max-w-2xl opacity-0"
      >
        {/* Outer glow */}
        <div
          ref={glowRef}
          className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-primary-500/20 to-violet-500/20 blur-xl opacity-0 pointer-events-none"
        />

        {/* Card body */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all hover:scale-110 hover:rotate-90 duration-300"
            aria-label="Close popup"
          >
            <FiX className="w-4 h-4" />
          </button>

          {/* Image link — the entire popup is a clickable image */}
          <Link href={popupData.link} onClick={handleClose} className="block group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={popupData.mobileImage || popupData.image}
              alt={popupData.alt}
              className="w-full h-auto block sm:hidden group-hover:brightness-110 transition-all duration-500"
              draggable={false}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={popupData.image}
              alt={popupData.alt}
              className="w-full h-auto hidden sm:block group-hover:brightness-110 transition-all duration-500"
              draggable={false}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;
