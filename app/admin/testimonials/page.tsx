"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus, MessageSquare, Loader2, Trash2, X, Save, Sparkles, Image as ImageIcon, Star } from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  review: string;
  rating: number;
  image_url: string | null;
}

export default function AdminTestimonials() {
  const supabase = createClient();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "", company: "", review: "", rating: 5
  });

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    if (data) setTestimonials(data as TestimonialItem[]);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let finalImageUrl = null;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `avatars/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage.from('portfolio-images').upload(fileName, imageFile);
      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        setIsSubmitting(false); return;
      }
      const { data: { publicUrl } } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
      finalImageUrl = publicUrl;
    }

    const { error } = await supabase.from("testimonials").insert([{
      name: formData.name, 
      company: formData.company, 
      review: formData.review, 
      rating: formData.rating,
      image_url: finalImageUrl
    }]);

    setIsSubmitting(false);
    if (!error) {
      setShowForm(false);
      setImageFile(null);
      setFormData({ name: "", company: "", review: "", rating: 5 });
      fetchTestimonials();
    } else { 
      alert("Error: " + error.message); 
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Client Feedback
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Testimonials Management</h2>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Close Form" : "New Review"}
        </button>
      </div>

      {showForm && (
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-border shadow-2xl">
          <h3 className="text-lg font-bold mb-6">Add Client Review</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Client Name</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g., Jonathan Gonqueh" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Company / Role</label>
              <input required type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g., Impact Tech Solutions Ltd" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted uppercase">Review Text</label>
              <textarea required rows={4} value={formData.review} onChange={(e) => setFormData({...formData, review: e.target.value})} className="w-full bg-background border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-primary resize-none" placeholder="What did the client say about your work?..." />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Rating (1-5)</label>
              <select value={formData.rating} onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary">
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Client Avatar (Optional)</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors" />
            </div>
            
            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-border/50">
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-border hover:bg-card transition-colors">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Review
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card/40 border border-border/60 rounded-3xl overflow-hidden backdrop-blur-xl shadow-xl">
        {testimonials.length === 0 ? (
          <div className="p-16 text-center text-muted flex flex-col items-center">
            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-semibold text-foreground">No testimonials found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/40 bg-muted/10 text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="px-6 py-3.5">Client</th>
                  <th className="px-6 py-3.5">Review</th>
                  <th className="px-6 py-3.5">Rating</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 text-sm">
                {testimonials.map((test) => (
                  <tr key={test.id} className="hover:bg-muted/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {test.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={test.image_url} alt={test.name} className="w-8 h-8 rounded-full object-cover border border-border" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {test.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-foreground">{test.name}</div>
                          <div className="text-xs text-muted">{test.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-muted line-clamp-2 max-w-sm">{test.review}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-0.5">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(test.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
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