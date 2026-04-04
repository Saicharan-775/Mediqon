import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Heart } from 'lucide-react';

export default function HealthScore({ score = 85 }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative bg-[#09090b] rounded-[2rem] border border-white/[0.05] p-8 overflow-hidden group shadow-2xl">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/10 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
      
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative h-44 w-44 flex items-center justify-center">
          {/* Background circle */}
          <svg className="h-full w-full rotate-[-90deg]">
            <circle
              cx="88"
              cy="88"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-white/[0.03]"
            />
            {/* Progress circle */}
            <motion.circle
              cx="88"
              cy="88"
              r={radius}
              stroke="url(#healthGradient)"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-4xl font-black text-white tracking-tighter"
            >
              {score}
            </motion.span>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Score</span>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white tracking-tight">Health Index</h3>
            <p className="text-sm text-neutral-400 font-medium leading-relaxed">Everything looks good today. Your recent measurements are within the target range.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-neutral-500 block">Heart Rate</span>
                <span className="text-sm font-bold text-white">Normal</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-neutral-500 block">Vitals</span>
                <span className="text-sm font-bold text-white">Stable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
