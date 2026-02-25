"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "./useGsap";
import Container from "../ui/Container";

const FeaturesHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating orbs
      gsap.to(orb1Ref.current, {
        x: 30, y: -25, scale: 1.1,
        duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        x: -35, y: 25, scale: 0.9,
        duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(orb3Ref.current, {
        scale: 1.2, opacity: 0.5,
        duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      // Particle animation
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        gsap.fromTo(
          particles,
          { y: 0, opacity: 0, scale: 0 },
          {
            y: -60, opacity: 1, scale: 1.5,
            duration: 3, stagger: { each: 0.25, repeat: -1, repeatDelay: 1 },
            ease: "power1.inOut",
            yoyo: true,
          }
        );
      }

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(badgeRef.current, { opacity: 0, y: 25, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 })
        .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.35")
        .fromTo(descRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(
          statsRef.current?.children ?? [],
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-indigo-900 to-violet-900">
        <div ref={orb1Ref} className="absolute top-20 left-[10%] w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
        <div ref={orb2Ref} className="absolute bottom-10 right-[15%] w-96 h-96 bg-violet-500/15 rounded-full blur-3xl" />
        <div ref={orb3Ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Particles */}
        <div ref={particlesRef} className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{ left: `${5 + Math.random() * 90}%`, top: `${10 + Math.random() * 80}%` }}
            />
          ))}
        </div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium text-white/90 opacity-0"
          >
            Explore All Platform Features
          </span>

          <h1
            ref={titleRef}
            className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] opacity-0"
          >
            Every Feature,{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              One Platform
            </span>
          </h1>

          <p
            ref={descRef}
            className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed opacity-0"
          >
            Discover the complete suite of tools that power your educational institution—from
            student enrollment to certificate generation, all seamlessly integrated.
          </p>

          <div ref={statsRef} className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              { label: "Main Modules", value: "12+" },
              { label: "Video Guides", value: "100+" },
              { label: "Features", value: "80+" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 opacity-0">
                <div className="text-left">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/50">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturesHero;
