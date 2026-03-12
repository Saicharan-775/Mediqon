import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Doctors from "../components/Doctors";

const mockBookings = [
  {
    id: 1,
    doctor: "Dr. Sanjana Gupta",
    date: "Dec 10",
    time: "10:30 AM",
    status: "confirmed",
    specialty: "Neurology"
  },
  {
    id: 2,
    doctor: "Dr. Sherry Ross",
    date: "Dec 12",
    time: "2:00 PM",
    status: "pending",
    specialty: "Gynecology"
  }
];

const statusColors = {
  confirmed: "bg-green-500/20 text-green-400",
  pending: "bg-yellow-500/20 text-yellow-400",
};

export default function Bookings() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* HEADER */}
      <div className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold">My Appointments</h1>
            <p className="text-neutral-400 text-sm">
              Manage and track your doctor visits
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/doctors"
              className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg"
            >
              Browse Doctors
            </Link>

            <button
              onClick={logout}
              className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
            >
              Logout
            </button>
          </div>

        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="text-neutral-400 text-sm">Total Appointments</h3>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="text-neutral-400 text-sm">Upcoming</h3>
            <p className="text-2xl font-bold mt-2">2</p>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="text-neutral-400 text-sm">Completed</h3>
            <p className="text-2xl font-bold mt-2">8</p>
          </div>

        </div>

        {/* UPCOMING BOOKINGS */}
        <div>

          <h2 className="text-xl font-semibold mb-6">
            Upcoming Appointments
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {mockBookings.map((booking) => (

              <motion.div
                key={booking.id}
                whileHover={{ y: -3 }}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex items-center justify-between"
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />

                  <div>
                    <h3 className="font-semibold">
                      {booking.doctor}
                    </h3>

                    <p className="text-sm text-neutral-400">
                      {booking.specialty}
                    </p>

                    <p className="text-sm text-neutral-500">
                      {booking.date} • {booking.time}
                    </p>
                  </div>

                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${statusColors[booking.status]}`}
                >
                  {booking.status}
                </span>

              </motion.div>

            ))}

          </div>

        </div>

        {/* DOCTOR SEARCH */}
        <div>

          <h2 className="text-xl font-semibold mb-6">
            Find a Doctor
          </h2>

          <Doctors />

        </div>

      </div>

    </div>
  );
}