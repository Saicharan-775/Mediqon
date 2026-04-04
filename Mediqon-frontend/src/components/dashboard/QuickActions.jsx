import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mic, Upload, Plus, ChevronRight, LayoutGrid, Database, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickActions({ onStartVoiceAssistant }) {
  const actions = [
    { 
      id: 'book',
      title: 'Schedule Appointment',
      desc: 'Manual medical booking system',
      icon: Calendar,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      path: '/bookings'
    },
    { 
      id: 'assistant',
      title: 'Vapi Voice Assistant',
      desc: 'Smart hospital interactions',
      icon: Mic,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      onClick: onStartVoiceAssistant
    },
    { 
      id: 'upload',
      title: 'Upload Bio-Report',
      desc: 'Secure cloud syncing of clinical data',
      icon: Upload,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      path: '#'
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 antialiased">Command Hub</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Operation Control</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {actions.map((action, i) => {
          const Content = (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-[#09090b] rounded-[1.5rem] border border-white/[0.05] hover:border-white/[0.1] transition-all flex items-center gap-6 group shadow-xl h-full cursor-pointer"
            >
              <div className={`h-14 w-14 flex items-center justify-center rounded-2xl border ${action.color}`}>
                <action.icon className="h-6 w-6" />
              </div>

              <div className="flex-1 space-y-1">
                <h4 className="text-base font-bold text-neutral-100 tracking-tight leading-none">{action.title}</h4>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">{action.desc}</p>
              </div>

              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.08] text-neutral-600 group-hover:text-white transition-all">
                <ChevronRight className="h-4 w-4" />
              </div>
            </motion.div>
          );

          if (action.path && action.path !== '#') {
            return <Link to={action.path} key={action.id} className="block">{Content}</Link>;
          }

          return (
            <div key={action.id} onClick={action.onClick} className="block">
              {Content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
