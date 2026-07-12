import { useTheme } from "../../context/ThemeContext";

const SectionHeading = ({
  badge,
  title,
  subtitle,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">

      <span
        className="inline-flex rounded-full px-4 py-2 text-sm font-semibold"
        style={{
          color: "#6366f1",
          background: isDark
            ? "rgba(99,102,241,.12)"
            : "rgba(99,102,241,.08)",
          border: "1px solid rgba(99,102,241,.20)",
        }}
      >
        {badge}
      </span>

      <h2
        className="mt-6 text-5xl font-black tracking-tight"
        style={{
          color: isDark ? "#ffffff" : "#111827",
        }}
      >
        {title}
      </h2>

      <p
        className="mt-5 text-lg leading-8"
        style={{
          color: isDark ? "#a1a1aa" : "#6b7280",
        }}
      >
        {subtitle}
      </p>

    </div>
  );
};

export default SectionHeading;