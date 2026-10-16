"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Mail, Loader2, Trash2, Check, Sparkles } from "lucide-react";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminInbox() {
  const supabase = createClient();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (data) setMessages(data as MessageItem[]);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    await supabase.from("messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const markAsRead = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    await supabase.from("messages").update({ is_read: newStatus }).eq("id", id);
    setMessages((prev) => prev.map((msg) => msg.id === id ? { ...msg, is_read: newStatus } : msg));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Client Communications
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Inbox Messages</h2>
        </div>
      </div>

      <div className="bg-card/40 border border-border/60 rounded-3xl overflow-hidden backdrop-blur-xl shadow-xl">
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-muted/5">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">Incoming Mail</span>
          <span className="text-xs text-primary font-mono">{messages.length} Messages</span>
        </div>

        {messages.length === 0 ? (
          <div className="p-16 text-center text-muted flex flex-col items-center">
            <Mail className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-semibold text-foreground">Your inbox is empty</p>
            <p className="text-xs mt-1">When someone fills out your contact form, it will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`p-6 transition-colors ${msg.is_read ? 'bg-background' : 'bg-muted/10'}`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg text-foreground">{msg.subject}</h3>
                      {!msg.is_read && (
                        <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider">New</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted mb-4">
                      <span className="font-semibold text-foreground">{msg.name}</span>
                      <span>•</span>
                      <a href={`mailto:${msg.email}`} className="text-primary hover:underline">{msg.email}</a>
                      <span>•</span>
                      <span className="text-xs">{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="bg-card border border-border/50 p-4 rounded-xl text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
                      {msg.message}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 md:flex-col shrink-0">
                    <button 
                      onClick={() => markAsRead(msg.id, msg.is_read)}
                      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors border ${msg.is_read ? 'bg-card text-muted border-border hover:text-foreground' : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white'}`}
                    >
                      <Check className="w-4 h-4" />
                      {msg.is_read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button 
                      onClick={() => handleDelete(msg.id)}
                      className="p-2 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}