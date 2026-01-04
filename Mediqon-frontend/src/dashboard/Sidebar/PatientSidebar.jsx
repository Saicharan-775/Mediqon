import React from "react";
import HealthStat from "./HealthStat";

const PatientSidebar = () => {
  return (
    <aside className="bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between">
      
      {/* ===== PATIENT PROFILE ===== */}
      <div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="w-14 h-14 rounded-full object-cover"
              alt="Patient"
            />
            {/* Online / Active indicator */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Nikolas Pascal
            </h3>
            <p className="text-xs text-slate-500">
              32 y.o · Male
            </p>
          </div>
        </div>

        {/* ===== AI HEALTH SCORE ===== */}
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-4">
          <p className="text-xs text-slate-500">
            AI Health Score
          </p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold text-indigo-600">
              82
            </span>
            <span className="text-xs text-green-600">
              Good
            </span>
          </div>
        </div>

        {/* ===== HEALTH STATS ===== */}
        <div className="mt-6 space-y-3">
          <HealthStat label="Fasting Blood Sugar" value="116 mg/dL" alert />
          <HealthStat label="Blood Pressure" value="120 / 80" />
          <HealthStat label="Heart Rate" value="72 bpm" />
          <HealthStat label="HbA1c" value="5.5%" />
        </div>
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="mt-6 space-y-3">
        <button className="w-full bg-[#4f46e5] hover:bg-[#4338ca] transition text-white py-3 rounded-xl font-medium">
          Assign Medical Tests
        </button>

        <button className="w-full border border-slate-200 hover:bg-slate-50 transition py-3 rounded-xl text-sm text-slate-700">
          View Full Health Report
        </button>
      </div>
    </aside>
  );
};

export default PatientSidebar;
