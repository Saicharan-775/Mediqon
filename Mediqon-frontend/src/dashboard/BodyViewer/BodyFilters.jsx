import React from 'react'
 const filters = [
    "Full body",
    "Skin",
    "Muscular",
    "Skeletal",
    "Organs",
    "Vascular",
    "Nervous",
  ];
const BodyFilters = () => {
  return (
    <div className="flex gap-3 mb-4 flex-wrap">
      {filters.map((filter, index) => (
        <button
          key={filter}
          className={`px-4 py-1.5 rounded-full text-sm ${
            index === 0
              ? "bg-[#4f46e5] text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default BodyFilters