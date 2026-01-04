import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

      {/* ===== LOGO ===== */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#4f46e5] flex items-center justify-center text-white font-bold">
          M
        </div>
        <div>
          <span className="text-xl font-semibold text-slate-900">
            Mediqon
          </span>
          <p className="text-[10px] text-slate-400 leading-none">
            Digital Healthcare
          </p>
        </div>
      </div>

      {/* ===== NAV LINKS ===== */}
      <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
        <button className="hover:text-slate-900 transition">
          Find Doctors
        </button>
        <button className="hover:text-slate-900 transition">
          Health Checks
        </button>
        <button className="hover:text-slate-900 transition">
          Lab Tests
        </button>
        <Link to="/dashboard" className="hover:text-slate-900 transition">
          Dashboard
        </Link>
      </nav>

      {/* ===== ACTIONS ===== */}
      <div className="flex items-center gap-4">
        <button className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 transition">
          Sign in
        </button>

        <button className="px-5 py-2 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] transition text-white text-sm font-medium">
          Start Free Check
        </button>
      </div>
    </header>
  );
}

export default Navbar;
