import React from "react";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-6">
      <div className="bg-[#1f2a63] rounded-[32px] px-10 py-14 grid md:grid-cols-2 items-center gap-10">
        
        {/* ===== LEFT CONTENT ===== */}
        <div>
          <h1 className="text-6xl font-extrabold text-white leading-tight">
            Healthcare,
            <br />
            simplified for everyone
          </h1>

          <p className="mt-6 text-slate-200 text-lg max-w-lg">
            Mediqon helps you understand your health early using AI-powered
            analysis — so you can take the right action before problems
            become serious.
          </p>

          <p className="mt-4 text-slate-300 max-w-md text-sm">
            Check symptoms, track health reports, and get clear guidance —
            all from your phone, without waiting in hospital queues.
          </p>

          {/* ===== CTA ===== */}
          <div className="mt-8 flex items-center gap-4">
            <button className="bg-white text-[#1f2a63] px-7 py-3 rounded-full font-medium hover:bg-slate-100 transition">
              Start Health Check
            </button>

            <span className="text-slate-300 text-sm">
              Takes less than 2 minutes
            </span>
          </div>

          {/* ===== TRUST LINE ===== */}
          <p className="mt-6 text-xs text-slate-400">
            Trusted guidance · Early detection · Privacy first
          </p>
        </div>

        {/* ===== RIGHT IMAGE ===== */}
        <div className="flex justify-center">
          <img
            src="https://i.pinimg.com/736x/1e/71/ef/1e71ef3a80ef48e0deb30837461efefe.jpg"
            alt="Doctor"
            className="w-[280px] h-[360px] object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
