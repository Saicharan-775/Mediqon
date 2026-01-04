import React from 'react'
const tabs = [
    "Overview",
    "Health Reports",
    "Appointments",
    "Prescriptions",
  ];
const DashboardTabs = () => {
  return (
    <div className="flex gap-3">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`px-5 py-2 rounded-full text-sm ${
            index === 1
              ? "bg-black text-white"
              : "bg-white text-slate-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default DashboardTabs