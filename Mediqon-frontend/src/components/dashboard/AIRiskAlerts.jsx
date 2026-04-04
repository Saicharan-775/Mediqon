import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertCircle, Info, MoreHorizontal, ArrowRight, Zap } from 'lucide-react';

const alertIcons = {
  high: ShieldAlert,
  medium: AlertCircle,
  low: Info,
};

const alertColors = {
  high: 'from-rose-500/20 to-transparent text-rose-400 border-rose-500/10',
  medium: 'from-amber-500/20 to-transparent text-amber-400 border-amber-500/10',
  low: 'from-sky-500/20 to-transparent text-sky-400 border-sky-500/10',
};

export default function AIRiskAlerts({ alerts = [] }) {
  // Mock alerts if none provided
  const displayAlerts = alerts.length > 0 ? alerts : [
    { 
      id: 1, 
      type: 'high', 
      title: 'Potential Blood Pressure Anomaly', 
      desc: 'Significant spike detected in recent measurements. Immediate review recommended.',
      action: 'Consult Specialist'
    },
    { 
      id: 2, 
      type: 'medium', 
      title: 'Sleep Disruptions Detected', 
      desc: '72-hour monitoring shows 15% increase in nocturnal restlessness.',
      action: 'Review Trends'
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500 antialiased">Insights</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Health Insights</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatePresence>
          {displayAlerts.map((alert, i) => {
            const Icon = alertIcons[alert.type];
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className={`relative group bg-[#09090b] rounded-[1.5rem] border border-white/[0.05] p-6 overflow-hidden flex flex-col gap-6 shadow-xl h-full`}
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br ${alertColors[alert.type]} blur-[40px] opacity-10`} />
                
                <div className="flex items-start gap-5">
                  <div className={`h-11 w-11 flex items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.05] ${alert.type === 'high' ? 'text-rose-400' : 'text-amber-400'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${alert.type === 'high' ? 'text-rose-400' : 'text-amber-400'}`}>
                      {alert.type} Risk
                    </span>
                    <h4 className="text-base font-bold text-white tracking-tight leading-tight">{alert.title}</h4>
                  </div>
                </div>

                <div className="flex flex-col gap-6 flex-1">
                  <p className="text-sm font-medium text-neutral-400 leading-relaxed antialiased line-clamp-2">
                    {alert.desc}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.02]">
                    <div className="flex -space-x-2">
                      {[1, 2].map(j => (
                        <div key={j} className="h-6 w-6 rounded-full border-2 border-[#09090b] bg-white/[0.05]" />
                      ))}
                    </div>
                    <button className="flex items-center gap-2 group-hover:text-white text-neutral-400 text-xs font-bold transition-all">
                      {alert.action}
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
