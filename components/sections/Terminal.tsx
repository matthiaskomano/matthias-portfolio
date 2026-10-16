"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

type CommandHistory = {
  command: string;
  output: string | React.ReactNode;
};

export function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    { command: "", output: 'Welcome to MatthiasOS v1.0.0. Type "help" to see available commands.' }
  ]);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Auto-scroll to bottom when history changes (but skip the initial page load)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // "block: 'nearest'" ensures it only scrolls the terminal box, not the whole website window
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd) return;

    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = "Available commands: help, whoami, skills, projects, clear";
        break;
      case "whoami":
        output = "Matthias Komano - Full Stack Developer, Cybersecurity Enthusiast, and Systems Architect based in Kigali.";
        break;
      case "skills":
        output = "Frontend: Next.js, React, Tailwind | Backend: Node.js, PHP, MySQL | Sec: Wireshark, Nmap | Hardware: ESP32, IoT";
        break;
      case "projects":
        output = "Type 'cd projects' in your mind, or just scroll up to the Projects section!";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        output = `Command not found: ${cmd}. Type "help" for a list of commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  };

  return (
    <section id="terminal" className="relative py-24 bg-background overflow-hidden border-b border-border/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center"
        >
          <div className="p-3 rounded-full bg-card border border-border mb-4">
            <TerminalIcon className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Developer Terminal
          </h2>
          <div className="h-1 w-20 bg-secondary rounded-full mx-auto" />
        </motion.div>

        {/* Terminal Window */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-xl overflow-hidden bg-[#0d1117] border border-border shadow-2xl"
        >
          {/* Mac-style Window Header */}
          <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-border">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center text-xs text-muted font-mono">
              guest@matthias-portfolio:~
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm h-[300px] overflow-y-auto custom-scrollbar flex flex-col">
            {history.map((item, index) => (
              <div key={index} className="mb-4">
                {item.command && (
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <span className="text-primary">➜</span>
                    <span className="text-secondary">~</span>
                    <span className="text-foreground">{item.command}</span>
                  </div>
                )}
                <div className="text-muted/90 ml-4 leading-relaxed">{item.output}</div>
              </div>
            ))}
            
            {/* Active Input Line */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 text-emerald-400 mt-2">
              <span className="text-primary">➜</span>
              <span className="text-secondary">~</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-foreground caret-secondary"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}