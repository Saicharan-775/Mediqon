import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, CheckCircle, Archive, Trash2, ShieldAlert, Sparkles, Clock, ShieldCheck, Globe, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const notificationTypes = {
  appointment: { icon: Calendar, color: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' },
  reminder: { icon: Clock, color: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' },
  alert: { icon: ShieldAlert, color: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20' },
  system: { icon: Sparkles, color: 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20' },
};

export default function Notifications() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'appointment', title: 'Appointment Confirmed', desc: 'Your consultation with Dr. Sarah Johnson is confirmed for Tomorrow at 10:45 AM.', time: '2h ago', isRead: false },
    { id: 2, type: 'alert', title: 'Health Alert', desc: 'Unusual heart rate detected during your last measurements. A review is recommended.', time: '5h ago', isRead: false },
    { id: 3, type: 'reminder', title: 'Prescription Refill', desc: 'Your Amoxicillin 500mg course is ending in 2 days. Refill available at Mediqon Pharmacy.', time: '1d ago', isRead: true },
    { id: 4, type: 'system', title: 'Security Update', desc: 'Mediqon system has been updated to v2.4.9 for enhanced data security.', time: '2d ago', isRead: true },
  ]);

  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const toggleReadStatus = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  const deleteNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  const filteredNotifications = activeTab === 'all' ? notifications : notifications.filter(n => n.type === activeTab);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-10 fade-in">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground flex items-center gap-3">
            Notifications 
            {unreadCount > 0 && <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]">{unreadCount}</span>}
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Real-time alerts, clinical reminders, and hospital communications.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
             onClick={markAllAsRead}
             className="px-4 py-2 border border-border rounded-xl text-xs font-bold uppercase tracking-widest text-muted-foreground bg-card hover:bg-muted transition-all flex items-center gap-2 shadow-sm"
           >
              <CheckCircle className="h-4 w-4" /> Mark all read
           </button>
           <div className="flex bg-muted p-1 rounded-xl border border-border shadow-inner overflow-x-auto no-scrollbar max-w-full">
              {['all', 'appointment', 'reminder', 'alert'].map(type => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`px-4 py-2 text-[12px] font-semibold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                    activeTab === type ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {type}
                </button>
              ))}
           </div>
        </div>
      </header>

      {/* Notifications List */}
      <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notif, idx) => {
                const InfoType = notificationTypes[notif.type] || notificationTypes.system;
                return (
                  <motion.div
                    layout
                    key={notif.id}
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: idx * 0.02 }}
                    className={`relative p-5 sm:p-6 rounded-[20px] transition-all flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6 border shadow-sm group ${
                      notif.isRead 
                        ? 'bg-muted/20 border-border/50 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 hover:bg-card' 
                        : 'bg-card border-border hover:border-primary/30'
                    }`}
                  >
                    {!notif.isRead && (
                      <div className="absolute top-4 right-4 sm:top-auto sm:right-auto sm:-left-1.5 sm:top-8 h-3 w-3 rounded-full bg-primary border-2 border-card z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    )}

                    <div className={`h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-xl border flex-shrink-0 ${InfoType.color}`}>
                        <InfoType.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>

                    <div className="flex-1 min-w-0 pr-4">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h3 className={`text-base font-bold tracking-tight text-foreground ${!notif.isRead && 'underline decoration-primary/20 underline-offset-4'}`}>
                            {notif.title}
                          </h3>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-2">
                          {notif.desc}
                        </p>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                           {notif.time}
                        </span>
                    </div>

                    {/* Right Control Area */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleReadStatus(notif.id)}
                          className={`h-9 w-9 flex items-center justify-center rounded-lg border transition-all ${
                            notif.isRead 
                              ? 'bg-card border-border hover:bg-muted text-muted-foreground' 
                              : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
                          }`}
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteNotification(notif.id)}
                          className="h-9 w-9 flex items-center justify-center rounded-lg bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive/20 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
               <div className="flex flex-col items-center justify-center py-32 gap-6 bg-card border border-border rounded-[24px]">
                  <div className="h-16 w-16 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground/30">
                     <Bell className="h-8 w-8" />
                  </div>
                  <div className="text-center space-y-1 block">
                     <h3 className="text-foreground font-bold">You're all caught up!</h3>
                     <p className="text-muted-foreground text-sm font-medium">No new alerts or clinical updates right now.</p>
                  </div>
               </div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}
