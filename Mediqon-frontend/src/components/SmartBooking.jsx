import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Star, Clock, Calendar as CalendarIcon, CheckCircle2, ChevronRight, User, Stethoscope, Mic, Sparkles, Loader2, Info } from "lucide-react";
import { api } from "../lib/api";

export default function SmartBooking({ onBook, onStartAssistant }) {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const [bookingStep, setBookingStep] = useState("search");

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter(doc => 
      doc.name.toLowerCase().includes(search.toLowerCase()) || 
      doc.specialization.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [search, doctors]);

  const fetchDoctors = async () => {
    try {
      const data = await api.getDoctors();
      const enhancedData = data.map(doc => ({
        ...doc,
        rating: (4.7 + Math.random() * 0.3).toFixed(1),
        experience: Math.floor(Math.random() * 15) + 5,
        photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=eff6ff&color=2563eb&size=128`
      }));
      setDoctors(enhancedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSlots = async (doctor, date) => {
    setFetchingSlots(true);
    setSelectedSlot(null);
    try {
      const { slots } = await api.getAvailability(doctor.id, date);
      setAvailableSlots(slots);
    } catch (err) {
      setAvailableSlots([]);
    } finally {
      setFetchingSlots(false);
    }
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingStep("slots");
    fetchSlots(doctor, selectedDate);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    if (selectedDoctor) {
      fetchSlots(selectedDoctor, newDate);
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedDoctor || !selectedSlot) return;
    onBook({
      doctorId: selectedDoctor.id,
      hospitalId: selectedDoctor.hospital?.id,
      appointmentDate: selectedDate,
      time: selectedSlot
    });
    setBookingStep("search");
    setSelectedDoctor(null);
    setSelectedSlot(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-5 bg-card border border-border rounded-[24px]">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-muted-foreground font-medium text-sm">Syncing with hospital network...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      
      {/* Search Header */}
      {bookingStep === "search" && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by specialty, condition, or doctor name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-[16px] py-3.5 pl-12 pr-6 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground font-medium shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 bg-card border border-border shadow-sm rounded-[16px] text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-border transition-all">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {bookingStep === "search" && (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDoctors.map((doc, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                key={doc.id}
                className="bg-card border border-border rounded-[20px] p-6 group hover:border-primary/30 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-5">
                    <img src={doc.photo} alt={doc.name} className="h-14 w-14 rounded-full object-cover border border-border bg-muted" />
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="font-semibold text-foreground truncate">{doc.name}</h3>
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      </div>
                      <p className="text-sm font-medium text-primary">{doc.specialization}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground mb-6 bg-muted/30 p-3 rounded-2xl border border-border/50">
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {doc.rating}</span>
                    <span className="text-border">•</span>
                    <span className="flex items-center gap-1"><Stethoscope className="h-3.5 w-3.5" /> {doc.experience} yrs</span>
                    <span className="text-border w-full md:w-auto hidden md:inline">•</span>
                    <span className="flex items-center gap-1 w-full md:w-auto"><Clock className="h-3.5 w-3.5" /> Available Today</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleSelectDoctor(doc)}
                  className="w-full py-2.5 bg-muted border border-border text-foreground rounded-xl text-sm font-semibold transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  Select Time
                </button>
              </motion.div>
            ))}

            {filteredDoctors.length === 0 && (
              <div className="col-span-full py-20 text-center flex flex-col items-center justify-center bg-card border border-border rounded-[24px]">
                <div className="h-12 w-12 bg-muted border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <h4 className="text-base font-semibold text-foreground">No Specialists Found</h4>
                <p className="text-muted-foreground font-medium text-sm mt-1">Try adjusting your search criteria.</p>
              </div>
            )}
          </motion.div>
        )}

        {bookingStep === "slots" && selectedDoctor && (
          <motion.div
            key="slots"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* Left Sidebar: Doctor Profile */}
            <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-4">
              <button 
                onClick={() => setBookingStep("search")}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                <ChevronRight className="h-4 w-4 rotate-180" /> Back to specialists
              </button>
              
              <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm">
                <img src={selectedDoctor.photo} alt={selectedDoctor.name} className="h-20 w-20 rounded-full mx-auto border border-border bg-muted mb-4" />
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-1 flex items-center justify-center gap-1.5">
                    {selectedDoctor.name} <CheckCircle2 className="h-4 w-4 text-primary" />
                  </h3>
                  <p className="text-sm font-semibold text-primary">{selectedDoctor.specialization}</p>
                </div>

                <div className="flex flex-col gap-4 pt-6 border-t border-border">
                  <div className="flex gap-3">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Location</p>
                      <p className="text-sm font-medium text-foreground mt-0.5">{selectedDoctor.hospital?.name || "Parul Sevashram Hospital"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Slot Selection */}
            <div className="flex-1 bg-card border border-border rounded-[24px] p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div>
                  <h4 className="text-lg font-bold text-foreground">Select Date & Time</h4>
                  <p className="text-sm text-muted-foreground mt-1 font-medium">Choose from available slots below.</p>
                </div>
                <div className="relative group min-w-[180px]">
                  <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-primary/5 border border-primary/20 hover:border-primary/40 rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                  />
                </div>
              </div>

              {fetchingSlots ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <Loader2 className="h-6 w-6 text-neutral-400 animate-spin" />
                  <p className="text-neutral-500 text-sm font-medium">Loading slots...</p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
                    {availableSlots.map(slot => (
                      <button 
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3.5 rounded-[14px] border transition-all flex flex-col items-center justify-center gap-1 min-h-[70px] ${
                          selectedSlot === slot 
                            ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20" 
                            : "bg-card border-border text-foreground hover:border-primary/20 hover:bg-muted"
                        }`}
                      >
                        <span className="text-sm font-bold">{slot}</span>
                      </button>
                    ))}
                  </div>

                  {availableSlots.length === 0 && (
                    <div className="bg-muted/30 border border-border p-8 rounded-[20px] text-center mb-8">
                      <p className="text-foreground font-semibold mb-1">No times available</p>
                      <p className="text-muted-foreground text-sm">Please select a different date.</p>
                    </div>
                  )}

                  <div className="mt-auto pt-8 border-t border-border flex justify-end">
                    <button 
                      disabled={!selectedSlot}
                      onClick={() => setBookingStep("confirm")}
                      className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                        selectedSlot 
                          ? "bg-primary text-primary-foreground hover:opacity-90" 
                          : "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                      }`}
                    >
                      Review Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {bookingStep === "confirm" && selectedDoctor && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-card border border-border rounded-[24px] p-8 shadow-sm">
               <div className="text-center mb-8 pt-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-5">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground tracking-tight">Confirm Details</h3>
               </div>
 
               <div className="bg-muted/50 border border-border rounded-[20px] p-6 mb-8 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Practitioner</span>
                    <span className="text-sm font-bold text-foreground">{selectedDoctor.name}</span>
                  </div>
                  <div className="h-px w-full bg-border/50" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Specialty</span>
                    <span className="text-sm font-bold text-primary">{selectedDoctor.specialization}</span>
                  </div>
                  <div className="h-px w-full bg-border/50" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Schedule</span>
                    <span className="text-sm font-bold text-foreground">{selectedSlot} • {selectedDate}</span>
                  </div>
               </div>

               <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleConfirmBooking}
                    className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold shadow-sm hover:opacity-90 transition-all"
                  >
                    Confirm Booking
                  </button>
                  <button 
                    onClick={() => setBookingStep("slots")}
                    className="w-full py-3 bg-card border border-border text-foreground rounded-xl text-sm font-semibold hover:bg-muted transition-all"
                  >
                    Back to time selection
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
