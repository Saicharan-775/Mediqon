import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

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
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  },
  {
    name: "Dr. Sherry Ross",
    role: "Gynecologist",
    specialty: "Gynecology",
    experience: "15 yrs",
    rating: 4.9,
    available: "Today",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  },
  {
    name: "Dr. James Wilson",
    role: "Orthopedic Surgeon",
    specialty: "Orthopedics",
    experience: "18 yrs",
    rating: 4.7,
    available: "Tomorrow",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  },
  {
    name: "Dr. Maria Lopez",
    role: "Ophthalmologist",
    specialty: "Eye Care",
    experience: "10 yrs",
    rating: 4.9,
    available: "Today",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  },
  {
    name: "Dr. David Kim",
    role: "Psychiatrist",
    specialty: "Psychiatry",
    experience: "14 yrs",
    rating: 4.6,
    available: "Today",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  },
  {
    name: "Dr. Emily Chen",
    role: "Cardiologist",
    specialty: "Cardiology",
    experience: "16 yrs",
    rating: 4.8,
    available: "Tomorrow",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  },
  {
    name: "Dr. Raj Patel",
    role: "Pediatrician",
    specialty: "Pediatrics",
    experience: "11 yrs",
    rating: 4.9,
    available: "Today",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  },
  {
    name: "Dr. Sarah Johnson",
    role: "Dermatologist",
    specialty: "Dermatology",
    experience: "13 yrs",
    rating: 4.7,
    available: "Today",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  },
  {
    name: "Dr. Michael Brown",
    role: "Dentist",
    specialty: "Dental Care",
    experience: "9 yrs",
    rating: 4.8,
    available: "Tomorrow",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  },
  {
    name: "Dr. Lisa Wong",
    role: "Endocrinologist",
    specialty: "Endocrinology",
    experience: "17 yrs",
    rating: 4.9,
    available: "Today",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  },
  {
    name: "Dr. Thomas Lee",
    role: "Radiologist",
    specialty: "Radiology",
    experience: "20 yrs",
    rating: 4.6,
    available: "Tomorrow",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  },
  {
    name: "Dr. Anna Schmidt",
    role: "Gastroenterologist",
    specialty: "Gastroenterology",
    experience: "14 yrs",
    rating: 4.8,
    available: "Today",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  },
  {
    name: "Dr. Robert Garcia",
    role: "Urologist",
    specialty: "Urology",
    experience: "12 yrs",
    rating: 4.7,
    available: "Today",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZGRkIiB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3RvcjwvdGV4dD48L3N2Zz4=",
  }
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
          <div className="relative w-full md:w-96 group">
            <Icon icon="solar:magnifer-bold-duotone" className="w-5 h-5 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-emerald-500" />
            <input
              type="text"
              placeholder="Search doctor or specialty"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 
                         rounded-2xl pl-12 pr-4 py-3.5 text-sm
                         focus:outline-none focus:border-emerald-500/50
                         focus:bg-white/[0.05] transition-all"
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
      className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all duration-300
        ${
          active
            ? "bg-emerald-500 text-black border-emerald-500 shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
            : "bg-white/[0.02] text-neutral-500 border-white/[0.05] hover:border-emerald-500/30 hover:text-white"
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      viewport={{ once: true }}
      className="group bg-white/[0.02] backdrop-blur-3xl 
                 border border-white/[0.05] rounded-[2rem] overflow-hidden
                 hover:border-emerald-500/20 
                 transition-all duration-500
                 hover:bg-white/[0.04]
                 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]"
    >
      {/* IMAGE */}
      <div className="relative h-56 m-3 rounded-[1.5rem] overflow-hidden bg-neutral-800">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
           <Icon icon="solar:star-bold" className="w-3 h-3 text-yellow-400" />
           <span className="text-[10px] font-bold">{doctor.rating}</span>
        </div>
      </div>

      {/* INFO */}
      <div className="p-6 pt-2">
        <h3 className="font-jakarta text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{doctor.name}</h3>
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-500/60">{doctor.role}</p>

        <div className="flex items-center gap-6 text-xs text-neutral-500 mt-5 border-y border-white/[0.05] py-4">
          <div className="flex flex-col gap-1">
             <span className="text-[10px] uppercase font-bold text-neutral-600">Experience</span>
             <span className="text-white">{doctor.experience}</span>
          </div>
          <div className="w-px h-8 bg-white/[0.05]" />
          <div className="flex flex-col gap-1">
             <span className="text-[10px] uppercase font-bold text-neutral-600">Availability</span>
             <span className="text-emerald-400">{doctor.available}</span>
          </div>
        </div>

        <button className="mt-6 w-full rounded-2xl bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.15em] transition-all hover:scale-[1.02] hover:bg-emerald-500 active:scale-95 cursor-pointer">
          Book Session
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
        <Icon icon="solar:sad-circle-bold-duotone" className="w-8 h-8 text-neutral-500" />
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

