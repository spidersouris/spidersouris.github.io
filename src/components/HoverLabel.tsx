interface HoverLabelProps {
  label: string;
  labelOffset?: number;
}

export function HoverLabel({ label, labelOffset = 4 }: HoverLabelProps) {
  return (
    <span
      className={`absolute bg-slate-100 dark:bg-slate-700 py-1 px-2.5 rounded-md -bottom-${labelOffset.toString()} left-1/2 -translate-x-1/2
  opacity-0 group-hover:opacity-100
  transition-opacity duration-200
  text-sm whitespace-pre text-center`}
    >
      {label}
    </span>
  );
}
