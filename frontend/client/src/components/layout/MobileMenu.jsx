import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Upload, History, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";

import { navigation } from "../../constants/navigation";
import useAuth from "../../hooks/useAuth";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      setOpen(false);
      navigate("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

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
              <div className="mb-6 flex justify-end">
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

              {/* Profile summary */}
              {isAuthenticated && user && (
                <Link
                  to={`/profile/${user.username}`}
                  onClick={() => setOpen(false)}
                  className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <img
                    src={user.avatar?.url}
                    alt={user.username}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.fullName}
                    </p>
                    <p className="truncate text-xs text-zinc-500">
                      @{user.username}
                    </p>
                  </div>
                </Link>
              )}

              {/* Links */}
              <nav className="flex flex-col gap-2">
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

                {isAuthenticated && (
                  <>
                    <div className="my-2 border-t border-white/10" />

                    <Link
                      to="/upload"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-white/5 hover:text-white"
                    >
                      <Upload size={18} />
                      Upload Video
                    </Link>

                    <Link
                      to="/history"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-white/5 hover:text-white"
                    >
                      <History size={18} />
                      Watch History
                    </Link>
                  </>
                )}
              </nav>

              {/* CTA */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="
                    mt-auto
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    py-4
                    font-semibold
                    text-red-400
                    transition-all
                    hover:bg-red-500/20
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="
                    mt-auto
                    flex
                    items-center
                    justify-center
                    gap-2
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
                  <User size={18} />
                  Get Started
                </Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
