"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, CheckCircle2, Award, Quote } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-white overflow-hidden border-b border-gray-100">
      
      {/* Very Subtle Background Pattern for texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Text & Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <span className="text-primary/80">➔</span>
              About Me
            </div>

            {/* Main Headline matching the design exactly */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.15]">
              Turning Ideas into <br className="hidden sm:block" />
              Powerful Digital Solutions
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
              <p>
                I'm <span className="font-bold text-gray-900">Matthias Komano</span>, a passionate full-stack developer, network engineer, and cybersecurity enthusiast. I specialize in building scalable web and mobile applications, secure systems, and digital solutions that solve real-world problems. 
              </p>
              <p>
                I love learning new technologies and turning ideas into products that create value.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-xl mt-10 pt-10 border-t border-gray-200">
              
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-2xl sm:text-3xl font-black text-gray-900">2+</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">Years of Experience</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-2xl sm:text-3xl font-black text-gray-900">10+</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">Projects Completed</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-2xl sm:text-3xl font-black text-gray-900">5+</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">Certifications</span>
              </div>

            </div>

            {/* Outline CTA Button */}
            <div className="mt-10">
              <a 
                href="#experience"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary/20 text-primary font-bold hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm"
              >
                More About Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Image & Floating Quote */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-full min-h-[400px] lg:min-h-[500px] w-full mt-10 lg:mt-0"
          >
            {/* Main Laptop Image Wrapper */}
            <div className="absolute right-0 top-0 w-[90%] h-[90%] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
              <Image
                src="/assets/about-laptop.jpg"
                alt="Programming Workspace"
                fill
                className="object-cover"
                // Removed the onError fallback so you can see if the image is missing
              />
            </div>

            {/* Floating Quote Card matching design */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-4 left-0 sm:left-4 md:left-8 bg-white p-6 sm:p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] max-w-[280px] sm:max-w-[320px] border border-gray-100"
            >
              <Quote className="w-8 h-8 text-primary mb-4 opacity-50" />
              <p className="text-gray-900 font-bold text-sm sm:text-base leading-relaxed mb-4 italic">
                "Code is not just about computers, it's about solving real problems and improving lives."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-primary/30" />
                <span className="text-xs font-bold text-primary">Matthias Komano</span>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}