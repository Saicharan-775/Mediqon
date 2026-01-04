import React from "react";

const articles = [
  {
    title: "AI Health Insights",
    subtitle: "Early signals your body gives",
    bg: "bg-[#F5E889]",
    icon: "🧠",
  },
  {
    title: "Find the Right Doctor",
    subtitle: "How specialists make a difference",
    bg: "bg-[#C7EED8]",
    icon: "👨‍⚕️",
  },
  {
    title: "Medicines & Recovery",
    subtitle: "What helps healing faster",
    bg: "bg-[#F6CCD9]",
    icon: "💊",
  },
  {
    title: "Lab Tests Explained",
    subtitle: "Why reports matter early",
    bg: "bg-[#C9DFFF]",
    icon: "🧪",
  },
];

const Articles = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-24 pb-28">

      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-slate-900">
          Health insights & guides
        </h2>
        <p className="text-slate-500 mt-2 max-w-lg">
          Simple explanations designed to help you understand your health
          before problems become serious.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((item) => (
          <ArticleCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Articles;

/* ===== CARD ===== */

function ArticleCard({ item }) {
  return (
    <div
      className={`${item.bg} rounded-[28px] p-6 h-[180px]
      flex flex-col justify-between cursor-pointer
      hover:scale-[1.02] transition`}
    >
      {/* TOP */}
      <div>
        <h3 className="font-semibold text-slate-900">
          {item.title}
        </h3>
        <p className="text-sm text-slate-700 mt-1">
          {item.subtitle}
        </p>
      </div>

      {/* BOTTOM */}
      <div className="flex items-center justify-between">
        {/* ICON */}
        <span className="text-4xl opacity-30">
          {item.icon}
        </span>

        {/* ARROW */}
        <div className="w-10 h-10 rounded-full bg-[#1f2a63] flex items-center justify-center text-white">
          →
        </div>
      </div>
    </div>
  );
}
