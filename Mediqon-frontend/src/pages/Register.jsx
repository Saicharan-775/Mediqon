import { useState } from "react";
import API from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "patient"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await API.post("/auth/register", form);
      alert("User registered successfully! Please login to book appointments.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-950 px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 bg-neutral-900 rounded-2xl w-full max-w-md shadow-2xl border border-neutral-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-neutral-400 text-sm">Join Mediqon today</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-4 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-4 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-4 rounded-xl bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
            required
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-600/50 p-4 rounded-xl text-white font-semibold text-lg transition-all shadow-lg hover:shadow-green-500/25 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="text-center text-neutral-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:text-green-300 font-medium transition">Sign in</a>
        </p>
      </form>
    </div>
  );
}

