import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import API from '../lib/api';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/auth/profile');
      setProfile(res.data);
    } catch (err) {
      console.error('Profile fetch failed:', err);
      setError('Could not load profile details.');
      // Don't logout - token valid for other endpoints
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-neutral-950">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800 shadow-2xl">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl mb-6 text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-neutral-800 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || profile?.name}!</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-neutral-400">Email:</span>
                  <p>{user?.email || profile?.email}</p>
                </div>
                <div>
                  <span className="text-neutral-400">Role:</span>
                  <p className="capitalize">{user?.role || profile?.role}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-neutral-800">
              <button
                onClick={logout}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 py-3 rounded-xl font-medium transition-all"
              >
                Logout
              </button>
              <button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-green-500/25"
              >
                View Appointments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

