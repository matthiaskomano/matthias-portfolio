"use client";

import React from "react";
import { ArrowUp, Briefcase, Code, MessageCircle, Video, Mail } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030712] border-t border-white/5 pt-12 pb-8 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          
          {/* Brand/Logo Area */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
              <span className="text-primary font-black text-2xl tracking-tighter">MK</span>
              <span className="text-white font-semibold text-sm">Matthias Komano</span>
            </div>
            <p className="text-[10px] text-gray-500 font-bold tracking-wide uppercase mt-1">
              Full Stack Developer | Cybersecurity Enthusiast | Network Engineer | Data Analyst
            </p>
          </div>

          {/* Social Icons (Using safe generic icons to prevent build errors) */}
          <div className="flex items-center gap-2">
            {[
              { icon: Briefcase, href: "https://linkedin.com/in/matthias", label: "LinkedIn" },
              { icon: Code, href: "https://github.com/matthias", label: "GitHub" },
              { icon: MessageCircle, href: "https://twitter.com/matthias", label: "Twitter" },
              { icon: Video, href: "https://youtube.com/c/matthias", label: "YouTube" },
              { icon: Mail, href: "mailto:contact@matthias.com", label: "Email" }
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-[11px] text-gray-600 font-medium text-center md:text-left">
            &copy; {currentYear} Matthias Komano. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-white transition-colors group uppercase tracking-wider"
          >
            Back to Top
            <ArrowUp className="w-3 h-3 p-0.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors" />
          </button>
        </div>

      </div>
    </footer>
  );
}