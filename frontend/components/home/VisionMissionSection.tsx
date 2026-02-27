"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiEye, FiTarget, FiStar, FiCompass, FiHeart, FiGlobe } from "react-icons/fi";
import Container from "../ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

const visionPoints = [
  {
    icon: FiGlobe,
    text: "Become the global standard for educational assessment technology",
  },
  {
    icon: FiStar,
    text: "Empower every learner with personalized, data-driven insights",
  },
  {
    icon: FiCompass,
    text: "Pioneer innovation that shapes the future of education",
  },
];

const missionPoints = [
  {
    icon: FiTarget,
    text: "Deliver cutting-edge assessment tools that drive measurable outcomes",
  },
  {
    icon: FiHeart,
    text: "Create inclusive, accessible platforms for educators and students",
  },
  {
    icon: FiStar,
    text: "Foster a culture of continuous improvement through smart analytics",
  },
];

const floatingShapes = [
  { size: "w-72 h-72", position: "top-0 right-0", color: "from-blue-400/10 to-purple-400/10", delay: 0 },
  { size: "w-96 h-96", position: "-bottom-20 -left-20", color: "from-orange-400/10 to-pink-400/10", delay: 2 },
  { size: "w-64 h-64", position: "top-1/2 left-1/3", color: "from-indigo-400/10 to-cyan-400/10", delay: 4 },
];

const VisionMissionSection: React.FC = () => {
  const { data: apiSections } = useApi(() => api.getPageSections("home"), [] as any[]);
  const sectionData = apiSections.find((s: any) => s.section_key === "vision_mission");

  const extraData = sectionData?.extra_data || {};

  const apiVisionPoints: { icon: React.ComponentType<any>; text: string }[] =
    extraData.vision_points?.map((text: string, i: number) => ({
      icon: visionPoints[i]?.icon || FiStar,
      text,
    })) || visionPoints;

  const apiMissionPoints: { icon: React.ComponentType<any>; text: string }[] =
    extraData.mission_points?.map((text: string, i: number) => ({
      icon: missionPoints[i]?.icon || FiTarget,
      text,
    })) || missionPoints;

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            className={`absolute ${shape.size} ${shape.position} bg-gradient-to-br ${shape.color} dark:opacity-30 rounded-full blur-3xl`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-5"
          >
            Who We Are
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            {sectionData?.title ? (
              <span dangerouslySetInnerHTML={{ __html: sectionData.title }} />
            ) : (
              <>
                Driven by{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Purpose
                </span>
                , Guided by{" "}
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Vision
                </span>
              </>
            )}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {sectionData?.subtitle ||
              "We are committed to transforming the educational landscape through innovation, accessibility, and excellence in every step we take."}
          </p>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Our Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group"
          >
            <div className="relative h-full bg-white dark:bg-gray-800/90 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
              {/* Card Background Gradient */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-500/5 via-purple-500/5 to-transparent dark:from-blue-500/10 dark:via-purple-500/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />

              {/* Animated Top Border */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-t-3xl"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />

              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative mb-8"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-shadow duration-500 group-hover:scale-105 transition-transform">
                  <FiEye className="w-10 h-10 text-white" />
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {extraData.vision_title ? (
                  <span dangerouslySetInnerHTML={{ __html: extraData.vision_title }} />
                ) : (
                  <>
                    Our{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Vision
                    </span>
                  </>
                )}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
              >
                {extraData.vision_description ||
                  "To be the world\u2019s most trusted platform in educational assessment, enabling every institution to unlock the full potential of their students through technology-driven insights and innovation."}
              </motion.p>

              {/* Points */}
              <div className="relative space-y-5">
                {apiVisionPoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                      className="flex items-start gap-4 group/item"
                    >
                      <div className="flex-shrink-0 w-11 h-11 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover/item:bg-blue-200 dark:group-hover/item:bg-blue-900/50 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 font-medium pt-2 leading-relaxed">
                        {point.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Our Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group"
          >
            <div className="relative h-full bg-white dark:bg-gray-800/90 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
              {/* Card Background Gradient */}
              <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-transparent dark:from-orange-500/10 dark:via-pink-500/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />

              {/* Animated Top Border */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-t-3xl"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "right" }}
              />

              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
                className="relative mb-8"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 transition-shadow duration-500 group-hover:scale-105 transition-transform">
                  <FiTarget className="w-10 h-10 text-white" />
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="relative text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
              >
                {extraData.mission_title ? (
                  <span dangerouslySetInnerHTML={{ __html: extraData.mission_title }} />
                ) : (
                  <>
                    Our{" "}
                    <span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
                      Mission
                    </span>
                  </>
                )}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
              >
                {extraData.mission_description ||
                  "To empower educators and institutions with intelligent, accessible, and reliable assessment solutions that inspire growth, celebrate achievements, and transform the way we measure learning."}
              </motion.p>

              {/* Points */}
              <div className="relative space-y-5">
                {apiMissionPoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.15 }}
                      className="flex items-start gap-4 group/item"
                    >
                      <div className="flex-shrink-0 w-11 h-11 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center group-hover/item:bg-orange-200 dark:group-hover/item:bg-orange-900/50 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 font-medium pt-2 leading-relaxed">
                        {point.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-20 flex items-center justify-center gap-3"
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <div className="h-px w-16 bg-gradient-to-r from-purple-400 to-pink-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-500" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-orange-400" />
        </motion.div>
      </Container>
    </section>
  );
};

export default VisionMissionSection;
