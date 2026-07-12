import { Loader2 } from "lucide-react";

const styles = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:ring-indigo-400",
  secondary: "border border-white/10 bg-white/5 text-white hover:bg-white/10 focus-visible:ring-white/50",
  danger: "bg-red-500/90 text-white hover:bg-red-500 focus-visible:ring-red-400",
  ghost: "text-zinc-300 hover:bg-white/10 hover:text-white focus-visible:ring-white/50",
};

const sizes = {
  sm: "min-h-8 px-3 py-1.5 text-xs",
  md: "min-h-10 px-4 py-2 text-sm",
  lg: "min-h-12 px-5 py-3 text-base",
};

const Button = ({
  children,
  type = "submit",
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => (
  <button
    type="submit"
    disabled={disabled || loading}
    className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] disabled:pointer-events-none disabled:opacity-60 ${styles[variant] || styles.primary} ${sizes[size] || sizes.md} ${className}`}
    {...props}
  >
    {loading ? <Loader2 className="animate-spin" size={16} aria-hidden="true" /> : Icon && <Icon size={16} aria-hidden="true" />}
    {children}
  </button>
);

export default Button;
