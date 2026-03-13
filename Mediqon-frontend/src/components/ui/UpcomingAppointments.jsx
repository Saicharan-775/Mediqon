import React from 'react';
import { Icon } from '@iconify/react';
import { Calendar, Clock, XCircle, Edit3, Video, MapPin } from 'lucide-react';

const mockAppointments = [
  {
    id: 1,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: 'Today',
    time: '10:30 AM',
    type: 'Video',
    status: 'confirmed',
    price: 45,
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    specialty: 'Neurology',
    date: 'Tomorrow',
    time: '02:00 PM',
    type: 'Clinic',
    status: 'pending',
    price: 50,
  },
  {
    id: 3,
    doctor: 'Dr. Emma Wilson',
    specialty: 'Dental',
    date: 'Mon, Mar 23',
    time: '11:00 AM',
    type: 'Clinic',
    status: 'cancelled',
    price: 35,
  },
];

const statusStyles = {
  confirmed: 'border-emerald-300/50 bg-emerald-500/20 text-emerald-100',
  pending: 'border-amber-300/50 bg-amber-500/20 text-amber-100',
  cancelled: 'border-rose-300/50 bg-rose-500/20 text-rose-100',
};

const UpcomingAppointments = ({ appointments = mockAppointments }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/50 backdrop-blur-xl sm:p-8">
      <div className="mb-7 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/20 text-sky-200">
          <Calendar className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">
            Upcoming Appointments
          </h3>
          <p className="text-sm text-slate-300">{appointments.length} scheduled</p>
        </div>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="group rounded-2xl border border-white/10 bg-slate-800/45 p-4 transition-all hover:border-sky-300/40 hover:bg-slate-800/70 sm:p-5"
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${appointment.doctor.replace(' ', '+')}&background=0f172a&color=a7f3d0&size=48`}
                  alt={appointment.doctor}
                  className="h-12 w-12 rounded-2xl ring-2 ring-white/10"
                />
                <div className="min-w-0">
                  <h4 className="truncate text-base font-semibold text-white sm:text-lg">{appointment.doctor}</h4>
                  <p className="text-sm text-slate-300">{appointment.specialty}</p>
                </div>
              </div>

              <div className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[appointment.status]}`}>
                <div className="h-2 w-2 animate-pulse rounded-full bg-current" />
                {appointment.status.toUpperCase()}
              </div>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-3 text-sm text-slate-100 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-sky-200" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-200" />
                <span>{appointment.time}</span>
              </div>
              <div className="font-semibold text-emerald-200">
                ${appointment.price}
                <span className="ml-1 font-normal text-slate-300">/consult</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                {appointment.type === 'Video' ? (
                  <>
                    <Video className="h-4 w-4" />
                    Video Consultation
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4" />
                    In-Clinic
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
              {appointment.status !== 'cancelled' && (
                <>
                  <button
                    className="rounded-xl border border-sky-300/45 bg-sky-400/15 px-4 py-2 text-sm font-semibold text-sky-100 transition-colors hover:bg-sky-400/25"
                  >
                    Join
                  </button>
                  <button
                    className="flex items-center gap-2 rounded-xl border border-white/15 bg-slate-800/70 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-700"
                  >
                    <Edit3 className="h-4 w-4" />
                    Reschedule
                  </button>
                </>
              )}
              <button
                className="flex items-center gap-2 rounded-xl border border-rose-300/50 bg-rose-500/15 px-4 py-2 text-sm font-semibold text-rose-100 transition-colors hover:bg-rose-500/25"
              >
                <XCircle className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="py-16 text-center">
          <Icon icon="mdi:calendar-check-outline" className="mx-auto mb-5 h-16 w-16 text-slate-500" />
          <h3 className="mb-2 text-xl font-semibold text-slate-200">No upcoming appointments</h3>
          <p className="mx-auto mb-6 max-w-sm text-slate-400">
            Your schedule is clear. Book your next appointment with a verified specialist.
          </p>
          <button
            className="rounded-2xl bg-gradient-to-r from-sky-400 to-emerald-400 px-8 py-3 font-bold text-slate-900 shadow-lg shadow-emerald-500/20"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
