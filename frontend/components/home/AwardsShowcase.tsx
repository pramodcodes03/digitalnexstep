"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import Container from "../ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

interface AwardImage {
  id: number;
  image: string;
  sort_order: number;
}

/* ── Lightbox Popup ── */
const Lightbox: React.FC<{
  images: AwardImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}> = ({ images, currentIndex, onClose, onNavigate }) => {
  const current = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    },
    [currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(10, 6, 24, 0.95)", backdropFilter: "blur(20px)" }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors"
        style={{ background: "rgba(212, 51, 39, 0.2)", border: "1px solid rgba(212, 51, 39, 0.4)" }}
        whileHover={{ scale: 1.1, background: "rgba(212, 51, 39, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ delay: 0.15 }}
      >
        <FiX className="w-6 h-6" />
      </motion.button>

      {/* Counter */}
      <motion.div
        className="absolute top-7 left-6 z-10 px-4 py-2 rounded-full text-sm font-semibold text-white"
        style={{ background: "rgba(40, 22, 111, 0.5)", border: "1px solid rgba(141, 114, 210, 0.3)" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ delay: 0.1 }}
      >
        {currentIndex + 1} / {images.length}
      </motion.div>

      {/* Navigation arrows */}
      {currentIndex > 0 && (
        <motion.button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
          className="absolute left-4 sm:left-8 z-10 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all"
          style={{ background: "rgba(40, 22, 111, 0.5)", border: "1px solid rgba(141, 114, 210, 0.3)" }}
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiChevronLeft className="w-7 h-7" />
        </motion.button>
      )}
      {currentIndex < images.length - 1 && (
        <motion.button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
          className="absolute right-4 sm:right-8 z-10 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all"
          style={{ background: "rgba(40, 22, 111, 0.5)", border: "1px solid rgba(141, 114, 210, 0.3)" }}
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiChevronRight className="w-7 h-7" />
        </motion.button>
      )}

      {/* Image container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="relative z-10 mx-4 sm:mx-8"
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.85, rotateY: 15 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 3D border frame */}
          <div
            className="rounded-3xl overflow-hidden w-[65vw] h-[70vh]"
            style={{
              padding: "4px",
              background: "linear-gradient(135deg, #d43327, #28166f, #8d72d2, #d43327)",
              boxShadow:
                "0 0 80px rgba(212, 51, 39, 0.2), 0 0 120px rgba(40, 22, 111, 0.2), 0 30px 80px rgba(0,0,0,0.5)",
            }}
          >
            <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-gray-950">
              <Image
                src={current.image}
                alt={`Award ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-4 py-3 rounded-2xl max-w-[90vw] overflow-x-auto scrollbar-hide"
          style={{ background: "rgba(20, 11, 61, 0.7)", border: "1px solid rgba(141, 114, 210, 0.2)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.2 }}
        >
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
              className="relative flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden transition-all duration-300"
              style={{
                border: i === currentIndex ? "2px solid #d43327" : "2px solid transparent",
                opacity: i === currentIndex ? 1 : 0.5,
                transform: i === currentIndex ? "scale(1.1)" : "scale(1)",
              }}
            >
              <Image
                src={img.image}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
              />
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

/* ── Award Card ── */
const AwardCard: React.FC<{
  item: AwardImage;
  index: number;
  onClick: () => void;
}> = ({ item, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex-shrink-0 w-[320px] sm:w-[400px] lg:w-[480px] xl:w-[550px] group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          padding: "3px",
          background: isHovered
            ? "linear-gradient(135deg, #d43327, #28166f, #d43327)"
            : "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(141,114,210,0.5), rgba(255,255,255,0.7))",
          boxShadow: isHovered
            ? "0 20px 60px rgba(40,22,111,0.3), 0 0 30px rgba(212,51,39,0.15)"
            : "0 8px 30px rgba(0,0,0,0.15)",
          transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        }}
      >
        <div className="relative rounded-[14px] overflow-hidden bg-white dark:bg-gray-900">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={item.image}
              alt="Award & Achievement"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 280px, 320px"
            />
            {/* Hover overlay with icon */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
              style={{
                opacity: isHovered ? 1 : 0,
                background: "linear-gradient(to top, rgba(20,11,61,0.6), rgba(20,11,61,0.2))",
              }}
            >
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "rgba(212, 51, 39, 0.8)", backdropFilter: "blur(8px)" }}
                initial={false}
                animate={isHovered ? { scale: [0.5, 1.1, 1] } : { scale: 0.5 }}
                transition={{ duration: 0.4 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Component ── */
const AwardsShowcase: React.FC = () => {
  const { data: awardImages } = useApi(() => api.getAwardImages(), [] as AwardImage[]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (!awardImages || awardImages.length <= 1 || lightboxIndex !== null) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // If near the end, scroll back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 440, behavior: "smooth" });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [awardImages, lightboxIndex]);

  if (!awardImages || awardImages.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 440;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section
        className="relative py-16 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0a0618 0%, #140b3d 50%, #0a0618 100%)",
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "rgba(40, 22, 111, 0.2)" }}
        />

        <Container className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{
                background: "rgba(212, 51, 39, 0.1)",
                border: "1px solid rgba(212, 51, 39, 0.25)",
              }}
            >
              <FiAward className="w-4 h-4" style={{ color: "#d43327" }} />
              <span className="text-sm font-semibold" style={{ color: "#e66861" }}>
                Our Achievements
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Awards &{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(to right, #d43327, #ff6b5e)" }}
              >
                Recognition
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Celebrating our milestones and the trust placed in us by our students, partners, and the community.
            </p>
          </div>
        </Container>

        {/* Scrollable Gallery - full width, outside Container */}
        <div className="relative group/nav">
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300"
            style={{
              background: "rgba(20, 11, 61, 0.9)",
              border: "1px solid rgba(141, 114, 210, 0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <FiChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300"
            style={{
              background: "rgba(20, 11, 61, 0.9)",
              border: "1px solid rgba(141, 114, 210, 0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <FiChevronRight className="w-5 h-5 text-white" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-4"
            style={{
              scrollSnapType: "x mandatory",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {awardImages.map((item: AwardImage, index: number) => (
              <div key={item.id} style={{ scrollSnapAlign: "start" }}>
                <AwardCard
                  item={item}
                  index={index}
                  onClick={() => setLightboxIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator dots */}
        {awardImages.length <= 10 && (
          <div className="flex justify-center gap-1.5 mt-6">
            {awardImages.map((_: AwardImage, i: number) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: i === 0 ? "#d43327" : "rgba(141, 114, 210, 0.3)" }}
              />
            ))}
          </div>
        )}

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(40,22,111,0.3), transparent)" }}
        />
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={awardImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AwardsShowcase;
