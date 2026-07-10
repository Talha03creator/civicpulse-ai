"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/api/tickets`);
        if (res.ok) {
          const data = await res.json();
          // Merge local "resolved" state if it exists
          setTickets(prev => {
            return data.map((newTicket: any) => {
              const existing = prev.find(t => t.id === newTicket.id);
              return existing && existing.resolved ? { ...newTicket, resolved: true } : newTicket;
            });
          });
        }
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      }
    };

    fetchTickets();
    const interval = setInterval(fetchTickets, 5000);
    return () => clearInterval(interval);
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency?.toLowerCase()) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/50";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/50";
      default: return "bg-cyan-500/20 text-cyan-400 border-cyan-500/50";
    }
  };

  const markResolved = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, resolved: true } : t));
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 flex flex-col md:flex-row relative">
      {/* Floating Status Badge */}
      <div className="fixed bottom-6 right-6 z-50 bg-black/80 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        <span className="text-xs font-mono text-cyan-400 tracking-wider">LIVE AMD COMPUTE STATUS: OPTIMAL</span>
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-card border-l-0 border-y-0 rounded-none shrink-0 flex flex-col p-6 sticky top-24 h-auto md:h-[calc(100vh-6rem)]">
        <h2 className="font-heading font-bold text-white text-xl mb-8">Admin Portal</h2>
        <nav className="space-y-4 flex-1">
          <div className="px-4 py-2 bg-white/10 rounded-lg text-white font-medium cursor-pointer border border-white/5">Overview</div>
          <div className="px-4 py-2 text-slate-400 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">Triage Feed</div>
          <div className="px-4 py-2 text-slate-400 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">Agents</div>
          <div className="px-4 py-2 text-slate-400 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">Settings</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Municipal Command Center</h1>
          <p className="text-slate-400">Real-time autonomous routing overview.</p>
        </div>

        {/* 4 Glowing Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Reports", value: "24,592", color: "cyan" },
            { label: "Avg Resolution", value: "2.4 hrs", color: "purple" },
            { label: "Active Gemma-4 Agents", value: "1,024", color: "orange" },
            { label: "High-Priority Unresolved", value: tickets.filter(t => (t.triage.urgency_level?.toLowerCase() === "high" || t.triage.urgency_level?.toLowerCase() === "critical") && !t.resolved).length, color: "green" },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-6">
              <div className="text-sm text-slate-400 mb-2">{stat.label}</div>
              <div className={`text-3xl font-heading font-bold text-${stat.color}-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`}>
                {stat.value}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Live Triage Feed */}
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">Live Triage Feed</h2>
          {tickets.length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 border-dashed">
              <p className="text-slate-400">No active issues routed yet. City is clear.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {tickets.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`bg-black/50 border border-white/10 rounded-xl p-6 transition-all duration-300 ${ticket.resolved ? "opacity-40 grayscale" : "hover:border-cyan-500/50"}`}
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getUrgencyColor(ticket.triage.urgency_level)}`}>
                            {ticket.triage.urgency_level}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">{new Date(ticket.timestamp).toLocaleString()}</span>
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white mb-1">{ticket.triage.issue_category}</h3>
                        <p className="text-slate-300 text-sm mb-2">{ticket.description}</p>
                        <div className="flex items-center gap-4 text-xs font-medium">
                          <span className="text-slate-400">Assigned To: <span className="text-cyan-400">{ticket.triage.assigned_department}</span></span>
                          <span className="text-slate-600">|</span>
                          <span className="text-slate-400">Target SLA: <span className="text-white">{ticket.triage.estimated_sla_hours} hrs</span></span>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-4">
                        {ticket.image_base64 && (
                          <img 
                            src={`data:image/jpeg;base64,${ticket.image_base64}`} 
                            alt="Issue" 
                            className="w-24 h-24 object-cover rounded-lg border border-white/10" 
                          />
                        )}
                        <Button 
                          variant={ticket.resolved ? "secondary" : "outline"} 
                          onClick={() => markResolved(ticket.id)}
                          disabled={ticket.resolved}
                        >
                          {ticket.resolved ? "Resolved" : "Mark as Resolved"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
