import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import { ShieldCheck, TimerReset, Wallet } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

import DoctorCard from "../components/ui/DoctorCard";
import BookingModal from "../components/ui/BookingModal";
import UpcomingAppointments from "../components/ui/UpcomingAppointments";
import DoctorSkeleton from "../components/ui/DoctorSkeleton";
import EmptyStateDoctors from "../components/ui/EmptyStateDoctors";

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.8,
    experience: 12,
    price: 45,
    slots: ["09:30 AM", "11:30 AM", "03:00 PM"],
    type: "Video",
    verified: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    rating: 4.7,
    experience: 9,
    price: 50,
    slots: ["08:45 AM", "01:15 PM", "04:00 PM"],
    type: "Clinic",
    verified: true,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
  },
  {
    id: 3,
    name: "Dr. Emma Wilson",
    specialty: "Dental",
    rating: 4.9,
    experience: 7,
    price: 35,
    slots: ["10:00 AM", "12:15 PM", "05:15 PM"],
    type: "Clinic",
    verified: false,
    image: "https://images.unsplash.com/photo-1594824475317-5d4f6b2f0c0d",
  },
  {
    id: 4,
    name: "Dr. Robert Brown",
    specialty: "Orthopedic",
    rating: 4.6,
    experience: 15,
    price: 55,
    slots: ["08:00 AM", "11:00 AM", "06:00 PM"],
    type: "Video",
    verified: true,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
  },
  {
    id: 5,
    name: "Dr. Olivia Martinez",
    specialty: "Eye Care",
    rating: 4.7,
    experience: 8,
    price: 40,
    slots: ["09:00 AM", "02:30 PM", "06:30 PM"],
    type: "Clinic",
    verified: true,
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f",
  },
  {
    id: 6,
    name: "Dr. Rhea Kapoor",
    specialty: "Psychiatry",
    rating: 4.9,
    experience: 11,
    price: 60,
    slots: ["10:45 AM", "01:45 PM", "07:00 PM"],
    type: "Video",
    verified: true,
    image: "https://images.unsplash.com/photo-1643297654418-057071f95f52",
  },
];

const categories = [
  "All",
  "Cardiology",
  "Neurology",
  "Dental",
  "Orthopedic",
  "Eye Care",
  "Psychiatry",
];

const sortOptions = [
  { id: "rating", label: "Top Rated" },
  { id: "experience", label: "Most Experienced" },
  { id: "price", label: "Lowest Price" },
  { id: "availability", label: "Earliest Available" },
];

const slotToMinutes = (slot = "") => {
  const [time, period] = slot.trim().split(" ");
  if (!time || !period) return Number.MAX_SAFE_INTEGER;
  const [rawHour, rawMinute] = time.split(":");
  let hour = Number(rawHour);
  const minute = Number(rawMinute);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return Number.MAX_SAFE_INTEGER;
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
};

