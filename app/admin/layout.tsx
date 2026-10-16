"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Layers, Briefcase, Mail, LogOut, Loader2, GraduationCap, MessageSquare, Award } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip auth check if we are on the login page
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [pathname, router, supabase]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted">Securing workspace session...</p>
      </div>
    );
  }

  // Hide the sidebar if we are on the login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 hidden md:flex flex-col border-r border-border/40 bg-card/20 backdrop-blur-xl">
        <div className="h-16 flex items-center px-6 border-b border-border/40">
          <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Matthias.admin
          </span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link 
            href="/admin" 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === "/admin" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted hover:bg-muted/10 hover:text-foreground"}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link 
            href="/admin/projects" 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === "/admin/projects" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted hover:bg-muted/10 hover:text-foreground"}`}
          >
            <Layers className="w-4 h-4" /> Projects
          </Link>
          <Link 
            href="/admin/experience" 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === "/admin/experience" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted hover:bg-muted/10 hover:text-foreground"}`}
          >
            <Briefcase className="w-4 h-4" /> Experience
          </Link>
          <Link 
            href="/admin/education" 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === "/admin/education" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted hover:bg-muted/10 hover:text-foreground"}`}
          >
            <GraduationCap className="w-4 h-4" /> Education
          </Link>
          <Link 
            href="/admin/certificates" 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === "/admin/certificates" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted hover:bg-muted/10 hover:text-foreground"}`}
          >
            <Award className="w-4 h-4" /> Certificates
          </Link>
          <Link 
            href="/admin/testimonials" 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === "/admin/testimonials" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted hover:bg-muted/10 hover:text-foreground"}`}
          >
            <MessageSquare className="w-4 h-4" /> Testimonials
          </Link>
          <Link 
            href="/admin/inbox" 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === "/admin/inbox" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted hover:bg-muted/10 hover:text-foreground"}`}
          >
            <Mail className="w-4 h-4" /> Inbox
          </Link>
        </nav>
        <div className="p-4 border-t border-border/40">
          <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Mobile Header */}
        <header className="md:hidden border-b border-border/40 bg-card/30 backdrop-blur-md sticky top-0 z-40 h-16 flex items-center px-4 justify-between">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Matthias.admin</span>
          <div className="flex items-center gap-3">
            <select 
              value={pathname} 
              onChange={(e) => router.push(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs outline-none"
            >
              <option value="/admin">Dashboard</option>
              <option value="/admin/projects">Projects</option>
              <option value="/admin/experience">Experience</option>
              <option value="/admin/education">Education</option>
              <option value="/admin/certificates">Certificates</option>
              <option value="/admin/testimonials">Testimonials</option>
              <option value="/admin/inbox">Inbox</option>
            </select>
            <button onClick={handleSignOut} className="p-1.5 text-muted hover:text-red-400"><LogOut className="w-4 h-4" /></button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}