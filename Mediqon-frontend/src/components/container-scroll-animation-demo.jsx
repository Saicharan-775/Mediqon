import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import DashboardImage from "@/assets/dashboard.png";

export default function HeroScrollDemo() {
  return (
    <div className="bg-black text-white">
  <ContainerScroll
    titleComponent={
      <h1 className="text-4xl md:text-6xl font-bold text-center">
        Monitor Your Health <br />
        <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Using AI
        </span>
      </h1>
    }
  >
    <img
      src={DashboardImage}
      alt="Dashboard Preview"
      className="mx-auto rounded-2xl object-cover"
      draggable={false}
    />
  </ContainerScroll>
</div>
  );
}