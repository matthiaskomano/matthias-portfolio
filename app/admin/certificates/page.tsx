"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus, Award, Loader2, Trash2, X, Save, Sparkles, Image as ImageIcon } from "lucide-react";

interface CertificateItem {
  id: string; title: string; issuer: string; date: string; image_url: string | null; link: string | null;
}

export default function AdminCertificates() {
  const supabase = createClient();
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "", issuer: "", date: "", link: ""
  });

  useEffect(() => { fetchCertificates(); }, []);

  const fetchCertificates = async () => {
    const { data } = await supabase.from("certificates").select("*").order("created_at", { ascending: false });
    if (data) setCertificates(data as CertificateItem[]);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this certificate?")) return;
    await supabase.from("certificates").delete().eq("id", id);
    setCertificates((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let finalImageUrl = null;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `certs/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('portfolio-images').upload(fileName, imageFile);
      if (uploadError) {
        alert("Upload failed: " + uploadError.message);
        setIsSubmitting(false); return;
      }
      const { data: { publicUrl } } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
      finalImageUrl = publicUrl;
    }

    const { error } = await supabase.from("certificates").insert([{
      title: formData.title, issuer: formData.issuer, date: formData.date, 
      link: formData.link || null, image_url: finalImageUrl
    }]);

    setIsSubmitting(false);
    if (!error) {
      setShowForm(false); setImageFile(null);
      setFormData({ title: "", issuer: "", date: "", link: "" });
      fetchCertificates();
    } else { alert("Error: " + error.message); }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Professional Achievements
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Certificates Management</h2>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Close Form" : "New Certificate"}
        </button>
      </div>

      {showForm && (
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-border shadow-2xl">
          <h3 className="text-lg font-bold mb-6">Add New Certificate</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Certificate Title</label>
              <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g., Google Cybersecurity" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Issuing Organization</label>
              <input required type="text" value={formData.issuer} onChange={(e) => setFormData({...formData, issuer: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g., Google" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Date / Year</label>
              <input required type="text" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g., 2026" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Verification Link (Optional)</label>
              <input type="text" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="https://..." />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted uppercase">Certificate Logo / Badge</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-border/50">
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-border hover:bg-card">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold disabled:opacity-50">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Certificate
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card/40 border border-border/60 rounded-3xl overflow-hidden backdrop-blur-xl shadow-xl">
        {certificates.length === 0 ? (
          <div className="p-16 text-center text-muted flex flex-col items-center">
            <Award className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-semibold">No certificates found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/40 bg-muted/10 text-[11px] font-bold text-muted uppercase">
                  <th className="px-6 py-3.5">Title & Issuer</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Logo</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 text-sm">
                {certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-muted/5">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{cert.title}</div>
                      <div className="text-xs text-muted">{cert.issuer}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium">{cert.date}</td>
                    <td className="px-6 py-4">
                      {cert.image_url ? <img src={cert.image_url} alt="Logo" className="w-8 h-8 object-contain" /> : <span className="text-xs text-muted">No Image</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(cert.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
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