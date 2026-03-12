import { useAuth } from '../contexts/AuthContext';
import { useLocation, Link } from 'react-router-dom';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  // Skip navbar on auth pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="w-full bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold tracking-tight">
          <span className="text-white">Medi</span>
          <span className="text-green-400">qon</span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10 text-sm text-gray-300">
          <Link to="/" className="hover:text-white transition">How it works</Link>
          <Link to="/" className="hover:text-white transition">Features</Link>
          <Link to="/" className="hover:text-white transition">Comparison</Link>
          {isAuthenticated && (
            <>
              <Link to="/bookings" className="hover:text-white transition">Bookings</Link>
              <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/bookings" 
                className="px-4 py-2 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-300 text-sm font-medium border border-green-500/30 transition-all hover:scale-105"
              >
                Bookings
              </Link>
              <Link 
                to="/dashboard" 
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm font-medium border border-red-500/30 transition-all hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="px-6 py-2.5 rounded-full bg-transparent border border-white/20 text-sm text-white hover:bg-white/10 font-medium transition-all hover:scale-105"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 rounded-full bg-green-500 text-black text-sm font-medium transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"
              >
                Get Started →
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

