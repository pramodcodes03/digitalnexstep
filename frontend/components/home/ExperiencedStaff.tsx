"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiLinkedin, FiMail, FiBookOpen } from "react-icons/fi";
import Container from "../ui/Container";

const staff = [
  {
    name: "Dr. Meena Iyer",
    designation: "Chief Academic Officer",
    expertise: "Curriculum Design & EdTech Strategy",
    experience: "20+ Years",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Rajesh Kumar",
    designation: "Head of Technology",
    expertise: "AI/ML in Education & Platform Architecture",
    experience: "15+ Years",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Dr. Sunita Rao",
    designation: "Director of Assessments",
    expertise: "Psychometrics & Adaptive Testing",
    experience: "18+ Years",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Amit Joshi",
    designation: "Senior Content Architect",
    expertise: "Question Bank Design & Quality Assurance",
    experience: "12+ Years",
    color: "from-orange-500 to-red-600",
  },
  {
    name: "Kavita Menon",
    designation: "Lead Data Scientist",
    expertise: "Learning Analytics & Student Insights",
    experience: "10+ Years",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Dr. Sanjay Gupta",
    designation: "Head of Research",
    expertise: "Educational Psychology & Assessment Innovation",
    experience: "22+ Years",
    color: "from-rose-500 to-pink-600",
  },
  {
    name: "Neha Kapoor",
    designation: "UX Research Lead",
    expertise: "Student Experience & Accessibility",
    experience: "8+ Years",
    color: "from-teal-500 to-cyan-600",
  },
  {
    name: "Vikash Tiwari",
    designation: "Operations Director",
    expertise: "Center Management & Training Programs",
    experience: "14+ Years",
    color: "from-amber-500 to-orange-600",
  },
];

const ExperiencedStaff: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/40 to-indigo-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 -right-20 w-80 h-80 bg-gradient-to-bl from-indigo-300/10 to-purple-300/10 dark:from-indigo-600/10 dark:to-purple-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 left-10 w-72 h-72 bg-gradient-to-tr from-blue-300/10 to-cyan-300/10 dark:from-blue-600/10 dark:to-cyan-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, delay: 3, repeat: Infinity, ease: "easeInOut" }}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-5"
          >
            <FiBookOpen className="w-4 h-4" />
            Our Experienced Staff
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Meet the{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Experts
            </span>{" "}
            Behind Our Success
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our team of seasoned professionals brings decades of combined experience
            in education, technology, and assessment innovation.
          </p>
        </motion.div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {staff.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -10, transition: { duration: 0.25 } }}
              className="group"
            >
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                {/* Top Gradient Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${member.color}`} />

                {/* Avatar */}
                <div className="pt-8 pb-4 flex justify-center">
                  <div className="relative">
                    <div className={`w-24 h-24 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white text-2xl font-bold">
                        {member.name.split(" ").filter(n => !n.includes(".")).map((n) => n[0]).join("")}
                      </span>
                    </div>
                    {/* Online Indicator */}
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-[3px] border-white dark:border-gray-800" />
                    {/* Glow */}
                    <div className={`absolute inset-0 w-24 h-24 bg-gradient-to-br ${member.color} rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
                  </div>
                </div>

                {/* Info */}
                <div className="px-6 pb-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className={`text-sm font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-2`}>
                    {member.designation}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {member.expertise}
                  </p>

                  {/* Experience Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    <FiBookOpen className="w-3 h-3" />
                    {member.experience} Experience
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                      <FiLinkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    </button>
                    <button className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <FiMail className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExperiencedStaff;
