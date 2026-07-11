import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { navigation } from "../../constants/navigation";

const DesktopNav = () => {
  return (
    <nav className="hidden items-center gap-3 lg:flex">
      {navigation.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            `
            group
            relative
            rounded-xl
            px-4
            py-2
            text-sm
            font-medium
            transition-colors
            duration-300
            ${
              isActive
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }
            `
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="
                    absolute
                    inset-0
                    rounded-xl
                    bg-white/10
                    backdrop-blur-md
                  "
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-10">
                {item.title}
              </span>

              <motion.span
                layoutId="navbar-indicator"
                className="
                  absolute
                  -bottom-1
                  left-1/2
                  h-[2px]
                  w-0
                  -translate-x-1/2
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-500
                  via-purple-500
                  to-cyan-400
                  group-hover:w-3/4
                "
                animate={{
                  width: isActive ? "100%" : "0%",
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