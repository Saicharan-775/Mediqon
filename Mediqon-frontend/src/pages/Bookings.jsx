import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle2, LayoutGrid, PlusCircle, Activity, Globe } from "lucide-react";
import { api } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";

import BookingsDashboard from "../components/BookingsDashboard";
import SmartBooking from "../components/SmartBooking";
import VoiceAssistant from "../components/VoiceAssistant";

export default function Bookings() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const { user } = useAuth();

  const fetchAppointments = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await api.getBookings();
      const dismissed = JSON.parse(localStorage.getItem('dismissedAppointments') || '[]');
      setAppointments((data || []).filter(apt => !dismissed.includes(apt.id)));
      setError(null);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      // Fail silently if reloading
      if (!silent) setError("Sync Error: Unable to reach the hospital server.");
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments(false);
    
    const onSync = () => fetchAppointments(true);
    window.addEventListener('sync-appointments', onSync);

    const interval = setInterval(() => {
        fetchAppointments(true);
    }, 3000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('sync-appointments', onSync);
    };
  }, [fetchAppointments]);

  const handleCancel = async (id) => {
    if (!window.confirm("Confirm cancellation of this appointment?")) return;
    try {
      await api.cancelAppointment(id);
      setAppointments((prev) =>
        prev.map(apt => apt.id === id ? { ...apt, status: 'cancelled' } : apt)
      );
    } catch (err) {
      console.error(err);
      alert("System Error: Failed to process cancellation.");
    }
  };

  const handleDismiss = (id) => {
    setAppointments((prev) => prev.filter(apt => apt.id !== id));
    const dismissed = JSON.parse(localStorage.getItem('dismissedAppointments') || '[]');
    if (!dismissed.includes(id)) {
      localStorage.setItem('dismissedAppointments', JSON.stringify([...dismissed, id]));
    }
  };

  const handleBook = async (bookingData) => {
    const payload = {
      patientId: user?.id || user?.userId,
      doctorId: bookingData.doctorId,
      hospitalId: bookingData.hospitalId,
      appointmentDate: bookingData.appointmentDate,
      patient_name: user?.fullName || "Patient",
      reason: "Consultation",
    };

    try {
      if (!payload.patientId) return alert("Please log in.");
      const response = await api.bookAppointment(payload);
      if (response) {
        fetchAppointments(true);
        setActiveTab("dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Manual Booking Failed");
    }
  };

  const handleStartAssistant = () => window.dispatchEvent(new CustomEvent('trigger-vapi'));

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 pb-10 fade-in">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Appointments
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Manage your schedule, book new visits, or check past records.
          </p>
        </div>

        <div className="flex bg-muted p-1 rounded-xl border border-border shadow-inner">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "dashboard" 
                ? "bg-card text-foreground shadow-sm border border-border" 
                : "text-muted-foreground hover:text-foreground hover:bg-card/50"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "new" 
                ? "bg-card text-foreground shadow-sm border border-border" 
                : "text-muted-foreground hover:text-foreground hover:bg-card/50"
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            Book New
          </button>
        </div>
      </header>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-semibold">
          <Globe className="h-4 w-4 animate-spin" />
          {error}
        </div>
      )}

      {/* Main Content Pane */}
      <main className="min-h-[500px] relative">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" ? (
            <motion.section
              key="dashboard"
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.99 }} transition={{ duration: 0.2 }}
            >
              <BookingsDashboard appointments={appointments} loading={loading} onCancel={handleCancel} onDismiss={handleDismiss} />
            </motion.section>
          ) : (
            <motion.section
              key="new"
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.99 }} transition={{ duration: 0.2 }}
            >
              <SmartBooking onBook={handleBook} onStartAssistant={handleStartAssistant} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <VoiceAssistant user={user} onCallEnd={() => fetchAppointments()} />
    </div>
  );
}
