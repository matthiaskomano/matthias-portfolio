"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, CheckCircle, AlertCircle, Phone, ArrowRight, Loader2, Laptop } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const supabase = createClient();
    const { error } = await supabase.from("messages").insert([payload]);

    setIsSubmitting(false);

    if (error) {
      setSubmitStatus("error");
      setErrorMessage(error.message);
    } else {
      setSubmitStatus("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#030712] overflow-hidden border-t border-white/5">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column: Text & Info (4 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-wider mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4 leading-[1.15]">
                Let's Build Something Great Together
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-10">
                Have a project in mind, a collaboration opportunity, or just want to say hello? I'd love to hear from you.
              </p>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a href="mailto:komanomatthias9@gmail.com" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                  komanomatthias9@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-300">+250 788 123 456</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-300">Kigali, Rwanda</p>
              </div>
            </div>
          </motion.div>

          {/* Middle Column: Contact Form (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  disabled={isSubmitting}
                  className="w-full px-5 py-3.5 bg-[#0A0E1A]/80 border border-white/10 rounded-xl focus:border-primary/50 outline-none transition-all disabled:opacity-50 text-white text-sm placeholder:text-gray-500 shadow-inner"
                  placeholder="Your Name"
                />
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isSubmitting}
                  className="w-full px-5 py-3.5 bg-[#0A0E1A]/80 border border-white/10 rounded-xl focus:border-primary/50 outline-none transition-all disabled:opacity-50 text-white text-sm placeholder:text-gray-500 shadow-inner"
                  placeholder="Your Email"
                />
              </div>

              <input
                type="text"
                name="subject"
                required
                disabled={isSubmitting}
                className="w-full px-5 py-3.5 bg-[#0A0E1A]/80 border border-white/10 rounded-xl focus:border-primary/50 outline-none transition-all disabled:opacity-50 text-white text-sm placeholder:text-gray-500 shadow-inner"
                placeholder="Subject"
              />

              <textarea
                name="message"
                required
                rows={5}
                disabled={isSubmitting}
                className="w-full px-5 py-4 bg-[#0A0E1A]/80 border border-white/10 rounded-xl focus:border-primary/50 outline-none transition-all resize-none disabled:opacity-50 text-white text-sm placeholder:text-gray-500 shadow-inner flex-grow"
                placeholder="Message"
              />

              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                    <CheckCircle className="w-4 h-4" /><span className="text-xs font-semibold">Message sent! I'll be in touch soon.</span>
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <AlertCircle className="w-4 h-4" /><span className="text-xs font-semibold">{errorMessage || "Failed to send."}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-sm font-bold transition-all disabled:opacity-70 shadow-[0_4px_15px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.4)]"
              >
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><ArrowRight className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </motion.div>

          {/* Right Column: Floating Blue Banner (3 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 flex"
          >
            <div className="w-full bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden shadow-[0_10px_40px_rgba(37,99,235,0.3)]">
              {/* Graphic element inside banner */}
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-black/10 rounded-full blur-xl" />
              
              <Laptop className="w-12 h-12 text-white/90 mb-6 relative z-10" strokeWidth={1.5} />
              <h3 className="text-2xl font-black text-white mb-4 relative z-10 leading-tight">
                Let's turn your idea into reality.
              </h3>
              <p className="text-blue-100 text-xs leading-relaxed font-medium relative z-10">
                I'm available for new projects, freelance work, and full-time opportunities.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}