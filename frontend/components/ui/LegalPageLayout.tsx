"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiFileText, FiCalendar, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

interface LegalPageLayoutProps {
  pageKey: string;
  fallbackTitle: string;
  fallbackContent: string;
  icon?: React.ElementType;
  gradient?: string;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  pageKey,
  fallbackTitle,
  fallbackContent,
  icon: Icon = FiFileText,
  gradient = "from-blue-600 via-indigo-600 to-purple-600",
}) => {
  const { data: sections, loading } = useApi(
    () => api.getPageSections(pageKey),
    [] as any[]
  );

  const mainSection = sections.find(
    (s: any) => s.section_key === "content"
  );
  const title = mainSection?.title || fallbackTitle;
  const subtitle = mainSection?.subtitle || "";
  const content = mainSection?.content || fallbackContent;
  const lastUpdated = mainSection?.updated_at
    ? new Date(mainSection.updated_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  // Parse extra_data sections if available
  const extraSections: { heading: string; body: string }[] =
    mainSection?.extra_data?.sections || [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #1e3a8a 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary-600/20 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-white/60 text-lg mb-4">{subtitle}</p>
            )}
            <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
              <FiCalendar className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 leading-[0]">
          <svg
            viewBox="0 0 1440 56"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-14 text-white dark:text-gray-900"
          >
            <path d="M0,56 C360,0 1080,56 1440,0 L1440,56 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    style={{ width: `${75 + Math.random() * 25}%` }}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Main Content Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                  <div className={`h-1 bg-gradient-to-r ${gradient}`} />
                  <div className="p-8 md:p-12">
                    {/* Main content */}
                    <div
                      className="prose prose-lg dark:prose-invert max-w-none
                        prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                        prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-li:text-gray-600 dark:prose-li:text-gray-300
                        prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-gray-900 dark:prose-strong:text-white"
                      dangerouslySetInnerHTML={{ __html: formatContent(content) }}
                    />

                    {/* Extra sections from admin */}
                    {extraSections.length > 0 && (
                      <div className="mt-10 space-y-8">
                        {extraSections.map((sec, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="border-l-4 border-primary-500 pl-6"
                          >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                              {sec.heading}
                            </h3>
                            <div
                              className="prose dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300"
                              dangerouslySetInnerHTML={{
                                __html: formatContent(sec.body),
                              }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

/** Convert plain text line breaks to HTML paragraphs */
function formatContent(text: string): string {
  if (!text) return "";
  // If it already contains HTML tags, return as-is
  if (/<[a-z][\s\S]*>/i.test(text)) return text;
  // Convert double newlines to paragraphs, single newlines to <br>
  return text
    .split(/\n\n+/)
    .map((para) => `<p>${para.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export default LegalPageLayout;
