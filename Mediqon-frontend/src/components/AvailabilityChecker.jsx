import React, { useState, useEffect } from "react";
import { Stethoscope, Calendar, Clock, ChevronRight, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../lib/api";

const doctors = ["Dr. Sarah Johnson", "Dr. Michael Chen", "Dr. Emma Wilson", "Dr. Robert Brown", "Dr. Olivia Martinez", "Dr. Rhea Kapoor"];

export default function AvailabilityChecker({ onBook }) {
  const [doctorsList, setDoctorsList] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await api.getDoctors();
        setDoctorsList(data || []);
        if (data && data.length > 0) {
          setSelectedDoctorId(data[0].id);
        } else {
          setError("No active medical practitioners found. Please sync the database.");
        }
      } catch (err) {
        console.error("Failed to load doctors:", err);
        setError("Medical DB Connectivity Error. Manual booking disabled.");
      }
    };
    fetchDoctors();
  }, []);

  const fetchAvailability = async () => {
    setLoading(true);
    setSlots([]);
    setError(null);
    try {
      const doctorObj = doctorsList.find(d => d.id === selectedDoctorId);
      // Wait for doctors to load if needed
      if (!doctorObj) return;

      await new Promise(r => setTimeout(r, 600)); // Smooth feeling
      const response = await api.getAvailability(doctorObj.id, selectedDate);
      setSlots(response.slots || []);
    } catch (err) {
      console.error(err);
      setError("Unable to sync live slots. Showing estimated openings.");
      setSlots(["09:00 AM", "11:30 AM", "01:00 PM", "03:45 PM", "05:15 PM"]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDoctorId && selectedDate) {
      fetchAvailability();
    }
  }, [selectedDoctorId, selectedDate]);

  const handleSlotClick = (slot) => {
    const doctorObj = doctorsList.find(d => d.id === selectedDoctorId);
    if (doctorObj) {
        onBook({ 
            doctorId: doctorObj.id, 
            hospitalId: doctorObj.hospital?.id, 
            appointmentDate: selectedDate,
            doctorName: doctorObj.name,
            time: slot 
        });
    }
  };

  return (
    <div className="flex flex-col gap-8 rounded-[2rem] border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex-1 space-y-2">
            <h3 className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
                <Sparkles className="h-5 w-5 text-amber-400" />
                Find Available Care
            </h3>
            <p className="text-sm text-slate-400">Select your preferred doctor and date to view openings.</p>
        </div>
        <div className="flex flex-wrap gap-4 lg:w-max">
            <div className="group relative">
                <Stethoscope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="h-12 min-w-[220px] border border-white/10 bg-slate-950/50 pl-10 pr-4 text-sm font-bold text-white ring-emerald-500/20 transition-all focus:border-emerald-400 focus:outline-none focus:ring-8 rounded-2xl appearance-none cursor-pointer hover:bg-slate-900"
                >
                    {doctorsList.map((d) => (
                    <option key={d.id} value={d.id} className="bg-slate-900 text-slate-100">{d.name} • {d.specialization}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 h-2 w-2 -translate-y-1/2 border-b-2 border-r-2 border-slate-500 group-hover:border-white transition-all transform rotate-45" />
            </div>
            <div className="group relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="h-12 border border-white/10 bg-slate-950/50 pl-10 pr-4 text-sm font-bold text-white ring-emerald-500/20 transition-all focus:border-emerald-400 focus:outline-none focus:ring-8 rounded-2xl cursor-pointer hover:bg-slate-900"
                />
            </div>
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
           <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                <Clock className="h-4 w-4" />
                Live Appointment Slots
           </p>
           {loading && <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />}
        </div>
        
        {loading ? (
             <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="h-14 w-full animate-pulse rounded-2xl bg-white/5 border border-white/5" />
                ))}
             </div>
        ) : slots.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            <AnimatePresence mode="popLayout">
                {slots.map((slot) => (
                <motion.button
                    key={slot}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, translateY: -3, boxShadow: "0 20px 40px -10px rgba(52, 211, 153, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSlotClick(slot)}
                    className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-400/5 py-4 text-center transition-all hover:border-emerald-400 hover:bg-emerald-400/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 text-sm font-black text-emerald-100 transition-colors group-hover:text-white uppercase tracking-tight">{slot}</span>
                </motion.button>
                ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 py-16 text-center">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">No availability found for this schedule.</p>
          </div>
        )}
        
        {error && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-center gap-2 text-[10px] font-bold text-amber-500/80 bg-amber-500/5 p-3 rounded-xl border border-amber-500/10"
            >
                <AlertCircle className="h-3 w-3" />
                {error}
            </motion.div>
        )}
      </div>
    </div>
  );
}
