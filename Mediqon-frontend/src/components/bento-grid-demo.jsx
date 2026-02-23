import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export default function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-6xl mx-auto px-6">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""} />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-2xl 
  bg-gradient-to-br from-neutral-900 to-neutral-800 
  border border-white/10 
  shadow-inner" />
);
const items = [
  {
    title: "Smart Dashboard",
    description:
      "AI integrated dashboard which gives guidance and tracks the patient medical history.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-green-400" />,
    className: "md:col-span-2",
  },
  {
   title: "Crowdfunding",
    description:
      "A transparent view of medical funds and care usage for patient guardians. Ensures trust and protection against misuse.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-green-400" />,
  },
  {
     title: "Smart Consultations",
    description:
      "Better-prepared patients, faster doctor decisions. Organized medical history reduces repetition and improves efficiency.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-green-400" />,
  },
  {
     title: "AI Health Predictions",
    description:
      "The system analyzes symptoms and reports to highlight possible health risks and guide the next steps responsibly.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-green-400" />,
    
  },
  {
    title: "Trusted Health Platform",
    description:
      "Secure and reliable infrastructure trusted by patients, doctors and hospitals.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-green-400" />,
  },
  {
     title: "Trusted Health Platform",
    description:
      "Secure and reliable infrastructure trusted by patients, doctors and hospitals.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-green-400" />,
  },
  {
    title: "AI Integrated Platform",
    description:
      "Built to help patients, doctors and hospitals work together clearly and safely.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-green-400" />,
    className: "md:col-span-2",
  },
];
