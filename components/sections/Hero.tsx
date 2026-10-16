"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Briefcase, Code, MessageCircle, Video, Monitor, Shield, Cloud, HardDrive, LineChart } from "lucide-react";

const techBadges = [
  { name: "Full Stack Dev", icon: Monitor },
  { name: "Cybersecurity", icon: Shield },
  { name: "Cloud", icon: Cloud },
  { name: "IT Support", icon: HardDrive },
  { name: "Data Analysis", icon: LineChart },
];

export function Hero() {
  return (
    <section id="home" className="relative w-full min-h-[90vh] flex items-center justify-center pt-20 pb-10 overflow-hidden bg-[#0A0E1A]">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-primary/15 rounded-full blur-[120px] md:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/10 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Text Content (Takes up 7 columns on desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col space-y-5 lg:col-span-7 mt-4 lg:mt-0"
          >
            {/* Status Pill */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black w-fit shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold tracking-wide">Full Stack Developer</span>
            </motion.div>

            {/* Main Typography */}
            <div className="space-y-1">
              <h1 className="text-[2.5rem] sm:text-5xl lg:text-[64px] font-black tracking-tight text-[#F3F4F6] leading-[1.1]">
                Hi, I'm <br />
                Matthias <span className="text-primary drop-shadow-[0_0_25px_rgba(37,99,235,0.6)]">Komano</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg">
              I build modern web and mobile applications, solve real-world problems, and create digital solutions that make an impact.
            </p>

            {/* Floating Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {techBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div 
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (index * 0.05) }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-semibold text-gray-300 hover:text-white hover:border-primary/50 transition-all cursor-default backdrop-blur-md"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {badge.name}
                  </motion.div>
                );
              })}
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a 
                href="#projects"
                className="group flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] w-full sm:w-auto"
              >
                View My Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact"
                className="group flex items-center justify-center px-6 sm:px-5 py-3 sm:py-3.5 rounded-lg border border-white/20 hover:bg-white/10 text-white transition-all backdrop-blur-sm w-full sm:w-auto"
                aria-label="Contact Me"
              >
                <span className="sm:hidden font-bold text-sm mr-2">Contact Me</span>
                <Mail className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Social Links Row */}
            <div className="pt-6 w-fit hidden sm:block">
              <p className="text-[10px] font-bold text-gray-500 mb-2.5 uppercase tracking-wider">Follow me on</p>
              <div className="flex items-center gap-2.5">
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
                      title={social.label}
                      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all shadow-sm"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Portrait Frame (Takes up 5 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative lg:col-span-5 flex items-center justify-center lg:justify-end mt-10 lg:mt-0"
          >
            {/* Highly optimized, scaled-down portrait wrapper */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-primary/10 to-[#0A0E1A] border border-white/10 shadow-[0_0_40px_rgba(37,99,235,0.15)] group z-10">
              
              <Image
                src="/assets/profile.jpg"
                alt="Matthias Komano"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                priority
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />

              {/* Seamless gradient fade at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0A0E1A] to-transparent z-10" />
            </div>

            {/* Handwritten text - Hidden on mobile, smaller on laptop */}
            <div className="hidden xl:block absolute top-1/4 -left-10 transform rotate-3 z-0 pointer-events-none opacity-80">
              <p className="font-mono text-sm lg:text-base text-primary italic">"Technology</p>
              <p className="font-mono text-sm lg:text-base text-primary italic ml-4">builds a better</p>
              <p className="font-mono text-sm lg:text-base text-primary italic ml-8">future"</p>
              <div className="w-16 h-px bg-primary/60 ml-8 mt-2 transform -rotate-2" />
            </div>

            {/* Floating Location Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 z-30"
            >
              <div className="bg-[#111827]/95 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 whitespace-nowrap">
                <div className="p-1.5 bg-primary/20 rounded-lg">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-[11px] leading-tight">Kigali, Rwanda</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <p className="text-[9px] text-gray-300">Open to remote & onsite work</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}