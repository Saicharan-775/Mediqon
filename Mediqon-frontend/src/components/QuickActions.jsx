import {
  VideoCameraIcon,
  UserGroupIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Instant Video Consultation",
    subtitle: "Connect with specialists in  under 60 seconds.",
    icon: VideoCameraIcon,
    gradient: "from-emerald-500/20 to-green-500/5",
  },
  {
    title: "Find Doctors Near You",
    subtitle: "Book verified appointments instantly.",
    icon: UserGroupIcon,
    gradient: "from-blue-500/20 to-indigo-500/5",
  },
  {
    title: "24/7 Medicines",
    subtitle: "Order essentials anytime, anywhere.",
    icon: ClipboardDocumentListIcon,
    gradient: "from-pink-500/20 to-rose-500/5",
  },
  {
    title: "Lab Tests",
    subtitle: "Home sample collection & reports.",
    icon: BeakerIcon,
    gradient: "from-purple-500/20 to-violet-500/5",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {actions.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl p-8
                           bg-neutral-900/60 backdrop-blur-2xl
                           border border-white/5
                           transition-all duration-500
                           hover:-translate-y-2
                           hover:border-white/20"
              >

                {/* Gradient glow */}
                <div
                  className={`absolute inset-0 rounded-3xl opacity-0 
                              group-hover:opacity-100 transition duration-500
                              bg-gradient-to-br ${item.gradient}`}
                />

                {/* Icon */}
                <div className="relative w-14 h-14 rounded-2xl
                                bg-neutral-800 border border-white/10
                                flex items-center justify-center
                                mb-8 transition
                                group-hover:bg-black">
                  <Icon className="w-7 h-7 text-green-400 transition group-hover:scale-110" />
                </div>

                {/* Text */}
                <h3 className="relative text-white text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="relative text-neutral-400 text-sm mt-3 leading-relaxed">
                  {item.subtitle}
                </p>

                {/* Arrow */}
                <div className="absolute bottom-8 right-8 
                                w-7 h-7 rounded-full
                                bg-black border border-white/10
                                flex items-center justify-center
                                transition-all duration-300
                                group-hover:bg-green-500
                                group-hover:border-green-500">
                  <ArrowRightIcon className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </div>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}