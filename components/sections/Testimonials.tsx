"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Users, CheckCircle2, ThumbsUp } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  review: string;
  rating: number;
  image_url: string | null;
}

// Fallback data in case the database is empty
const fallbackTestimonials: TestimonialItem[] = [
  {
    id: "fallback-1",
    name: "Jonathan Gonqueh",
    company: "Client - Impact Tech Solutions",
    review: "Matthias is a talented and dedicated developer. His problem-solving skills and professionalism make him a great asset to any team.",
    rating: 5,
    image_url: null,
  },
  {
    id: "fallback-2",
    name: "Mercy Suah",
    company: "Director - OJO Tours & Safaris",
    review: "The optimization work done on our digital platforms drastically improved our visibility. Matthias has a unique blend of technical skill and business acumen.",
    rating: 5,
    image_url: null,
  }
];

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0 && !error) {
        setTestimonials(data as TestimonialItem[]);
      } else {
        setTestimonials(fallbackTestimonials);
      }
    };
    fetchTestimonials();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-gray-50/50 overflow-hidden border-b border-gray-100">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <span className="text-primary/80">➔</span>
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            What People Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Review Slider */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="xl:col-span-7 flex items-center gap-4 sm:gap-6"
          >
            {/* Prev Button */}
            <button 
              onClick={handlePrev}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-primary hover:border-primary/30 hover:shadow-md transition-all shrink-0"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Carousel Content */}
            <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden min-h-[280px] flex flex-col justify-center">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-blue-50 -z-0 transform -scale-x-100" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center"
                >
                  {/* Client Avatar */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm">
                      {testimonials[currentIndex].image_url ? (
                        <Image
                          src={testimonials[currentIndex].image_url}
                          alt={testimonials[currentIndex].name}
                          fill
                          className="object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <span className="text-xl font-bold text-primary">
                          {testimonials[currentIndex].name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Review Text & Info */}
                  <div className="flex-1">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 font-medium italic">
                      "{testimonials[currentIndex].review}"
                    </p>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-xs font-semibold text-gray-500 mt-0.5">
                        {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button 
              onClick={handleNext}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-primary hover:border-primary/30 hover:shadow-md transition-all shrink-0"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Right Column: Stats Grid matching design */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="xl:col-span-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md hover:border-blue-100 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Happy Clients</p>
                  <p className="text-3xl font-black text-gray-900">10+</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md hover:border-blue-100 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Projects Delivered</p>
                  <p className="text-3xl font-black text-gray-900">10+</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md hover:border-blue-100 transition-all sm:col-span-2 xl:col-span-1">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <ThumbsUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Positive Feedback</p>
                  <p className="text-3xl font-black text-gray-900">100%</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Mobile Navigation Controls & Dots */}
        <div className="flex items-center justify-center gap-6 mt-8 xl:justify-start xl:ml-[15%]">
          <button onClick={handlePrev} className="sm:hidden p-2 text-gray-400 hover:text-primary transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  currentIndex === idx ? "w-6 bg-primary" : "w-2 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button onClick={handleNext} className="sm:hidden p-2 text-gray-400 hover:text-primary transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}