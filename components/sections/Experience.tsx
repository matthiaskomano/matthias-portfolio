"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  date_range: string;
  description: string;
  technologies: string[];
}

export function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live experience data from Supabase on component mount
  useEffect(() => {
    const fetchExperiences = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && !error) {
        setExperiences(data as ExperienceItem[]);
      }
      setIsLoading(false);
    };

    fetchExperiences();
  }, []);

  return (
    // ADDED w-full HERE to force the dark background to stretch across the entire screen
    <section id="experience" className="relative w-full py-24 sm:py-32 bg-[#030712] overflow-hidden border-b border-white/5">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <span className="text-primary/80">➔</span>
            My Experience
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Where I've Worked & What I've Done
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Left Column: Timeline */}
          <div className="lg:col-span-7 relative">
            {/* Continuous Vertical Line */}
            <div className="absolute left-[19px] top-4 bottom-0 w-px bg-white/10" />

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-gray-400 text-sm">Loading experience timeline...</p>
              </div>
            ) : experiences.length === 0 ? (
              <div className="pl-14 sm:pl-16 text-gray-500 text-sm">
                No experience records found. Add them via the admin dashboard.
              </div>
            ) : (
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-14 sm:pl-16 group"
                  >
                    {/* Timeline Icon Node */}
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#0A0E1A] border border-white/20 flex items-center justify-center z-10 group-hover:border-primary group-hover:bg-primary/10 transition-colors duration-300">
                      <Briefcase className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>

                    {/* Content Header (Role, Date, Company) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white leading-tight">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-gray-400 mt-1">
                          {exp.company}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap h-fit w-fit">
                        {exp.date_range}
                      </div>
                    </div>

                    {/* Smart Bullet Points Description */}
                    {exp.description && (
                      <ul className="space-y-2.5 mb-5">
                        {exp.description.split('\n').filter(bullet => bullet.trim() !== '').map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0 mt-2" />
                            <span>{bullet.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies Pills */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-400 whitespace-nowrap"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Sticky Laptop Image & Floating Stats */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-32"
            >
              {/* Image Wrapper */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900">
                <Image
                  src="/assets/experience-laptop.jpg" // Add a dark-themed laptop image to your assets
                  alt="Workspace"
                  fill
                  className="object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                {/* Dark overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-[#030712]/20 to-transparent" />
                
                {/* Floating Stats overlapping the bottom right matching the design */}
                <div className="absolute bottom-0 right-0 w-full sm:w-auto p-4 flex gap-2">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex-1 sm:w-36 text-center shadow-xl">
                    <p className="text-2xl font-black text-white mb-1">31+</p>
                    <p className="text-[10px] font-semibold text-gray-300 uppercase tracking-wide">Total weekly hours</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex-1 sm:w-36 text-center shadow-xl">
                    <p className="text-2xl font-black text-white mb-1">$20/hr</p>
                    <p className="text-[10px] font-semibold text-gray-300 uppercase tracking-wide">Testing rate</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}