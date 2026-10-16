"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus, GraduationCap, Loader2, Trash2, X, Save, Sparkles } from "lucide-react";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  date_range: string;
  description: string;
}

export default function AdminEducation() {
  const supabase = createClient();
  const [educationList, setEducationList] = useState<EducationItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    degree: "", institution: "", date_range: "", description: ""
  });

  useEffect(() => { fetchEducation(); }, []);

  const fetchEducation = async () => {
    const { data } = await supabase.from("education").select("*").order("created_at", { ascending: false });
    if (data) setEducationList(data as EducationItem[]);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this academic entry?")) return;
    await supabase.from("education").delete().eq("id", id);
    setEducationList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("education").insert([{
      degree: formData.degree, 
      institution: formData.institution, 
      date_range: formData.date_range, 
      description: formData.description
    }]);

    setIsSubmitting(false);
    if (!error) {
      setShowForm(false);
      setFormData({ degree: "", institution: "", date_range: "", description: "" });
      fetchEducation();
    } else { 
      alert("Error: " + error.message); 
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Academic Timeline
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Education Management</h2>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Close Form" : "New Entry"}
        </button>
      </div>

      {showForm && (
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-border shadow-2xl">
          <h3 className="text-lg font-bold mb-6">Create Academic Entry</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Degree / Certificate Title</label>
              <input required type="text" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g., Bachelor's in Computer Science" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Institution / University</label>
              <input required type="text" value={formData.institution} onChange={(e) => setFormData({...formData, institution: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g., Kigali Independent University" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted uppercase">Date Range</label>
              <input required type="text" value={formData.date_range} onChange={(e) => setFormData({...formData, date_range: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g., Sep 2022 - Dec 2026" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted uppercase">Description</label>
              <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-primary resize-none" placeholder="Describe your studies or key coursework..." />
            </div>
            
            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-border/50">
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-border hover:bg-card transition-colors">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Entry
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card/40 border border-border/60 rounded-3xl overflow-hidden backdrop-blur-xl shadow-xl">
        {educationList.length === 0 ? (
          <div className="p-16 text-center text-muted flex flex-col items-center">
            <GraduationCap className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-semibold text-foreground">No academic records found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/40 bg-muted/10 text-[11px] font-bold text-muted uppercase">
                  <th className="px-6 py-3.5">Degree & Institution</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 text-sm">
                {educationList.map((edu) => (
                  <tr key={edu.id} className="hover:bg-muted/5">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{edu.degree}</div>
                      <div className="text-xs text-primary">{edu.institution}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium">{edu.date_range}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(edu.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}