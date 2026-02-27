"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheck, FiStar } from "react-icons/fi";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Container from "../ui/Container";
import AnimatedSection from "../ui/AnimatedSection";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

const plans = [
  {
    name: "Basic",
    price: 99,
    period: "month",
    description: "Perfect for small learning centers",
    features: [
      "Up to 100 students",
      "Basic assessments",
      "Email support",
      "Monthly reports",
      "Standard security",
    ],
    featured: false,
  },
  {
    name: "Professional",
    price: 299,
    period: "month",
    description: "Ideal for growing institutions",
    features: [
      "Up to 500 students",
      "Advanced assessments",
      "Priority support",
      "Real-time analytics",
      "Custom branding",
      "API access",
      "Advanced reporting",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: null,
    period: "Custom",
    description: "For large-scale institutions",
    features: [
      "Unlimited students",
      "All assessment types",
      "24/7 dedicated support",
      "Advanced analytics",
      "White-label solution",
      "Custom integrations",
      "SLA guarantee",
      "Training & onboarding",
    ],
    featured: false,
  },
];

const PricingSection: React.FC = () => {
  const { data: apiPlans } = useApi(() => api.getPricing(), [] as any[]);
  const { data: apiSections } = useApi(() => api.getPageSections("home"), [] as any[]);
  const sectionData = apiSections.find((s: any) => s.section_key === "pricing_header");

  const displayPlans: typeof plans = apiPlans.length > 0
    ? apiPlans.map((p: any) => ({
        name: p.name || p.title,
        price: p.price != null ? Number(p.price) : null,
        period: p.duration || p.period || "month",
        description: p.description || "",
        features: Array.isArray(p.features) ? p.features : [],
        featured: p.is_popular || p.is_featured || p.featured || false,
      }))
    : plans;

  const handleGetStarted = (planName: string) => {
    if (planName === "Enterprise") {
      const contactSection = document.getElementById("contact");
      contactSection?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(`Selected ${planName} plan. In production, this would redirect to checkout.`);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Container>
        <AnimatedSection animation="slide-up" className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
            {sectionData?.subtitle || "Pricing Plans"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            {(sectionData?.title || "Choose Your Perfect Plan").replace("Perfect Plan", "")}{" "}
            <span className="gradient-text">{(sectionData?.title || "Choose Your Perfect Plan").includes("Perfect Plan") ? "Perfect Plan" : ""}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {sectionData?.content || "Flexible pricing designed to scale with your needs. All plans include our core features with no hidden fees."}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.featured ? "md:-mt-8 md:mb-8" : "mt-4"}`}
            >
              {/* Featured Badge - FIXED */}
              {plan.featured && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-xl flex items-center gap-2 animate-pulse">
                    <FiStar className="w-4 h-4 fill-white" />
                    Most Popular
                  </div>
                </div>
              )}

              <Card
                padding="none"
                className={`h-full bg-white dark:bg-gray-800 ${
                  plan.featured
                    ? "border-2 border-primary-600 shadow-glow-lg"
                    : "border border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                    <div className="mb-6">
                      {plan.price ? (
                        <>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-5xl font-extrabold text-primary-700 dark:text-primary-400">
                              ${plan.price}
                            </span>
                            <span className="text-gray-600 dark:text-gray-300">/{plan.period}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-4xl font-extrabold text-primary-700 dark:text-primary-400">
                          {plan.period}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="p-8 pt-0">
                  <Button
                    variant={plan.featured ? "primary" : "outline"}
                    size="lg"
                    onClick={() => handleGetStarted(plan.name)}
                    className="w-full"
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300">
            All plans include 14-day money-back guarantee. No credit card required for trial.{" "}
            <a href="#contact" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Contact us
            </a>{" "}
            for custom pricing.
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default PricingSection;
