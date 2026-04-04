import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, FileText, ClipboardList, Activity,
  ChevronDown, ChevronUp, Clock, MapPin, User, Download, 
  ShieldCheck, Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';

const eventIcons = {
  appointment: Calendar,
  report: FileText,
  prescription: ClipboardList,
  diagnostic: Activity,
};

const eventColors = {
  appointment: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
  report: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
  prescription: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
  diagnostic: 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20',
};

export default function Timeline() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const mockEvents = [
    { 
      id: 1, type: 'appointment', title: 'Consultation with Dr. Sarah Johnson', 
      date: '2026-03-26', time: '10:45 AM', status: 'Upcoming', location: 'Mediqon Main Block - Room 204', doctor: 'Dr. Sarah Johnson', specialty: 'Neurology',
      notes: 'Initial evaluation for persistent migraines and sleep disturbances. Patient reported restlessness over the last 72 hours.'
    },
    { 
      id: 2, type: 'report', title: 'Blood Test Results', 
      date: '2026-03-25', time: '02:15 PM', status: 'Ready', lab: 'Mediqon Laboratory', technician: 'Samir Patel',
      details: 'All parameters within normal limits. White blood cell count showing mild elevation consistent with recent viral recovery.'
    },
    { 
      id: 3, type: 'prescription', title: 'Medication: Amoxicillin', 
      date: '2026-03-24', time: '09:30 AM', status: 'Pharmacy Ready', prescribedBy: 'Dr. Michael Chen', dosage: '500mg, twice daily for 7 days',
      instructions: 'Take after meals. Complete the entire course even if symptoms resolve.'
    },
    { 
      id: 4, type: 'diagnostic', title: 'ECG Scan Results', 
      date: '2026-03-22', time: '11:00 AM', status: 'Completed', result: 'Normal Sinus Rhythm',
      analysis: 'Cardiac performance was normal during the assessment. No anomalies detected.'
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = activeFilter === 'all' ? events : events.filter(e => e.type === activeFilter);
  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-10 fade-in">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Health Timeline
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Chronological overview of your medical history, visits, and reports.
          </p>
        </div>

        <div className="flex bg-muted p-1 rounded-xl border border-border shadow-inner overflow-x-auto no-scrollbar">
          {['all', 'appointment', 'report', 'prescription'].map(type => (
            <button
               key={type}
               onClick={() => setActiveFilter(type)}
               className={`px-4 py-2 text-[12px] font-semibold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                activeFilter === type 
                  ? "bg-card text-foreground shadow-sm border border-border" 
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-5">
           <div className="h-8 w-8 rounded-full border-2 border-border border-t-primary animate-spin" />
           <p className="text-sm font-medium text-muted-foreground tracking-wide">Loading authentic records...</p>
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-12 py-4">
          {/* Vertical Grid Line */}
          <div className="absolute left-[24px] sm:left-[48px] top-0 bottom-0 w-px bg-border/50" />

          <div className="space-y-12">
            {filteredEvents.map((event, idx) => {
              const Icon = eventIcons[event.type];
              const isExpanded = expandedId === event.id;

              return (
                <motion.div
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                  key={event.id}
                  className="relative group"
                >
                  {/* Node Connector */}
                  <div className={`absolute left-[-29px] sm:left-[-35px] top-8 h-3 w-3 rounded-full border-[3px] border-card z-10 transition-transform group-hover:scale-110 ${
                    idx === 0 ? 'bg-primary shadow-[0_0_0_4px_rgba(59,130,246,0.1)]' : 'bg-muted-foreground/30'
                  }`} />
                  
                  {/* Floating Date (Desktop) */}
                  <div className="absolute left-[-110px] top-6 hidden sm:block text-right w-[50px]">
                     <span className="text-xs font-bold text-foreground uppercase block">{event.date.split('-')[2]}</span>
                     <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                     </span>
                  </div>

                  <div className="bg-card border border-border shadow-sm hover:border-border/80 hover:shadow-md transition-all ml-4 sm:ml-8 overflow-hidden rounded-[20px]">
                    
                    {/* Header Banner */}
                    <div 
                      onClick={() => toggleExpand(event.id)}
                      className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center gap-5 sm:gap-6 bg-card"
                    >
                       <div className={`h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-xl border flex-shrink-0 transition-all ${eventColors[event.type]}`}>
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                       </div>

                       <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                             <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-tight">{event.title}</h3>
                             <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-md border border-border hidden sm:block">
                              {event.status}
                             </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-muted-foreground">
                             <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-muted-foreground/60" /> {event.time}</span>
                             <span className="sm:hidden flex items-center gap-1.5 text-muted-foreground/60">• {event.date}</span>
                          </div>
                       </div>

                       <div className="text-muted-foreground group-hover:text-primary transition-colors ml-auto">
                          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                       </div>
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-border bg-muted/30"
                        >
                          <div className="p-5 sm:p-8 space-y-8">
                            {event.type === 'appointment' && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Medical Personnel</span>
                                    <div className="flex items-center gap-3">
                                       <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary"><User className="h-5 w-5" /></div>
                                       <div>
                                          <p className="text-sm font-bold text-foreground">{event.doctor}</p>
                                          <p className="text-[11px] font-semibold text-primary uppercase tracking-wider">{event.specialty}</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Location</span>
                                    <div className="flex items-center gap-3">
                                       <div className="h-10 w-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground"><MapPin className="h-5 w-5" /></div>
                                       <p className="text-sm font-bold text-foreground/80">{event.location}</p>
                                    </div>
                                 </div>
                                 <div className="md:col-span-2 p-5 rounded-[16px] bg-card border border-border space-y-2 shadow-sm">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Consultation Notes</span>
                                    <p className="text-sm font-medium text-muted-foreground leading-relaxed italic">"{event.notes}"</p>
                                 </div>
                              </div>
                            )}

                            {event.type === 'report' && (
                              <div className="space-y-6">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                       <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Laboratory</span>
                                       <p className="text-sm font-bold text-foreground">{event.lab}</p>
                                    </div>
                                    <div className="space-y-1">
                                       <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Verified By</span>
                                       <p className="text-sm font-bold text-foreground">{event.technician}</p>
                                    </div>
                                 </div>
                                 <div className="p-5 rounded-[16px] bg-primary/10 border border-primary/20 space-y-2 shadow-sm text-foreground">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Report Summary</span>
                                    <p className="text-sm font-semibold leading-relaxed">{event.details}</p>
                                 </div>
                                 <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-card border border-border rounded-xl text-xs font-bold text-foreground uppercase tracking-widest hover:bg-muted transition-all shadow-sm">
                                    Download PDF <Download className="h-4 w-4" />
                                 </button>
                              </div>
                            )}

                            {event.type === 'prescription' && (
                              <div className="space-y-6">
                                 <div className="p-6 sm:p-8 rounded-[20px] bg-amber-500/10 border border-amber-500/20 relative overflow-hidden shadow-sm">
                                    <ClipboardList className="absolute top-[-10%] right-[-5%] h-32 w-32 text-amber-500 opacity-5 rotate-12" />
                                    <div className="space-y-5 relative z-10">
                                       <div className="space-y-1">
                                          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block">Dosage Protocol</span>
                                          <p className="text-lg sm:text-xl font-bold text-foreground tracking-tight">{event.dosage}</p>
                                       </div>
                                       <div className="space-y-1">
                                          <span className="text-[10px] font-bold text-amber-500/70 uppercase tracking-widest block">Patient Instructions</span>
                                          <p className="text-sm font-semibold text-foreground/80 leading-relaxed">{event.instructions}</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    Prescribed By <span className="text-foreground bg-card border border-border px-2 py-0.5 rounded-md">{event.prescribedBy}</span>
                                 </div>
                              </div>
                            )}

                            {event.type === 'diagnostic' && (
                              <div className="space-y-6">
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div className="p-5 rounded-[16px] bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-center shadow-sm">
                                       <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">Final Result</span>
                                       <p className="text-base font-bold text-foreground">{event.result}</p>
                                    </div>
                                    <div className="md:col-span-2 p-5 rounded-[16px] bg-card border border-border shadow-sm">
                                       <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Clinical Analysis</span>
                                       <p className="text-sm font-medium text-foreground/80 leading-relaxed">{event.analysis}</p>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 w-fit px-3 py-1.5 rounded-lg border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">
                                    <ShieldCheck className="h-4 w-4" /> All checks verified
                                 </div>
                              </div>
                            )}

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
