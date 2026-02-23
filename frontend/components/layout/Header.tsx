"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import MobileMenu from "./MobileMenu";
import Button from "../ui/Button";
import Container from "../ui/Container";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "About Us", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => {
        const href = item.href.replace("#", "");
        return document.getElementById(href);
      }).filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(`#${section.id}`);
            break;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection("/");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all-smooth ${
          isScrolled
            ? "backdrop-blur-navbar shadow-md dark:shadow-gray-800/50 py-3"
            : "bg-white/95 dark:bg-gray-900/95 py-4"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform-smooth">
                <span className="text-white font-bold text-xl">DN</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors-smooth">
                  DigitalNexStep
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Educational Excellence</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href || (item.href === "/" && activeSection === "");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors-smooth group"
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all-smooth" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Theme Toggle and CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors-smooth"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <FiSun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>

              {/* Get Started Button */}
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  contactSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Theme Toggle and Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors-smooth"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <FiSun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors-smooth"
                aria-label="Open menu"
              >
                <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20 lg:h-24" />
    </>
  );
};

export default Header;
