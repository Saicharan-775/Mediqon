import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Leaf, Brain, Heart, Sparkles, ArrowRight, Zap, Microchip, ShieldCheck } from 'lucide-react';
import Articles from '../components/Articles';

export default function Wellness() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col gap-12 pb-24 fade-in px-2 max-w-[1400px] mx-auto overflow-hidden">
      
      {/* Integrative Health Protocol Hero */}
      <section className="relative rounded-[3rem] overflow-hidden bg-card border border-border p-12 lg:p-20 shadow-xl transition-colors">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-0 opacity-40" />
        <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] bg-sky-500/5 blur-[100px] rounded-full -z-0 opacity-30" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="max-w-2xl space-y-8">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
                 <div className="h-px w-8 bg-primary" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Integrative Wellness Protocols</span>
              </motion.div>
              
              <div className="space-y-6">
                 <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight">
                    Optimizing Health through <br />
                    <span className="text-muted-foreground/60">Evidence-Based</span> Excellence.
                 </motion.h1>
                 <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base lg:text-lg text-muted-foreground font-medium leading-relaxed max-w-lg">
                    Access a curated library of clinical health protocols, preventative research, and evidence-based medical paradigms.
                 </motion.p>
              </div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center gap-4">
                 <div className="relative flex-1 w-full group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                       <Search className="h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input 
                       type="text" 
                       placeholder="Search clinical protocols..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="w-full h-14 bg-muted border border-border rounded-xl pl-14 pr-6 text-foreground text-sm outline-none focus:bg-muted/80 focus:border-primary/30 transition-all font-medium placeholder:text-muted-foreground/40 shadow-sm"
                    />
                 </div>
                 <button className="h-14 px-8 rounded-xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-primary/10 whitespace-nowrap active:scale-95">
                    Launch Protocols
                 </button>
              </motion.div>
           </div>

           <div className="hidden lg:grid grid-cols-2 gap-4 relative">
              {[
                 { icon: Zap, label: 'Performance', count: '12', color: 'bg-emerald-500' },
                 { icon: Brain, label: 'Cognition', count: '24', color: 'bg-sky-500' },
                 { icon: Microchip, label: 'Longevity', count: '08', color: 'bg-indigo-500' },
                 { icon: ShieldCheck, label: 'Preventative', count: '16', color: 'bg-rose-500' },
              ].map((card, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="p-8 rounded-3xl bg-muted/30 border border-border hover:border-primary/20 transition-all relative group/card cursor-pointer shadow-sm"
                 >
                    <div className={`h-10 w-10 rounded-xl ${card.color}/10 border border-${card.color.split('-')[1]}-500/20 shadow-sm flex items-center justify-center text-${card.color.split('-')[1]}-500 mb-6 group-hover/card:scale-105 transition-all`}>
                       <card.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-black text-foreground mb-1 uppercase tracking-tight">{card.label}</h3>
                    <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">{card.count} Protocols</p>
                 </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Embedded Component Container */}
      <section className="-mt-12">
        <Articles className="pt-0" />
      </section>

      {/* High-Fidelity Professional Transmission */}
      <section className="relative rounded-[3rem] p-12 lg:p-24 overflow-hidden border border-border shadow-xl flex flex-col items-center text-center gap-12 bg-card transition-colors">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_oklch(var(--primary)/0.05)_0%,_transparent_70%)]" />
         
         <div className="max-w-2xl relative z-10 space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Clinical Updates Transmission</span>
                <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-foreground leading-tight tracking-tight">Stay Informed on Healthcare.</h2>
            <p className="text-muted-foreground text-base lg:text-lg font-medium max-w-lg mx-auto leading-relaxed">
               The latest medical breakthroughs, preventative protocols, and biological insights delivered to your professional queue.
            </p>
         </div>

         <div className="w-full max-w-lg relative z-10 flex flex-col sm:flex-row items-center gap-3">
            <input 
               type="email" 
               placeholder="Enter professional email..."
               className="w-full h-14 bg-muted border border-border rounded-xl px-6 text-foreground font-medium outline-none focus:bg-muted/80 focus:border-primary/40 transition-all shadow-sm text-sm"
            />
            <button className="h-14 px-10 rounded-xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-primary/10 whitespace-nowrap active:scale-95">
               Register for Updates
            </button>
         </div>
      </section>
    </div>
  );
}
