"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, ExternalLink, Calendar, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  date_range: string;
  description: string;
}

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image_url: string | null;
  link: string | null;
}

export function Education() {
  const [educationList, setEducationList] = useState<EducationItem[]>([]);
  const [certificatesList, setCertificatesList] = useState<CertificateItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live data from Supabase on component mount
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      // Fetch Education
      const { data: eduData } = await supabase
        .from("education")
        .select("*")
        .order("created_at", { ascending: false });

      if (eduData) setEducationList(eduData as EducationItem[]);

      // Fetch Certificates
      const { data: certData } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false });

      if (certData) setCertificatesList(certData as CertificateItem[]);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section id="certificates" className="relative py-24 sm:py-32 bg-white overflow-hidden border-b border-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          
          {/* Left Column: Education Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <span className="text-primary/80">➔</span>
                Education
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                My Academic Journey
              </h2>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative">
              <div className="absolute left-8 top-8 bottom-8 w-px bg-gray-100" />

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : educationList.length === 0 ? (
                <p className="text-sm text-gray-500 relative pl-6">No academic records found.</p>
              ) : (
                <div className="space-y-8 relative pl-6">
                  {educationList.map((edu) => (
                    <div key={edu.id} className="relative">
                      <div className="absolute -left-[33px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-white" />
                      <div className="flex items-center gap-2 text-xs font-bold text-primary mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {edu.date_range}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h3>
                      <h4 className="text-sm font-semibold text-gray-500 mb-3">{edu.institution}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{edu.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Certifications Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <span className="text-primary/80">➔</span>
                Certifications
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                Professional Certificates
              </h2>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : certificatesList.length === 0 ? (
              <div className="p-8 border border-dashed border-gray-200 rounded-2xl text-center text-gray-500 text-sm">
                No certificates found. Add one from the admin dashboard.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificatesList.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 flex items-center gap-4 group"
                  >
                    {/* Dynamic Image from Supabase */}
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform overflow-hidden p-2">
                      {cert.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cert.image_url} alt={cert.issuer} className="w-full h-full object-contain" />
                      ) : (
                        <Award className="w-6 h-6 text-primary" />
                      )}
                    </div>

                    <div className="flex flex-col flex-grow min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>

                    {cert.link && (
                      <a 
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-50 transition-colors shrink-0"
                        title="Verify Credential"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}