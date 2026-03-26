"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiX, FiHome, FiGrid, FiInfo, FiHelpCircle, FiMail, FiBookOpen, FiCheckCircle, FiImage, FiUsers, FiPackage, FiAward } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isPartnerDomain?: boolean;
}

const navItems = [
  { name: "Home", href: "/", icon: FiHome },
  { name: "Features", href: "/features", icon: FiGrid },
  { name: "About Us", href: "/about", icon: FiInfo },
  { name: "Courses", href: "/courses", icon: FiBookOpen },
  { name: "Our Products", href: "/products", icon: FiPackage },
  { name: "Franchise", href: "/franchise", icon: FiAward },
  { name: "Verification", href: "/verification", icon: FiCheckCircle },
  { name: "Gallery", href: "/gallery", icon: FiImage },
  { name: "Student Corner", href: "/student-corner", icon: FiUsers },
  { name: "FAQ", href: "#faq", icon: FiHelpCircle },
  { name: "Contact", href: "/contact", icon: FiMail },
];

const partnerNavItems = [
  { name: "Home", href: "#hero", icon: FiHome },
  { name: "Features", href: "#features", icon: FiGrid },
  { name: "About Us", href: "#about", icon: FiInfo },
  { name: "Verification", href: "#verification", icon: FiCheckCircle },
  { name: "FAQ", href: "#faq", icon: FiHelpCircle },
  { name: "Contact", href: "#contact", icon: FiMail },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, isPartnerDomain = false }) => {
  const { theme } = useTheme();
  const currentNavItems = isPartnerDomain ? partnerNavItems : navItems;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 z-50 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <Link href="/" onClick={onClose}>
                  <Image
                    src={theme === "dark" ? "/logo/logo-light-v2.png" : "/logo/logo-dark-v2.png"}
                    alt="DiTRP"
                    width={140}
                    height={40}
                    className="h-9 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors-smooth"
                  aria-label="Close menu"
                >
                  <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-2 px-4">
                  {currentNavItems.map((item, index) => {
                    const Icon = item.icon;
                    const isAnchor = item.href.startsWith("#");
                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {isAnchor ? (
                          <a
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick(item.href);
                            }}
                            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors-smooth group cursor-pointer"
                          >
                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform-smooth" />
                            <span className="font-medium">{item.name}</span>
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => handleLinkClick(item.href)}
                            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors-smooth group"
                          >
                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform-smooth" />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer CTA */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("#contact");
                  }}
                  className="block w-full px-6 py-3 text-center font-semibold text-white bg-primary-600 dark:bg-primary-500 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors-smooth shadow-md cursor-pointer"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
