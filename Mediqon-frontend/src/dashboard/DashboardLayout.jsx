import React, { lazy, Suspense } from 'react';
import PatientSidebar from "./Sidebar/PatientSidebar";
import DashboardTabs from "./Header/DashboardTabs";
const BodyViewer = lazy(() => import("./BodyViewer/BodyViewer"));
import ReportPanel from "./Reports/ReportPanel";

const ComponentLoader = () => (
  <div className="flex flex-col items-center justify-center p-20 border border-white/[0.05] bg-white/[0.01] rounded-[2.5rem] animate-pulse">
    <div className="h-10 w-10 text-emerald-500/50 mb-4 animate-bounce" />
    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Syncing Engine</span>
  </div>
);

const DashboardLayout = () => {
  return (
   <div className="min-h-screen bg-[#eef1f7] px-6 py-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[320px_1fr] gap-8">
        <PatientSidebar />

        <div className="space-y-8">
          <DashboardTabs />

          <div className="grid xl:grid-cols-[1fr_360px] gap-8">
            <Suspense fallback={<ComponentLoader />}>
              <BodyViewer />
            </Suspense>
            <ReportPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout