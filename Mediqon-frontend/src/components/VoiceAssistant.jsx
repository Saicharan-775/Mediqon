import React, { useState, useEffect, useRef, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, PhoneOff, Activity, ShieldCheck, Waves, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

const vapi = new Vapi(VAPI_PUBLIC_KEY);

export default function VoiceAssistant({ onCallEnd, user }) {
  const [isCalling, setIsCalling] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);
  const transcriptRef = useRef(null);
  const onCallEndRef = useRef(onCallEnd);

  // Keep ref in sync so event handlers always have the latest callback
  useEffect(() => {
    onCallEndRef.current = onCallEnd;
  }, [onCallEnd]);

  const startCall = useCallback(() => {
    setShowTranscript(true);
    setTranscripts([]);
    setActiveMessage(null);
    const currentId = user?.userId || user?.id || user?.sub || 'unknown';
    vapi.start(VAPI_ASSISTANT_ID, {
      metadata: { patientId: currentId }
    });
  }, [user]);

  useEffect(() => {
    const onCallStart = () => {
      setIsCalling(true);
      setShowTranscript(true);
    };

    const onCallEndHandler = () => {
      setIsCalling(false);
      setActiveMessage(null);
      if (onCallEndRef.current) onCallEndRef.current();
    };

    const onMessage = (message) => {
      if (message.type === "transcript") {
        const { role, transcript, transcriptType } = message;
        if (!transcript || transcript.trim().length === 0) return;

        if (transcriptType === "partial") {
          setActiveMessage({ role, text: transcript });
        } else if (transcriptType === "final") {
          setActiveMessage(null);
          setTranscripts(prev => {
            // Deduplicate: skip if the last message from the same role has the same text
            const lastMsg = prev[prev.length - 1];
            if (lastMsg && lastMsg.role === role && lastMsg.text === transcript) {
              return prev;
            }
            // Also skip if text is a substring of the last message or vice versa (VAPI retranscription)
            if (lastMsg && lastMsg.role === role) {
              if (lastMsg.text.includes(transcript) || transcript.includes(lastMsg.text)) {
                // Keep the longer version
                if (transcript.length > lastMsg.text.length) {
                  return [...prev.slice(0, -1), { role, text: transcript, isFinal: true }];
                }
                return prev;
              }
            }
            return [...prev.slice(-20), { role, text: transcript, isFinal: true }];
          });
        }
      }

      if (message.type === "tool-calls-result") {
        window.dispatchEvent(new CustomEvent('sync-appointments'));
        if (onCallEndRef.current) onCallEndRef.current();
      }
    };

    const onError = (error) => {
      console.error("Vapi error:", error);
      setIsCalling(false);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEndHandler);
    vapi.on("message", onMessage);
    vapi.on("error", onError);

    const handleTrigger = () => startCall();
    window.addEventListener('trigger-vapi', handleTrigger);

    return () => {
      vapi.removeAllListeners();
      window.removeEventListener('trigger-vapi', handleTrigger);
    };
  }, [startCall]);

  useEffect(() => {
    if (transcriptRef.current) {
        transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcripts, activeMessage]);



  const stopCall = () => vapi.stop();

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-6 antialiased">
      
      {/* Premium Apple-Style Secure Terminal Panel */}
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="w-[340px] overflow-hidden rounded-[2rem] border border-border bg-card/90 shadow-xl backdrop-blur-3xl"
          >
            {/* Header: Security Status */}
            <div className="border-b border-border bg-muted px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-1.5 w-1.5 rounded-full ${isCalling ? 'bg-emerald-500 animate-pulse' : (transcripts.length === 0 ? 'bg-amber-500 animate-pulse' : 'bg-muted-foreground')}`} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {isCalling ? 'Active Session' : (transcripts.length === 0 ? 'Connecting...' : 'Past Conversations')}
                </span>
              </div>
              <button 
                onClick={() => setShowTranscript(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-all transform hover:rotate-90"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Transcript Engine */}
            <div 
              ref={transcriptRef}
              className="max-h-[320px] overflow-y-auto px-6 py-8 space-y-6 scrollbar-hide"
            >
              {transcripts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                   <Loader2 className="h-8 w-8 text-primary animate-spin" />
                   <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                     {isCalling ? 'Waiting for assistant...' : 'Securing Connection...'}
                   </p>
                </div>
              )}

              {transcripts.map((t, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: t.role === 'user' ? 5 : -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx} 
                  className={`flex flex-col ${t.role === 'user' ? 'items-end text-right' : 'items-start text-left'}`}
                >
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">
                      {t.role === 'user' ? 'Patient' : 'Agent'}
                  </span>
                  <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed shadow-sm ${
                    t.role === 'user' 
                      ? 'bg-primary text-primary-foreground border border-primary/20' 
                      : 'bg-card text-foreground border border-border'
                  }`}>
                    {t.text}
                  </div>
                </motion.div>
              ))}
              
              {/* Active Breathing Message */}
              {activeMessage && (
                <div className={`flex flex-col ${activeMessage.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className={`text-[9px] font-bold uppercase tracking-widest mb-2 px-1 ${
                    activeMessage.role === 'user' ? 'text-primary' : 'text-emerald-500'
                  }`}>
                    {activeMessage.role === 'user' ? 'Listening...' : 'Thinking...'}
                  </span>
                  <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed shadow-sm ${
                    activeMessage.role === 'user' 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {activeMessage.text}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom: Connection Meta */}
            <div className="bg-muted px-6 py-4 flex items-center justify-between border-t border-border">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Private & Secure</span>
                </div>
                {isCalling && (
                    <button 
                      onClick={stopCall}
                      className="group flex items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1.5 text-[10px] font-bold text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                    >
                      <PhoneOff className="h-3 w-3" />
                      Disconnect
                    </button>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Liquid Mesh Assistant Orb - iOS Inspired */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (isCalling) {
            if (!showTranscript) {
              setShowTranscript(true);
            } else {
              stopCall();
            }
          } else {
            startCall();
          }
        }}
        className={`relative flex h-20 w-20 items-center justify-center rounded-3xl border transition-all duration-700 ${
          isCalling 
            ? "bg-card border-border" 
            : "bg-card border-border hover:border-primary/50 hover:bg-muted"
        } shadow-lg overflow-hidden`}
      >
        <AnimatePresence>
          {isCalling && (
            <>
              {/* Mesh Layer 1: Medical Blue */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                  borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-tr from-emerald-500/40 to-sky-500/40 blur-2xl"
              />
              {/* Mesh Layer 2: Core Activity Pulse */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-emerald-500/20 blur-sm bg-emerald-500/10"
              />
            </>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex items-center justify-center">
          {isCalling ? (
            <motion.div 
               animate={{ scale: [1, 1.2, 1] }} 
               transition={{ repeat: Infinity, duration: 2 }}
               className="text-emerald-600 group-hover:text-emerald-700"
            >
                <Waves className="h-7 w-7" />
            </motion.div>
          ) : (
            <div className="relative">
              <Mic className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary border border-card" />
            </div>
          )}
        </div>
      </motion.button>

    </div>
  );
}
