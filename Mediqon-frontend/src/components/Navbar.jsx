export default function Navbar() {
  return (
    <nav className="w-full bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-xl font-semibold tracking-tight">
          <span className="text-white">Medi</span>
          <span className="text-green-400">qon</span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10 text-sm text-gray-300">
          <a className="hover:text-white transition">How it works</a>
          <a className="hover:text-white transition">Features</a>
          <a className="hover:text-white transition">Comparison</a>
          <a className="hover:text-white transition">Dashboard</a>
        </div>

        {/* Contact Button */}
        <button className="relative px-6 py-2 rounded-full bg-green-500 text-black text-sm font-medium transition hover:scale-105 hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]">
          Contact →
        </button>
      </div>
    </nav>
  );
}