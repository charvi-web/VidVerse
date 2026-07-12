import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        transition-all
        duration-300

        bg-white/10
        border-white/10
        text-white

        hover:scale-105
        hover:border-indigo-500
      "
      style={{
        background:
          theme === "light"
            ? "rgba(255,255,255,.95)"
            : "rgba(255,255,255,.08)",

        color:
          theme === "light"
            ? "#18181b"
            : "#ffffff",

        borderColor:
          theme === "light"
            ? "#d4d4d8"
            : "rgba(255,255,255,.12)"
      }}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;