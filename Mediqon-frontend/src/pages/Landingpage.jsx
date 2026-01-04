import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import QuickActions from "../components/QuickActions";
import Doctors from "../components/Doctors";
import Articles from "../components/Articles";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fc] font-[Inter]">
      <Navbar />
      <Hero />
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <p className="text-lg text-slate-600 text-center">
          Welcome to Mediqon, your trusted partner in digital healthcare. Discover top doctors, read expert articles, and book appointments seamlessly for a healthier tomorrow.
        </p>
      </div>
      <QuickActions />
      <Doctors />
      <Articles />
    </div>
  );
}
