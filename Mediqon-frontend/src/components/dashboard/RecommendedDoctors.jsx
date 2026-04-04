import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ChevronRight, Stethoscope, Briefcase, PlusCircle, Activity } from 'lucide-react';

const doctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Neurology", exp: "12 yrs", rating: "4.9", location: "Block A-204" },
  { id: 2, name: "Dr. Michael Chen", specialty: "Cardiology", exp: "15 yrs", rating: "5.0", location: "Block B-102" },
  { id: 3, name: "Dr. Emma Wilson", specialty: "Dermatology", exp: "8 yrs", rating: "4.8", location: "Block A-405" },
  { id: 4, name: "Dr. Robert Brown", specialty: "Radiology", exp: "20 yrs", rating: "4.9", location: "Block C-301" }
];

export default function RecommendedDoctors() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-500" />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500 antialiased">Specialists</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Recommended Doctors</h3>
        </div>
        <div className="flex gap-2">
            <button className="h-8 w-8 rounded-full border border-white/[0.05] bg-white/[0.02] flex items-center justify-center text-neutral-600 hover:text-white transition-all transform rotate-180"><ChevronRight className="h-4 w-4" /></button>
            <button className="h-8 w-8 rounded-full border border-white/[0.05] bg-white/[0.02] flex items-center justify-center text-neutral-600 hover:text-white transition-all"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar -mx-2 px-2 mask-linear-r relative">
        {doctors.map((doctor, i) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex-none w-[280px] p-6 bg-[#09090b] rounded-[1.5rem] border border-white/[0.05] shadow-xl group hover:border-emerald-500/20 transition-all"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div className="h-14 w-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 group-hover:text-emerald-400 transition-all">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  <Star className="h-3 w-3 fill-current" />
                  {doctor.rating}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-bold text-white tracking-tight">{doctor.name}</h4>
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 antialiased">
                  <Briefcase className="h-3.5 w-3.5 text-neutral-600" />
                  {doctor.specialty} • {doctor.exp}
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 antialiased italic">
                  <MapPin className="h-3.5 w-3.5 text-neutral-700" />
                  {doctor.location}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/[0.02]">
                <button className="flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-white transition-all">
                  View Profile <PlusCircle className="h-3 w-3" />
                </button>
                <button className="h-10 px-4 rounded-xl bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all active:scale-95 shadow-sm">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
