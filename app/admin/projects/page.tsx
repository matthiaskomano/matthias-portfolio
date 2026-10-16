"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
  Plus, Layers, Loader2, Trash2, X, Save, Sparkles, 
  CheckCircle2, Clock, Image as ImageIcon, Edit, ExternalLink, Code 
} from "lucide-react";

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

export default function AdminProjects() {
  const supabase = createClient();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "", category: "Full Stack", description: "", technologies: "",
    github_url: "", live_url: "", status: "Completed", date_completed: "2026",
    image_url: "", // Used to hold existing image URL during edits
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (data) setProjects(data as ProjectItem[]);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project? This cannot be undone.")) return;
    await supabase.from("projects").delete().eq("id", id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (project: ProjectItem) => {
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      technologies: project.technologies.join(", "),
      github_url: project.github_url || "",
      live_url: project.live_url || "",
      status: project.status,
      date_completed: project.date_completed || "",
      image_url: project.image_url || "",
    });
    setEditingId(project.id);
    setImageFile(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setImageFile(null);
    setFormData({
      title: "", category: "Full Stack", description: "", technologies: "",
      github_url: "", live_url: "", status: "Completed", date_completed: "2026", image_url: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Default to the existing image URL if we are editing, or a placeholder if new
    let finalImageUrl = editingId ? formData.image_url : "/assets/placeholder.jpg";

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('portfolio-images').upload(filePath, imageFile);
      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        setIsSubmitting(false); return;
      }
      const { data: { publicUrl } } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);
      finalImageUrl = publicUrl;
    }

    const techArray = formData.technologies.split(",").map((t) => t.trim()).filter(Boolean);
    
    const projectPayload = {
      title: formData.title, 
      category: formData.category, 
      description: formData.description,
      technologies: techArray, 
      image_url: finalImageUrl, 
      github_url: formData.github_url || null,
      live_url: formData.live_url || null, 
      status: formData.status, 
      date_completed: formData.date_completed,
    };

    let error;

    if (editingId) {
      // Update existing record
      const { error: updateError } = await supabase.from("projects").update(projectPayload).eq("id", editingId);
      error = updateError;
    } else {
      // Insert new record
      const { error: insertError } = await supabase.from("projects").insert([projectPayload]);
      error = insertError;
    }

    setIsSubmitting(false);
    
    if (!error) {
      handleCancel();
      fetchProjects();
    } else { 
      alert("Error saving: " + error.message); 
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Live Synchronization
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Project Management</h2>
          <p className="text-sm text-muted mt-1">Publish, edit, or remove projects directly from your portfolio.</p>
        </div>
        <button 
          onClick={() => showForm ? handleCancel() : setShowForm(true)} 
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Close Form" : "New Project"}
        </button>
      </div>

      {showForm && (
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-border shadow-2xl">
          <h3 className="text-lg font-bold mb-6">
            {editingId ? "Edit Project" : "Create New Project"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Project Title</label>
              <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="e.g., PhishGuard AI" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors">
                <option>Full Stack</option><option>Frontend</option><option>Backend</option>
                <option>Cybersecurity</option><option>Networking</option><option>Data Analysis</option><option>Certificate</option>
              </select>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted uppercase">Short Description</label>
              <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Detail the technical implementation..." />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted uppercase">Technologies (Comma Separated)</label>
              <input required type="text" value={formData.technologies} onChange={(e) => setFormData({...formData, technologies: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Next.js, TypeScript, Tailwind CSS" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Project Image Upload</label>
              <div className="relative">
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors" />
                {editingId && formData.image_url && !imageFile && (
                  <p className="text-[10px] text-muted mt-1 ml-1">Leave empty to keep existing image.</p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Status & Year</label>
              <div className="grid grid-cols-2 gap-3">
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                  <option>Completed</option><option>Active</option><option>In Progress</option>
                </select>
                <input type="text" value={formData.date_completed || ""} onChange={(e) => setFormData({...formData, date_completed: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="2026" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Live Demo URL (Optional)</label>
              <input type="url" value={formData.live_url} onChange={(e) => setFormData({...formData, live_url: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="https://..." />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">Source Code / Repo Link (Optional)</label>
              <input type="url" value={formData.github_url} onChange={(e) => setFormData({...formData, github_url: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="https://github.com/..." />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-border/50">
              <button type="button" onClick={handleCancel} className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-border hover:bg-card transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
                {editingId ? "Save Changes" : "Publish Item"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card/40 border border-border/60 rounded-3xl overflow-hidden backdrop-blur-xl shadow-xl">
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">Current Records</span>
          <span className="text-xs text-primary font-mono">{projects.length} Entries</span>
        </div>
        {projects.length === 0 ? (
          <div className="p-16 text-center text-muted flex flex-col items-center">
            <Layers className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-semibold text-foreground">No records currently found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/40 bg-muted/10 text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="px-6 py-3.5">Title & Info</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Links</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 text-sm">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{project.title}</div>
                      <div className="text-xs text-muted line-clamp-1 max-w-sm mt-0.5">{project.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-foreground bg-background border border-border px-2.5 py-1 rounded-md">{project.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${project.status === "Completed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                        {project.status === "Completed" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />} {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-background border border-border text-muted hover:text-primary transition-colors" title="View Live Demo">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-background border border-border text-muted hover:text-foreground transition-colors" title="View Source Code">
                            <Code className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.image_url && project.image_url !== "/assets/placeholder.jpg" && (
                          <a href={project.image_url} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-background border border-border text-muted hover:text-secondary transition-colors" title="View Image">
                            <ImageIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button onClick={() => handleEdit(project)} className="p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit Project">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="p-2 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete Project">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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