export default function Bookings() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("rating");
  const [doctors, setDoctors] = useState(mockDoctors);
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalSession, setModalSession] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const { isAuthenticated } = useAuth();

  const loadDoctors = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setDoctors(mockDoctors);
    } catch (error) {
      console.error("Error loading doctors:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  const filteredDoctors = useMemo(() => {
    const result = doctors.filter((doc) => {
      const matchSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "All" || doc.specialty === activeCategory;
      return matchSearch && matchCategory;
    });

    switch (sort) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price":
        result.sort((a, b) => a.price - b.price);
        break;
      case "experience":
        result.sort((a, b) => b.experience - a.experience);
        break;
      case "availability":
        result.sort(
          (a, b) => slotToMinutes(a.slots?.[0]) - slotToMinutes(b.slots?.[0]),
        );
        break;
      default:
        break;
    }

    return result;
  }, [doctors, search, activeCategory, sort]);

  const averagePrice = useMemo(() => {
    if (!filteredDoctors.length) return 0;
    return Math.round(
      filteredDoctors.reduce((sum, doctor) => sum + doctor.price, 0) /
        filteredDoctors.length,
    );
  }, [filteredDoctors]);

  const earliestSlot = useMemo(() => {
    const firstSlots = filteredDoctors.map((doctor) => doctor.slots?.[0]).filter(Boolean);
    if (!firstSlots.length) return "--";
    const sorted = firstSlots.sort((a, b) => slotToMinutes(a) - slotToMinutes(b));
    return sorted[0];
  }, [filteredDoctors]);

  const handleBook = (doctor, slot) => {
    if (!isAuthenticated) {
      alert("Please login to book appointments");
      return;
    }
    setSelectedDoctor(doctor);
    setSelectedSlot(slot);
    setModalSession((session) => session + 1);
    setShowModal(true);
  };

  const handleFavorite = (doctorId) => {
    setFavorites((prevFavorites) => {
      const nextFavorites = new Set(prevFavorites);
      if (nextFavorites.has(doctorId)) {
        nextFavorites.delete(doctorId);
      } else {
        nextFavorites.add(doctorId);
      }
      return nextFavorites;
    });
  };

  const handleConfirmBooking = () => {
    console.log("Booking confirmed:", { doctor: selectedDoctor, slot: selectedSlot });
  };

  const handleRetrySearch = () => {
    setSearch("");
    setActiveCategory("All");
    setSort("rating");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(14,165,233,0.18),transparent_40%),radial-gradient(circle_at_88%_18%,rgba(16,185,129,0.12),transparent_36%),radial-gradient(circle_at_50%_88%,rgba(245,158,11,0.12),transparent_42%)]" />
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-sm font-medium text-sky-200">
              <ShieldCheck className="h-4 w-4" />
              Verified Specialists
            </p>
            <h1 className="text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Book trusted care in under 60 seconds
            </h1>
            <p className="max-w-3xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
              Pick a specialty, compare doctors, and lock your preferred timing with transparent pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Available Doctors</p>
              <p className="mt-1 text-2xl font-bold text-white">{filteredDoctors.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Earliest Slot</p>
              <p className="mt-1 text-2xl font-bold text-emerald-300">{earliestSlot}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Avg. Consultation</p>
              <p className="mt-1 text-2xl font-bold text-amber-300">${averagePrice}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-8 rounded-3xl border border-white/10 bg-slate-900/65 p-4 shadow-2xl shadow-slate-950/60 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Icon icon="mdi:magnify" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search by doctor name or specialty..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-2xl border border-white/15 bg-slate-900/80 pl-12 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-sky-400/70 focus:outline-none focus:ring-2 focus:ring-sky-400/30 sm:text-base"
              />
            </div>
            <div className="relative min-w-0 lg:w-64">
              <TimerReset className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-12 w-full appearance-none rounded-2xl border border-white/15 bg-slate-900/80 pl-11 pr-10 text-sm text-slate-100 focus:border-emerald-400/70 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 sm:text-base"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon icon="mdi:chevron-down" className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                  activeCategory === category
                    ? "border-emerald-300/70 bg-emerald-400/20 text-emerald-100"
                    : "border-white/15 bg-slate-900/50 text-slate-300 hover:border-sky-300/50 hover:text-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <Icon icon="mdi:stethoscope" className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  Specialist Directory
                </h2>
                <p className="text-sm text-slate-300">
                  {filteredDoctors.length} match{filteredDoctors.length === 1 ? "" : "es"} based on your filters
                </p>
              </div>
            </div>

            {loading ? (
              <DoctorSkeleton />
            ) : filteredDoctors.length === 0 ? (
              <EmptyStateDoctors onRetry={handleRetrySearch} />
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBook={handleBook}
                    onFavorite={handleFavorite}
                    isFavorite={favorites.has(doctor.id)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="pt-2">
            <UpcomingAppointments />
          </div>
        </div>
      </div>

      <BookingModal
        key={modalSession}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        doctor={selectedDoctor}
        selectedSlot={selectedSlot}
        onConfirm={handleConfirmBooking}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute right-4 top-4 hidden items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/15 px-3 py-1 text-xs font-medium text-amber-100 sm:flex">
        <Wallet className="h-3.5 w-3.5" />
        Transparent pricing
      </div>
    </div>
  );
}
