import { Inbox } from "lucide-react";

const EmptyState = ({
  icon: Icon = Inbox,
  title,
  subtitle,
  action,
  className = "",
}) => (
  <div
    className={`flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-12 text-center ${className}`}
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
      <Icon size={26} aria-hidden="true" />
    </div>
    <h2 className="mt-5 text-lg font-bold text-white">{title}</h2>
    {subtitle && <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">{subtitle}</p>}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
