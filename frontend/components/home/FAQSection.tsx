"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import Container from "../ui/Container";
import AnimatedSection from "../ui/AnimatedSection";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";

const faqs = [
  {
    question: "What types of assessments can I create with DigitalNexStep?",
    answer:
      "Our platform supports a wide variety of assessment types including multiple-choice questions, true/false, short answer, essay questions, fill-in-the-blank, matching, coding challenges, and multimedia submissions. You can mix and match question types to create comprehensive assessments tailored to your needs.",
  },
  {
    question: "How secure is the platform?",
    answer:
      "Security is our top priority. We use bank-level encryption (AES-256) for all data at rest and in transit. Our platform is hosted on enterprise-grade servers with 99.9% uptime guarantee, regular security audits, and compliance with FERPA, COPPA, and GDPR regulations. We also offer features like secure browser lockdown and plagiarism detection.",
  },
  {
    question: "Can I integrate DigitalNexStep with my existing LMS?",
    answer:
      "Yes! We offer seamless integration with popular Learning Management Systems including Canvas, Blackboard, Moodle, Google Classroom, and Schoology. Our API also allows for custom integrations with proprietary systems. Data syncs automatically, and single sign-on (SSO) is supported for a smooth user experience.",
  },
  {
    question: "What kind of analytics and reporting do you provide?",
    answer:
      "We provide comprehensive real-time analytics including individual student performance, class-wide statistics, question-level analysis, time-on-task metrics, and learning outcome tracking. Reports can be customized, scheduled, and exported in multiple formats (PDF, Excel, CSV). You can also create custom dashboards to track the metrics that matter most to you.",
  },
  {
    question: "Is there a limit on the number of students or assessments?",
    answer:
      "Limits depend on your chosen plan. Our Basic plan supports up to 100 students, Professional up to 500, and Enterprise offers unlimited students. All plans include unlimited assessments. You can always upgrade your plan as your needs grow, and we offer educational discounts for qualifying institutions.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We offer tiered support based on your plan. Basic includes email support with 24-hour response time, Professional adds priority support and live chat, and Enterprise includes 24/7 dedicated support with a phone hotline and assigned success manager. All plans include access to our comprehensive knowledge base, video tutorials, and regular training webinars.",
  },
  {
    question: "Can students take assessments on mobile devices?",
    answer:
      "Absolutely! Our platform is fully responsive and works seamlessly on smartphones, tablets, laptops, and desktops. Students can take assessments on any device with an internet connection. The interface automatically adapts to screen size for optimal usability, and we support both iOS and Android devices.",
  },
  {
    question: "How does the automated grading work?",
    answer:
      "Our intelligent grading engine automatically scores objective questions (multiple-choice, true/false, matching, etc.) instantly upon submission. For subjective questions like essays, we provide AI-assisted grading suggestions based on rubrics and keywords, but educators always have final review control. You can set up custom rubrics, partial credit rules, and grading workflows.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-start justify-between gap-4 text-left hover:text-primary-600 dark:hover:text-primary-400 transition-colors-smooth group"
      >
        <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors-smooth">
          {question}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center transition-all-smooth ${
            isOpen ? "bg-primary-600 dark:bg-primary-500 rotate-180" : "group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50"
          }`}
        >
          {isOpen ? (
            <FiMinus className="w-5 h-5 text-white" />
          ) : (
            <FiPlus className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const { data: apiFaqs } = useApi(() => api.getFAQs(), [] as any[]);
  const { data: apiSections } = useApi(() => api.getPageSections("home"), [] as any[]);
  const sectionData = apiSections.find((s: any) => s.section_key === "faq_header");

  const displayFaqs: { question: string; answer: string }[] = apiFaqs.length > 0
    ? apiFaqs.map((f: any) => ({
        question: f.question,
        answer: f.answer,
      }))
    : faqs;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-800">
      <Container>
        <AnimatedSection animation="slide-up" className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
            {sectionData?.subtitle || "FAQ"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            {sectionData?.title ? (
              <span dangerouslySetInnerHTML={{ __html: sectionData.title }} />
            ) : (
              <>
                Frequently Asked{" "}
                <span className="gradient-text">Questions</span>
              </>
            )}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {sectionData?.content || (
              <>
                Find answers to common questions about our platform. Can&apos;t find what you&apos;re looking for?{" "}
                <a href="#contact" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                  Contact us
                </a>
                .
              </>
            )}
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft p-8 border border-gray-200 dark:border-gray-700">
            {displayFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => toggleFAQ(index)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors-smooth shadow-md hover:shadow-lg"
          >
            Get in Touch
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default FAQSection;
