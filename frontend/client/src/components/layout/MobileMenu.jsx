import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navigation } from "../../constants/navigation";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          bg-white/5
          text-white
          backdrop-blur-xl
          transition-all
          hover:bg-white/10
          lg:hidden
        "
      >
        <Menu size={22} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
              }}
              className="
                fixed
                right-0
                top-0
                z-50
                flex
                h-screen
                w-72
                flex-col
                border-l
                border-white/10
                bg-[#09090B]/95
                p-6
                backdrop-blur-3xl
              "
            >
              {/* Close */}
              <div className="mb-10 flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    p-2
                    hover:bg-white/10
                  "
                >
                  <X />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `
                        rounded-xl
                        px-4
                        py-3
                        text-lg
                        transition-all
                        ${
                          isActive
                            ? "bg-indigo-600 text-white"
                            : "text-zinc-300 hover:bg-white/5 hover:text-white"
                        }
                      `
                    }
                  >
                    {item.title}
                  </NavLink>
                ))}
              </nav>

              {/* CTA */}
              <button
                className="
                  mt-auto
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  py-4
                  font-semibold
                  text-white
                  transition-all
                  hover:scale-[1.02]
                "
              >
                Get Started
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;