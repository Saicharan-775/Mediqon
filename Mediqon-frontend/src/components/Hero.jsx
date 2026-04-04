import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroScrollDemo from "./container-scroll-animation-demo"
import FeaturesBento from "./FeaturesBento"

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-[#050505] text-white px-6 pt-32 pb-4 overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/10 blur-[160px] rounded-full -z-10 animate-pulse" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto text-center relative z-10">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] bg-emerald-500/5 text-emerald-400 rounded-full border border-emerald-500/20 backdrop-blur-md inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            Healthcare of the Future
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8 font-display"
        >
          Healthcare <br />
          <span className="text-neutral-500">beyond the</span> <br />
          <span className="bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">Hospital Walls.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-neutral-400 max-w-2xl mx-auto text-base md:text-xl font-jakarta leading-relaxed"
        >
          Smart digital healthcare ecosystem built for modern patients. 
          Seamlessly connect, book, and thrive with Mediqon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button 
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            Get Started Now
          </button>
          <button className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest backdrop-blur-md transition-all duration-300 hover:bg-white/10 cursor-pointer">
            Learn More
          </button>
        </motion.div>

      </div>

      <div className="mt-20 scale-105 md:scale-110">
        <HeroScrollDemo />
      </div>
      
      <div className="mt-[-80px] md:mt-[-150px] relative z-20">
        <FeaturesBento /> 
      </div>
    </section>
  );
}