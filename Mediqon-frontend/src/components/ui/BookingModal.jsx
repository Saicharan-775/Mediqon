import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { AnimatePresence } from 'framer-motion';
import { CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const BookingModal = ({ isOpen, onClose, doctor, selectedSlot, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(selectedSlot || doctor?.slots?.[0] || '');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setConfirmation(true);
    setLoading(false);
    setTimeout(() => {
      onConfirm();
      onClose();
    }, 1800);
  };

  const today = new Date();
  const availableTimes = doctor?.slots?.length
    ? doctor.slots
    : ['10:00 AM', '12:00 PM', '03:30 PM'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Dialog className="p-0">
              <Dialog.Panel className="p-0">
                <div className="border-b border-white/10 p-6 pb-5 sm:p-8 sm:pb-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-emerald-400 shadow-lg shadow-sky-500/20 sm:h-16 sm:w-16">
                      <CalendarIcon className="h-7 w-7 text-slate-900 sm:h-8 sm:w-8" />
                    </div>
                    <div>
                      <Dialog.Title className="text-2xl font-bold text-white">
                        Book Appointment
                      </Dialog.Title>
                      <p className="text-sm text-slate-300">
                        with <span className="font-semibold text-emerald-300">{doctor?.name}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {!confirmation ? (
                      <div key="booking-form">
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="h-16 w-16 rounded-xl object-cover ring-2 ring-emerald-300/30"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${doctor.name.replace(' ', '+')}&background=1e293b&color=10b981&size=128`;
                              }}
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="truncate font-semibold text-white">{doctor.name}</h4>
                              <p className="text-sm text-slate-300">{doctor.specialty}</p>
                            </div>
                            <div className="text-lg font-semibold text-emerald-300">${doctor.price}/consult</div>
                          </div>

                          <div>
                            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-300">
                              <CalendarIcon className="h-4 w-4" />
                              Select Date
                            </label>
                            <div className="relative">
                              <DatePicker
                                selected={selectedDate}
                                onChange={setSelectedDate}
                                minDate={today}
                                dateFormat="EEE, MMM d"
                                className="w-full rounded-2xl border border-white/15 bg-slate-800/60 p-4 pl-12 text-lg font-medium text-white transition-all placeholder:text-slate-400 focus:border-sky-300/60 focus:ring-2 focus:ring-sky-400/30"
                                wrapperClassName="w-full"
                                showPopperArrow={false}
                                calendarClassName="bg-slate-900 border-white/10 text-white rounded-2xl shadow-2xl [&_.react-datepicker__day--selected]:bg-emerald-400 [&_.react-datepicker__day--selected]:text-slate-900"
                                dayClassName={() => 'hover:bg-emerald-400/20'}
                              />
                              <CalendarIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            </div>
                          </div>

                          <div>
                            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-300">
                              <Clock className="h-4 w-4" />
                              Available Times
                            </label>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                              {availableTimes.map((time) => (
                                <button
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-semibold transition-all ${
                                    selectedTime === time
                                      ? 'border-emerald-300/70 bg-emerald-400/25 text-emerald-100 shadow-lg shadow-emerald-500/20'
                                      : 'border-white/10 bg-slate-800/60 text-slate-200 hover:border-sky-300/50 hover:bg-slate-800'
                                  }`}
                                >
                                  <div className={`h-2 w-2 rounded-full ${selectedTime === time ? 'bg-emerald-200' : 'bg-slate-400'}`} />
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        key="confirmation"
                        className="flex flex-col items-center justify-center py-12 text-center"
                      >
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-emerald-300/40 bg-emerald-500/20 shadow-2xl">
                          <CheckCircle className="h-16 w-16 text-emerald-300" />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-white">
                          Appointment Confirmed!
                        </h3>
                        <div className="mb-6 w-full rounded-2xl border border-white/10 bg-slate-800/60 p-6">
                          <div className="text-left">
                            <p className="mb-1 text-sm text-slate-300">With {doctor.name}</p>
                            <p className="text-lg font-semibold text-white">{format(selectedDate, 'EEE, MMM d')} at {selectedTime}</p>
                            <p className="font-semibold text-emerald-300">${doctor.price}/consult</p>
                          </div>
                        </div>
                        <p className="max-w-sm text-slate-300">
                          You'll receive a confirmation email and SMS reminder. Check your upcoming appointments dashboard.
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {!confirmation && (
                  <div className="border-t border-white/10 p-6 pt-0 sm:p-8 sm:pt-0">
                    <div className="flex gap-3">
                      <button
                        onClick={onClose}
                        className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-white/15 bg-slate-800/60 px-6 py-3 text-sm font-semibold text-slate-200 transition-all hover:bg-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirm}
                        disabled={loading || !selectedTime}
                        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-emerald-400 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg transition-all hover:shadow-emerald-400/30 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900" />
                            Confirming...
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Dialog>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
