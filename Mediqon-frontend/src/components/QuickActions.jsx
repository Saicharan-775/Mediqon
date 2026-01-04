import {
  VideoCameraIcon,
  UserGroupIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const actions = [
  {
    title: "Instant Video Consultation",
    subtitle: "Connect within 60 secs",
    bg: "bg-[#F6E27F]",
    icon: VideoCameraIcon,
  },
  {
    title: "Find Doctors near you",
    subtitle: "Confirmed appointments",
    bg: "bg-[#BEE8D0]",
    icon: UserGroupIcon,
  },
  {
    title: "24/7 Medicines",
    subtitle: "Essentials at your doorstep",
    bg: "bg-[#F4C6D7]",
    icon: ClipboardDocumentListIcon,
  },
  {
    title: "Lab Tests",
    subtitle: "Sample pickup at your home",
    bg: "bg-[#BFD8FF]",
    icon: BeakerIcon,
  },
];

export default function QuickActions() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`${item.bg} rounded-3xl p-6 h-[170px] relative flex flex-col justify-between`}
            >
              {/* TEXT */}
              <div>
                <h3 className="font-semibold text-[15px] text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-700 mt-1">
                  {item.subtitle}
                </p>
              </div>

              {/* ICON */}
              <Icon className="w-16 h-16 text-black/20" />

              {/* ARROW BUTTON */}
              <button className="absolute bottom-5 right-5 w-9 h-9 rounded-full bg-[#1f2a63] flex items-center justify-center">
                <ArrowRightIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
