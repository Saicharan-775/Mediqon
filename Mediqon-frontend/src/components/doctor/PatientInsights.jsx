import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Beaker, Brain, Clipboard, History, ShieldAlert, Sparkles, TrendingUp, User } from 'lucide-react';

export default function PatientInsights({ patient }) {
  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-[#09090b] rounded-[1.5rem] border border-white/[0.05] border-dashed text-neutral-500 text-xs font-bold uppercase tracking-widest gap-4 h-full">
        <User className="h-6 w-6 text-neutral-700" />
        Select a patient to view details
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 bg-[#09090b] rounded-[1.5rem] border border-white/[0.05] p-8 shadow-2xl h-full overflow-hidden relative group">
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/5 blur-[80px] opacity-20 transition-opacity duration-700 pointer-events-none" />

      <div className="flex items-start justify-between">
        <div className="space-y-4 flex items-start gap-5">
           <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-sky-500/20 border border-white/[0.05] flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-all">
              <User className="h-7 w-7" />
           </div>
           <div>
              <div className="flex items-center gap-3">
                 <h3 className="text-2xl font-bold text-white tracking-tight">{patient.name}</h3>
                 <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border border-rose-500/20 bg-rose-500/10 text-rose-400 ${patient.id !== 1 && patient.risk !== 'high' && 'hidden'}`}>Urgent priority</span>
              </div>
              <p className="text-sm font-medium text-neutral-500">ID: CLIN2849-0X • Male • 42 yrs</p>
           </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] text-xs font-semibold text-neutral-100 transition-all uppercase tracking-wider">
           Medical History <History className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Clinical Summary */}
         <div className="space-y-6">
            <div className="space-y-3">
               <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-500" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Clinical Summary</span>
               </div>
               <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Symptom Summary</h4>
                    <p className="text-sm font-medium text-neutral-200 leading-relaxed italic border-l-2 border-emerald-500/30 pl-4">{patient.summary}</p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-white/[0.02]">
                    <div className="flex items-center justify-between text-xs font-semibold">
                       <span className="text-neutral-500 uppercase tracking-widest">Confidence</span>
                       <span className="text-emerald-400">94.2%</span>
                    </div>
                    <div className="h-1 w-full bg-white/[0.02] rounded-full overflow-hidden">
                       <div className="h-full w-[94%] bg-emerald-500" />
                    </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Health Indicators */}
         <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-rose-500" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Health Indicators</span>
               </div>
               <div className="grid grid-cols-1 gap-2">
                  <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-between group-hover:border-rose-500/30 transition-all">
                     <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">Cardiovascular History</span>
                     <TrendingUp className="h-4 w-4 text-rose-500 opacity-60" />
                  </div>
                  <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 flex items-center justify-between">
                     <span className="text-[11px] font-semibold uppercase tracking-wider text-orange-400">Hypertension Trends</span>
                     <Activity className="h-4 w-4 text-orange-500 opacity-60" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
