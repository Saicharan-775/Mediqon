import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Clock, ArrowRight, ShieldCheck, Star, X, Loader2, Calendar as CalendarIcon, CheckCircle2, Award, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from 'react-router-dom';

const SPECIALTIES = ['All', 'Neurologist', 'Cardiologist', 'Oncologist', 'Psychiatrist', 'Radiologist', 'Gastroenterologist', 'Dermatologist', 'Orthopedic Surgeon', 'Pediatrician'];

export default function Doctors() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('q') || '';
  
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await api.getDoctors();
        // Advanced High-Fidelity Mock Registry
        const clinicalMocks = [
          { 
            id: 'mock-1', 
            fullName: 'Dr. Alistair Vance', 
            specialty: 'Senior Neurologist', 
            hospital: 'Central Neuro-Diagnostic Center', 
            experienceYears: 18, 
            fee: 1500, 
            rating: 4.95,
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600&h=600',
            tags: ['Neuro-Pathology', 'Board Certified'],
            bio: 'Expert in neuro-pathology with over 150 successful diagnostics in complex neurology.',
            certifications: ['Board Certified', 'PhD Neuro-Science']
          },
          { 
            id: 'mock-2', 
            fullName: 'Dr. Sarah Ishii', 
            specialty: 'Lead Cardiologist', 
            hospital: 'Royal Heart Institute', 
            experienceYears: 14, 
            fee: 1200, 
            rating: 4.88,
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600&h=600',
            tags: ['Interventional', 'Paradiagnostic'],
            bio: 'Specializing in genomic-integrated cardiac health and cardiovascular performance.',
            certifications: ['Fellowship ACP', 'MD Cardiology']
          },
          { 
            id: 'mock-3', 
            fullName: 'Dr. Marcus Thorne', 
            specialty: 'Orthopedic Surgeon', 
            hospital: 'Nexus Surgical Hospital', 
            experienceYears: 22, 
            fee: 2500, 
            rating: 4.92,
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600&h=600',
            tags: ['Joint Reconstruction', 'Trauma'],
            bio: 'Leading surgeon for advanced skeletal-reconstruction and cellular joint therapy.',
            certifications: ['Board Certified', 'Surgical Pioneer Award']
          },
          { 
            id: 'mock-4', 
            fullName: 'Dr. Priya Sharma', 
            specialty: 'Clinical Oncologist', 
            hospital: 'Apex Cancer Research Center', 
            experienceYears: 16, 
            fee: 2200, 
            rating: 4.96,
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600&h=600',
            tags: ['Chemotherapy', 'Nuclear Medicine'],
            bio: 'Board-certified specialist in integrative oncology and nuclear-diagnostic paradigms.',
            certifications: ['Medical Gold Medalist', 'Oncology Fellow']
          },
          { 
            id: 'mock-5', 
            fullName: 'Dr. Arjun Kulkarni', 
            specialty: 'Consultant Psychiatrist', 
            hospital: 'Modern Mind & Wellness', 
            experienceYears: 12, 
            fee: 1800, 
            rating: 4.91,
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600&h=600',
            tags: ['Neuro-Psychiatry', 'Counseling'],
            bio: 'Dedicated to precision-based mental health diagnostics and cognitive behavioral therapy.',
            certifications: ['MD Psychiatry', 'Clinical Psychologist']
          },
          { 
            id: 'mock-6', 
            fullName: 'Dr. Elena Rossi', 
            specialty: 'Senior Radiologist', 
            hospital: 'Global Diagnostics Hub', 
            experienceYears: 19, 
            fee: 1400, 
            rating: 4.87,
            image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600&h=600',
            tags: ['Advanced MRI', 'CT Diagnostics'],
            bio: 'Specialist in high-resolution image-based diagnostic screening and neuro-imaging.',
            certifications: ['PhD Radiology', 'Fellowship Imaging']
          },
        ];
        // Professional clinical fallback registry
        const medicalAvatars = [
          'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
          'https://images.unsplash.com/photo-1622253692010-333f2da6031d',
          'https://images.unsplash.com/photo-1594824476967-48c8b964273f',
          'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
          'https://images.unsplash.com/photo-1537368910025-700350fe46c7',
          'https://images.unsplash.com/photo-1582750433449-648ed127bb54'
        ];
        
        const finalDoctors = [...(data || []), ...clinicalMocks].map((doc, idx) => {
           // Professional fallback narratives for authentic feel
           const clinicalBios = [
              "Senior consultant focusing on acute neuro-pathological diagnostics and surgical intervention.",
              "Specialist in integrative cardiac protocols and genomic heart-health performance diagnostic.",
              "Authorized surgical expert for joint-reconstruction and advanced orthotic rehabilitation.",
              "Primary neonatal consultant for high-precision pediatric care and developmental diagnostics.",
              "Diagnostic psychiatrist specializing in neuro-behavioral therapy and cognitive protocols.",
              "Lead oncologist focusing on integrative cancer screening and nuclear medical paradigms.",
              "Expert dermatologist specializing in surgical skin-grafting and clinical aesthetic diagnostics."
           ];

           return {
              ...doc,
              image: doc.image || `${medicalAvatars[idx % medicalAvatars.length]}?auto=format&fit=crop&q=80&w=600&h=600`,
              fee: doc.fee || (1000 + (idx * 200)), // Hand-calibrated local fee mock
              experienceYears: doc.experienceYears || (10 + (idx % 15)), // Varied experience metrics
              bio: doc.bio || clinicalBios[idx % clinicalBios.length], // Unique professional narratives
              specialty: doc.specialty || (SPECIALTIES[1 + (idx % (SPECIALTIES.length - 1))]) // Diverse clinical roles
           };
        });
        setDoctors(finalDoctors);
      } catch (err) {
        console.error('Failed to synchronize clinician registry:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor && bookingDate) {
      fetchSlots();
    }
  }, [selectedDoctor, bookingDate]);

  const fetchSlots = async () => {
    setSlotsLoading(true);
    try {
      const formattedDate = bookingDate.toISOString().split('T')[0];
      const { slots } = await api.getAvailability(selectedDoctor.id, formattedDate);
      setAvailableSlots(slots || []);
      setSelectedSlot(null);
    } catch (err) {
      console.error(err);
      setAvailableSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleBook = async () => {
    if (!selectedSlot || !selectedDoctor) return;
    setBookingLoading(true);
    try {
      const payload = {
        patientId: user?.id || user?.userId,
        doctorId: selectedDoctor.id,
        hospitalId: selectedDoctor.hospital?.id || selectedDoctor.hospitalId,
        appointmentDate: bookingDate.toISOString().split('T')[0],
        patient_name: user?.fullName || "Patient",
        reason: "Consultation",
        expectedStartTime: selectedSlot
      };
      await api.bookAppointment(payload);
      alert('Appointment booked successfully!');
      setSelectedDoctor(null);
    } catch (err) {
      console.error(err);
      alert('Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => 
      (selectedSpecialty === 'All' || doc.specialty?.toLowerCase() === selectedSpecialty.toLowerCase()) &&
      ((doc.fullName || doc.name)?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       (doc.specialty || '').toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [doctors, searchQuery, selectedSpecialty]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
         <div className="relative">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
         </div>
         <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Syncing Advanced Clinician Registry...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto py-12 px-4 space-y-16 fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-border/50">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
             <div className="h-px w-8 bg-primary" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Certified Network</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-none italic">Verified Clinicians</h1>
          <p className="text-muted-foreground text-base font-medium max-w-lg">Access board-certified healthcare professionals authorized for primary clinical diagnostic sessions.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-2xl border border-border/50 backdrop-blur-sm">
           <div className="bg-card w-12 h-12 rounded-xl border border-border flex items-center justify-center shadow-sm">
              <ShieldCheck className="text-primary h-6 w-6" />
           </div>
           <div className="pr-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground">100% Verified</p>
              <p className="text-[9px] font-bold text-muted-foreground uppercase">Clinical Accreditation</p>
           </div>
        </div>
      </header>

      <section className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search by name, hospital, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-card border border-border rounded-2xl pl-12 pr-6 text-foreground text-sm outline-none focus:border-primary/30 transition-all font-medium placeholder:text-muted-foreground/40 shadow-sm"
            />
          </div>
          
          <div className="lg:col-span-8 flex items-center gap-2 overflow-x-auto no-scrollbar bg-card/50 border border-border p-1.5 rounded-2xl backdrop-blur-sm">
            {SPECIALTIES.map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all border ${
                  selectedSpecialty === spec
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/10'
                  : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doc, idx) => (
              <motion.div
                layout
                key={doc.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card border border-border rounded-[2.5rem] overflow-hidden group hover:ring-2 hover:ring-primary/20 transition-all shadow-2xl flex flex-col md:flex-row relative"
              >
                <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-primary/[0.03] to-transparent pointer-events-none" />
                
                {/* Information Panel (Left/Top) */}
                <div className="flex-1 p-8 md:p-10 space-y-8 relative z-10 border-b md:border-b-0 md:border-r border-border/40">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/5 px-2 py-1 rounded-md border border-primary/10">Diagnostic Expert</span>
                        {idx === 0 && <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1"><Star size={10} className="fill-current" /> Leading Specialist</span>}
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-foreground tracking-tighter leading-none mb-2">{doc.fullName}</h3>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{doc.specialty}</p>
                      </div>
                   </div>

                   <p className="text-xs font-medium text-muted-foreground leading-relaxed italic max-w-sm opacity-80">
                      "{doc.bio || 'Authorized board-certified clinical consultant focusing on precision patient diagnostics and integrative medicine.'}"
                   </p>

                   <div className="space-y-3">
                      <div className="flex items-center gap-3">
                         <div className="h-6 w-6 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                            <MapPin size={12} />
                         </div>
                         <p className="text-[11px] font-black text-foreground/80 uppercase tracking-tight">{doc.hospital?.name || doc.hospital}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                         {(doc.tags || ['Verified Clinician']).map(tag => (
                            <div key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted border border-border/50 text-[9px] font-black text-muted-foreground/60 uppercase">
                               <CheckCircle2 size={10} className="text-emerald-500" />
                               {tag}
                            </div>
                         ))}
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3 pb-2">
                      <div className="space-y-1">
                         <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">Fee Structure</p>
                         <p className="text-xl font-black text-foreground tracking-tight">₹{doc.fee}<span className="text-xs opacity-40 ml-1">INR</span></p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">Experience</p>
                         <p className="text-xl font-black text-foreground tracking-tight">{doc.experienceYears || '15'} YRS<span className="text-xs opacity-40 ml-1">+</span></p>
                      </div>
                   </div>
                </div>

                {/* Portrait Panel (Right/Bottom) */}
                <div className="w-full md:w-[240px] bg-muted/20 relative group-hover:bg-muted/30 transition-colors p-8 flex flex-col items-center justify-center space-y-6">
                   <div className="relative">
                      <div className="h-40 w-40 rounded-[2rem] overflow-hidden bg-muted border border-border shadow-2xl relative">
                         <img 
                            src={doc.image} 
                            alt={doc.fullName} 
                            className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-105"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      </div>
                      <div className="absolute -top-3 -right-3 h-[52px] w-[52px] bg-card rounded-2xl border-2 border-border flex items-center justify-center shadow-xl">
                         <ShieldCheck className="text-primary h-7 w-7" strokeWidth={2.5} />
                      </div>
                   </div>

                   <div className="w-full space-y-4">
                      <div className="flex items-center justify-center gap-4">
                         <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                              <div key={i} className="h-7 w-7 rounded-lg ring-2 ring-card bg-muted border border-border overflow-hidden">
                                 <img src={`https://i.pravatar.cc/100?img=${doc.id + i}`} alt="Patient" className="h-full w-full grayscale opacity-60" />
                              </div>
                            ))}
                         </div>
                         <p className="text-[10px] font-black text-foreground/60 uppercase">86+ PATIENTS</p>
                      </div>

                      <button 
                         onClick={() => setSelectedDoctor(doc)}
                         className="w-full h-14 bg-primary text-primary-foreground rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 active:scale-[0.98]"
                      >
                         SCHEDULING
                         <ArrowRight size={14} className="opacity-50" />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedDoctor(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative w-full max-w-lg bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-sm">
                      <CalendarIcon size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground uppercase tracking-tight">Booking Appointment</h3>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Secure clinical session</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedDoctor(null)} className="h-9 w-9 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-10">
                  <div className="premium-datepicker flex justify-center">
                      <DatePicker 
                        selected={bookingDate} 
                        onChange={(date) => setBookingDate(date)} 
                        inline 
                        minDate={new Date()} 
                        calendarClassName="premium-calendar-root"
                      />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <p className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Select Available Time</p>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-tighter bg-primary/10 px-2 py-0.5 rounded-md">Live availability</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
                      {slotsLoading ? (
                        <div className="col-span-3 flex justify-center py-6">
                          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                      ) : availableSlots.length === 0 ? (
                        <p className="col-span-3 text-center py-6 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">No slots available</p>
                      ) : (
                        availableSlots.map(slot => (
                          <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all border ${
                              selectedSlot === slot 
                                ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]' 
                                : 'bg-muted border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 active:scale-95'
                            }`}
                          >
                            {slot}
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Appointment Summary</p>
                      {selectedSlot && (
                        <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          <CheckCircle2 size={10} />
                          <span className="text-[9px] font-bold uppercase">Ready to sync</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-muted/50 rounded-2xl p-4 border border-border/50">
                        {selectedSlot ? (
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-foreground uppercase tracking-tight">{bookingDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                    <p className="text-[10px] font-medium text-muted-foreground uppercase italic tracking-tighter">Scheduled for {selectedSlot}</p>
                                </div>
                                <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                    <Clock size={16} />
                                </div>
                            </div>
                        ) : (
                            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest text-center py-2 italic opacity-50">Please select a time slot to continue</p>
                        )}
                    </div>
                  </div>

                  <button 
                    disabled={!selectedSlot || bookingLoading}
                    onClick={handleBook}
                    className="w-full bg-primary text-primary-foreground py-4.5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-primary/10 mt-2 active:scale-[0.98]"
                  >
                    {bookingLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                      <>
                        Confirm Consultation
                        <ArrowRight size={14} className="opacity-50" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
