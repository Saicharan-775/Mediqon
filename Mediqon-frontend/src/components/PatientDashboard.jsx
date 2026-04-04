import React from 'react';
import { motion } from 'framer-motion';
import HealthScore from './dashboard/HealthScore';
import QuickActions from './dashboard/QuickActions';
import AIRiskAlerts from './dashboard/AIRiskAlerts';
import UpcomingAppointments from './dashboard/UpcomingAppointments';
import RecommendedDoctors from './dashboard/RecommendedDoctors';
import HealthTimeline from './dashboard/HealthTimeline';

export default function PatientDashboard({ user, appointments, onStartAssistant, onRefresh }) {
  return (
    <div className="space-y-16 py-8">
      {/* TOP SECTION: Health Score & Risk Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <HealthScore score={88} />
        </div>
        <div className="flex flex-col gap-6">
          <QuickActions onStartVoiceAssistant={onStartAssistant} />
        </div>
      </div>

      {/* MIDDLE SECTION: Grid Layout for Alerts, Appointments, Doctors */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* LEFT & CENTER: Clinical Alerts & Appointments */}
        <div className="xl:col-span-2 space-y-20">
          <AIRiskAlerts />
          <UpcomingAppointments appointments={appointments} />
          <RecommendedDoctors />
        </div>

        {/* RIGHT: Health Timeline */}
        <aside className="space-y-12">
          <HealthTimeline />
        </aside>
      </div>
    </div>
  );
}
