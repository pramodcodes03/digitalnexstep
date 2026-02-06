"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiYoutube,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiArrowUp,
  FiArrowRight,
} from "react-icons/fi";
import Container from "../ui/Container";
import { getCurrentYear } from "@/lib/utils";
import api from "@/lib/api";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeStatus("idle");

    try {
      await api.subscribe(email);
      setSubscribeStatus("success");
      setEmail("");
    } catch (error) {
      setSubscribeStatus("error");
    } finally {
      setIsSubscribing(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: FiYoutube, href: "#", label: "YouTube", color: "hover:bg-red-600" },
    { icon: FiFacebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: FiTwitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
    { icon: FiInstagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Features", href: "#features" },
    { name: "About Us", href: "#about" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact Us", href: "#contact" },
  ];

  const legalLinks = [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Refund Policy", href: "/refund" },
    { name: "Our Affiliations", href: "/affiliations" },
    { name: "Accreditations", href: "/accreditations" },
    { name: "Sitemap", href: "/sitemap" },
  ];

  return (
    <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 dark:from-black dark:via-gray-900 dark:to-gray-800 text-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Container className="relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-bold text-2xl">DN</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">DigitalNexStep</h3>
                <p className="text-sm text-primary-200 dark:text-gray-400">Educational Excellence</p>
              </div>
            </div>
            <p className="text-primary-100 dark:text-gray-300 leading-relaxed">
              Empowering educational institutions with cutting-edge assessment solutions.
              Transform the way you evaluate, engage, and elevate learning outcomes.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center ${social.color} hover:scale-110 transition-all-smooth`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-100 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors-smooth flex items-center gap-2 group"
                  >
                    <FiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all-smooth" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div>
            <h4 className="text-lg font-bold mb-6">Legal & Policies</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-100 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors-smooth flex items-center gap-2 group"
                  >
                    <FiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all-smooth" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="px-3 py-1 bg-white/10 dark:bg-white/5 rounded text-xs">SSL Secure</div>
              <div className="px-3 py-1 bg-white/10 dark:bg-white/5 rounded text-xs">Verified</div>
            </div>
          </div>

          {/* Column 4: Contact & Subscribe */}
          <div>
            <h4 className="text-lg font-bold mb-6">Stay Connected</h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-primary-100 dark:text-gray-400">
                <FiMapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>123 Education Street, Suite 456, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-primary-100 dark:text-gray-400">
                <FiPhone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors-smooth">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3 text-primary-100 dark:text-gray-400">
                <FiMail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@digitalnexstep.com" className="hover:text-white transition-colors-smooth">
                  info@digitalnexstep.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-100 dark:text-gray-400">
                <FiClock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div>
              <h5 className="font-semibold mb-3">Newsletter</h5>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-white placeholder-primary-200 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all-smooth"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-primary-700 dark:text-white font-semibold rounded-lg hover:bg-primary-50 dark:hover:bg-gray-600 transition-colors-smooth disabled:opacity-50"
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              {subscribeStatus === "success" && (
                <p className="text-sm text-green-300 dark:text-green-400 mt-2">Successfully subscribed!</p>
              )}
              {subscribeStatus === "error" && (
                <p className="text-sm text-red-300 dark:text-red-400 mt-2">Failed to subscribe. Please try again.</p>
              )}
              <p className="text-xs text-primary-200 dark:text-gray-400 mt-2">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 dark:border-white/10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-primary-200 dark:text-gray-400 text-sm text-center md:text-left">
              © {getCurrentYear()} DigitalNexStep. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-primary-200 dark:text-gray-400">Accepted Payment Methods:</span>
              <div className="flex gap-2">
                {["Visa", "Mastercard", "PayPal"].map((method) => (
                  <div
                    key={method}
                    className="px-3 py-1 bg-white/10 dark:bg-white/5 rounded text-xs font-medium"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary-600 dark:bg-primary-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors-smooth"
        aria-label="Scroll to top"
      >
        <FiArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
};

export default Footer;
