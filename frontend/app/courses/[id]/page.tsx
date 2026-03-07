"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FiStar, FiBookOpen, FiCheckCircle, FiX, FiUser, FiPhone,
  FiInfo, FiChevronDown, FiArrowRight, FiClock, FiEye,
  FiHeart, FiAlertCircle, FiMapPin, FiLoader,
} from "react-icons/fi";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import api from "@/lib/api";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Institute {
  id: number;
  name: string;
  city: string;
  state: string | null;
  pincode: string;
}

interface CourseDetail {
  id: number;
  title: string;
  course_image: string | null;
  course_details: {
    duration: string;
    eligibility: string | null;
    tags: string[] | null;
  };
  syllabus: { syllabus: string | null };
  reviews: { id: number; student_name: string; rating: number; comment: string; created_at: string }[];
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar
          key={s}
          className={`w-4 h-4 ${s <= Math.round(rating) ? "text-warning-500 fill-current" : "text-gray-300 dark:text-gray-600"}`}
        />
      ))}
    </div>
  );
}

function SyllabusAccordion({ html }: { html: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700/60 transition-colors text-left"
      >
        <span className="font-semibold text-gray-900 dark:text-white text-sm">Course Syllabus</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="p-5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Enquiry Modal ─────────────────────────────────────────────────────────────
function EnquiryModal({
  isOpen,
  onClose,
  courseId,
  courseName,
}: {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  courseName: string;
}) {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [loadingInstitutes, setLoadingInstitutes] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
    address: "",
    pincode: "",
    source: "website",
    institute_id: "",
  });

  // Fetch institutes when modal opens
  useEffect(() => {
    if (!isOpen || !courseId) return;
    setLoadingInstitutes(true);
    api
      .getTenantEnquiryDropdowns(courseId)
      .then((res) => {
        setInstitutes(res.data?.data?.institutes ?? []);
      })
      .catch(() => setInstitutes([]))
      .finally(() => setLoadingInstitutes(false));
  }, [isOpen, courseId]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const set =
    (k: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFormData((prev) => ({
        ...prev,
        [k]: k === "mobile" || k === "pincode" ? e.target.value.replace(/\D/g, "").slice(0, k === "mobile" ? 10 : 6) : e.target.value,
      }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload: Record<string, unknown> = {
        ...formData,
        course_id: courseId,
        institute_id: formData.institute_id ? Number(formData.institute_id) : undefined,
      };
      await api.submitTenantEnquiry(payload);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ first_name: "", last_name: "", mobile: "", email: "", dob: "", gender: "", address: "", pincode: "", source: "website", institute_id: "" });
        onClose();
      }, 2500);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full px-3.5 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all duration-200";
  const labelCls = "block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiBookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white leading-tight">Course Enquiry</h2>
                    <p className="text-white/75 text-xs mt-0.5 line-clamp-1">{courseName}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors flex-shrink-0"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="flex-1 flex items-center justify-center p-8">
                  <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                    <div className="w-20 h-20 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="w-10 h-10 text-success-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enquiry Submitted!</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Our team will reach out to you within 24 hours.</p>
                  </motion.div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-6">
                  {error && (
                    <div className="flex items-start gap-3 p-3.5 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-xl text-sm text-error-700 dark:text-error-400">
                      <FiAlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  {/* Institute Selection */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="w-7 h-7 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center">
                        <FiMapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Select Institute / Centre</h3>
                    </div>
                    {loadingInstitutes ? (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 py-2">
                        <FiLoader className="w-4 h-4 animate-spin" />
                        Loading institutes...
                      </div>
                    ) : (
                      <select value={formData.institute_id} onChange={set("institute_id")} className={inputCls} required>
                        <option value="">Select a centre</option>
                        {institutes.map((inst) => (
                          <option key={inst.id} value={inst.id}>
                            {inst.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Personal Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="w-7 h-7 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Personal Information</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>First Name <span className="text-error-500">*</span></label>
                        <input required type="text" value={formData.first_name} onChange={set("first_name")} className={inputCls} placeholder="Enter first name" />
                      </div>
                      <div>
                        <label className={labelCls}>Last Name</label>
                        <input type="text" value={formData.last_name} onChange={set("last_name")} className={inputCls} placeholder="Enter last name" />
                      </div>
                      <div>
                        <label className={labelCls}>Date of Birth</label>
                        <input type="date" value={formData.dob} onChange={set("dob")} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Gender</label>
                        <select value={formData.gender} onChange={set("gender")} className={inputCls}>
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="w-7 h-7 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center">
                        <FiPhone className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Contact Information</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Mobile Number <span className="text-error-500">*</span></label>
                        <input required type="tel" value={formData.mobile} onChange={set("mobile")} className={inputCls} placeholder="10-digit number" maxLength={10} />
                      </div>
                      <div>
                        <label className={labelCls}>Email Address <span className="text-error-500">*</span></label>
                        <input required type="email" value={formData.email} onChange={set("email")} className={inputCls} placeholder="example@domain.com" />
                      </div>
                      <div>
                        <label className={labelCls}>Pincode</label>
                        <input type="text" value={formData.pincode} onChange={set("pincode")} className={inputCls} placeholder="6-digit pincode" maxLength={6} />
                      </div>
                      <div>
                        <label className={labelCls}>How did you hear about us?</label>
                        <select value={formData.source} onChange={set("source")} className={inputCls}>
                          <option value="website">Website</option>
                          <option value="walk-in">Walk-in</option>
                          <option value="referral">Referral</option>
                          <option value="ad">Advertisement</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelCls}>Address</label>
                        <textarea value={formData.address} onChange={set("address")} rows={2} className={inputCls + " resize-none"} placeholder="Your full address" />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                    <button type="button" onClick={onClose} className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting || loadingInstitutes}
                      className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <FiLoader className="w-4 h-4 animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>Submit Enquiry</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .getTenantCourse(id)
      .then((res) => {
        const data = res.data?.data ?? res.data;
        if (!data) { setNotFound(true); return; }
        setCourse(data);
      })
      .catch((err) => {
        if (err?.response?.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading course...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !course) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <FiBookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">The course you are looking for does not exist or is no longer available.</p>
            <Link href="/courses" className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">
              Browse Courses
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const details = course.course_details;
  const syllabusHtml = course.syllabus?.syllabus;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        courseId={course.id}
        courseName={course.title}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 py-16 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <Container>
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Link href="/courses" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4 transition-colors">
                <FiArrowRight className="w-3.5 h-3.5 rotate-180" /> All Courses
              </Link>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">{course.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-6">
                {details?.duration && (
                  <span className="flex items-center gap-1.5">
                    <FiClock className="w-4 h-4" /> {details.duration}
                  </span>
                )}
                {details?.eligibility && (
                  <span className="flex items-center gap-1.5">
                    <FiCheckCircle className="w-4 h-4" /> {details.eligibility}
                  </span>
                )}
              </div>

              {details?.tags && details.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {details.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs font-medium border border-white/20">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <motion.button
                onClick={() => setEnquiryOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 hover:bg-primary-400 text-white font-bold rounded-xl shadow-lg transition-colors duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Enquire Now <FiArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              {course.course_image ? (
                <img
                  src={course.course_image}
                  alt={course.title}
                  className="w-full rounded-2xl shadow-2xl object-cover max-h-72 md:max-h-80"
                />
              ) : (
                <div className="w-full h-64 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <FiBookOpen className="w-16 h-16 text-white/30" />
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-14 bg-gray-50 dark:bg-gray-900">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">

            {/* Syllabus */}
            {syllabusHtml && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <SyllabusAccordion html={syllabusHtml} />
              </motion.div>
            )}

            {/* Reviews */}
            {course.reviews && course.reviews.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Student Reviews</h2>
                  <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-700">
                    {course.reviews.slice(0, 5).map((review) => (
                      <div key={review.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{review.student_name}</p>
                          <StarRating rating={review.rating} />
                        </div>
                        {review.comment && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Enquiry CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Interested in this course?</h3>
              <p className="text-white/80 mb-6 text-sm">Fill in your details and our team will contact you with all the information you need.</p>
              <motion.button
                onClick={() => setEnquiryOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Enquire Now <FiArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
