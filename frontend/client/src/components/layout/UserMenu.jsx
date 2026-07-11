import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Upload, History, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Failed to logout");
    } finally {
      setOpen(false);
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 pr-3 transition hover:border-indigo-500/40"
      >
        <img
          src={user.avatar?.url}
          alt={user.username}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="hidden text-sm font-medium text-white sm:block">
          {user.username}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#111114]/95 p-2 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 p-3">
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
            </div>

            <div className="p-1.5">
              <Link
                to={`/profile/${user.username}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                <User size={16} />
                Your Channel
              </Link>

              <Link
                to="/upload"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                <Upload size={16} />
                Upload Video
              </Link>

              <Link
                to="/history"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                <History size={16} />
                Watch History
              </Link>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
