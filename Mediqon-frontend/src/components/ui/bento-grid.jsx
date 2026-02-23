import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl px-6",
        "grid grid-cols-1 md:grid-cols-3 gap-6",
        "md:auto-rows-[22rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between",
        "rounded-2xl p-6",
        "bg-neutral-950 border border-white/10",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:border-green-500/40",
        "hover:shadow-[0_0_60px_rgba(34,197,94,0.15)]",
        "overflow-hidden",
        className
      )}
    >
      {/* Preview */}
      <div className="w-full h-44 mb-4 rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center">
        {header}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <div className="text-green-400">{icon}</div>

        <h3 className="text-lg md:text-xl font-semibold text-white leading-tight">
          {title}
        </h3>

        <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};