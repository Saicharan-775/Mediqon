import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, MoreHorizontal, Settings, Users } from 'lucide-react';

export default function WeeklyCalendar() {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div className="flex flex-col gap-8 bg-[#09090b] rounded-[1.5rem] border border-white/[0.05] p-8 shadow-2xl h-full overflow-hidden">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h3 className="text-xl font-bold text-white tracking-tight leading-none">Weekly Schedule</h3>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mt-1">Schedule Overview</p>
         </div>
         <div className="flex items-center gap-2">
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05] text-neutral-500 hover:text-white transition-all"><Settings className="h-4 w-4" /></button>
            <button className="px-4 h-10 rounded-xl bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all">Manage Schedule</button>
         </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
         {weekDays.map((day, i) => (
           <div key={day} className="flex flex-col gap-4 text-center">
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${day === 'Wed' ? 'text-emerald-400' : 'text-neutral-600'}`}>
                 {day}
              </span>
              <div className={`aspect-[4/5] rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${day === 'Wed' ? 'bg-emerald-500/10 border-emerald-500/20 shadow-xl' : 'bg-white/[0.01] border-white/[0.05] hover:bg-white/[0.03]'}`}>
                 <span className={`text-base font-bold ${day === 'Wed' ? 'text-emerald-400' : 'text-neutral-400'}`}>
                   {26 + i}
                 </span>
                 <div className="flex gap-0.5">
                    {[1, 2].map(j => (
                       <div key={j} className={`h-1 w-1 rounded-full ${day === 'Wed' ? 'bg-emerald-500' : 'bg-neutral-800'}`} />
                    ))}
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Upcoming Schedule</h4>
         </div>
         <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl flex items-center justify-between group hover:border-white/[0.1] transition-all">
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05] text-emerald-400">
                  <Clock className="h-5 w-5" />
               </div>
               <div>
                  <p className="text-sm font-bold text-white tracking-tight">Consultation Hours</p>
                  <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest mt-1">Wednesday, 09:00 AM - 05:00 PM</p>
               </div>
            </div>
            <Users className="h-4 w-4 text-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />
         </div>
         <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05] text-sky-400 opacity-60">
                  <Clock className="h-5 w-5" />
               </div>
               <div>
                  <p className="text-sm font-bold text-neutral-400 tracking-tight">Review Session</p>
                  <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest mt-1">Thursday, 01:00 PM - 03:00 PM</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
