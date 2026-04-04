import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, PhoneOff, Activity, ShieldCheck, ChevronRight, ActivitySquare, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import mediqonLogo from '../assets/mediqon-logo.png';

const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;
const vapi = new Vapi(VAPI_PUBLIC_KEY);

export default function Assistant() {
  const { user } = useAuth();
  const [isCalling, setIsCalling] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const transcriptRef = useRef(null);

  useEffect(() => {
    vapi.on("call-start", () => {
      setIsCalling(true);
      setTranscripts([{ role: "assistant", text: "Connected. How can I help you today?", isFinal: true }]);
    });

    vapi.on("call-end", () => {
      setIsCalling(false);
    });

    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcript, transcriptType } = message;
        if (transcriptType === "partial") {
          setActiveMessage({ role, text: transcript });
        } else if (transcriptType === "final") {
          setActiveMessage(null);
          setTranscripts(prev => [...prev, { role, text: transcript, isFinal: true }]);
        }
      }
    });

    vapi.on("error", (error) => {
      console.error("Vapi error:", error);
      setIsCalling(false);
    });

    return () => {
      vapi.removeAllListeners();
      vapi.stop();
    };
  }, []);

  useEffect(() => {
    if (transcriptRef.current) {
        transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcripts, activeMessage]);

  const startCall = () => {
    const currentId = user?.userId || user?.id || user?.sub || 'unknown';
    vapi.start(VAPI_ASSISTANT_ID, {
      firstMessageMode: "assistant-speaks-first",
      firstMessage: "Hello! How can I assist you with your booking today?",
      metadata: { patientId: currentId }
    });
  };

  const stopCall = () => vapi.stop();

  return (
    <div className="w-full h-[calc(100vh-140px)] flex flex-col items-center justify-center fade-in">
      
      {!isCalling && transcripts.length === 0 ? (
        <div className="flex flex-col items-center justify-center max-w-md text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150" />
            <div className="h-20 w-20 bg-card border border-border rounded-2xl flex items-center justify-center shadow-lg relative z-10 overflow-hidden">
               <img src={mediqonLogo} alt="Mediqon AI" className="h-full w-full object-cover" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Mediqon AI</h2>
            <p className="text-sm font-medium text-muted-foreground mt-2 leading-relaxed">
              Your voice-activated healthcare assistant. You can ask to book appointments, check doctor availability, or review your schedule.
            </p>
          </div>
          <button 
            onClick={startCall}
            className="group relative px-8 py-3.5 bg-primary text-primary-foreground rounded-full flex items-center justify-center gap-3 transition-all hover:opacity-90 w-full shadow-sm"
          >
            <Mic className="h-4 w-4" />
            <span className="font-semibold text-sm tracking-wide">Start Voice Session</span>
            <ChevronRight className="h-4 w-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl h-full flex flex-col bg-card border border-border shadow-sm rounded-3xl overflow-hidden">
          
          {/* Header */}
          <header className="px-6 py-4 bg-card border-b border-border/50 flex items-center justify-between shadow-sm z-10">
             <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-xl text-primary border border-primary/20">
                   <ActivitySquare className="h-5 w-5" />
                </div>
                <div>
                   <h3 className="font-bold text-foreground leading-none">AI Agent</h3>
                   <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                     <span className={`h-1.5 w-1.5 rounded-full ${isCalling ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground/30'}`} />
                     {isCalling ? 'Listening & Analyzing' : 'Disconnected'}
                   </div>
                </div>
             </div>
             
             {isCalling ? (
               <button 
                 onClick={stopCall}
                 className="h-10 px-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-destructive/20 transition-colors"
               >
                 <PhoneOff className="h-4 w-4" /> End Call
               </button>
             ) : (
               <button 
                 onClick={startCall}
                 className="h-10 px-4 bg-primary/10 text-primary border border-primary/20 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary/20 transition-colors"
               >
                 <Mic className="h-4 w-4" /> Connect
               </button>
             )}
          </header>

          {/* Chat Canvas */}
          <div 
            ref={transcriptRef}
            className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-muted/30"
          >
             {transcripts.map((t, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex w-full ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col gap-1.5 max-w-[85%] ${t.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
                        {t.role === 'user' ? 'You' : 'Agent'}
                    </span>
                    <div className={`px-5 py-3.5 rounded-[20px] text-[15px] font-medium leading-relaxed ${
                      t.role === 'user' 
                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10 rounded-tr-sm' 
                        : 'bg-card border border-border text-foreground shadow-sm rounded-tl-sm'
                    }`}>
                      {t.text}
                    </div>
                  </div>
                </motion.div>
             ))}

             {activeMessage && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                 className={`flex w-full ${activeMessage.role === 'user' ? 'justify-end' : 'justify-start'}`}
               >
                 <div className={`flex flex-col gap-1.5 max-w-[85%] ${activeMessage.role === 'user' ? 'items-end' : 'items-start'}`}>
                   <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
                       {activeMessage.role === 'user' ? 'You speaking...' : 'Agent typing...'}
                   </span>
                   <div className={`px-5 py-3.5 rounded-[20px] text-[15px] font-medium leading-relaxed ${
                     activeMessage.role === 'user' 
                       ? 'bg-primary/80 text-primary-foreground/90 rounded-tr-sm' 
                       : 'bg-card border border-border/50 text-muted-foreground rounded-tl-sm'
                   }`}>
                     {activeMessage.text}
                     <span className="inline-block ml-1 animate-pulse">▋</span>
                   </div>
                 </div>
               </motion.div>
             )}
          </div>
          
          {/* Footer */}
          <div className="bg-card border-t border-border/50 p-4 flex items-center justify-center gap-2">
             <ShieldCheck className="h-4 w-4 text-emerald-500" />
             <span className="text-xs font-semibold text-muted-foreground">HIPAA Compliant Processing • End-to-End Encrypted</span>
          </div>

        </div>
      )}
    </div>
  );
}
