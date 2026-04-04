import { useState } from "react";
import API from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, X, Github, Chrome, ArrowRight, Loader2 } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post("/auth/login", form);
      const { accessToken: token } = res.data;
      login(token);
      setTimeout(() => navigate("/dashboard"), 100);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 antialiased selection:bg-primary selection:text-primary-foreground">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] bg-card border border-border rounded-2xl p-8 shadow-2xl relative z-10"
      >
        {/* Navigation Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="bg-muted p-1 rounded-lg flex items-center border border-border">
            <button 
              onClick={() => navigate('/register')}
              className="px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-all"
            >
              Sign up
            </button>
            <button className="px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider text-foreground bg-background shadow-sm border border-border">
              Login
            </button>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="h-8 w-8 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-foreground uppercase tracking-tight">Access Account</h1>
            <p className="text-xs text-muted-foreground">Please provide your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode='wait'>
                {error && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/10 text-rose-500 text-[10px] font-bold uppercase tracking-widest text-center"
                >
                    {error}
                </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email address</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors h-4 w-4" />
                  <input
                    name="email"
                    type="email"
                    placeholder="name@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-muted border border-border text-foreground rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-primary/30 focus:bg-muted/80 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors h-4 w-4" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-muted border border-border text-foreground rounded-xl py-3 pl-11 pr-11 text-sm outline-none focus:border-primary/30 focus:bg-muted/80 transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Connect Profile
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-4 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Secure entry with</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center py-3 rounded-xl bg-muted border border-border hover:bg-muted/80 transition-all group">
              <Chrome size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
            <button className="flex items-center justify-center py-3 rounded-xl bg-muted border border-border hover:bg-muted/80 transition-all group">
              <Github size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>

          <p className="text-center text-[10px] text-muted-foreground/60 font-medium">
            Privacy focused. Access is restricted to authorized clinicians and patients only.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
