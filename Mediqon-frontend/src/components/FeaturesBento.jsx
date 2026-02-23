import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconShieldLock,IconHeartbeat, IconActivity,IconBrain, IconUser, IconStethoscope, IconBuildingHospital } from "@tabler/icons-react";
import {
  IconTableColumn,
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconBoxAlignRightFilled,
  IconSignature,
  IconBoxAlignTopLeft,
} from "@tabler/icons-react";
/* ==============================
   REALISTIC MEDIQON PREVIEWS
============================== */

/* 1️⃣ Smart Dashboard Preview */
const SmartDashboardPreview = () => (
  <div className="relative w-full h-full rounded-xl overflow-hidden
                  bg-gradient-to-br from-neutral-900 to-neutral-950
                  border border-white/10 p-4">

    {/* Background glow */}
    <div className="absolute -top-10 -right-10 w-40 h-40 
                    bg-green-500/20 blur-3xl rounded-full" />

    <div className="relative flex flex-col gap-4 h-full">

      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
          <div className="h-2 w-16 bg-neutral-700 rounded-full" />
        </div>
        <div className="h-2 w-8 bg-neutral-700 rounded-full" />
      </div>

      {/* Patient Profile */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10" />
        <div className="flex flex-col gap-1">
          <div className="h-2 w-20 bg-neutral-700 rounded-full" />
          <div className="h-2 w-14 bg-neutral-800 rounded-full" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">

        <div className="bg-neutral-800/60 backdrop-blur-md 
                        rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <IconHeartbeat className="w-4 h-4 text-green-400" />
            <div className="h-2 w-14 bg-neutral-700 rounded-full" />
          </div>
          <div className="text-green-400 text-sm font-semibold">
            72 BPM
          </div>
        </div>

        <div className="bg-neutral-800/60 backdrop-blur-md 
                        rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <IconActivity className="w-4 h-4 text-blue-400" />
            <div className="h-2 w-14 bg-neutral-700 rounded-full" />
          </div>
          <div className="text-blue-400 text-sm font-semibold">
            98%
          </div>
        </div>

      </div>

      {/* Chart Area */}
      <div className="relative flex-1 bg-neutral-800/40 rounded-xl p-3 border border-white/5 overflow-hidden">

        {/* Fake Chart Lines */}
        <div className="absolute bottom-3 left-3 right-3 h-16">
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <polyline
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              points="0,30 20,20 40,25 60,15 80,18 100,10"
            />
            <defs>
              <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

      </div>

    </div>
  </div>
);

/* 2️⃣ AI Health Prediction Preview */
const AIPredictionPreview = () => (
  <div className="relative w-full h-full bg-neutral-900 rounded-xl p-4 border border-white/10 overflow-hidden">

    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-pink-500/10" />

    <div className="relative flex flex-col gap-3">

      <div className="text-xs text-purple-400 font-medium">
        AI Risk Assessment
      </div>

      <div className="bg-neutral-800/70 backdrop-blur p-3 rounded-lg text-xs text-neutral-300 leading-relaxed">
        Based on reported symptoms and past records, the patient has a 
        <span className="text-purple-400 font-semibold"> moderate cardiovascular risk</span>.
      </div>

      <div className="flex items-center gap-2">
        <div className="h-2 w-24 bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-pink-500" />
        </div>
        <span className="text-[10px] text-neutral-400">Confidence 78%</span>
      </div>

    </div>
  </div>
);

/* 3️⃣ Smart Consultation Preview */
const ConsultationPreview = () => (
  <div className="relative w-full h-full bg-neutral-900 rounded-xl p-4 border border-white/10 flex flex-col gap-3">

    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
      <div>
        <p className="text-xs text-white font-medium">Dr. Sharma</p>
        <p className="text-[10px] text-neutral-400">Cardiologist</p>
      </div>
    </div>

    <div className="bg-neutral-800/70 backdrop-blur p-3 rounded-lg text-xs text-neutral-300">
      Reviewing patient’s latest ECG report...
    </div>

    <div className="text-[10px] text-green-400 bg-green-500/10 px-2 py-1 rounded-full w-fit">
      Appointment Confirmed
    </div>

  </div>
);
/* 4️⃣ Crowdfunding Preview */
const CrowdfundingPreview = () => (
  <div className="relative w-full h-full bg-neutral-900 rounded-xl p-4 border border-white/10 flex flex-col gap-4">

    <div className="text-xs text-emerald-400 font-medium">
      Medical Fund Campaign
    </div>

    <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
      <div className="h-full w-4/5 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" />
    </div>

    <div className="flex justify-between text-[10px] text-neutral-400">
      <span>₹80,000 Raised</span>
      <span>Goal ₹1,00,000</span>
    </div>

  </div>
);

/* 5️⃣ Trusted Platform Preview */
const SecurityPreview = () => (
  <div className="relative w-full h-full rounded-xl overflow-hidden 
                  bg-gradient-to-br from-neutral-900 to-neutral-950
                  border border-white/10 p-5">

    {/* soft green glow */}
    <div className="absolute -top-10 -right-10 w-32 h-32 
                    bg-green-500/20 blur-3xl rounded-full" />

    <div className="relative flex flex-col items-center justify-center h-full gap-4">

      {/* Icon container */}
      <div className="relative w-16 h-16 flex items-center justify-center
                      rounded-2xl bg-green-500/10 border border-green-500/30
                      backdrop-blur-md">

        <IconShieldLock className="w-8 h-8 text-green-400" />

        {/* subtle pulse ring */}
        <div className="absolute inset-0 rounded-2xl 
                        border border-green-500/20 
                        animate-pulse" />
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-sm font-medium text-white">
          End-to-End Encryption
        </p>
        <p className="text-xs text-neutral-400 mt-1">
          Secure & HIPAA compliant data storage
        </p>
      </div>

    </div>
  </div>
);

/* 6️⃣ AI Integrated Platform Preview */

const PlatformPreview = () => (
  <div className="relative w-full h-full rounded-xl overflow-hidden
                  bg-gradient-to-br from-neutral-900 to-neutral-950
                  border border-white/10 p-5">

    {/* soft ambient glow */}
    <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-transparent to-emerald-500/10" />

    <div className="relative h-full flex items-center justify-center">

      {/* Layout container */}
      <div className="relative w-40 h-40">

        {/* Center AI Node */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-2xl 
                          bg-green-500/10 
                          border border-green-500/30 
                          flex items-center justify-center
                          backdrop-blur-md">
            <IconBrain className="w-6 h-6 text-green-400" />
          </div>
        </div>

        {/* Patient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <div className="w-10 h-10 rounded-xl 
                          bg-neutral-800 border border-white/10 
                          flex items-center justify-center">
            <IconUser className="w-4 h-4 text-neutral-300" />
          </div>
        </div>

        {/* Doctor */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <div className="w-10 h-10 rounded-xl 
                          bg-neutral-800 border border-white/10 
                          flex items-center justify-center">
            <IconStethoscope className="w-4 h-4 text-neutral-300" />
          </div>
        </div>

        {/* Hospital */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <div className="w-10 h-10 rounded-xl 
                          bg-neutral-800 border border-white/10 
                          flex items-center justify-center">
            <IconBuildingHospital className="w-4 h-4 text-neutral-300" />
          </div>
        </div>

        {/* Bottom node */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="w-10 h-10 rounded-xl 
                          bg-neutral-800 border border-white/10 
                          flex items-center justify-center">
            <IconUser className="w-4 h-4 text-neutral-300" />
          </div>
        </div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="80" y1="80" x2="80" y2="20" stroke="#22c55e" strokeOpacity="0.4" />
          <line x1="80" y1="80" x2="20" y2="80" stroke="#22c55e" strokeOpacity="0.4" />
          <line x1="80" y1="80" x2="140" y2="80" stroke="#22c55e" strokeOpacity="0.4" />
          <line x1="80" y1="80" x2="80" y2="140" stroke="#22c55e" strokeOpacity="0.4" />
        </svg>

      </div>

    </div>
  </div>
);
/* ==============================
   MAIN COMPONENT
============================== */

export default function FeaturesBento() {
  const items = [
  {
    title: "Smart Dashboard",
    description:
      "AI integrated dashboard that tracks medical history and provides insights.",
    header: <SmartDashboardPreview />,
    icon: <IconTableColumn className="h-5 w-5" />,
    className: "md:col-span-2",
  },
  {
    title: "AI Health Predictions",
    description:
      "AI analyzes symptoms and reports to detect potential health risks early.",
    header: <AIPredictionPreview />,
    icon: <IconArrowWaveRightUp className="h-5 w-5" />,
  },
  {
    title: "Smart Consultations",
    description:
      "Organized patient history for faster doctor decisions and better care.",
    header: <ConsultationPreview />,
    icon: <IconClipboardCopy className="h-5 w-5" />,
  },
  {
    title: "Crowdfunding",
    description:
      "Transparent tracking of medical funds to ensure trust and accountability.",
    header: <CrowdfundingPreview />,
    icon: <IconSignature className="h-5 w-5" />,
  },
  {
    title: "Trusted Health Platform",
    description:
      "Secure and reliable infrastructure trusted by patients and hospitals.",
    header: <SecurityPreview />,
    icon: <IconBoxAlignTopLeft className="h-5 w-5" />,
  },
  {
    title: "AI Integrated Platform",
    description:
      "Built to connect patients, doctors and hospitals safely and efficiently.",
    header: <PlatformPreview />,
    icon: <IconBoxAlignRightFilled className="h-5 w-5" />,
    className: "md:col-span-2",
  },
];

  return (
  <section className="relative bg-black text-white overflow-hidden">

    {/* Background Glow */}
    <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-green-500/10 blur-[120px] rounded-full -z-10" />

    <div className="max-w-7xl mx-auto px-6">

      {/* Heading Section */}
      <div className="mb-16 max-w-2xl">

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
          Monitor Your Health <br />
          <span className="text-neutral-400">
            Using AI
          </span>
        </h2>

        <p className="mt-6 text-neutral-400 text-base md:text-lg leading-relaxed">
          Mediqon leverages artificial intelligence to provide real-time
          health monitoring, predictive analysis, and seamless collaboration
          between patients and healthcare providers.
        </p>

      </div>

      {/* Bento Grid */}
      <BentoGrid>
        {items.map((item, i) => (
          <BentoGridItem key={i} {...item} />
        ))}
      </BentoGrid>

    </div>
  </section>
);
}