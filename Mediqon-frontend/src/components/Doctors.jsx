import React, { useState, useMemo } from "react";

/* ================= DATA ================= */

const specialties = [
  { label: "Orthopedists", icon: "🦴" },
  { label: "Neurology", icon: "🧠" },
  { label: "Gynecology", icon: "👶" },
  { label: "Psychiatry", icon: "🧠" },
  { label: "Shoulder", icon: "💪" },
  { label: "Eye care", icon: "👁️" },
];

const doctors = [
  {
    name: "Dr. Sanjana Gupta",
    role: "Neurosurgeon",
    specialty: "Neurology",
    experience: "12 yrs",
    rating: 4.8,
    available: "Today",
    image: "https://plus.unsplash.com/premium_photo-1681967035389-84aabd80cb1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Dr. Pimple Popper",
    role: "Psychiatrist",
    specialty: "Psychiatry",
    experience: "9 yrs",
    rating: 4.6,
    available: "Tomorrow",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Sherry Ross",
    role: "Gynecologist",
    specialty: "Gynecology",
    experience: "15 yrs",
    rating: 4.9,
    available: "Today",
    image: "https://imgs.search.brave.com/Xph0n_Ttbk-DRp3BGhZWPQ1PtBzutbc43bD2rnOdOPI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9tYXR1/cmUtZmVtYWxlLWRv/Y3Rvci10YWtpbmct/bm8tMjM4NjY4Ny5q/cGc",
  },
  {
    name: "Dr. Jen Gunter",
    role: "Neurologist",
    specialty: "Neurology",
    experience: "11 yrs",
    rating: 4.7,
    available: "This week",
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80",}

];


/* ================= COMPONENT ================= */

export default function Doctors() {
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [query, setQuery] = useState("");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSpecialty =
        activeSpecialty === "All" ||
        doc.specialty === activeSpecialty;

      const matchesQuery =
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.role.toLowerCase().includes(query.toLowerCase());

      return matchesSpecialty && matchesQuery;
    });
  }, [activeSpecialty, query]);

  return (
    <section className="max-w-7xl mx-auto px-6 mt-20">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Book an appointment
        </h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search doctor or specialty"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* ===== SPECIALTY FILTERS ===== */}
      <div className="flex flex-wrap gap-3 mb-10">
        <FilterButton
          label="All"
          active={activeSpecialty === "All"}
          onClick={() => setActiveSpecialty("All")}
        />

        {specialties.map((item) => (
          <FilterButton
            key={item.label}
            label={item.label}
            icon={item.icon}
            active={activeSpecialty === item.label}
            onClick={() => setActiveSpecialty(item.label)}
          />
        ))}
      </div>

      {/* ===== DOCTOR CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDoctors.map((doc) => (
          <DoctorCard key={doc.name} doctor={doc} />
        ))}

        {filteredDoctors.length === 0 && (
          <p className="text-slate-500 text-sm">
            No doctors found.
          </p>
        )}
      </div>
    </section>
  );
}

/* ================= SUB COMPONENTS ================= */

function FilterButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition
        ${
          active
            ? "bg-[#1f2a63] text-white border-[#1f2a63]"
            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
        }`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}

function DoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition flex flex-col">

      {/* IMAGE */}
      <div className="w-full h-[170px] rounded-2xl overflow-hidden bg-slate-100">
      <img
  src={doctor.image}
  alt={doctor.name}
  className="w-full h-full object-cover"
  onError={(e) => {
    e.target.src =
      "https://via.placeholder.com/400x300?text=Doctor+Image";
  }}
/>

      </div>

      {/* INFO */}
      <div className="mt-4 space-y-1 flex-1">
        <h3 className="font-semibold text-slate-900">
          {doctor.name}
        </h3>
        <p className="text-sm text-slate-500">
          {doctor.role}
        </p>

        <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
          <span>⭐ {doctor.rating}</span>
          <span>{doctor.experience}</span>
        </div>

        <p className="text-xs text-green-600 mt-1">
          Available {doctor.available}
        </p>
      </div>

      {/* ACTION */}
      <button
        onClick={() => alert(`Appointment booked with ${doctor.name}!`)}
        className="mt-4 w-full bg-[#4f46e5] hover:bg-[#4338ca] transition text-white py-2.5 rounded-xl text-sm font-medium"
      >
        Book Appointment
      </button>
    </div>
  );
}
