import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShieldCheck, Bell, Activity, Clock, LogOut, ChevronRight, UserCheck, ShieldAlert, Sparkles, Camera, Loader2, Database, Globe, AlertCircle, Beaker } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const settingSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'health', label: 'Health Data', icon: Activity, only: 'patient' },
  { id: 'availability', label: 'Schedule', icon: Clock, only: 'doctor' },
];

export default function Settings() {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const isDoctor = user?.role === 'doctor' || user?.role === 'DOCTOR';

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addToast('Settings updated successfully', 'success');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 pb-10 fade-in">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Configure your profile, security, and notification preferences.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
         
         {/* Left Sidebar Navigation */}
         <aside className="lg:col-span-1 space-y-2">
            <div className="mb-8 p-6 rounded-[24px] bg-card border border-border shadow-sm flex flex-col items-center gap-4">
               <div className="relative group">
                  <div className="h-20 w-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xl font-bold uppercase text-primary">
                     {user?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
                  </div>
                  <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                     <Camera className="h-3 w-3" />
                  </button>
               </div>
               <div className="text-center">
                  <h3 className="text-sm font-bold text-foreground">{user?.fullName || 'User Account'}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1 capitalize">{user?.role || 'User'}</p>
               </div>
            </div>

            <div className="space-y-1">
              {settingSections.map(section => {
                if (section.only && section.only !== (isDoctor ? 'doctor' : 'patient')) return null;
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                      activeTab === section.id 
                        ? 'bg-primary/10 text-primary shadow-sm border border-primary/20' 
                        : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {section.label}
                    {activeTab === section.id && <motion.div layoutId="settingActive" className="ml-auto text-primary"><ChevronRight className="h-4 w-4" /></motion.div>}
                  </button>
                );
              })}
            </div>

            <div className="pt-8 mt-8 border-t border-border">
               <button
                 onClick={logout}
                 className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent text-destructive border border-destructive/20 hover:bg-destructive/10 text-sm font-bold transition-all group"
               >
                  <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Sign Out
               </button>
            </div>
         </aside>

         {/* Right Settings Content */}
         <div className="lg:col-span-3 min-h-[600px]">
            <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                 className="p-8 lg:p-10 bg-card rounded-[24px] border border-border shadow-sm h-full"
               >
                  {/* Profile Form */}
                  {activeTab === 'profile' && (
                     <form onSubmit={handleUpdate} className="space-y-8 max-w-2xl">
                        <div className="pb-6 border-b border-border/50 space-y-1">
                           <h3 className="text-xl font-bold tracking-tight text-foreground">Profile Information</h3>
                           <p className="text-sm font-medium text-muted-foreground">Update your personal details and account preferences.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                              <input defaultValue={user?.fullName} className="w-full bg-card border border-border rounded-xl p-3.5 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                              <input readOnly defaultValue={user?.email} className="w-full bg-muted border border-border rounded-xl p-3.5 text-sm font-semibold text-muted-foreground cursor-not-allowed shadow-sm" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">System ID</label>
                              <input readOnly defaultValue={user?.id} className="w-full bg-muted border border-border rounded-xl p-3.5 text-xs font-mono text-muted-foreground cursor-not-allowed shadow-sm" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Account Type</label>
                              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between shadow-sm">
                                 <span className="text-sm font-bold capitalize text-emerald-600 dark:text-emerald-400">{user?.role} Access</span>
                                 <UserCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                              </div>
                           </div>
                        </div>
                        
                        <div className="pt-6">
                           <button type="submit" className="px-8 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                              {loading && <Loader2 className="h-4 w-4 animate-spin" />} Save Changes
                           </button>
                        </div>
                     </form>
                  )}

                  {/* Security Form */}
                  {activeTab === 'security' && (
                     <div className="space-y-8 max-w-2xl">
                        <div className="pb-6 border-b border-border/50 space-y-1">
                           <h3 className="text-xl font-bold tracking-tight text-foreground">Security Settings</h3>
                           <p className="text-sm font-medium text-muted-foreground">Manage your password and authentication methods.</p>
                        </div>

                        <div className="space-y-6">
                           <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Current Password</label>
                              <input type="password" placeholder="••••••••••••" className="w-full bg-card border border-border rounded-xl p-3.5 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">New Password</label>
                              <input type="password" placeholder="New secure password" className="w-full bg-card border border-border rounded-xl p-3.5 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm" />
                           </div>
                           <div className="pt-2 flex items-start gap-4 p-5 rounded-[16px] bg-destructive/10 border border-destructive/20 shadow-sm">
                              <ShieldAlert className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                 <p className="text-sm font-bold text-destructive">Two-Factor Authentication</p>
                                 <p className="text-xs font-medium text-destructive/80 leading-relaxed">2FA is highly recommended to protect your clinical records. We suggest linking an authenticator app.</p>
                              </div>
                           </div>
                           <div className="pt-4">
                              <button onClick={handleUpdate} className="px-8 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all shadow-sm">
                                 Update Security
                              </button>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Notifications */}
                  {activeTab === 'notifications' && (
                     <div className="space-y-8">
                        <div className="pb-6 border-b border-border/50 space-y-1">
                           <h3 className="text-xl font-bold tracking-tight text-foreground">Notification Alerts</h3>
                           <p className="text-sm font-medium text-muted-foreground">Manage how you receive clinical updates and reminders.</p>
                        </div>

                        <div className="space-y-4 max-w-3xl">
                           {[
                              { id: 'n1', label: 'Health Alerts', desc: 'Alerts for unusual metrics or symptoms.', icon: Activity },
                              { id: 'n2', label: 'Appointment Reminders', icon: Clock, desc: 'Notifications for your upcoming bookings.' },
                              { id: 'n3', label: 'Prescription Updates', icon: Beaker, desc: 'Alerts when your medications are ready.' },
                              { id: 'n4', label: 'System Updates', icon: ShieldCheck, desc: 'General platform news and security updates.' }
                           ].map((item, i) => (
                              <div key={item.id} className="p-5 rounded-[16px] bg-card border border-border flex items-center justify-between group hover:border-primary/30 transition-all shadow-sm">
                                 <div className="flex items-center gap-4 sm:gap-6">
                                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                       <item.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                       <h4 className="text-sm font-bold text-foreground">{item.label}</h4>
                                       <p className="text-xs font-medium text-muted-foreground mt-0.5">{item.desc}</p>
                                    </div>
                                 </div>
                                 <div className="flex items-center shrink-0 ml-4">
                                    <div className="h-6 w-11 rounded-full bg-primary/20 p-1 flex justify-end cursor-pointer shadow-inner">
                                       <div className="h-4 w-4 rounded-full bg-primary shadow-sm" />
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Health Data (Patient Only) */}
                  {activeTab === 'health' && (
                     <div className="space-y-8">
                        <div className="pb-6 border-b border-border/50 space-y-1">
                           <h3 className="text-xl font-bold tracking-tight text-foreground">Health Data</h3>
                           <p className="text-sm font-medium text-muted-foreground">Manage the clinical records stored on your account.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                           <div className="p-6 sm:p-8 rounded-[24px] bg-primary/5 border border-primary/20 shadow-sm flex flex-col justify-between">
                              <div className="flex items-start justify-between mb-8">
                                 <div className="h-12 w-12 rounded-[14px] bg-primary/10 flex items-center justify-center text-primary">
                                    <Database className="h-6 w-6" />
                                 </div>
                                 <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-card px-2 py-1 rounded-md border border-border">Online</span>
                              </div>
                              <div className="space-y-1.5 mb-6">
                                 <h4 className="text-xl font-bold text-foreground tracking-tight">Data Storage</h4>
                                 <p className="text-sm font-medium text-muted-foreground">Lifetime storage for your lab results and notes.</p>
                              </div>
                              <div className="space-y-3 pt-6 border-t border-border/50">
                                 <div className="flex items-center justify-between text-sm">
                                    <span className="font-semibold text-muted-foreground">Space Used</span>
                                    <span className="font-bold text-foreground">142.8 GB / 1TB</span>
                                 </div>
                                 <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full w-[15%] bg-primary rounded-full" />
                                 </div>
                              </div>
                           </div>

                           <div className="flex flex-col gap-4">
                              <button className="flex-1 p-6 rounded-[20px] bg-card border border-border flex flex-col items-start justify-center group hover:border-primary/30 transition-all shadow-sm">
                                 <Globe className="h-6 w-6 text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
                                 <span className="text-sm font-bold text-foreground">Export Medical History</span>
                                 <span className="text-xs font-medium text-muted-foreground mt-1 text-left">Download your data in standard JSON format.</span>
                              </button>
                              <button className="flex-1 p-6 rounded-[20px] bg-card border border-border flex flex-col items-start justify-center group hover:border-destructive/30 hover:bg-destructive/5 transition-all shadow-sm">
                                 <AlertCircle className="h-6 w-6 text-muted-foreground group-hover:text-destructive mb-3 transition-colors" />
                                 <span className="text-sm font-bold text-destructive">Request Data Deletion</span>
                                 <span className="text-xs font-medium text-destructive/70 mt-1 text-left">Permanently erase your records from our systems.</span>
                              </button>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Doctor Availability */}
                  {activeTab === 'availability' && (
                     <div className="space-y-8">
                        <div className="pb-6 border-b border-border/50 space-y-1">
                           <h3 className="text-xl font-bold tracking-tight text-foreground">Work Schedule</h3>
                           <p className="text-sm font-medium text-muted-foreground">Set your consultation and operation hours.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                           <div className="space-y-6">
                              <div className="space-y-3">
                                 <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active Shift Hours</span>
                                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Standard Slot</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <input defaultValue="09:00" className="flex-1 bg-card border border-border rounded-xl p-3.5 text-sm font-bold text-foreground text-center shadow-sm" />
                                    <span className="text-xs font-bold text-muted-foreground">TO</span>
                                    <input defaultValue="17:00" className="flex-1 bg-card border border-border rounded-xl p-3.5 text-sm font-bold text-foreground text-center shadow-sm" />
                                 </div>
                              </div>

                              <div className="space-y-3 pt-4 border-t border-border">
                                 <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block">Live Status</span>
                                 <div className="p-4 rounded-[16px] bg-card border border-border shadow-sm flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                       <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                                       <span className="text-sm font-bold text-foreground">Available Online</span>
                                    </div>
                                    <div className="h-6 w-11 rounded-full bg-emerald-500 p-1 flex justify-end cursor-pointer">
                                       <div className="h-4 w-4 rounded-full bg-card shadow-sm" />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="bg-muted border border-border rounded-[20px] p-8 flex flex-col items-center justify-center text-center shadow-sm">
                              <Clock className="h-10 w-10 text-muted-foreground/30 mb-4" />
                              <h4 className="text-base font-bold text-foreground mb-2">Calendar Sync</h4>
                              <p className="text-xs font-medium text-muted-foreground leading-relaxed mb-6 px-4">Changes to your schedule are automatically synced with the Vapi voice assistant.</p>
                              <button className="w-full py-3 rounded-xl bg-card border border-border text-foreground text-sm font-bold shadow-sm hover:bg-muted transition-all">
                                 Update Schedule
                              </button>
                           </div>
                        </div>
                     </div>
                  )}
               </motion.div>
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
