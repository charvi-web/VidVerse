import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { navigation } from "../../constants/navigation";

const DesktopNav = () => {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigation.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            `
            group
            relative
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
              {item.title}

              <motion.span
                layoutId="navbar-indicator"
                className={`
                  absolute
                  -bottom-1
                  left-0
                  h-[2px]
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-500
                  via-purple-500
                  to-cyan-400
                  ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }
                `}
                transition={{
                  duration: 0.3,
                }}
              />

              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 -z-10 rounded-xl bg-white/5"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default DesktopNav;