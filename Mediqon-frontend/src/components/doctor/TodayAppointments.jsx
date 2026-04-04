import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldAlert, Clock, MoreVertical, Search, Filter, AlertCircle, CheckCircle } from 'lucide-react';

const riskStyles = {
  high: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function TodayAppointments({ onSelectPatient }) {
  const appointments = [
    { id: 1, name: "Lucas Vance", risk: "high", summary: "Cardiac anomaly flagged in ECG sync", time: "10:30 AM" },
    { id: 2, name: "Sarah Miller", risk: "medium", summary: "Post-op follow-up (Knee arthroscopy)", time: "11:15 AM" },
    { id: 3, name: "David Kim", risk: "low", summary: "Routine diabetic management", time: "12:00 PM" },
    { id: 4, name: "Elena Rossi", risk: "high", summary: "Respiratory distress symptoms reported", time: "01:30 PM" },
  ];

  return (
    <div className="flex flex-col gap-6 bg-[#09090b] rounded-[1.5rem] border border-white/[0.05] p-6 shadow-2xl h-full">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white tracking-tight">Today's Schedule</h3>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Prioritized by clinical needs</p>
        </div>
        <div className="flex gap-2">
           <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.05] text-neutral-500 hover:text-white transition-all"><Search className="h-4 w-4" /></button>
           <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.05] text-neutral-500 hover:text-white transition-all"><Filter className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto no-scrollbar">
        {appointments.map((apt, i) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelectPatient(apt)}
            className="group relative p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-white/[0.1] hover:bg-white/[0.04] cursor-pointer transition-all flex items-center gap-4"
          >
            <div className={`w-1 h-10 rounded-full ${apt.risk === 'high' ? 'bg-rose-500' : 'bg-neutral-800'}`} />
            
            <div className="flex-1 min-w-0">
               <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-neutral-100 truncate">{apt.name}</h4>
                  <span className="text-[10px] font-mono text-neutral-500">{apt.time}</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className={`px-1.5 py-0.5 rounded-md text-[9px] font-semibold uppercase tracking-wider border ${riskStyles[apt.risk]}`}>
                    {apt.risk} priority
                  </div>
                  <p className="text-[11px] font-medium text-neutral-500 truncate">{apt.summary}</p>
               </div>
            </div>

            <button className="opacity-0 group-hover:opacity-100 h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/[0.05] text-neutral-500 transition-all">
               <MoreVertical className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-white/[0.03]">
         <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-600 uppercase tracking-wide">
            <span>Progress</span>
            <span>1 of 4 Complete</span>
         </div>
         <div className="mt-2 h-1 w-full bg-white/[0.02] rounded-full overflow-hidden">
            <div className="h-full w-1/4 bg-emerald-500" />
         </div>
      </div>
    </div>
  );
}
