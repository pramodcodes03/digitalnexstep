"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FiStar, FiAward, FiCalendar, FiBookOpen, FiVideo,
  FiFileText, FiCheckCircle, FiX, FiUser, FiPhone,
  FiInfo, FiThumbsUp, FiThumbsDown, FiChevronDown,
  FiArrowRight, FiPlay, FiSend, FiUsers, FiShoppingCart, FiEye,
  FiMail, FiMapPin, FiTag,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

// ─── Static Course Data ────────────────────────────────────────────────────────
const courseData = {
  id: 1,
  title: "Complete Web Development Bootcamp 2024",
  subtitle: "Master HTML, CSS, JavaScript, React, Node.js & more with 25+ real-world projects",
  category: "Web Development",
  badge: "Bestseller",
  rating: 4.8,
  reviews: 12430,
  mrp: 4999,
  price: 499,
  lastUpdated: "Jan, 2024",
  duration: "6 Months",
  enrolled: 2450,
  lectures: 120,
  videos: 85,
  notes: 45,
  certificate: true,
  thumbnail: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=1280&q=80",
  description: `
    <p style="margin-bottom:16px">This comprehensive web development bootcamp will take you from <strong>absolute beginner to professional developer</strong>. You'll master the most in-demand technologies used by top companies worldwide.</p>
    <ul style="margin-bottom:16px;padding-left:0;list-style:none">
      <li style="padding:6px 0">✅ Build 25+ real-world projects from scratch</li>
      <li style="padding:6px 0">✅ Master HTML5, CSS3, JavaScript ES6+ and beyond</li>
      <li style="padding:6px 0">✅ Learn React.js, Node.js, Express.js and MongoDB</li>
      <li style="padding:6px 0">✅ Deploy websites and web apps to the cloud</li>
      <li style="padding:6px 0">✅ Professional developer best practices & design patterns</li>
      <li style="padding:6px 0">✅ Responsive design and mobile-first development</li>
      <li style="padding:6px 0">✅ Authentication, Security & Performance optimization</li>
      <li style="padding:6px 0">✅ Git, GitHub workflows and team collaboration</li>
    </ul>
    <p>By the end of this course, you will be able to build any website you can dream of and deploy it to the internet for the world to see.</p>
  `,
  syllabus: [
    { title: "Module 1: HTML & CSS Fundamentals", duration: "4 weeks", lessons: ["Introduction to Web Development", "HTML5 Structure & Semantics", "CSS3 Selectors and Properties", "Flexbox Layout System", "CSS Grid Layout", "Responsive Design & Media Queries"] },
    { title: "Module 2: JavaScript Essentials", duration: "4 weeks", lessons: ["JS Basics, Variables & Data Types", "Functions, Scope & Closures", "DOM Manipulation", "Events & Event Handling", "Async JS, Promises & Fetch API", "ES6+ Modern Features"] },
    { title: "Module 3: React.js Development", duration: "4 weeks", lessons: ["React Fundamentals & JSX", "Functional Components & Hooks", "State Management & useEffect", "React Router Navigation", "Context API & State Lifting", "Redux Toolkit"] },
    { title: "Module 4: Backend with Node.js", duration: "3 weeks", lessons: ["Node.js Runtime & NPM Ecosystem", "Express.js Framework", "RESTful API Design", "Middleware & Error Handling", "JWT Authentication & Sessions", "File Uploads with Multer"] },
    { title: "Module 5: Database Management", duration: "3 weeks", lessons: ["MongoDB Atlas Setup", "Mongoose ODM & Schemas", "CRUD Operations", "Aggregation Pipeline", "SQL Basics with MySQL", "Database Design Patterns"] },
    { title: "Module 6: Deployment & DevOps", duration: "2 weeks", lessons: ["Git & GitHub Workflows", "Vercel & Netlify Deployment", "AWS EC2 Basics", "Environment Variables & Security", "CI/CD with GitHub Actions", "Performance Optimization"] },
  ],
  ratingBreakdown: { 5: 72, 4: 18, 3: 6, 2: 2, 1: 2 },
  reviewsList: [
    { id: 1, name: "Rahul Sharma", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&q=80", rating: 5, text: "Absolutely fantastic course! The instructor explains everything clearly and the projects are real-world applicable. I landed a job 2 months after completing this course. Best decision ever!", date: "Dec 2023", likes: 24, dislikes: 1 },
    { id: 2, name: "Priya Patel", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80", rating: 5, text: "Best investment I've made for my career. The content is up-to-date and the support is excellent. Highly recommend to anyone wanting to break into web development.", date: "Nov 2023", likes: 18, dislikes: 0 },
    { id: 3, name: "Amit Kumar", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80", rating: 4, text: "Very comprehensive. Covers everything from basics to advanced topics. Projects are challenging and really test your understanding. Great value for money.", date: "Oct 2023", likes: 12, dislikes: 2 },
    { id: 4, name: "Neha Gupta", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80", rating: 5, text: "I was a complete beginner. Now I'm working as a junior developer. This course changed my career trajectory. The community support is incredible!", date: "Sep 2023", likes: 31, dislikes: 0 },
  ],
};

const popularCourses = [
  { id: 2, title: "Data Science & Machine Learning with Python", category: "Data Science", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", rating: 4.9, reviews: 9850, mrp: 5999, price: 599 },
  { id: 3, title: "UI/UX Design Masterclass: From Beginner to Pro", category: "Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80", rating: 4.7, reviews: 7210, mrp: 3999, price: 399 },
];

const relatedCourses = [
  { id: 4, title: "Advanced React & Next.js: Build Real Projects", category: "Web Development", image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&q=80", rating: 4.9, reviews: 8540, mrp: 4499, price: 449 },
  { id: 9, title: "Full-Stack Python: Django, REST APIs & Deployment", category: "Web Development", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80", rating: 4.8, reviews: 7640, mrp: 4999, price: 499 },
  { id: 5, title: "Digital Marketing Strategy & Growth Hacking", category: "Marketing", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", rating: 4.6, reviews: 5320, mrp: 3499, price: 349 },
];

// ─── Helper Components ─────────────────────────────────────────────────────────
function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const cls = size === "lg" ? "w-6 h-6" : size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar key={s} className={`${cls} ${s <= Math.round(rating) ? "text-warning-500 fill-current" : "text-gray-300 dark:text-gray-600"}`} />
      ))}
    </div>
  );
}

function SyllabusItem({ item, index }: { item: typeof courseData.syllabus[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700/60 transition-colors-smooth text-left">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 font-bold text-sm flex items-center justify-center flex-shrink-0">
            {index + 1}
          </span>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">{item.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.lessons.length} lessons · {item.duration}</p>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
            <ul className="divide-y divide-gray-100 dark:divide-gray-700/50 bg-white dark:bg-gray-800/30">
              {item.lessons.map((lesson, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors-smooth">
                  <FiCheckCircle className="w-4 h-4 text-success-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{lesson}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReviewCard({ review }: { review: typeof courseData.reviewsList[0] }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="flex gap-4 py-5 border-b border-gray-100 dark:border-gray-700/60 last:border-0">
      <img src={review.avatar} alt={review.name} className="w-11 h-11 rounded-full object-cover flex-shrink-0 ring-2 ring-primary-100 dark:ring-primary-900/40" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{review.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <StarRating rating={review.rating} />
              <span className="text-xs text-gray-400">{review.date}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-2">{review.text}</p>
        <div className="flex items-center gap-4 mt-3">
          <motion.button onClick={() => { setLiked(!liked); if (disliked) setDisliked(false); }} className={`flex items-center gap-1.5 text-xs font-medium transition-colors-smooth ${liked ? "text-primary-600" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`} whileTap={{ scale: 0.88 }}>
            <FiThumbsUp className="w-3.5 h-3.5" />{review.likes + (liked ? 1 : 0)}
          </motion.button>
          <motion.button onClick={() => { setDisliked(!disliked); if (liked) setLiked(false); }} className={`flex items-center gap-1.5 text-xs font-medium transition-colors-smooth ${disliked ? "text-error-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`} whileTap={{ scale: 0.88 }}>
            <FiThumbsDown className="w-3.5 h-3.5" />{review.dislikes + (disliked ? 1 : 0)}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function CourseCard({ course }: { course: typeof popularCourses[0] }) {
  const discount = Math.round(((course.mrp - course.price) / course.mrp) * 100);
  return (
    <motion.div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-soft hover:shadow-strong dark:shadow-gray-900/50 transition-shadow duration-300" whileHover={{ y: -5 }} transition={{ duration: 0.25 }}>
      <div className="relative h-44 overflow-hidden">
        <motion.img src={course.image} alt={course.title} className="w-full h-full object-cover" whileHover={{ scale: 1.07 }} transition={{ duration: 0.38 }} />
        <div className="absolute top-3 right-3 bg-success-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">-{discount}%</div>
      </div>
      <div className="p-4">
        <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold uppercase tracking-wide mb-1.5 flex items-center gap-1">
          <FiBookOpen className="w-3.5 h-3.5" />{course.category}
        </p>
        <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">{course.title}</h4>
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-warning-600 text-xs font-bold tabular-nums">{course.rating}</span>
          <StarRating rating={course.rating} />
          <span className="text-gray-400 text-xs">({course.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-gray-900 dark:text-white">₹{course.price.toLocaleString()}</span>
            <span className="text-sm text-gray-400 line-through">₹{course.mrp.toLocaleString()}</span>
          </div>
          <Link href={`/courses/${course.id}`} className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-semibold group-hover:gap-1.5 transition-all-smooth">
            Learn More <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Enquiry Modal ─────────────────────────────────────────────────────────────
function EnquiryModal({ isOpen, onClose, courseName }: { isOpen: boolean; onClose: () => void; courseName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", mobile: "", email: "", dob: "", gender: "", address: "", source: "" });

  const set = (k: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [k]: k === "mobile" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ firstName: "", lastName: "", mobile: "", email: "", dob: "", gender: "", address: "", source: "" }); onClose(); }, 2500);
  };

  const inputCls = "w-full px-3.5 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all duration-200";
  const labelCls = "block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 24 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiBookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white leading-tight">Course Enquiry Form</h2>
                    <p className="text-white/75 text-xs mt-0.5 line-clamp-1">Enroll in: {courseName}</p>
                  </div>
                </div>
                <button onClick={onClose} className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors-smooth flex-shrink-0">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
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
                <form id="enquiry-form" onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-6">
                  {/* Personal Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="w-7 h-7 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Personal Information</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className={labelCls}>First Name <span className="text-error-500">*</span></label><input required type="text" value={formData.firstName} onChange={set("firstName")} className={inputCls} placeholder="Enter first name" /></div>
                      <div><label className={labelCls}>Last Name</label><input type="text" value={formData.lastName} onChange={set("lastName")} className={inputCls} placeholder="Enter last name" /></div>
                      <div><label className={labelCls}>Date of Birth</label><input type="date" value={formData.dob} onChange={set("dob")} className={inputCls} /></div>
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
                      <div><label className={labelCls}>Mobile Number <span className="text-error-500">*</span></label><input required type="tel" value={formData.mobile} onChange={set("mobile")} className={inputCls} placeholder="10-digit number" maxLength={10} /></div>
                      <div><label className={labelCls}>Email Address <span className="text-error-500">*</span></label><input required type="email" value={formData.email} onChange={set("email")} className={inputCls} placeholder="example@domain.com" /></div>
                      <div className="sm:col-span-2"><label className={labelCls}>Address</label><textarea value={formData.address} onChange={set("address")} rows={2} className={inputCls + " resize-none"} placeholder="Your full address" /></div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="w-7 h-7 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center">
                        <FiInfo className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">How did you hear about us?</h3>
                    </div>
                    <select value={formData.source} onChange={set("source")} className={inputCls}>
                      <option value="">Select Source</option>
                      <option value="website">Website</option>
                      <option value="walk-in">Walk-in</option>
                      <option value="referral">Referral</option>
                      <option value="ad">Advertisement</option>
                      <option value="social">Social Media</option>
                    </select>
                  </div>
                </form>
              )}

              {/* Footer */}
              {!submitted && (
                <div className="p-5 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex gap-3 flex-shrink-0">
                  <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors-smooth">
                    Cancel
                  </button>
                  <motion.button type="submit" form="enquiry-form" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors-smooth" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <FiSend className="w-4 h-4" />Submit Enquiry
                  </motion.button>
                </div>
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
  const [activeTab, setActiveTab] = useState("overview");
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showVideoOverlay, setShowVideoOverlay] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sidebarSticky, setSidebarSticky] = useState(false);

  const sectionIds = ["overview", "coursecontent", "details", "review"];

  useEffect(() => {
    const onScroll = () => {
      setSidebarSticky(window.scrollY > 300);
      const offset = 160;
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveTab(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 140, behavior: "smooth" });
  };

  const tabs = [
    { id: "overview", label: "Description" },
    { id: "coursecontent", label: "Syllabus" },
    { id: "details", label: "Course Fees" },
    { id: "review", label: "Reviews" },
  ];

  const discount = Math.round(((courseData.mrp - courseData.price) / courseData.mrp) * 100);
  const visibleReviews = showAllReviews ? courseData.reviewsList : courseData.reviewsList.slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600 dark:from-gray-950 dark:via-primary-900 dark:to-primary-800 py-16">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        {/* Glow orbs */}
        <motion.div className="absolute -top-24 -right-24 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary-300/10 rounded-full blur-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }} />

        <Container>
          <div className="max-w-3xl mx-auto text-center relative">
            {/* Badges row */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-wrap items-center justify-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow">
                <FiTag className="w-3 h-3" />{courseData.badge}
              </span>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-xs font-medium border border-white/20">
                <StarRating rating={courseData.rating} />
                <span className="font-bold">{courseData.rating}</span>
              </div>
              <span className="bg-white/10 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-xs font-medium border border-white/20">
                {courseData.reviews.toLocaleString()} ratings
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {courseData.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.14 }} className="text-white/75 text-base md:text-lg mb-6 leading-relaxed">
              {courseData.subtitle}
            </motion.p>

            {/* Meta */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-5 text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><FiCalendar className="w-4 h-4" />Last updated {courseData.lastUpdated}</span>
              <span className="flex items-center gap-1.5"><FiAward className="w-4 h-4" />Certified Course</span>
              <span className="flex items-center gap-1.5"><FiUsers className="w-4 h-4" />{courseData.enrolled.toLocaleString()} students enrolled</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Main Body ── */}
      <section className="bg-gray-50 dark:bg-gray-900 py-10">
        <Container>
          {/* Video Preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative rounded-2xl overflow-hidden shadow-strong mb-10 max-w-4xl mx-auto cursor-pointer group" onClick={() => setShowVideoOverlay(true)}>
            <img src={courseData.thumbnail} alt={courseData.title} className="w-full h-52 sm:h-72 md:h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <motion.div className="w-16 h-16 bg-white/90 dark:bg-white rounded-full flex items-center justify-center shadow-xl" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <FiPlay className="w-7 h-7 text-primary-600 ml-1" />
              </motion.div>
              <span className="text-white font-semibold text-sm flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <FiEye className="w-4 h-4" />Preview this course
              </span>
            </div>
          </motion.div>

          {/* Video overlay */}
          <AnimatePresence>
            {showVideoOverlay && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowVideoOverlay(false)}>
                <div className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                  <div className="absolute inset-0 flex items-center justify-center text-white/60">
                    <div className="text-center"><FiPlay className="w-16 h-16 mx-auto mb-3 opacity-40" /><p className="text-sm">Video preview would play here</p></div>
                  </div>
                  <button onClick={() => setShowVideoOverlay(false)} className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors-smooth">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* ── Sidebar ── */}
            <div className={`lg:col-span-1 order-first lg:order-none ${sidebarSticky ? "lg:sticky lg:top-24" : ""}`}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-strong dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Price */}
                <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">₹{courseData.price.toLocaleString()}</span>
                    <span className="text-lg text-gray-400 line-through font-medium">₹{courseData.mrp.toLocaleString()}</span>
                    <span className="bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400 text-xs font-bold px-2 py-0.5 rounded-full">{discount}% OFF</span>
                  </div>
                  <p className="text-xs text-error-500 font-medium">🔥 Limited time offer — Don&apos;t miss out!</p>
                </div>

                {/* Action Buttons */}
                <div className="p-5 space-y-3 border-b border-gray-100 dark:border-gray-700">
                  <motion.button className="w-full flex items-center justify-center gap-2 px-5 py-3 font-semibold text-white rounded-xl text-sm shadow-md transition-colors-smooth" style={{ background: "linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%)" }} whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(37,99,235,0.35)" }} whileTap={{ scale: 0.98 }}>
                    <FiShoppingCart className="w-4 h-4" />Buy Now
                  </motion.button>
                  <motion.button onClick={() => setShowEnquiry(true)} className="w-full flex items-center justify-center gap-2 px-5 py-3 font-semibold text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-500 rounded-xl text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors-smooth" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    Enquire Now <FiArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Course Includes */}
                <div className="p-5">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-4">This Course Includes</h4>
                  <ul className="space-y-3">
                    {[
                      { icon: FiBookOpen, label: "Duration", value: courseData.duration },
                      { icon: FiUsers, label: "Enrolled", value: courseData.enrolled.toLocaleString() + " students" },
                      { icon: FiFileText, label: "Lectures", value: courseData.lectures + " lectures" },
                      { icon: FiVideo, label: "Videos", value: courseData.videos + " video lessons" },
                      { icon: FiFileText, label: "Notes", value: courseData.notes + " study notes" },
                      { icon: FiAward, label: "Certificate", value: "Yes, upon completion" },
                    ].map(({ icon: Icon, label, value }) => (
                      <li key={label} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                          <Icon className="w-4 h-4 text-primary-500" />{label}
                        </span>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* ── Main Content ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sticky Tab Nav */}
              <div className="sticky top-[72px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-navbar rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-1">
                <nav className="flex gap-1 overflow-x-auto scrollbar-hide">
                  {tabs.map((tab) => (
                    <motion.button key={tab.id} onClick={() => scrollToSection(tab.id)} className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === tab.id ? "bg-primary-600 text-white shadow-sm" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`} whileTap={{ scale: 0.97 }}>
                      {tab.label}
                    </motion.button>
                  ))}
                </nav>
              </div>

              {/* Description */}
              <motion.div id="overview" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-soft p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary-600 rounded-full" />What You&apos;ll Learn
                </h3>
                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: courseData.description }} />
              </motion.div>

              {/* Syllabus */}
              <motion.div id="coursecontent" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-soft p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary-600 rounded-full" />Course Syllabus
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{courseData.syllabus.length} modules · {courseData.lectures} lectures · {courseData.duration}</p>
                <div className="space-y-3">
                  {courseData.syllabus.map((item, i) => <SyllabusItem key={i} item={item} index={i} />)}
                </div>
              </motion.div>

              {/* Course Fees */}
              <motion.div id="details" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-soft p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary-600 rounded-full" />Course Fees
                </h3>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { label: "Course Fees (MRP)", value: `₹${courseData.mrp.toLocaleString()}/-`, cls: "text-error-600 dark:text-error-400 font-bold text-base line-through" },
                    { label: "Discounted Fees", value: `₹${courseData.price.toLocaleString()}/-`, cls: "text-success-600 dark:text-success-400 font-bold text-base" },
                    { label: "You Save", value: `₹${(courseData.mrp - courseData.price).toLocaleString()} (${discount}% OFF)`, cls: "text-orange-500 font-bold text-base" },
                    { label: "Course Duration", value: courseData.duration, cls: "text-gray-900 dark:text-white font-bold text-base" },
                  ].map(({ label, value, cls }) => (
                    <div key={label} className="flex items-center justify-between py-3.5">
                      <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</span>
                      <span className={cls}>{value}</span>
                    </div>
                  ))}
                </div>
                <motion.button onClick={() => setShowEnquiry(true)} className="w-full mt-5 flex items-center justify-center gap-2 px-5 py-3 font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl text-sm transition-colors-smooth" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <FiMail className="w-4 h-4" />Enquire About This Course
                </motion.button>
              </motion.div>

              {/* Reviews */}
              <motion.div id="review" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-soft p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary-600 rounded-full" />Student Reviews
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center mb-6">
                  {/* Overall */}
                  <div className="text-center sm:border-r border-gray-100 dark:border-gray-700 sm:pr-6">
                    <p className="text-6xl font-extrabold text-primary-600 dark:text-primary-400 leading-none mb-2">{courseData.rating}</p>
                    <StarRating rating={courseData.rating} size="md" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Course Rating</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">({courseData.reviews.toLocaleString()} reviews)</p>
                  </div>
                  {/* Breakdown */}
                  <div className="sm:col-span-2 space-y-2">
                    {([5, 4, 3, 2, 1] as const).map((star) => {
                      const pct = courseData.ratingBreakdown[star] ?? 0;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <div className="flex items-center gap-0.5 w-20 flex-shrink-0">
                            {Array.from({ length: star }).map((_, i) => <FiStar key={i} className="w-3.5 h-3.5 text-warning-500 fill-current" />)}
                          </div>
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-warning-500 rounded-full" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: (5 - star) * 0.08 }} />
                          </div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-9 text-right tabular-nums">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Featured Reviews */}
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-soft p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary-600 rounded-full" />Featured Reviews
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{courseData.reviewsList.length} reviews from verified students</p>
                <div>
                  {visibleReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
                </div>
                {courseData.reviewsList.length > 3 && (
                  <motion.button onClick={() => setShowAllReviews(!showAllReviews)} className="mt-4 flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-semibold hover:underline" whileTap={{ scale: 0.97 }}>
                    {showAllReviews ? "Show Less" : `Show All ${courseData.reviewsList.length} Reviews`}
                    <motion.span animate={{ rotate: showAllReviews ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <FiChevronDown className="w-4 h-4" />
                    </motion.span>
                  </motion.button>
                )}
              </motion.div>

              {/* Popular Courses */}
              <div>
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">Top Course</span>
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">More <span className="gradient-text">Popular</span> Courses</h3>
                  </div>
                  <Link href="/courses" className="text-sm font-semibold text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-500 px-4 py-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors-smooth">
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {popularCourses.map(c => <CourseCard key={c.id} course={c} />)}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Related Courses ── */}
      <section className="py-16 bg-white dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-700/50">
        <Container>
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-bold uppercase tracking-widest mb-3">More Similar Courses</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Related <span className="gradient-text">Courses</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}>
                <CourseCard course={c} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800">
        <Container>
          <motion.div className="flex flex-col sm:flex-row items-center justify-between gap-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-1">Ready to Start Learning?</h2>
              <p className="text-white/75 text-sm">Join 50,000+ learners already advancing their careers.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <motion.button onClick={() => setShowEnquiry(true)} className="flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors-smooth shadow-lg" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <FiMail className="w-4 h-4" />Enquire Now
              </motion.button>
              <motion.button className="flex items-center gap-2 px-6 py-3 border-2 border-white/50 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-colors-smooth" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <FiShoppingCart className="w-4 h-4" />Enroll Now
              </motion.button>
            </div>
          </motion.div>
        </Container>
      </section>

      <EnquiryModal isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} courseName={courseData.title} />
      <Footer />
    </div>
  );
}
