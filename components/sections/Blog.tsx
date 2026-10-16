"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";

// Mock data for recent blog posts
const recentPosts = [
  {
    id: "network-packet-inspection",
    title: "Understanding Deep Network Packet Inspection",
    excerpt: "A comprehensive guide to using Wireshark for detecting plain-text HTTP anomalies and securing your network infrastructure.",
    category: "Cybersecurity",
    date: "July 12, 2026",
    readingTime: "8 min read",
    image: "/assets/blog-wireshark.jpg", // Placeholder path
    slug: "/blog/network-packet-inspection"
  },
  {
    id: "scalable-apis-nextjs",
    title: "Building Scalable APIs with Next.js 15 & Prisma",
    excerpt: "Explore the architectural decisions behind high-performance backend systems using the latest Next.js App Router features.",
    category: "Programming",
    date: "June 28, 2026",
    readingTime: "12 min read",
    image: "/assets/blog-nextjs.jpg", // Placeholder path
    slug: "/blog/scalable-apis-nextjs"
  },
  {
    id: "iot-hardware-automation",
    title: "The Future of Hardware Automation in Smart Systems",
    excerpt: "How integrating ESP32 microcontrollers with modern web frameworks is revolutionizing IoT tracking applications.",
    category: "Technology",
    date: "June 15, 2026",
    readingTime: "6 min read",
    image: "/assets/blog-iot.jpg", // Placeholder path
    slug: "/blog/iot-hardware-automation"
  }
];

export function Blog() {
  return (
    <section id="blog" className="relative py-32 bg-background overflow-hidden border-b border-border/40">
      
      {/* Premium Background Elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Latest Thoughts
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Articles.</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/blog"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-sm font-bold text-foreground hover:border-secondary/50 hover:text-secondary transition-all shadow-sm"
            >
              View All Publications
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col rounded-2xl bg-card/40 backdrop-blur-sm border border-border overflow-hidden hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

              {/* Image Container */}
              <div className="relative h-56 w-full bg-muted/30 overflow-hidden border-b border-border z-10">
                <div className="absolute inset-0 bg-secondary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-4 py-1.5 bg-background/90 backdrop-blur-md border border-border rounded-full text-xs font-bold text-secondary shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow relative z-10">
                <Link href={post.slug} className="absolute inset-0 z-20">
                  <span className="sr-only">Read {post.title}</span>
                </Link>

                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-sm text-muted leading-relaxed mb-8 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  {/* Meta Details */}
                  <div className="flex items-center gap-4 text-xs font-medium text-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {post.readingTime}
                    </span>
                  </div>

                  {/* Animated Read Arrow */}
                  <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}