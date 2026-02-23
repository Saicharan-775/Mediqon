import Image from "../assets/animi.png";
import HeroScrollDemo from "./container-scroll-animation-demo"
import FeaturesBento from "./FeaturesBento"
export default function Hero() {
  return (
    <section className="relative bg-black text-white px-6 pt-24 pb-16 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/20 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto text-center">

        <div className="mb-6">
          <span className="px-4 py-2 text-xs bg-green-500/10 text-green-400 rounded-full border border-green-500/30 tracking-wide">
            Patient-Centric Digital Healthcare System
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight">
          Healthcare that stays <br />
          with you, not just the <br />
          Hospital
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Smart digital healthcare built for patients, doctors, and hospitals.
        </p>

        <button className="mt-8 px-8 py-4 rounded-full bg-green-500 text-black font-medium transition duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.7)]">
          Start Care →
        </button>

      </div>

      {/* Scroll Demo */}
      <div className="mt-1">
        <HeroScrollDemo />
        
      </div>
     <FeaturesBento /> 

      
         
    </section>
  );
}