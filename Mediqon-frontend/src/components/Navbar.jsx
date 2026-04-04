import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: 'solar:home-2-bold', public: true },
    { name: 'Dashboard', path: '/dashboard', icon: 'solar:widget-bold', private: true },
    { name: 'Clinicians', path: '/doctors', icon: 'solar:user-rounded-bold', private: true },
    { name: 'Metrics', path: '/vitals', icon: 'solar:health-bold', private: true },
    { name: 'Bookings', path: '/bookings', icon: 'solar:calendar-date-bold', private: true },
    { name: 'Profile', path: '/settings', icon: 'solar:settings-bold', private: true },
  ];

  const filteredLinks = navLinks.filter(link => 
    (link.public && !isAuthenticated) || (link.private && isAuthenticated)
  );

  return (
    <nav className="w-full bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-[100] h-14 flex items-center antialiased">
      <div className="max-w-[1200px] mx-auto px-4 w-full flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="h-7 w-7 rounded-lg bg-foreground text-background flex items-center justify-center font-black text-xs shadow-sm">M</div>
          <span className="text-sm font-bold tracking-tight text-foreground uppercase tracking-widest group-hover:text-primary transition-colors">Mediqon</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-muted border border-border p-1 rounded-xl">
          {filteredLinks.map(link => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg flex items-center gap-2 ${
                location.pathname === link.path 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/20'
              }`}
            >
              <Icon icon={link.icon} className="h-4 w-4" />
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/settings" className="hidden lg:flex items-center gap-2 h-9 px-3 rounded-lg bg-card border border-border hover:border-border transition-all text-muted-foreground hover:text-foreground shadow-sm">
                   <div className="h-5 w-5 rounded-md overflow-hidden bg-muted p-0.5">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} alt="User" className="h-full w-full object-cover" />
                   </div>
                   <span className="text-[9px] font-bold uppercase tracking-widest">Medical Account</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="h-9 px-4 rounded-lg bg-rose-500 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-rose-600 transition-all shadow-sm active:scale-95"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate('/login')} className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all">Sign in</button>
                <button onClick={() => navigate('/login')} className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-sm active:scale-95">Get Started</button>
              </div>
            )}

            <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 text-neutral-400 hover:text-white transition-all shadow-sm ml-1"
            >
                <Icon icon={mobileMenuOpen ? "solar:close-circle-bold" : "solar:hamburger-menu-bold"} className="h-5 w-5" />
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border md:hidden overflow-hidden shadow-2xl"
          >
            <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                    {filteredLinks.map(link => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${
                                location.pathname === link.path
                                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                                : 'bg-card border-border text-muted-foreground'
                            }`}
                        >
                            <Icon icon={link.icon} className="h-5 w-5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{link.name}</span>
                        </Link>
                    ))}
                </div>
                {!isAuthenticated && (
                    <div className="pt-2 flex flex-col gap-2">
                        <button onClick={() => navigate('/login')} className="w-full h-11 rounded-xl border border-border text-foreground text-[10px] font-bold uppercase tracking-widest active:bg-muted">Sign In</button>
                        <button onClick={() => navigate('/login')} className="w-full h-11 rounded-xl bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest active:opacity-90">Get Started</button>
                    </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
