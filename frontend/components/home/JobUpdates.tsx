"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiClock, FiArrowRight, FiDollarSign } from "react-icons/fi";
import Container from "../ui/Container";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

const jobs = [
  {
    title: "Senior Content Developer",
    department: "Academic Team",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹8L – ₹14L",
    posted: "2 days ago",
    tags: ["Content", "Education", "Remote Option"],
    color: "from-blue-500 to-indigo-600",
    urgent: true,
  },
  {
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Hyderabad, India",
    type: "Full-time",
    salary: "₹12L – ₹22L",
    posted: "3 days ago",
    tags: ["React", "Node.js", "TypeScript"],
    color: "from-purple-500 to-pink-600",
    urgent: false,
  },
  {
    title: "Data Analyst – EdTech",
    department: "Analytics",
    location: "Remote",
    type: "Full-time",
    salary: "₹7L – ₹12L",
    posted: "1 week ago",
    tags: ["Python", "SQL", "Analytics"],
    color: "from-green-500 to-emerald-600",
    urgent: false,
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹9L – ₹16L",
    posted: "5 days ago",
    tags: ["Figma", "UX Research", "Prototyping"],
    color: "from-orange-500 to-red-500",
    urgent: true,
  },
  {
    title: "Assessment Specialist",
    department: "Academic Team",
    location: "Delhi, India",
    type: "Contract",
    salary: "₹6L – ₹10L",
    posted: "1 day ago",
    tags: ["Psychometrics", "Testing", "QA"],
    color: "from-cyan-500 to-blue-600",
    urgent: false,
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹10L – ₹18L",
    posted: "4 days ago",
    tags: ["Digital Marketing", "SEO", "Growth"],
    color: "from-rose-500 to-pink-600",
    urgent: false,
  },
];

const defaultJobColors = [
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-pink-600",
  "from-green-500 to-emerald-600",
  "from-orange-500 to-red-500",
  "from-cyan-500 to-blue-600",
  "from-rose-500 to-pink-600",
];

const JobUpdates: React.FC = () => {
  const { data: apiJobs } = useApi(() => api.getJobUpdates(), [] as any[]);

  const displayJobs: typeof jobs = apiJobs.length > 0
    ? apiJobs.map((j: any, i: number) => ({
        title: j.title,
        department: j.department || j.category || "General",
        location: j.location || "India",
        type: j.type || j.employment_type || "Full-time",
        salary: j.salary || "",
        posted: j.created_at ? new Date(j.created_at).toLocaleDateString() : "",
        tags: j.tags || [],
        color: defaultJobColors[i % defaultJobColors.length],
        urgent: j.is_urgent || false,
      }))
    : jobs;

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-blue-200/10 to-transparent dark:from-blue-600/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-5"
          >
            <FiBriefcase className="w-4 h-4" />
            Job Updates
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Join Our{" "}
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Growing Team
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore exciting career opportunities and be part of the team that&apos;s
            revolutionizing education technology.
          </p>
        </motion.div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group cursor-pointer"
            >
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Top Gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${job.color}`} />

                {/* Urgent Badge */}
                {job.urgent && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.3 + index * 0.08 }}
                    className="absolute top-4 right-4"
                  >
                    <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full animate-pulse">
                      Urgent
                    </span>
                  </motion.div>
                )}

                {/* Department & Type */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 bg-gradient-to-r ${job.color} text-white text-xs font-semibold rounded-full`}>
                    {job.department}
                  </span>
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
                    {job.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {job.title}
                </h3>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiMapPin className="w-3.5 h-3.5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiDollarSign className="w-3.5 h-3.5" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiClock className="w-3.5 h-3.5" />
                    <span>Posted {job.posted}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {job.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Apply Button */}
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>Apply Now</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            View All Openings
            <FiArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default JobUpdates;
