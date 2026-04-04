import React, { useState } from 'react';
import { ShieldCheck, FileText, Search, Plus, MoreVertical, Download, Eye, FilePieChart, Beaker, FileBadge, Calendar, Share2, Trash2, Bot, X, Sparkles, Activity, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RECORDS = [
  {
    id: 1,
    title: 'Post-Surgery Lab Results',
    category: 'Lab Report',
    date: 'March 15, 2024',
    doctor: 'Dr. Sarah Johnson',
    size: '1.2 MB',
    type: 'PDF',
    status: 'Verified',
  },
  {
    id: 2,
    title: 'Daily Medication Schedule',
    category: 'Prescription',
    date: 'March 10, 2024',
    doctor: 'Dr. Michael Chen',
    size: '450 KB',
    type: 'DOCX',
    status: 'Active',
  },
  {
    id: 3,
    title: 'Annual Health Screening 2023',
    category: 'Full Summary',
    date: 'Jan 20, 2024',
    doctor: 'Multiple Specialists',
    size: '5.8 MB',
    type: 'PDF',
    status: 'Archived',
  },
  {
    id: 4,
    title: 'X-Ray Chest PA View',
    category: 'Imaging',
    date: 'Feb 15, 2024',
    doctor: 'Dr. Elena Rodriguez',
    size: '12.4 MB',
    type: 'JPG',
    status: 'Verified',
  },
];

const CATEGORIES = [
  { name: 'All', icon: FileText, color: 'text-primary' },
  { name: 'Lab Reports', icon: Beaker, color: 'text-rose-500' },
  { name: 'Prescriptions', icon: FileBadge, color: 'text-emerald-500' },
  { name: 'Imaging', icon: FilePieChart, color: 'text-amber-500' },
];

export default function Records() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [selectedReport, setSelectedReport] = useState(null);

  const filteredRecords = RECORDS.filter(rec => 
    (selectedCategory === 'All' || rec.category.includes(selectedCategory.slice(0, -1))) &&
    (rec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     rec.doctor.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-12 py-4 animate-in fade-in slide-in-from-bottom-4 duration-1200 relative">
      
      {/* AI Analysis Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setSelectedReport(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-[#0b0c0e] border border-white/[0.08] rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/10">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">AI Report Analysis</h3>
                      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1">DATA SOURCE: {selectedReport.title.toUpperCase()}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedReport(null)} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-500 hover:text-white transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-8">
                   <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 relative overflow-hidden group">
                      <Sparkles className="absolute -right-4 -top-4 h-24 w-24 text-amber-500 opacity-5 group-hover:opacity-10 transition-opacity" />
                      <h4 className="text-xs font-black text-amber-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                         <Activity className="h-4 w-4" />
                         Clinical Synthesis
                      </h4>
                      <p className="text-sm font-medium text-neutral-300 leading-relaxed italic">
                        "The {selectedReport.category.toLowerCase()} indicates that all metabolic markers are within optimal ranges. However, AI detection suggests a slight trend in uric acid levels that warrants a follow-up in 30 days. No critical anomalies detected."
                      </p>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                         <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Confidence</p>
                         <p className="text-base font-bold text-white">99.8%</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                         <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Risk Level</p>
                         <p className="text-base font-bold text-emerald-500">Low</p>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest px-1">AI Navigation Path</p>
                      <div className="flex flex-wrap gap-2">
                         {['Check Vitals', 'Consult Dr. Chen', 'Update Timeline'].map(act => (
                            <button key={act} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2">
                               {act} <ArrowRight className="h-3 w-3" />
                            </button>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/[0.05] flex justify-end">
                   <button onClick={() => setSelectedReport(null)} className="px-10 py-4 rounded-2xl bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-xl shadow-white/5 active:scale-95">
                      Dismiss Analysis
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Header */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm border border-primary/20">
                  <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                  <h2 className="text-3xl font-black tracking-tight text-foreground">Medical Vault</h2>
                  <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="inline-block h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></span>
                    Secure & Encrypted Storage
                  </p>
              </div>
          </div>
        </div>
        
        <button className="flex h-12 items-center gap-3 rounded-2xl bg-foreground px-8 text-sm font-black text-background hover:opacity-90 shadow-xl shadow-foreground/10 transition-all">
            <Plus className="h-5 w-5" />
            Upload Document
        </button>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Total Files', value: '42', icon: FileText },
            { label: 'Storage Used', value: '85%', icon: FilePieChart },
            { label: 'New Reports', value: '3', icon: Beaker },
            { label: 'Shared Files', value: '12', icon: Share2 },
          ].map((stat, i) => (
            <div key={i} className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-all group overflow-hidden relative">
                <div className="absolute -right-4 -top-4 opacity-[0.03] rotate-12 group-hover:scale-110 group-hover:opacity-[0.05] transition-all">
                    <stat.icon size={80} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{stat.label}</p>
                <h4 className="text-2xl font-black text-foreground">{stat.value}</h4>
            </div>
          ))}
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-72 space-y-8">
            <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground px-2">Folders</p>
                <div className="space-y-2">
                    {CATEGORIES.map((cat, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                            selectedCategory === cat.name 
                              ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20' 
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                        >
                            <div className="flex items-center gap-3">
                                <cat.icon className={`h-4 w-4 ${selectedCategory === cat.name ? 'text-primary' : 'text-muted-foreground'}`} />
                                {cat.name}
                            </div>
                            {cat.name === 'All' && <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">4</span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="rounded-3xl border border-border bg-muted/30 p-6 space-y-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h5 className="text-sm font-black text-foreground tracking-tight">Privacy Guard Active</h5>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                    All documents are encrypted with AES-256 before being stored in our distributed medical nodes.
                </p>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">
                    Security Audit
                </button>
            </div>
        </div>

        {/* Document List */}
        <div className="flex-1 space-y-6">
            <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by filename or doctor..."
                  className="h-16 w-full rounded-[2rem] border border-border bg-card pl-14 pr-6 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-sm">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border bg-muted/20">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Document Name</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Shared By</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filteredRecords.map((rec) => (
                                <motion.tr 
                                  key={rec.id}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="group hover:bg-muted/30 transition-all cursor-default"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card border border-border shadow-sm group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                                                <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all" />
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-bold text-foreground group-hover:text-primary transition-all">{rec.title}</h6>
                                                <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60 flex items-center gap-2 mt-0.5">
                                                    {rec.date} <span className="h-1 w-1 rounded-full bg-border"></span> {rec.size}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-bold text-xs text-muted-foreground">
                                        <span className="px-3 py-1 bg-muted rounded-full border border-border">
                                            {rec.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                                            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px]">
                                                {rec.doctor.charAt(4)}
                                            </div>
                                            {rec.doctor}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            <button className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                                                <Download className="h-4 w-4" />
                                            </button>
                                            <button 
                                              onClick={() => setSelectedReport(rec)}
                                              className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-white/5 hover:text-amber-500 transition-all border border-transparent hover:border-amber-500/20"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                                                <Share2 className="h-4 w-4" />
                                            </button>
                                            <button className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="flex flex-col items-center justify-center py-10 gap-3">
                 <button className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all">
                    Load Archive Files
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
}
