"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiSend,
  FiZap,
  FiCheckCircle,
  FiBookOpen,
  FiArrowRight,
  FiGrid,
  FiSearch,
  FiChevronDown,
  FiTag,
} from "react-icons/fi";
import Container from "../ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

const HeroSection: React.FC = () => {
  const { data: apiSections } = useApi(() => api.getPageSections("home"), [] as any[]);
  const heroSection = apiSections.find((s: any) => s.section_key === "hero");
  const extraData = heroSection?.extra_data || {};

  // Dynamic content with fallbacks
  const badge = extraData.badge || "Empowering Education Across India";
  const title = heroSection?.title || "Smarter Learning,";
  const titleAccent = extraData.title_accent || "Brighter Future.";
  const description =
    heroSection?.content ||
    "India's leading educational assessment & management platform. No paperwork, no delays, just pure results. Affordable, efficient, and smart solutions for everyone.";
  const ctaPrimary = extraData.cta_primary || "Get Started";
  const ctaPrimaryLink = extraData.cta_primary_link || "#contact";
  const ctaSecondary = extraData.cta_secondary || "Explore Features";
  const ctaSecondaryLink = extraData.cta_secondary_link || "/features";
  const stats: { value: string; label: string }[] = extraData.stats || [
    { value: "500+", label: "INSTITUTIONS" },
    { value: "100%", label: "DIGITAL" },
    { value: "50K+", label: "STUDENTS" },
  ];

  // Products for service dropdown
  const { data: productsData } = useApi(() => api.getProducts(), { data: [] } as any);
  const products: { id: number; name: string }[] = (productsData?.data || []).filter(
    (p: any) => p.status === "active" || p.is_active
  );

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Searchable service dropdown state
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");
  const serviceRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target as Node)) {
        setServiceOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      await api.contact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || (formData.service ? `Enquiry: ${formData.service}` : "General Enquiry"),
        message: formData.message,
      });
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", service: "", message: "" });
      setServiceSearch("");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCTA = (link: string) => {
    if (link.startsWith("#")) {
      const section = document.getElementById(link.slice(1));
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = link;
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0618 0%, #140b3d 30%, #28166f 70%, #1a0f4a 100%)" }}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                              linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: "rgba(40, 22, 111, 0.4)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: "rgba(212, 51, 39, 0.15)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <Container className="relative z-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: "rgba(40, 22, 111, 0.3)",
                  border: "1px solid rgba(141, 114, 210, 0.3)",
                  color: "#b3a1e1",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                <span className="text-white">{title}</span>
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(to right, #d43327, #ff6b5e, #d43327)" }}
                >
                  {titleAccent}
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-300 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button
                onClick={() => handleCTA(ctaPrimaryLink)}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold rounded-xl hover:scale-[1.03] transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #d43327, #e6453a)",
                  boxShadow: "0 8px 25px rgba(212, 51, 39, 0.3)",
                }}
              >
                <FiZap className="w-5 h-5" />
                {ctaPrimary}
              </button>
              <button
                onClick={() => handleCTA(ctaSecondaryLink)}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold rounded-xl transition-all duration-300"
                style={{ border: "2px solid rgba(141, 114, 210, 0.4)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#8d72d2";
                  e.currentTarget.style.color = "#b3a1e1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(141, 114, 210, 0.4)";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                <FiCheckCircle className="w-5 h-5" />
                {ctaSecondary}
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex items-center gap-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              {stats.map((stat, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <div className="w-px h-12" style={{ background: "rgba(141, 114, 210, 0.3)" }} />
                  )}
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#8d72d2" }}>
                      {stat.label}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div
              className="backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
              style={{
                background: "rgba(20, 11, 61, 0.7)",
                border: "1px solid rgba(141, 114, 210, 0.2)",
              }}
            >
              {/* Form Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Get in Touch</h2>
                  <p className="text-sm mt-1" style={{ color: "#8d72d2" }}>
                    Start your journey with us today
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #d43327, #e6453a)" }}
                >
                  <FiMessageSquare className="w-5 h-5 text-white" />
                </div>
              </div>

              {submitStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <FiCheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-sm" style={{ color: "#8d72d2" }}>We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#8d72d2" }}>
                      Your Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6743c3" }} />
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm transition-colors focus:outline-none"
                        style={{
                          background: "rgba(40, 22, 111, 0.4)",
                          border: "1px solid rgba(141, 114, 210, 0.2)",
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#6743c3"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(141, 114, 210, 0.2)"; }}
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#8d72d2" }}>
                        Email
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6743c3" }} />
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm transition-colors focus:outline-none"
                          style={{
                            background: "rgba(40, 22, 111, 0.4)",
                            border: "1px solid rgba(141, 114, 210, 0.2)",
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#6743c3"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(141, 114, 210, 0.2)"; }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#8d72d2" }}>
                        Phone
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6743c3" }} />
                        <input
                          type="tel"
                          placeholder="+91 12345 67890"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm transition-colors focus:outline-none"
                          style={{
                            background: "rgba(40, 22, 111, 0.4)",
                            border: "1px solid rgba(141, 114, 210, 0.2)",
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#6743c3"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(141, 114, 210, 0.2)"; }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Select Service */}
                  <div ref={serviceRef} className="relative">
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#8d72d2" }}>
                      Select Service
                    </label>
                    <button
                      type="button"
                      onClick={() => setServiceOpen((v) => !v)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-left transition-colors focus:outline-none flex items-center justify-between"
                      style={{
                        background: "rgba(40, 22, 111, 0.4)",
                        border: `1px solid ${serviceOpen ? "#6743c3" : "rgba(141, 114, 210, 0.2)"}`,
                        color: formData.service ? "#fff" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      <FiGrid className="absolute left-3.5 w-4 h-4" style={{ color: "#6743c3" }} />
                      <span className="truncate">{formData.service || "Choose a service…"}</span>
                      <FiChevronDown
                        className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
                        style={{ color: "#8d72d2", transform: serviceOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>

                    <AnimatePresence>
                      {serviceOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-30 mt-1 w-full rounded-xl overflow-hidden shadow-2xl"
                          style={{
                            background: "rgba(15, 8, 45, 0.97)",
                            border: "1px solid rgba(141, 114, 210, 0.35)",
                            backdropFilter: "blur(16px)",
                          }}
                        >
                          {/* Search input */}
                          <div className="p-2 border-b" style={{ borderColor: "rgba(141, 114, 210, 0.2)" }}>
                            <div className="relative">
                              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#6743c3" }} />
                              <input
                                autoFocus
                                type="text"
                                placeholder="Search services…"
                                value={serviceSearch}
                                onChange={(e) => setServiceSearch(e.target.value)}
                                className="w-full pl-8 pr-3 py-2 rounded-lg text-sm text-white bg-transparent focus:outline-none placeholder-gray-500"
                              />
                            </div>
                          </div>

                          {/* Options */}
                          <ul className="max-h-44 overflow-y-auto py-1">
                            {filteredProducts.length === 0 ? (
                              <li className="px-4 py-3 text-xs text-center" style={{ color: "#8d72d2" }}>
                                No services found
                              </li>
                            ) : (
                              filteredProducts.map((p) => (
                                <li key={p.id}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setFormData({ ...formData, service: p.name });
                                      setServiceOpen(false);
                                      setServiceSearch("");
                                    }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors"
                                    style={{
                                      color: formData.service === p.name ? "#b3a1e1" : "rgba(255,255,255,0.8)",
                                      background: formData.service === p.name ? "rgba(103, 67, 195, 0.2)" : "transparent",
                                    }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(103, 67, 195, 0.15)"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = formData.service === p.name ? "rgba(103, 67, 195, 0.2)" : "transparent"; }}
                                  >
                                    <FiTag className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#6743c3" }} />
                                    {p.name}
                                    {formData.service === p.name && (
                                      <FiCheckCircle className="ml-auto w-3.5 h-3.5" style={{ color: "#6743c3" }} />
                                    )}
                                  </button>
                                </li>
                              ))
                            )}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#8d72d2" }}>
                      Subject
                    </label>
                    <div className="relative">
                      <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6743c3" }} />
                      <input
                        type="text"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm transition-colors focus:outline-none"
                        style={{
                          background: "rgba(40, 22, 111, 0.4)",
                          border: "1px solid rgba(141, 114, 210, 0.2)",
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#6743c3"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(141, 114, 210, 0.2)"; }}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#8d72d2" }}>
                      Message
                    </label>
                    <textarea
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm resize-none transition-colors focus:outline-none"
                      style={{
                        background: "rgba(40, 22, 111, 0.4)",
                        border: "1px solid rgba(141, 114, 210, 0.2)",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#6743c3"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(141, 114, 210, 0.2)"; }}
                    />
                  </div>

                  {/* Error message */}
                  {submitStatus === "error" && (
                    <p className="text-sm" style={{ color: "#d43327" }}>
                      Something went wrong. Please try again.
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, #d43327, #e6453a)",
                      boxShadow: "0 8px 25px rgba(212, 51, 39, 0.25)",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FiSend className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="relative h-20 overflow-hidden">
          <svg
            className="absolute bottom-4 w-full h-8"
            viewBox="0 0 1440 32"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 16 C 200 16, 200 28, 400 28 S 600 4, 800 4 S 1000 28, 1200 28 S 1400 16, 1440 16"
              stroke="rgba(40, 22, 111, 0.4)"
              strokeWidth="2"
              strokeDasharray="12 8"
              fill="none"
            />
          </svg>
          <motion.div
            className="absolute bottom-2 left-16"
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(40, 22, 111, 0.4)" }}
            >
              <FiBookOpen className="w-5 h-5" style={{ color: "#8d72d2" }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
