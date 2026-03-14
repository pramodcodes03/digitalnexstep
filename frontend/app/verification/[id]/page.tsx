"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiShield, FiSearch, FiLoader } from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import api from "@/lib/api";
import CertificateResult, { type VerificationData } from "@/components/verification/CertificateResult";

export default function VerificationByIdPage() {
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState<VerificationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const verify = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await api.verifyStudent(id.trim());
        setVerificationResult(data);
      } catch (err: any) {
        const status = err?.response?.status;
        if (status === 404) {
          setError("No student found with this ID. Please check and try again.");
        } else {
          setError("Verification service is currently unavailable. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [id]);

  return (
    <div className="overflow-x-hidden">
      <Header />

      <section className="relative pt-12 pb-20 min-h-[60vh] bg-gradient-to-br from-gray-50 via-blue-50/40 to-indigo-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <Container className="relative z-10">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-5"
            >
              <FiShield className="w-4 h-4" />
              Student Verification
            </motion.span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Verifying{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {id}
              </span>
            </h1>
          </motion.div>

          {/* Loading State */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <motion.div
                  className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Verifying credentials...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {!isLoading && error && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="max-w-2xl mx-auto p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiSearch className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 dark:text-red-300">Verification Failed</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <a
                    href="/verification"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                  >
                    Try Manual Verification
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Result */}
          <AnimatePresence>
            {!isLoading && verificationResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <CertificateResult data={verificationResult} />
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
