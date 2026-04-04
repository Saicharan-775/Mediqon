import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, FileText, ClipboardList, Activity, ArrowRight, User, MoreVertical } from 'lucide-react';

const eventIcons = {
  appointment: Calendar,
  report: FileText,
  prescription: ClipboardList,
  diagnostic: Activity,
};

const eventColors = {
  appointment: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10',
  report: 'bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-sky-500/10',
  prescription: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/10',
  diagnostic: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-indigo-500/10',
};

export default function HealthTimeline() {
  const events = [
    { id: 1, type: 'appointment', title: 'Consultation with Dr. Sarah Johnson', time: 'Today, 10:45 AM', status: 'Upcoming' },
    { id: 2, type: 'report', title: 'Hematology Profile Update', time: 'Yesterday, 02:15 PM', status: 'Lab Verified' },
    { id: 3, type: 'prescription', title: 'Medication Refill: Amoxicillin Generic', time: 'March 24, 2026', status: 'Pharmacy Ready' },
    { id: 4, type: 'diagnostic', title: 'ECG Scan - System Review', time: 'March 22, 2026', status: 'Completed' },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MoreVertical className="h-4 w-4 text-sky-500" />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500 antialiased">History</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Recent Activity</h3>
        </div>
      </div>

      <div className="relative space-y-8 pl-10 border-l border-white/[0.05]">
        {events.map((event, i) => {
          const Icon = eventIcons[event.type];
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group bg-[#09090b] p-6 rounded-[1.5rem] border border-white/[0.05] hover:border-white/[0.1] transition-all"
            >
              {/* Timeline Connector Dot */}
              <div className={`absolute left-[-48px] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-4 border-[#080809] z-10 ${event.type === 'appointment' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-neutral-800'}`} />
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className={`h-12 w-20 flex items-center justify-center rounded-2xl border ${eventColors[event.type]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-bold text-neutral-100 tracking-tight">{event.title}</h4>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600 px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/[0.05]">
                      {event.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                    <Calendar className="h-3 w-3" />
                    {event.time}
                  </div>
                </div>

                <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.08] text-neutral-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
