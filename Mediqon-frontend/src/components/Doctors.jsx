import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  StarIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/solid";

/* ================= DATA ================= */

const specialties = [
  { label: "Orthopedists" },
  { label: "Neurology" },
  { label: "Gynecology" },
  { label: "Psychiatry" },
  { label: "Eye Care" },
];

const doctors = [
  {
    name: "Dr. Sanjana Gupta",
    role: "Neurosurgeon",
    specialty: "Neurology",
    experience: "12 yrs",
    rating: 4.8,
    available: "Today",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Sherry Ross",
    role: "Gynecologist",
    specialty: "Gynecology",
    experience: "15 yrs",
    rating: 4.9,
    available: "Today",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  },
];

/* ================= MAIN COMPONENT ================= */

export default function Doctors() {
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [query, setQuery] = useState("");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSpecialty =
        activeSpecialty === "All" || doc.specialty === activeSpecialty;

      const matchesQuery =
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.role.toLowerCase().includes(query.toLowerCase());

      return matchesSpecialty && matchesQuery;
    });
  }, [activeSpecialty, query]);

  return (
    <section className="relative bg-black text-white py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Book an Appointment
            </h2>
            <p className="text-neutral-400 mt-2">
              Connect with experienced specialists instantly.
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-80">
            <MagnifyingGlassIcon className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search doctor or specialty"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-white/10 
                         rounded-full pl-10 pr-4 py-2.5 text-sm
                         focus:outline-none focus:border-green-500
                         transition"
            />
          </div>
        </div>

        {/* FILTER PILLS */}
        <div className="flex flex-wrap gap-3 mb-12">
          <FilterPill
            label="All"
            active={activeSpecialty === "All"}
            onClick={() => setActiveSpecialty("All")}
          />
          {specialties.map((item) => (
            <FilterPill
              key={item.label}
              label={item.label}
              active={activeSpecialty === item.label}
              onClick={() => setActiveSpecialty(item.label)}
            />
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc, index) => (
              <DoctorCard key={doc.name} doctor={doc} index={index} />
            ))
          ) : (
            <EmptyState
              onReset={() => {
                setActiveSpecialty("All");
                setQuery("");
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ================= FILTER ================= */

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm border transition-all duration-300
        ${
          active
            ? "bg-green-500 text-black border-green-500"
            : "bg-neutral-900 text-neutral-400 border-white/10 hover:border-green-500/40"
        }`}
    >
      {label}
    </button>
  );
}

/* ================= DOCTOR CARD ================= */

function DoctorCard({ doctor, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-neutral-900/70 backdrop-blur-xl 
                 border border-white/10 rounded-2xl overflow-hidden
                 hover:border-green-500/40 
                 transition-all duration-300
                 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]"
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x300?text=Doctor";
          }}
        />
      </div>

      {/* INFO */}
      <div className="p-5">
        <h3 className="font-semibold text-lg">{doctor.name}</h3>
        <p className="text-sm text-neutral-400">{doctor.role}</p>

        <div className="flex items-center gap-4 text-xs text-neutral-400 mt-3">
          <span className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            {doctor.rating}
          </span>
          <span>{doctor.experience}</span>
        </div>

        <p className="text-xs text-green-400 mt-2">
          Available {doctor.available}
        </p>

        {/* BUTTON */}
        <button className="mt-5 w-full rounded-full bg-green-500 text-black py-2.5 text-sm font-medium 
                           hover:bg-green-400 transition">
          Book Appointment
        </button>
      </div>
    </motion.div>
  );
}

/* ================= EMPTY STATE ================= */

function EmptyState({ onReset }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center 
                    py-20 text-center">

      <div className="w-16 h-16 rounded-full bg-neutral-900 
                      border border-white/10 
                      flex items-center justify-center mb-6">
        <FaceFrownIcon className="w-8 h-8 text-neutral-500" />
      </div>

      <h3 className="text-xl font-semibold text-white">
        No Doctors Found
      </h3>

      <p className="text-neutral-400 mt-2 max-w-md">
        We couldn't find any doctors matching your search or filter.
        Try adjusting your keywords.
      </p>

      <button
        onClick={onReset}
        className="mt-6 px-6 py-2.5 rounded-full 
                   bg-green-500 text-black text-sm font-medium
                   hover:bg-green-400 transition"
      >
        Reset Filters
      </button>
    </div>
  );
}