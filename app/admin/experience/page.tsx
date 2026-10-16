"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus, Briefcase, Loader2, Trash2, X, Save, Sparkles } from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  date_range: string;
  description: string;
  technologies: string[];
}

export default function AdminExperience() {
  const supabase = createClient();
  const [experienceList, setExperienceList] = useState<ExperienceItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    role: "", company: "", date_range: "", description: "", technologies: "",
  });

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    const { data } = await supabase.from("experience").select("*").order("created_at", { ascending: false });
    if (data) setExperienceList(data as ExperienceItem[]);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this experience entry?")) return;
    await supabase.from("experience").delete().eq("id", id);
    setExperienceList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const techArray = formData.technologies.split(",").map((t) => t.trim()).filter(Boolean);

    const { error } = await supabase.from("experience").insert([{
      role: formData.role, company: formData.company, date_range: formData.date_range, 
      description: formData.description, technologies: techArray
    }]);

    setIsSubmitting(false);
    if (!error) {
      setShowForm(false);
      setFormData({ role: "", company: "", date_range: "", description: "", technologies: "" });
      fetchExperience();
    } else {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Timeline Management
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Experience & Education</h2>
          <p className="text-sm text-muted mt-1">Add roles, internships, or degrees to your portfolio timeline.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Close Form" : "New Entry"}
        </button>
      </div>

      {showForm && (
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-border shadow-2xl">
          <h3 className="text-lg font-bold mb-6">Create New Timeline Entry</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Role / Degree Title</label>
              <input required type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none" placeholder="e.g., Software Developer Intern" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Company / Institution</label>
              <input required type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none" placeholder="e.g., Liberia National Police" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted uppercase">Date Range</label>
              <input required type="text" value={formData.date_range} onChange={(e) => setFormData({...formData, date_range: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none" placeholder="e.g., Feb 2026 - Present" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted uppercase">Description</label>
              <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-border rounded-xl p-4 text-sm focus:border-primary outline-none resize-none" placeholder="Describe your responsibilities..." />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted uppercase">Core Technologies Used</label>
              <input required type="text" value={formData.technologies} onChange={(e) => setFormData({...formData, technologies: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none" placeholder="PHP, MySQL, Next.js" />
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
        {experienceList.length === 0 ? (
          <div className="p-16 text-center text-muted flex flex-col items-center">
            <Briefcase className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-semibold text-foreground">No experience records found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/40 bg-muted/10 text-[11px] font-bold text-muted uppercase">
                  <th className="px-6 py-3.5">Role & Company</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 text-sm">
                {experienceList.map((exp) => (
                  <tr key={exp.id} className="hover:bg-muted/5">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{exp.role}</div>
                      <div className="text-xs text-primary">{exp.company}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium">{exp.date_range}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(exp.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
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