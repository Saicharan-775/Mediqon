import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, FileText, CheckCircle2, Activity,
  Calendar, Clock, AlertCircle, ChevronRight, MapPin, 
  AlignLeft, PlusCircle
} from 'lucide-react';

const MOCK_PATIENTS = [
  { id: 1, name: "Alexander Wright", time: "09:00 AM", status: "Waiting", type: "Follow-up", risk: "Low", age: 45, gender: "M" },
  { id: 2, name: "Sarah Chen", time: "10:30 AM", status: "In Progress", type: "Consultation", risk: "Medium", age: 32, gender: "F" },
  { id: 3, name: "Marcus Johnson", time: "11:15 AM", status: "Upcoming", type: "Post-Op", risk: "High", age: 58, gender: "M" },
  { id: 4, name: "Emily Davis", time: "02:00 PM", status: "Upcoming", type: "Routine", risk: "Low", age: 28, gender: "F" }
];

export default function DoctorDashboard({ user }) {
  const [selectedPatient, setSelectedPatient] = useState(MOCK_PATIENTS[1]);

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Today\'s Roster', value: '14 Patients', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Pending Reviews', value: '3 Reports', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Clinical Schedule', value: 'On Track', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'System Status', value: 'Online', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' }
          ].map((stat, i) => (
            <div key={i} className="p-5 bg-white rounded-[20px] border border-neutral-200/60 shadow-sm flex items-center gap-4 group">
                <div className={`h-12 w-12 flex items-center justify-center rounded-[14px] ${stat.bg} ${stat.color} transition-transform group-hover:scale-105`}>
                    <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-0.5 block">{stat.label}</span>
                  <p className="text-xl font-bold text-neutral-900 tracking-tight">{stat.value}</p>
                </div>
            </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: Appointment Queue (Master List) */}
        <div className="lg:col-span-1 bg-white border border-neutral-200/60 rounded-[24px] shadow-sm flex flex-col h-[650px] overflow-hidden">
          <div className="p-5 border-b border-neutral-100 bg-white z-10">
             <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-neutral-900 tracking-tight">Today's Queue</h3>
                <span className="bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-[8px] text-xs font-bold">Mar 28</span>
             </div>
             <p className="text-xs font-medium text-neutral-500 mt-1">4 patients remaining</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
             {MOCK_PATIENTS.map((p) => (
               <div 
                 key={p.id}
                 onClick={() => setSelectedPatient(p)}
                 className={`p-4 rounded-[16px] cursor-pointer border transition-all ${
                   selectedPatient?.id === p.id 
                     ? 'bg-blue-50/50 border-blue-200 shadow-sm ring-1 ring-blue-500/10' 
                     : 'bg-white border-neutral-200/60 hover:border-neutral-300 hover:bg-neutral-50'
                 }`}
               >
                  <div className="flex items-center justify-between mb-3">
                     <span className="text-sm font-bold text-neutral-900 truncate pr-2">{p.name}</span>
                     <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-[6px] whitespace-nowrap ${
                        p.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        p.status === 'Waiting' ? 'bg-amber-100 text-amber-700' :
                        'bg-neutral-100 text-neutral-600'
                     }`}>
                        {p.status}
                     </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500">
                     <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {p.time}</span>
                     <span className="flex items-center gap-1.5"><AlignLeft className="h-3.5 w-3.5" /> {p.type}</span>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* RIGHT: Patient Quick View & Workspace (Detail View) */}
        <div className="lg:col-span-2 bg-white border border-neutral-200/60 rounded-[24px] shadow-sm flex flex-col h-[650px] overflow-hidden relative">
          
          {selectedPatient ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPatient.id}
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col h-full"
              >
                {/* Master Details Header */}
                <div className="p-8 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-start justify-between gap-6 bg-[#F9FAFB]/50">
                   <div className="flex items-center gap-5">
                      <div className="h-16 w-16 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 shadow-sm">
                         {selectedPatient.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                         <h2 className="text-2xl font-bold text-neutral-900 tracking-tight mb-1">{selectedPatient.name}</h2>
                         <div className="flex items-center gap-3 text-sm font-semibold text-neutral-500">
                           <span>{selectedPatient.age} yrs</span>
                           <span className="text-neutral-300">•</span>
                           <span>{selectedPatient.gender === 'M' ? 'Male' : 'Female'}</span>
                           <span className="text-neutral-300">•</span>
                           <span className="flex items-center gap-1 text-blue-600"><CheckCircle2 className="h-4 w-4" /> Verified Patient</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex gap-2">
                      <button className="bg-white border border-neutral-200 text-neutral-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-neutral-50 transition-colors">View Timeline</button>
                      <button className="bg-neutral-900 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-black transition-colors">Start Session</button>
                   </div>
                </div>

                {/* Patient Content Grid */}
                <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-white">
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                     {/* Vitals & Context */}
                     <div className="space-y-4">
                        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                           <Activity className="h-4 w-4 text-emerald-500" /> Recent Vitals
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-[16px]">
                              <span className="text-[10px] font-bold uppercase text-neutral-500 block mb-1">Heart Rate</span>
                              <span className="text-lg font-bold text-neutral-900">72 <span className="text-[10px] text-neutral-400">bpm</span></span>
                           </div>
                           <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-[16px]">
                              <span className="text-[10px] font-bold uppercase text-neutral-500 block mb-1">Blood Pressure</span>
                              <span className="text-lg font-bold text-neutral-900">120/80</span>
                           </div>
                        </div>
                     </div>

                     {/* Pre-Consultation Notes */}
                     <div className="space-y-4">
                        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                           <FileText className="h-4 w-4 text-blue-500" /> Pre-Session Context
                        </h4>
                        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-[16px] h-[100px] overflow-y-auto text-sm font-medium text-blue-900 leading-relaxed shadow-inner">
                           Patient reported minor discomfort in lower back continuing from previous session. Requested consultation regarding posture correction.
                        </div>
                     </div>
                   </div>

                   {/* Workspace Section */}
                   <div className="space-y-4">
                     <div className="flex items-center justify-between">
                       <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Clinical Workspace</h4>
                       <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-[6px] border border-emerald-100">Auto-Saving</span>
                     </div>
                     <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-[16px] min-h-[150px]">
                        <textarea 
                          placeholder="Type clinical notes here... AI is listening dynamically if enabled."
                          className="w-full h-full bg-transparent border-none outline-none resize-none text-sm font-medium text-neutral-800 placeholder:text-neutral-400"
                        ></textarea>
                     </div>
                   </div>

                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
             <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                <div className="h-16 w-16 bg-neutral-50 border border-neutral-100 rounded-[1.2rem] flex items-center justify-center text-neutral-300 mb-4 shadow-sm">
                   <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 tracking-tight">Select a Patient</h3>
                <p className="text-sm font-medium text-neutral-500 mt-2 max-w-sm">
                  Click on any patient from the queue to load their clinical profile and start the consultation block.
                </p>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
