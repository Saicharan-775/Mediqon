import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Mic, MicOff, VideoOff, PhoneOff, 
  MessageSquare, Users, Settings, Share, 
  Hand, Maximize, Layout, MoreVertical,
  Minus, Plus, ShieldCheck, Heart, Activity, Camera, Info
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Consultation() {
  const { user } = useAuth();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      setTime(`${hrs > 0 ? hrs.toString().padStart(2, '0') + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full w-full max-w-[1400px] mx-auto overflow-hidden fade-in relative px-2">
      
      {/* Consultation Bar */}
      <div className="flex items-center justify-between p-6 bg-[#09090b] border border-white/[0.08] rounded-[2rem] mb-6 shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/10">
             <Video className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h1 className="text-sm font-black uppercase tracking-[0.2em] text-white">Clinical Telemetry</h1>
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest border border-rose-500/10 animate-pulse">
                    <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    Live Transmission
                </span>
                <span className="text-neutral-700">•</span>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">DR. SARAH JOHNSON</span>
                <span className="text-neutral-700">•</span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">{time}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="flex -space-x-3 pr-2 hidden sm:flex">
                {[1, 2].map(i => (
                    <div key={i} className="h-9 w-9 rounded-full border-2 border-[#09090b] bg-neutral-800 p-0.5 overflow-hidden shadow-2xl">
                        <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="attendee" className="h-full w-full object-cover rounded-full grayscale" />
                    </div>
                ))}
            </div>
            <div className="h-10 w-px bg-white/5 mx-2 hidden sm:block" />
            <button className="h-11 w-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/10 transition-all">
                <Settings className="h-5 w-5" />
            </button>
            <button className="h-11 w-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/10 transition-all">
                <Maximize className="h-5 w-5" />
            </button>
        </div>
      </div>

      {/* Primary Environment */}
      <div className="flex flex-1 gap-6 overflow-hidden min-h-0 pb-10">
        
        {/* Visual Engine */}
        <div className="flex-1 relative group bg-black rounded-[3rem] overflow-hidden border border-white/[0.08] shadow-inner shadow-black/50 overflow-hidden ring-4 ring-white/[0.03]">
           {/* Remote View */}
           <div className="absolute inset-0 flex flex-col items-center justify-center transition-all">
                <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200&h=800" 
                    alt="Doctor Feed" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000 grayscale-[0.2] group-hover:grayscale-0 scale-105"
                />
                {/* Visual Grain / Noise Overlay */}
                <div className="absolute inset-0 bg-neutral-900/5 backdrop-blur-[1px] mix-blend-overlay opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                
                {/* HUD Data Overlays */}
                <div className="absolute top-10 left-10 space-y-4">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-4 rounded-[2rem] bg-black/40 backdrop-blur-2xl border border-white/10 flex items-center gap-4">
                       <div className="h-10 w-10 rounded-[1rem] bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                          <Activity className="h-5 w-5" />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Signal Integrity</p>
                          <p className="text-xs font-bold text-white uppercase">99.2% LOSSLESS</p>
                       </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-12 right-12 flex flex-col gap-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-6 rounded-[2.5rem] bg-black/40 backdrop-blur-3xl border border-white/10 flex items-center gap-6 shadow-2xl">
                        <div className="h-12 w-12 rounded-[1.2rem] bg-rose-500/20 text-rose-500 flex items-center justify-center border border-rose-500/20">
                            <Heart className="h-6 w-6 animate-pulse fill-rose-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Biometric Sync</p>
                            <p className="text-2xl font-black text-white tracking-widest">72 <span className="text-xs text-neutral-600 font-bold">BPM</span></p>
                        </div>
                    </motion.div>
                </div>
           </div>

           {/* Self HUD */}
           <div className="absolute top-10 right-10 w-64 h-40 rounded-[2rem] border border-white/20 overflow-hidden shadow-2xl z-20 group/self overflow-hidden hover:scale-105 transition-all">
                <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                    {isVideoOn ? (
                        <div className="h-full w-full bg-gradient-to-br from-indigo-500/20 to-sky-500/20 flex items-center justify-center relative">
                            <span className="text-[40px] font-black text-white/5 uppercase tracking-widest italic select-none">SYST-USER</span>
                            <div className="absolute inset-0 backdrop-blur-[2px]" />
                        </div>
                    ) : (
                        <div className="h-full w-full bg-neutral-950 flex items-center justify-center flex-col gap-3">
                            <VideoOff className="h-8 w-8 text-neutral-800" />
                            <span className="text-[9px] font-black text-neutral-700 uppercase tracking-widest">Video Disabled</span>
                        </div>
                    )}
                </div>
                {!isVideoOn && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />}
                <div className="absolute bottom-4 left-4 h-6 px-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center">
                   <p className="text-[9px] font-black text-white uppercase tracking-widest">You</p>
                </div>
           </div>

           {/* Core Command Deck */}
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 px-8 py-6 bg-black/60 backdrop-blur-[4rem] rounded-full border border-white/10 shadow-[0_32px_96px_-12px_rgba(0,0,0,0.8)] z-20 translate-y-24 group-hover:translate-y-0 transition-transform duration-700">
                <button 
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`h-14 w-14 rounded-full flex items-center justify-center transition-all ${isMicOn ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10' : 'bg-rose-500 text-white shadow-xl shadow-rose-500/20'}`}
                >
                    {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                </button>
                <button 
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`h-14 w-14 rounded-full flex items-center justify-center transition-all ${isVideoOn ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10' : 'bg-rose-500 text-white shadow-xl shadow-rose-500/20'}`}
                >
                    {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                </button>
                <div className="h-10 w-px bg-white/10 mx-2" />
                <button className="h-14 w-14 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all">
                    <Hand className="h-6 w-6" />
                </button>
                <button 
                    onClick={() => setShowChat(!showChat)}
                    className={`h-14 w-14 rounded-full flex items-center justify-center transition-all ${showChat ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}
                >
                    <MessageSquare className="h-6 w-6" />
                </button>
                <button className="h-14 w-14 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all">
                    <Share className="h-6 w-6" />
                </button>
                <div className="h-10 w-px bg-white/10 mx-2" />
                <button className="h-14 w-14 rounded-full bg-rose-500 text-white hover:bg-rose-600 flex items-center justify-center transition-all shadow-xl shadow-rose-500/40">
                    <PhoneOff className="h-6 w-6" />
                </button>
           </div>
        </div>

        {/* Tactical Interaction Pane */}
        <AnimatePresence>
            {showChat && (
                <motion.div 
                    initial={{ width: 0, opacity: 0, x: 20 }}
                    animate={{ width: 380, opacity: 1, x: 0 }}
                    exit={{ width: 0, opacity: 0, x: 20 }}
                    className="flex flex-col gap-6"
                >
                    <div className="flex-1 bg-[#09090b] border border-white/[0.08] rounded-[2.5rem] p-8 flex flex-col shadow-2xl overflow-hidden relative">
                        <div className="absolute -right-20 -top-20 h-40 w-40 bg-indigo-500/5 blur-[50px] rounded-full" />
                        
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Clinical Summary</h3>
                            <button className="text-neutral-600 hover:text-white transition-colors"><MoreVertical className="h-4 w-4" /></button>
                        </div>
                        
                        <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Symptom Verification</span>
                                </div>
                                <p className="text-sm font-medium text-neutral-300 leading-relaxed bg-white/[0.02] border border-white/[0.05] p-5 rounded-[1.5rem] p-4 group-hover:bg-white/[0.04] transition-colors">
                                    Patient mentions persistent localized stress in the cervical spine region. No prior history of neural inflammation reported.
                                </p>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Clinical Advisory</span>
                                </div>
                                <div className="text-sm font-medium text-white leading-relaxed bg-indigo-500/5 border border-indigo-500/20 p-6 rounded-[2rem] space-y-4">
                                    <p className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" /> Hydration optimization: 3.2L / day.</p>
                                    <p className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" /> Morning diastolic pressure monitoring.</p>
                                    <p className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" /> Follow-up diagnostics in 14 days.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 relative z-10">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Input clinical notes..."
                                    className="w-full h-14 bg-white/[0.02] border border-white/10 rounded-2xl px-6 text-sm outline-none focus:border-emerald-500/30 transition-all font-medium placeholder:text-neutral-700"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20">
                                    <Plus className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500/10 via-neutral-900 to-neutral-950 p-8 rounded-[2.5rem] border border-white/[0.08] relative overflow-hidden group shadow-2xl">
                        <ShieldCheck className="absolute -right-6 -bottom-6 h-24 w-24 text-emerald-500/10 rotate-12 group-hover:scale-110 group-hover:text-emerald-500/20 transition-all duration-700" />
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-2 relative z-10">Neural Encryption</h4>
                        <p className="text-[11px] text-neutral-500 font-bold uppercase leading-relaxed relative z-10 max-w-[200px]">
                            Transmission is end-to-end encrypted under HIPAA level-4 clinical standards.
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
}
