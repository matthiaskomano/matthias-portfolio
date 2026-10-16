"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const navLinks = [
  { name: "Home", targetId: "home" },
  { name: "About", targetId: "about" },
  { name: "Skills", targetId: "skills" },
  { name: "Projects", targetId: "projects" },
  { name: "Experience", targetId: "experience" },
  { name: "Education", targetId: "certificates" },
  { name: "Contact", targetId: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => document.getElementById(link.targetId));
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const activeLink = navLinks.find(link => link.targetId === section.id);
            if (activeLink) setActiveSection(activeLink.name);
          }
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdminRoute) return null;

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, name: string) => {
    e.preventDefault();
    setActiveSection(name);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? "bg-[#030712]/90 backdrop-blur-md border-b border-white/10 shadow-sm py-4"
          : "bg-[#030712] py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex items-center justify-between w-full">
          
          {/* Logo - Matching Design */}
          <Link 
            href="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 relative z-50"
          >
            <span className="text-primary font-black text-2xl tracking-tighter">MK</span>
            <span className="text-white font-medium text-sm hidden sm:block">Matthias Komano</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-8 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.targetId}`}
                onClick={(e) => handleScrollToSection(e, link.targetId, link.name)}
                className={`relative text-[13px] font-semibold transition-colors cursor-pointer pb-1 ${
                  activeSection === link.name ? "text-primary" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
                {activeSection === link.name && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Download CV CTA */}
          <div className="hidden md:flex justify-end">
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all cursor-pointer text-xs font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              Download CV
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white relative z-50 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#030712] border-b border-white/10 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.targetId}`}
                  onClick={(e) => handleScrollToSection(e, link.targetId, link.name)}
                  className={`block text-lg font-medium transition-colors ${
                    activeSection === link.name ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}