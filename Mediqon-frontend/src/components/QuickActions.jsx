import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const actions = [
  {
    title: "Video Consultation",
    subtitle: "Connect with top specialists in under 60 seconds.",
    icon: "solar:videocamera-record-bold-duotone",
    gradient: "from-emerald-500/20 to-green-500/5",
    color: "text-emerald-400",
  },
  {
    title: "Find Doctors",
    subtitle: "Book verified appointments with experts instantly.",
    icon: "solar:users-group-rounded-bold-duotone",
    gradient: "from-blue-500/20 to-indigo-500/5",
    color: "text-blue-400",
  },
  {
    title: "24/7 Pharmacy",
    subtitle: "Order healthcare essentials anytime, anywhere.",
    icon: "solar:pills-bold-duotone",
    gradient: "from-pink-500/20 to-rose-500/5",
    color: "text-rose-400",
  },
  {
    title: "Lab Services",
    subtitle: "Home sample collection with digital reports.",
    icon: "solar:test-tube-bold-duotone",
    gradient: "from-purple-500/20 to-violet-500/5",
    color: "text-purple-400",
  },
];

export default function QuickActions() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">

      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.08),transparent_40%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
            Healthcare Made <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Effortless & Instant
            </span>
          </h2>
          <p className="text-neutral-400 mt-4 text-base">
            Seamlessly access doctors, medicines, and lab tests —
            powered by intelligent digital healthcare.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {actions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group relative rounded-[2rem] p-8
                         bg-white/[0.02] border border-white/[0.05]
                         transition-all duration-500 hover:bg-white/[0.04]
                         hover:border-white/10"
            >
              <div
                className={`absolute inset-0 rounded-[2rem] opacity-0 
                            group-hover:opacity-100 transition duration-700
                            bg-gradient-to-br ${item.gradient} blur-2xl`}
              />

              <div className={`relative w-16 h-16 rounded-2xl
                               bg-white/[0.03] border border-white/10
                               flex items-center justify-center
                               mb-8 transition-all duration-500
                               group-hover:scale-110 group-hover:bg-white/10 ${item.color}`}>
                <Icon icon={item.icon} className="w-9 h-9 transition-transform" />
              </div>

              <h3 className="relative text-white text-xl font-bold font-jakarta">
                {item.title}
              </h3>

              <p className="relative text-neutral-400 text-sm mt-3 leading-relaxed tracking-wide">
                {item.subtitle}
              </p>

              <div className="mt-8 flex items-center gap-2 text-white/40 group-hover:text-white transition-colors">
                 <span className="text-[10px] font-bold uppercase tracking-widest">Explore Now</span>
                 <Icon icon="solar:arrow-right-linear" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}