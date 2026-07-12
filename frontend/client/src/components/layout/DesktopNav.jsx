import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { navigation } from "../../constants/navigation";
import { useTheme } from "../../context/ThemeContext";

const DesktopNav = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav className="hidden items-center gap-3 lg:flex">
      {navigation.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className="group relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300"
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,.08)"
                      : "rgba(99,102,241,.10)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,.06)"
                      : "1px solid rgba(99,102,241,.15)",
                  }}
                />
              )}

              <span
                className="relative z-10 transition-colors duration-300"
                style={{
                  color: isActive
                    ? isDark
                      ? "#ffffff"
                      : "#111827"
                    : isDark
                    ? "#a1a1aa"
                    : "#52525b",
                }}
              >
                {item.title}
              </span>

              <motion.span
                layoutId="navbar-indicator"
                className="
                  absolute
                  -bottom-1
                  left-1/2
                  h-[2px]
                  -translate-x-1/2
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-500
                  via-purple-500
                  to-cyan-400
                "
                animate={{
                  width: isActive ? "80%" : "0%",
                }}
                transition={{
                  duration: 0.3,
                }}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default DesktopNav;