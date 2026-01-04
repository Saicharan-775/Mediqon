import PatientSidebar from "./Sidebar/PatientSidebar";
import DashboardTabs from "./Header/DashboardTabs";
import BodyViewer from "./BodyViewer/BodyViewer";
import ReportPanel from "./Reports/ReportPanel";

const DashboardLayout = () => {
  return (
   <div className="min-h-screen bg-[#eef1f7] px-6 py-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[320px_1fr] gap-8">
        <PatientSidebar />

        <div className="space-y-8">
          <DashboardTabs />

          <div className="grid xl:grid-cols-[1fr_360px] gap-8">
            <BodyViewer />
            <ReportPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout