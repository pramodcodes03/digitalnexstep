"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Container from "../ui/Container";
import AnimatedSection from "../ui/AnimatedSection";

const showcaseData = {
  "Teacher Assistant": [
    {
      title: "Play Together - Learn Together!",
      description:
        "Make any quiz or activity a team sport! Extra Intelligence takes care of student grouping, live scoring, and more, turning everyday lessons into high-energy, collaborative classroom experiences!",
      features: [
        {
          title: "Live Student Selection",
          description: "Randomly picks students to answer on-screen, keeping everyone alert and engaged.",
        },
        {
          title: "Smart Board Integration",
          description: "Runs seamlessly on the classroom screen for a shared experience.",
        },
        {
          title: "Instant Practice Mode",
          description: "Turn any question or test into a live activity with just one click.",
        },
        {
          title: "Encourages Accountability",
          description: "Keeps students motivated to stay prepared and participate.",
        },
      ],
      image: "/images/teacher-assistant-demo.png",
      imageAlt: "Interactive physics quiz showing student engagement",
    },
    {
      title: "Real-time Classroom Analytics",
      description:
        "Monitor student understanding instantly with live dashboards. Track engagement, identify struggling students, and adjust your teaching in real-time for maximum impact.",
      features: [
        {
          title: "Live Progress Tracking",
          description: "See which students need help as lessons unfold in real-time.",
        },
        {
          title: "Engagement Metrics",
          description: "Track participation rates and attention levels throughout the class.",
        },
        {
          title: "Instant Feedback",
          description: "Provide immediate feedback to students to reinforce learning.",
        },
        {
          title: "Data-Driven Insights",
          description: "Make informed decisions based on comprehensive classroom analytics.",
        },
      ],
      image: "/images/analytics-dashboard.png",
      imageAlt: "Real-time classroom analytics dashboard",
    },
    {
      title: "Collaborative Learning Tools",
      description:
        "Foster teamwork and peer learning with collaborative activities. Students work together on problems, share insights, and build communication skills while mastering content.",
      features: [
        {
          title: "Group Activities",
          description: "Create dynamic team challenges that promote collaboration.",
        },
        {
          title: "Peer Review",
          description: "Students provide constructive feedback to each other.",
        },
        {
          title: "Shared Workspaces",
          description: "Virtual whiteboards where teams can brainstorm together.",
        },
        {
          title: "Team Leaderboards",
          description: "Gamified scoring that encourages friendly competition.",
        },
      ],
      image: "/images/collaborative-tools.png",
      imageAlt: "Students collaborating on team activities",
    },
  ],
  "Smarter Assessments": [
    {
      title: "AI-Powered Question Generation",
      description:
        "Create comprehensive assessments in minutes, not hours. Our AI analyzes your curriculum and generates relevant, diverse questions across all difficulty levels automatically.",
      features: [
        {
          title: "Auto-Generate Questions",
          description: "AI creates questions based on your learning objectives instantly.",
        },
        {
          title: "Multiple Question Types",
          description: "MCQs, essays, coding challenges, and multimedia questions.",
        },
        {
          title: "Difficulty Calibration",
          description: "Automatically adjust question difficulty based on student performance.",
        },
        {
          title: "Content Library",
          description: "Access thousands of pre-made questions across all subjects.",
        },
      ],
      image: "/images/ai-question-gen.png",
      imageAlt: "AI generating assessment questions",
    },
    {
      title: "Adaptive Testing Technology",
      description:
        "Tests that adapt to each student's knowledge level. Questions get harder or easier based on responses, providing accurate assessment while reducing test anxiety.",
      features: [
        {
          title: "Personalized Difficulty",
          description: "Each student gets questions matched to their skill level.",
        },
        {
          title: "Reduced Test Time",
          description: "Adaptive tests are 50% shorter than traditional assessments.",
        },
        {
          title: "Accurate Measurement",
          description: "Better gauge true understanding with precision testing.",
        },
        {
          title: "Less Anxiety",
          description: "Students feel more confident with appropriately challenging questions.",
        },
      ],
      image: "/images/adaptive-testing.png",
      imageAlt: "Adaptive testing interface",
    },
    {
      title: "Intelligent Auto-Grading",
      description:
        "Grade essays, coding assignments, and complex responses instantly with AI. Our system understands context, checks for plagiarism, and provides detailed feedback automatically.",
      features: [
        {
          title: "Essay Grading",
          description: "AI evaluates writing quality, structure, and content accuracy.",
        },
        {
          title: "Code Evaluation",
          description: "Automatically test and grade programming assignments.",
        },
        {
          title: "Plagiarism Detection",
          description: "Built-in checking to ensure academic integrity.",
        },
        {
          title: "Detailed Feedback",
          description: "Provide specific, actionable comments on each submission.",
        },
      ],
      image: "/images/auto-grading.png",
      imageAlt: "AI auto-grading interface",
    },
  ],
};

const FeaturesShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Teacher Assistant" | "Smarter Assessments">(
    "Teacher Assistant"
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = showcaseData[activeTab];
  const currentData = slides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTabChange = (tab: "Teacher Assistant" | "Smarter Assessments") => {
    setActiveTab(tab);
    setCurrentSlide(0);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <AnimatedSection animation="slide-up" className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Pioneering Next-gen Education with{" "}
            <span className="gradient-text">AI-based Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the latest upgrades for schools
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 mb-12">
            <button
              onClick={() => handleTabChange("Teacher Assistant")}
              className={`px-8 py-3 text-lg font-semibold rounded-t-lg transition-all-smooth ${
                activeTab === "Teacher Assistant"
                  ? "bg-white text-orange-600 border-b-4 border-orange-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Teacher Assistant
            </button>
            <button
              onClick={() => handleTabChange("Smarter Assessments")}
              className={`px-8 py-3 text-lg font-semibold rounded-t-lg transition-all-smooth ${
                activeTab === "Smarter Assessments"
                  ? "bg-white text-orange-600 border-b-4 border-orange-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Smarter Assessments
            </button>
          </div>
        </AnimatedSection>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-all-smooth group"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-orange-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-all-smooth group"
            aria-label="Next slide"
          >
            <FiChevronRight className="w-6 h-6 text-gray-600 group-hover:text-orange-600" />
          </button>

          {/* Carousel Content */}
          <div className="bg-white rounded-3xl shadow-strong border-4 border-orange-500 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${currentSlide}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-12"
              >
                {/* Left Side - Text Content */}
                <div className="flex flex-col justify-center space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-orange-600">
                    {currentData.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {currentData.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-4">
                    {currentData.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-1"
                      >
                        <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="flex items-center justify-center">
                  <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
                    {/* Placeholder for image - replace with actual images */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center">
                          <span className="text-white text-5xl font-bold">
                            {activeTab === "Teacher Assistant" ? "🎓" : "📊"}
                          </span>
                        </div>
                        <p className="text-gray-600 font-medium">{currentData.imageAlt}</p>
                        <p className="text-sm text-gray-500 mt-2">Image Placeholder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all-smooth ${
                  index === currentSlide
                    ? "w-8 bg-orange-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturesShowcase;
