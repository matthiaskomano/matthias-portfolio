"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Layers, Loader2, Code, ExternalLink } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// The categories for the filter system
const categories = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "Cybersecurity",
  "Networking",
  "Data Analysis",
  "Certificate"
];

// Define the TypeScript interface based on our database schema
interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  status: string;
  date_completed: string | null;
}

export function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch live projects from Supabase on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && !error) {
        setProjects(data as ProjectItem[]);
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-white overflow-hidden border-b border-gray-100">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header Section matching the reference design exactly */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              <span className="text-primary/80">➔</span>
              Featured Projects
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Projects That Make an Impact
            </h2>
            
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Here are some of the projects I've worked on, from web platforms to mobile apps and real-world client solutions.
            </p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="https://github.com/matthias"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-primary hover:text-blue-700 transition-colors"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
          
        {/* Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mb-12 pb-4 overflow-x-auto no-scrollbar"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                activeCategory === category
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary/30 hover:text-primary hover:bg-blue-50/50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-gray-500 font-medium">Fetching live portfolio data...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24 text-gray-400 border border-dashed border-gray-200 rounded-3xl bg-gray-50">
            <Layers className="w-12 h-12 mx-auto mb-4 opacity-30 text-gray-500" />
            <p className="font-semibold text-gray-700">No projects found in this category.</p>
            <p className="text-sm mt-1">Check back later or adjust your filters.</p>
          </div>
        ) : (
          /* Project Grid */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  className="group flex flex-col rounded-2xl bg-white border border-gray-100 overflow-hidden hover:border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image Banner */}
                  <div className="relative h-48 sm:h-56 w-full bg-gray-50 overflow-hidden border-b border-gray-100">
                    <Image
                      src={project.image_url || "/assets/placeholder.jpg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Status Badge overlay */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase backdrop-blur-md shadow-sm border ${
                        project.status === "Completed" 
                          ? "bg-emerald-500/90 text-white border-emerald-400" 
                          : "bg-white/90 text-primary border-white"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies Pills */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-md bg-blue-50/50 border border-blue-100 text-[10px] font-semibold text-gray-600 whitespace-nowrap">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-semibold text-gray-500">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="flex items-center gap-4 pt-4 mt-auto border-t border-gray-50">
                      
                      {project.live_url && (
                        <a 
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-1.5 text-sm font-bold text-primary hover:text-blue-700 transition-colors"
                        >
                          View Project
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      )}

                      {project.github_url && (
                        <a 
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors ml-auto"
                        >
                          <Code className="w-4 h-4" />
                          <span className="sr-only sm:not-sr-only">Code</span>
                        </a>
                      )}

                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}