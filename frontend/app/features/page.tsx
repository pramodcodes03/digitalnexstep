"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import FeaturesHero from "@/components/features/FeaturesHero";
import ModuleSelector from "@/components/features/ModuleSelector";
import SubFeatureTabs from "@/components/features/SubFeatureTabs";
import FeatureContentCard from "@/components/features/FeatureContentCard";
import { featuresData } from "@/components/features/featuresData";
import { gsap, ScrollTrigger } from "@/components/features/useGsap";
import { FiPlay, FiArrowRight } from "react-icons/fi";

export default function FeaturesPage() {
  // Default: first module active, its first sub-feature shown
  const [activeModuleId, setActiveModuleId] = useState(featuresData[0].id);
  const [activeSubFeatureId, setActiveSubFeatureId] = useState(
    featuresData[0].subFeatures[0].id
  );

  const contentAreaRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);

  const activeModule = featuresData.find((f) => f.id === activeModuleId)!;
  const activeSubFeature = activeModule.subFeatures.find(
    (sf) => sf.id === activeSubFeatureId
  )!;

  // Module change: GSAP animation for transitioning content
  const handleModuleSelect = useCallback(
    (id: string) => {
      if (id === activeModuleId) return;

      const newModule = featuresData.find((f) => f.id === id);
      if (!newModule) return;

      // Animate out current content
      if (contentAreaRef.current) {
        gsap.to(contentAreaRef.current, {
          opacity: 0,
          y: 20,
          scale: 0.98,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            setActiveModuleId(id);
            setActiveSubFeatureId(newModule.subFeatures[0].id);

            // Animate in new content
            requestAnimationFrame(() => {
              if (contentAreaRef.current) {
                gsap.fromTo(
                  contentAreaRef.current,
                  { opacity: 0, y: 25, scale: 0.98 },
                  { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" }
                );
              }
            });
          },
        });
      } else {
        setActiveModuleId(id);
        setActiveSubFeatureId(newModule.subFeatures[0].id);
      }
    },
    [activeModuleId]
  );

  // Sub-feature change with animation
  const handleSubFeatureSelect = useCallback(
    (id: string) => {
      if (id === activeSubFeatureId) return;

      if (contentAreaRef.current) {
        const card = contentAreaRef.current.querySelector("[data-content-card]");
        if (card) {
          gsap.to(card, {
            opacity: 0,
            x: -20,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
              setActiveSubFeatureId(id);
              requestAnimationFrame(() => {
                const newCard = contentAreaRef.current?.querySelector("[data-content-card]");
                if (newCard) {
                  gsap.fromTo(
                    newCard,
                    { opacity: 0, x: 25 },
                    { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }
                  );
                }
              });
            },
          });
        } else {
          setActiveSubFeatureId(id);
        }
      } else {
        setActiveSubFeatureId(id);
      }
    },
    [activeSubFeatureId]
  );

  // CTA section scroll animation
  useEffect(() => {
    if (!ctaSectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaSectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <FeaturesHero />

        {/* Features Content */}
        <section className="py-10 sm:py-14 lg:py-16 bg-gray-50/50 dark:bg-gray-900 min-h-screen">
          <Container size="xl">
            {/* Module Selector (top horizontal pills) */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-4">
                Select a Module
              </p>
              <ModuleSelector
                features={featuresData}
                activeId={activeModuleId}
                onSelect={handleModuleSelect}
              />
            </div>

            {/* Content Area */}
            <div ref={contentAreaRef}>
              {/* Active Module Title */}
              <div className="mb-6 flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${activeModule.gradient} shadow-lg`}
                >
                  <activeModule.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                    {activeModule.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {activeModule.description}
                  </p>
                </div>
              </div>

              {/* Sub-Feature Tabs */}
              <div className="mb-8">
                <SubFeatureTabs
                  subFeatures={activeModule.subFeatures}
                  activeId={activeSubFeatureId}
                  onSelect={handleSubFeatureSelect}
                />
              </div>

              {/* Content Card (points + video split) */}
              <div data-content-card>
                <FeatureContentCard
                  key={activeSubFeatureId}
                  subFeature={activeSubFeature}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Bottom CTA */}
        <section
          ref={ctaSectionRef}
          className="relative py-20 sm:py-28 overflow-hidden opacity-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-indigo-900 to-violet-900">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          </div>

          <Container className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Ready to Transform Your Institution?
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Get started with DigitalNexStep and unlock every feature for your
              educational management needs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-700 font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started Free
                <FiArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/#pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                <FiPlay className="w-5 h-5" />
                View Pricing
              </a>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
