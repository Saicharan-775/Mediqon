import React, { useState } from "react";
import MedicineCard from "./MedicineCard";

const xrays = Array.from({ length: 6 });

const ReportPanel = () => {
  const [showMore, setShowMore] = useState(false);
  const [activeXray, setActiveXray] = useState(null);

  return (
    <aside className="bg-white rounded-3xl p-6 shadow-sm space-y-6">
      
      {/* ===== DISEASE HEADER ===== */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">
            M75.3 – Calcific Tendinitis
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Shoulder tendon inflammation
          </p>
        </div>

        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
          Moderate
        </span>
      </div>

      {/* ===== AI CONFIDENCE ===== */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-4">
        <p className="text-xs text-slate-500">AI Diagnostic Confidence</p>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full w-[82%] bg-indigo-600 rounded-full" />
          </div>
          <span className="text-sm font-semibold text-indigo-600">
            82%
          </span>
        </div>
      </div>

      {/* ===== XRAY PREVIEWS ===== */}
      <div>
        <p className="text-sm font-medium mb-2">
          Medical Imaging (X-Ray / MRI)
        </p>

        <div className="grid grid-cols-3 gap-3">
          {xrays.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveXray(i)}
              className={`h-20 rounded-xl flex items-center justify-center text-xs transition
                ${
                  activeXray === i
                    ? "bg-indigo-100 text-indigo-600 ring-2 ring-indigo-400"
                    : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                }`}
            >
              X-Ray {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ===== AI INSIGHTS ===== */}
      <div>
        <h4 className="font-medium text-slate-900">
          AI Health Insights
        </h4>

        <p className="text-sm text-slate-500 mt-1">
          Pain is gradually reducing with current treatment.
        </p>

        {showMore && (
          <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc list-inside">
            <li>Continue physiotherapy for 10–14 days</li>
            <li>Avoid overhead shoulder movements</li>
            <li>Apply cold packs twice daily</li>
          </ul>
        )}

        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-2 text-sm text-indigo-600 hover:underline"
        >
          {showMore ? "Show less" : "View detailed AI advice"}
        </button>
      </div>

      {/* ===== MEDICINES ===== */}
      <div>
        <h4 className="font-medium mb-2">Prescribed Medicines</h4>

        <div className="grid grid-cols-2 gap-3">
          <MedicineCard
            name="Vitamin B12"
            dose="Injection · 5ml"
            tag="Recovery"
          />
          <MedicineCard
            name="MaxPro"
            dose="Capsule · 20mg"
            tag="Pain Relief"
          />
        </div>
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="space-y-3 pt-2">
        <button className="w-full bg-[#4f46e5] hover:bg-[#4338ca] transition text-white py-3 rounded-xl font-medium">
          Book Orthopedic Appointment
        </button>

        <button className="w-full border border-slate-200 text-slate-700 py-3 rounded-xl text-sm hover:bg-slate-50 transition">
          Download AI Report (PDF)
        </button>
      </div>
    </aside>
  );
};

export default ReportPanel;
