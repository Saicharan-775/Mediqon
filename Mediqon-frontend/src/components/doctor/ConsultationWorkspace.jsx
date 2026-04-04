import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, FileText, ClipboardList, PenTool, Eraser, CheckCircle, ChevronDown, Send, User, Sparkles, Activity } from 'lucide-react';

export default function ConsultationWorkspace({ currentPatient }) {
  const [activeTab, setActiveTab] = useState('notes');
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="flex flex-col gap-8 bg-[#09090b] rounded-[1.5rem] border border-white/[0.05] p-8 shadow-2xl h-full overflow-hidden relative group">
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/[0.05]">
        <div className="flex items-center gap-4">
           <div className={`h-12 w-12 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center transition-all ${isRecording ? 'text-rose-500 animate-pulse border-rose-500/30' : 'text-emerald-500'}`}>
              {isRecording ? <Mic className="h-6 w-6" /> : <PenTool className="h-5 w-5" />}
           </div>
           <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Patient Visit</h3>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mt-1">{currentPatient ? `Active Session: ${currentPatient.name}` : 'Awaiting patient selection'}</p>
           </div>
        </div>
        <div className="flex items-center p-1 rounded-xl bg-white/[0.02] border border-white/[0.05]">
           <button onClick={() => setActiveTab('notes')} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === 'notes' ? 'bg-white/[0.06] text-white shadow-sm' : 'text-neutral-500 hover:text-white'}`}>Clinical Notes</button>
           <button onClick={() => setActiveTab('prescribe')} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === 'prescribe' ? 'bg-white/[0.06] text-white shadow-sm' : 'text-neutral-500 hover:text-white'}`}>Prescriptions</button>
        </div>
      </div>

      <div className="flex-1 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'notes' ? (
            <motion.div 
               key="notes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
               className="h-full flex flex-col gap-6"
            >
               <div className="relative flex-1 group/textarea">
                  <textarea 
                    placeholder="Document observations, symptoms, and diagnostic reasoning..."
                    className="w-full h-full bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 text-sm font-medium text-neutral-200 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.02] transition-all scrollbar-hide no-scrollbar"
                  />
                  <div className="absolute top-6 right-6 flex flex-col gap-3">
                     <button onClick={() => setIsRecording(!isRecording)} className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all shadow-xl group border ${isRecording ? 'bg-rose-500 text-white border-rose-600' : 'bg-white/[0.05] border-white/[0.1] text-neutral-400 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30'}`}>
                        <Mic className={`h-5 w-5 ${isRecording && 'animate-pulse'}`} />
                     </button>
                  </div>
                  <div className={`absolute bottom-6 left-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-600 transition-opacity ${!isRecording && 'opacity-0'}`}>
                     <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                     Voice Record Active
                  </div>
               </div>
            </motion.div>
          ) : (
            <motion.div 
               key="prescribe" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
               className="h-full space-y-6"
            >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all group/card">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Search Medications</span>
                        <ClipboardList className="h-4 w-4 text-emerald-500 opacity-60" />
                     </div>
                     <input placeholder="Medication name or category" className="w-full bg-transparent border-none text-base font-bold text-white focus:outline-none placeholder-neutral-700 tracking-tight" />
                  </div>
                  <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Dosage Frequency</span>
                        <Activity className="h-4 w-4 text-neutral-700" />
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="text-sm font-bold text-neutral-200">1 Capsule / 12 Hours</div>
                        <ChevronDown className="h-3.5 w-3.5 text-neutral-700" />
                     </div>
                  </div>
               </div>

               <div className="relative group/textarea h-48">
                  <textarea 
                    placeholder="Provide specific dosage instructions for the patient"
                    className="w-full h-full bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 text-sm font-medium text-neutral-200 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.02] transition-all scrollbar-hide no-scrollbar"
                  />
                  <div className="absolute top-6 right-6">
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.05] text-neutral-600 hover:text-white transition-all"><Sparkles className="h-4 w-4" /></button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pt-6 border-t border-white/[0.05] flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05] text-neutral-500 hover:text-white transition-all"><Eraser className="h-5 w-5" /></div>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05] text-neutral-500 hover:text-white transition-all"><FileText className="h-5 w-5" /></div>
         </div>
         <button className="px-8 h-12 rounded-2xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 flex items-center gap-3 transition-all active:scale-95 shadow-sm">
            Save Consultation <Send className="h-4 w-4" />
         </button>
      </div>
    </div>
  );
}
