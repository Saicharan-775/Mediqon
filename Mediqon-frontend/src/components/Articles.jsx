import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const articles = [
  {
    title: "AI Health Insights",
    subtitle: "Early signals your body gives before conditions worsen.",
  },
  {
    title: "Find the Right Doctor",
    subtitle: "How choosing the right specialist improves outcomes.",
  },
  {
    title: "Medicines & Recovery",
    subtitle: "Best practices that support faster healing.",
  },
  {
    title: "Lab Tests Explained",
    subtitle: "Understanding reports before problems escalate.",
  },
];

export default function Articles() {
  return (
    <section className="bg-black py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Health insights & guides
          </h2>
          <p className="text-neutral-400 mt-4 leading-relaxed">
            Clear, expert-backed explanations to help you understand your health
            before problems become serious.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {articles.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl p-6
                         bg-neutral-950
                         border border-neutral-800
                         transition-all duration-500 ease-out
                         cursor-pointer
                         hover:-translate-y-2
                         hover:border-green-500/60
                         hover:shadow-[0_10px_40px_rgba(34,197,94,0.15)]"
            >

              {/* Green Hover Highlight Overlay */}
              <div className="absolute inset-0 rounded-2xl 
                              bg-gradient-to-br from-green-500/10 to-transparent
                              opacity-0 
                              group-hover:opacity-100
                              transition duration-500 pointer-events-none" />

              {/* Title */}
              <h3 className="relative text-white font-medium text-lg tracking-tight
                             transition-colors duration-300
                             group-hover:text-green-400">
                {item.title}
              </h3>

              {/* Subtitle */}
              <p className="relative text-neutral-400 text-sm mt-3 leading-relaxed">
                {item.subtitle}
              </p>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6
                              w-8 h-8 rounded-full
                              bg-neutral-900
                              border border-neutral-800
                              flex items-center justify-center
                              transition-all duration-300
                              group-hover:border-green-500/60
                              group-hover:bg-green-500/10">
                <ArrowUpRightIcon
                  className="w-4 h-4 text-neutral-400 
                             transition-all duration-300
                             group-hover:text-green-400
                             group-hover:translate-x-1 
                             group-hover:-translate-y-1"
                />
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}