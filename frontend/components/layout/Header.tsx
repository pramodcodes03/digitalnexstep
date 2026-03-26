"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiMoon, FiSun, FiChevronDown, FiImage, FiUsers, FiHelpCircle, FiPackage, FiAward, FiLogIn, FiSmartphone } from "react-icons/fi";
import MobileMenu from "./MobileMenu";
import Button from "../ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";
import { useDomain } from "@/lib/DomainContext";

/* ── All nav items in display order (main site) ── */
const allNavItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "About Us", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Our Products", href: "/products" },
  { name: "Franchise", href: "/franchise" },
  { name: "Verification", href: "/verification" },
  { name: "Gallery", href: "/gallery" },
  { name: "Student Corner", href: "/student-corner" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "/contact" },
];

/* Items shown directly on lg (1024-1279px) — rest go to "More" */
const primaryItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "About Us", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Our Products", href: "/products" },
  { name: "Verification", href: "/verification" },
  { name: "Contact", href: "/contact" },
];

const overflowItems = [
  { name: "Franchise", href: "/franchise", icon: FiAward },
  { name: "Gallery", href: "/gallery", icon: FiImage },
  { name: "Student Corner", href: "/student-corner", icon: FiUsers },
  { name: "FAQ", href: "#faq", icon: FiHelpCircle },
];

/* ── Partner domain nav — anchor links to home sections only ── */
const partnerNavItems = [
  { name: "Home", href: "#hero" },
  { name: "Features", href: "#features" },
  { name: "About Us", href: "#about" },
  { name: "Verification", href: "#verification" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isPartnerDomain } = useDomain();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { data: settings } = useApi(() => api.getSiteSettings(), {} as any);

  const currentNavItems = isPartnerDomain ? partnerNavItems : allNavItems;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = currentNavItems.map((item) => {
        const href = item.href.replace("#", "").replace("/", "");
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

  /* Shared nav link renderer */
  const NavLink = ({ name, href }: { name: string; href: string }) => {
    const isActive = activeSection === href || (href === "/" && activeSection === "") || (href === "#hero" && activeSection === "");
    const isAnchor = href.startsWith("#");

    const handleClick = (e: React.MouseEvent) => {
      if (isAnchor) {
        e.preventDefault();
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
    };

    const linkContent = (
      <>
        {name}
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
      </>
    );

    if (isAnchor) {
      return (
        <a
          href={href}
          onClick={handleClick}
          className="relative py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors-smooth group whitespace-nowrap cursor-pointer"
        >
          {linkContent}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className="relative py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors-smooth group whitespace-nowrap"
      >
        {linkContent}
      </Link>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all-smooth ${isScrolled
            ? "backdrop-blur-navbar shadow-md dark:shadow-gray-800/50 py-3"
            : "bg-white/95 dark:bg-gray-900/95 py-4"
          }`}
      >
        <div className="mx-auto max-w-full px-3 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink min-w-0 group">
              <Image
                src={theme === "dark" ? "/logo/logo-light-v2.png" : "/logo/logo-dark-v2.png"}
                alt={settings?.site_name || "DiTRP"}
                width={180}
                height={50}
                className="h-8 sm:h-10 lg:h-12 w-auto max-w-[120px] sm:max-w-[160px] lg:max-w-none object-contain group-hover:scale-105 transition-transform-smooth"
                priority
              />
            </Link>

            {/* ═══ Desktop Navigation: XL+ (1280px+) — ALL items flat ═══ */}
            <nav className="hidden xl:flex items-center gap-5">
              {currentNavItems.map((item) => (
                <NavLink key={item.name} name={item.name} href={item.href} />
              ))}
            </nav>

            {/* ═══ Desktop Navigation: LG only (1024-1279px) — primary + More dropdown ═══ */}
            {isPartnerDomain ? (
              <nav className="hidden lg:flex xl:hidden items-center gap-4">
                {currentNavItems.map((item) => (
                  <NavLink key={item.name} name={item.name} href={item.href} />
                ))}
              </nav>
            ) : (
              <nav className="hidden lg:flex xl:hidden items-center gap-4">
                {primaryItems.map((item) => (
                  <NavLink key={item.name} name={item.name} href={item.href} />
                ))}

                {/* More Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  <button
                    className="relative py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors-smooth flex items-center gap-1 whitespace-nowrap"
                  >
                    More
                    <FiChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMoreOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-1 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 overflow-hidden"
                      >
                        {overflowItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors-smooth"
                            >
                              <Icon className="w-4 h-4" />
                              {item.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            )}

            {/* Theme Toggle and CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
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

              {/* Application Button */}
              <a
                href="https://hdi.digitalnexstep.com/pwa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors-smooth"
                aria-label="Application"
                title="Application"
              >
                <FiSmartphone className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </a>

              {/* Login Button */}
              <a
                href="https://hdi.digitalnexstep.com/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="md">
                  <span className="flex items-center gap-2">
                    <FiLogIn className="w-4 h-4" />
                    Login
                  </span>
                </Button>
              </a>
            </div>

            {/* Mobile Icons and Menu Button */}
            <div className="lg:hidden flex items-center gap-1 flex-shrink-0">
              {/* Application Button */}
              <a
                href="https://hdi.digitalnexstep.com/pwa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors-smooth"
                aria-label="Application"
              >
                <FiSmartphone className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </a>

              {/* Login Button */}
              <a
                href="https://hdi.digitalnexstep.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 transition-colors-smooth"
                aria-label="Login"
              >
                <FiLogIn className="w-4 h-4 text-white" />
              </a>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors-smooth"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <FiMoon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                ) : (
                  <FiSun className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors-smooth"
                aria-label="Open menu"
              >
                <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isPartnerDomain={isPartnerDomain}
      />

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20 lg:h-24" />
    </>
  );
};

export default Header;
