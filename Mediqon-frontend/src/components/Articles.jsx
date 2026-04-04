import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const articles = [
  {
    title: "AI Health Insights",
    subtitle: "Understanding how deep learning predicts health signals before conditions worsen.",
    image: "https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=400&h=300",
    icon: "solar:health-bold-duotone",
    tag: "Intelligence",
    readTime: "5 min read"
  },
  {
    title: "The Expert Path",
    subtitle: "How identifying specialized medical excellence improves surgical outcomes.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400&h=300",
    icon: "solar:user-speak-bold-duotone",
    tag: "Guide",
    readTime: "8 min read"
  },
  {
    title: "Regenerative Sleep",
    subtitle: "The science of biological recovery through optimized circadian synchronization.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400&h=300",
    icon: "solar:running-round-bold-duotone",
    tag: "Recovery",
    readTime: "6 min read"
  },
  {
    title: "Bio-Data Literacy",
    subtitle: "Deciphering complex lab reports to stay ahead of metabolic challenges.",
    image: "https://images.unsplash.com/photo-1579154235602-3c2ae2462bc1?auto=format&fit=crop&q=80&w=400&h=300",
    icon: "solar:document-medicine-bold-duotone",
    tag: "Science",
    readTime: "12 min read"
  },
];

export default function Articles({ className = "" }) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Research & Insight</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none font-display">
              Scientific <span className="text-neutral-600">Depth.</span>
            </h2>
            <p className="text-neutral-400 mt-6 text-lg font-medium leading-relaxed max-w-lg">
              Expert-backed medical analysis curated to accelerate your health literacy and recovery journey.
            </p>
          </div>
          <button className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition-all">
             View Archive
             <Icon icon="solar:arrow-right-up-bold" className="w-4 h-4" />
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 border border-white/5 shadow-2xl">
                 <img src={item.image} alt={item.title} className="h-full w-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                 
                 <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-white">
                    <Icon icon="solar:clock-bold" className="h-3 w-3 text-emerald-500" />
                    {item.readTime}
                 </div>
              </div>

              <div className="space-y-4 px-2">
                 <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                       {item.tag}
                    </span>
                 </div>
                 
                 <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                   {item.title}
                 </h3>

                 <p className="text-neutral-500 text-sm font-medium leading-relaxed line-clamp-2">
                   {item.subtitle}
                 </p>

                 <div className="pt-2 flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] transition-all group-hover:text-emerald-500 group-hover:gap-4">
                    Read Deep Dive
                    <Icon icon="solar:arrow-right-bold" className="w-4 h-4" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}