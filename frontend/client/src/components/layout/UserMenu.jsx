import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Upload,
  History,
  LogOut,
  User,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
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

  const menuItem =
    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full p-1 pr-3 transition-all duration-300"
        style={{
          background: isDark
            ? "rgba(255,255,255,.06)"
            : "#ffffff",

          border: isDark
            ? "1px solid rgba(255,255,255,.10)"
            : "1px solid #e4e4e7",

          color: isDark ? "#ffffff" : "#18181b",

          boxShadow: isDark
            ? "none"
            : "0 8px 24px rgba(0,0,0,.08)",
        }}
      >
        <img
          src={user.avatar?.url}
          alt={user.username}
          className="h-8 w-8 rounded-full object-cover"
        />

        <span
          className="hidden sm:block text-sm font-medium"
          style={{
            color: isDark ? "#ffffff" : "#18181b",
          }}
        >
          {user.username}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl backdrop-blur-xl"
            style={{
              background: isDark
                ? "rgba(17,17,20,.96)"
                : "#ffffff",

              border: isDark
                ? "1px solid rgba(255,255,255,.08)"
                : "1px solid #e4e4e7",

              boxShadow: isDark
                ? "0 15px 40px rgba(0,0,0,.45)"
                : "0 20px 50px rgba(0,0,0,.12)",
            }}
          >
            <div
              className="flex items-center gap-3 p-4"
              style={{
                borderBottom: isDark
                  ? "1px solid rgba(255,255,255,.08)"
                  : "1px solid #f1f5f9",
              }}
            >
              <img
                src={user.avatar?.url}
                alt={user.username}
                className="h-11 w-11 rounded-full object-cover"
              />

              <div className="min-w-0">
                <p
                  className="truncate text-sm font-semibold"
                  style={{
                    color: isDark ? "#fff" : "#18181b",
                  }}
                >
                  {user.fullName}
                </p>

                <p
                  className="truncate text-xs"
                  style={{
                    color: isDark ? "#9ca3af" : "#71717a",
                  }}
                >
                  @{user.username}
                </p>
              </div>
            </div>

            <div className="p-2">
              <Link
                to={`/profile/${user.username}`}
                onClick={() => setOpen(false)}
                className={menuItem}
                style={{ color: isDark ? "#e4e4e7" : "#18181b" }}
              >
                <User size={16} />
                Your Channel
              </Link>

              <Link
                to={`/profile/${user.username}?tab=tweets`}
                onClick={() => setOpen(false)}
                className={menuItem}
                style={{ color: isDark ? "#e4e4e7" : "#18181b" }}
              >
                <MessageSquare size={16} />
                Your Updates
              </Link>

              <Link
                to="/upload"
                onClick={() => setOpen(false)}
                className={menuItem}
                style={{ color: isDark ? "#e4e4e7" : "#18181b" }}
              >
                <Upload size={16} />
                Upload Video
              </Link>

              <Link
                to="/history"
                onClick={() => setOpen(false)}
                className={menuItem}
                style={{ color: isDark ? "#e4e4e7" : "#18181b" }}
              >
                <History size={16} />
                Watch History
              </Link>

              <button
                onClick={handleLogout}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-500 transition hover:bg-red-500/10"
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