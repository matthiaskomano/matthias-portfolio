"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, Server, Smartphone, Shield, Database, Terminal } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Layout,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    skills: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Shadcn UI", slug: "shadcnui" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-100",
    skills: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express", slug: "express" },
      { name: "Python", slug: "python" },
      { name: "Laravel", slug: "laravel" },
      { name: "PHP", slug: "php" },
    ],
  },
  {
    title: "Database & Cloud",
    icon: Database,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-100",
    skills: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MySQL", slug: "mysql" },
      { name: "Supabase", slug: "supabase" },
      { name: "Firebase", slug: "firebase" },
      { name: "AWS", slug: "amazonwebservices" },
    ],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
    skills: [
      { name: "React Native", slug: "react" }, // React Native uses the React logo
      { name: "Expo", slug: "expo" },
      { name: "Flutter", slug: "flutter" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Terminal,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    skills: [
      { name: "Docker", slug: "docker" },
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "VS Code", slug: "visualstudiocode" },
      { name: "Linux", slug: "linux" },
    ],
  },
  {
    title: "Cybersecurity & Net",
    icon: Shield,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-100",
    skills: [
      { name: "Kali Linux", slug: "kalilinux" },
      { name: "Wireshark", slug: "wireshark" },
      { name: "MikroTik", slug: "mikrotik" },
      { name: "Windows Server", slug: "windows" },
      { name: "Cisco", slug: "cisco" },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-gray-50 overflow-hidden border-b border-gray-100">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <span className="text-primary/80">➔</span>
            My Skills
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            Technologies I Work With
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            I have hands-on experience with a wide range of modern technologies and tools used in web, mobile, cloud, networking, and cybersecurity.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, idx) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-gray-200 transition-all duration-300 group"
              >
                {/* Card Header */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-50">
                  <div className={`p-3.5 rounded-xl ${category.bgColor} border ${category.borderColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <CategoryIcon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>

                {/* Skills Grid inside Card */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  {category.skills.map((skill) => {
                    return (
                      <div 
                        key={skill.name} 
                        className="flex items-center gap-3 p-1.5 -ml-1.5 rounded-lg hover:bg-gray-50 transition-colors group/skill"
                      >
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={`https://cdn.simpleicons.org/${skill.slug}`} 
                            alt={skill.name}
                            className="w-full h-full object-contain filter drop-shadow-sm group-hover/skill:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-600 group-hover/skill:text-gray-900 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}