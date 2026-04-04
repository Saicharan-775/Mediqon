import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronRight, Stethoscope, Video, User } from 'lucide-react';

const statusStyles = {
  booked: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10",
  confirmed: "bg-sky-500/10 text-sky-400 border-sky-500/10",
  cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/10",
};

export default function UpcomingAppointments({ appointments = [] }) {
  const displayApts = appointments.slice(0, 2);

  if (!displayApts.length) {
    return (
      <div className="flex flex-col items-center justify-center h-48 rounded-[2rem] bg-white/[0.01] border border-dashed border-white/[0.08] text-neutral-500 text-xs font-bold uppercase tracking-widest gap-4">
        <Calendar className="h-6 w-6 text-neutral-700" />
        No Scheduled Visits
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-sky-500" />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500 antialiased">Timeline</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Upcoming Appointments</h3>
        </div>
        <button className="text-xs font-semibold text-neutral-500 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1.5">
          View All <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayApts.map((apt, i) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-[#09090b] rounded-[1.5rem] border border-white/[0.05] flex flex-col gap-6 hover:border-white/[0.1] transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/40 group-hover:text-emerald-400 transition-colors">
                    <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-100">{apt.doctor}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs font-medium text-neutral-500 antialiased">
                    <MapPin className="h-3 w-3" />
                    Mediqon Main Block • {apt.specialty || "General"}
                  </div>
                </div>
              </div>
              <div className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${statusStyles[apt.status] || statusStyles.booked}`}>
                {apt.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-2 border-b border-white/[0.02]">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-neutral-600 uppercase tracking-wider">Date</span>
                <span className="text-sm font-bold text-neutral-200 block">{apt.date}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-neutral-600 uppercase tracking-wider">Time</span>
                <span className="text-sm font-bold text-neutral-200 block">{apt.time}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Video className="h-3 w-3 text-neutral-500" />
                    <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Virtual visit available</span>
                </div>
                <button className="h-8 w-8 rounded-full bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/[0.05] transition-all">
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
