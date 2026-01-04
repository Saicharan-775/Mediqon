// export function Dashboard() {
// <div className="flex gap-3">
// {tabs.map((t, i) => (
// <button
// key={t}
// className={`px-5 py-2 rounded-full text-sm ${i === 1 ? 'bg-black text-white' : 'bg-white text-slate-600'}`}
// >
// {t}
// </button>
// ))}
// </div>
// }


// /* -------- BODY ANATOMY VIEW -------- */
// function BodyViewer() {
// const filters = ["Full body", "Skin", "Muscular", "Skeletal", "Organs", "Vascular", "Nervous"];


// return (
// <div className="bg-white rounded-3xl p-6 shadow-sm">
// <div className="flex gap-3 mb-4 flex-wrap">
// {filters.map((f, i) => (
// <button
// key={f}
// className={`px-4 py-1.5 rounded-full text-sm ${i === 0 ? 'bg-[#4f46e5] text-white' : 'bg-slate-100 text-slate-600'}`}
// >
// {f}
// </button>
// ))}
// </div>


// <div className="h-[520px] bg-gradient-to-b from-[#f2f5ff] to-[#e6ebff] rounded-2xl flex items-center justify-center text-slate-400">
// 3D Human Body Model (Three.js / Spline Ready)
// </div>
// </div>
// );
// }


// /* -------- REPORT PANEL -------- */
// function ReportPanel() {
// return (
// <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6">
// <h3 className="font-semibold">M75.3 Calcific Tendinitis</h3>
// <p className="text-sm text-slate-500">
// Inflammation of the tendons in the shoulder joint
// </p>


// <div className="grid grid-cols-3 gap-3">
// {Array.from({ length: 6 }).map((_, i) => (
// <div
// key={i}
// className="h-20 bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400"
// >
// X-Ray
// </div>
// ))}
// </div>


// <div className="space-y-3">
// <h4 className="font-medium">AI Tips & Medicines</h4>
// <p className="text-sm text-slate-500">
// Pain is diminishing. Continue physiotherapy and vitamin supplements.
// </p>
// </div>


// <div className="grid grid-cols-2 gap-3">
// <MedicineCard name="Vitamin B12" dose="Injection · 5ml" />
// <MedicineCard name="MaxPro" dose="Capsule · 20mg" />
// </div>


// <button className="w-full border border-[#4f46e5] text-[#4f46e5] py-2 rounded-xl">
// Book Appointment
// </button>
// </div>
// );
// }


// function MedicineCard({ name, dose }) {
// return (
// <div className="bg-[#f7f8fc] rounded-xl p-4">
// <p className="font-medium text-sm">{name}</p>
// <p className="text-xs text-slate-500">{dose}</p>
// </div>
// )
// }