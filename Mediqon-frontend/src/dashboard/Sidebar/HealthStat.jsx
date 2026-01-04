import React from 'react'

const HealthStat = ({ label, value, alert }) => {
  return (
    <div
      className={`flex justify-between p-3 rounded-xl ${
        alert ? "bg-red-50 text-red-600" : "bg-slate-100"
      }`}
    >
      <span className="text-sm">{label}</span>
      <span className="font-semibold text-sm">{value}</span>
    </div>
  )
}

export default HealthStat