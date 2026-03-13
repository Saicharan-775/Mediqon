import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Heart, Star, Clock, Video, MapPin } from 'lucide-react';

const DoctorCard = ({ doctor, onBook, onFavorite, isFavorite = false }) => {
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const slots = doctor.slots || ['10:00 AM', '11:30 AM', '03:00 PM'];

  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/45 hover:shadow-2xl hover:shadow-slate-950/70">
      <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 sm:h-48">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${doctor.name.replace(' ', '+')}&background=1e293b&color=10b981&size=256`;
          }}
        />
        <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <button
            onClick={() => onFavorite(doctor.id)}
            className={`rounded-xl border border-white/30 bg-black/35 p-2 text-white backdrop-blur-md transition-all hover:border-rose-300/50 hover:bg-rose-500/20 ${
              isFavorite ? 'border-rose-300/70 bg-rose-500/25 text-rose-100' : ''
            }`}
            aria-label="Favorite doctor"
          >
            <Heart className="h-5 w-5" fill={isFavorite ? '#fb7185' : 'none'} strokeWidth={2} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-100">
          <Clock className="h-3.5 w-3.5" />
          Next: {slots[0]}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="line-clamp-1 text-base font-bold leading-tight text-white sm:text-lg">
                {doctor.name}
              </h3>
              {doctor.verified && (
                <div className="ml-0 flex items-center gap-1 rounded-full border border-emerald-300/50 bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-100">
                  <Icon icon="mdi:check-decagram" className="h-3 w-3" />
                  Verified
                </div>
              )}
            </div>
            <p className="line-clamp-1 text-xs text-slate-300 sm:text-sm">{doctor.specialty}</p>
          </div>
          <div className="flex items-center gap-1 rounded-xl border border-amber-300/40 bg-amber-500/15 p-2 text-sm font-semibold text-amber-100">
            <Star className="h-4 w-4 fill-current" />
            {doctor.rating}
          </div>
        </div>

        <div className="mb-3 flex items-center gap-2 text-xs text-slate-300 sm:text-sm">
          <Icon icon="mdi:account-school-outline" className="h-4 w-4" />
          <span>{doctor.experience} years experience</span>
        </div>

        <div className="space-y-2 mb-6">
          <p className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-300">
            <Clock className="h-4 w-4" />
            Available slots
          </p>
          <div className="grid grid-cols-3 gap-2">
            {slots.slice(0, 3).map((slot) => (
              <button
                key={slot}
                onClick={() => onBook(doctor, slot)}
                onMouseEnter={() => setHoveredSlot(slot)}
                className={`relative rounded-xl border p-2 text-xs font-semibold text-slate-100 transition-all sm:p-3
                  ${
                    hoveredSlot === slot
                      ? 'border-emerald-300/65 bg-emerald-500/20 shadow-lg shadow-emerald-500/20'
                      : ''
                  }
                  ${hoveredSlot === slot ? '' : 'border-white/10 bg-slate-800/70 hover:border-sky-300/50 hover:bg-slate-800'}`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 text-lg font-bold text-emerald-300">
            <span>${doctor.price}</span>
            <span className="text-sm font-normal text-slate-300">/consult</span>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            <span className="flex items-center gap-1 whitespace-nowrap text-xs text-slate-200">
              {doctor.type === 'Video' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
              {doctor.type}
            </span>
            <button
              onClick={() => onBook(doctor, slots[0])}
              className="h-10 rounded-2xl bg-gradient-to-r from-sky-400 to-emerald-400 px-4 text-xs font-bold text-slate-900 shadow-lg transition-all duration-300 hover:shadow-emerald-400/30 sm:px-6 sm:text-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;

