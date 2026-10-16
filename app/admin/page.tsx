"use client";

import React from "react";
import Link from "next/link";
import { Layers, Briefcase, Mail, ArrowRight } from "lucide-react";

export default function AdminHome() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Welcome Back, Matthias</h2>
        <p className="text-sm text-muted mt-2">Select a module below to manage your live portfolio content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/projects" className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-lg">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <Layers className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold mb-2">Projects</h3>
          <p className="text-xs text-muted mb-4">Upload and manage your portfolio showcases.</p>
          <div className="flex items-center gap-2 text-xs font-bold text-primary">
            Manage <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link href="/admin/experience" className="group p-6 rounded-2xl bg-card border border-border hover:border-secondary/50 transition-all shadow-sm hover:shadow-lg">
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
            <Briefcase className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-lg font-bold mb-2">Experience</h3>
          <p className="text-xs text-muted mb-4">Update your timeline of roles and education.</p>
          <div className="flex items-center gap-2 text-xs font-bold text-secondary">
            Manage <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link href="/admin/inbox" className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all shadow-sm hover:shadow-lg">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-lg font-bold mb-2">Inbox Messages</h3>
          <p className="text-xs text-muted mb-4">Read inquiries from your public contact form.</p>
          <div className="flex items-center gap-2 text-xs font-bold text-accent">
            View <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}