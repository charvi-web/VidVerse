import { useNavigate, Link } from "react-router-dom";
import { Upload } from "lucide-react";

import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";

import GlowButton from "../ui/GlowButton";
import Container from "../ui/Container";

import useScrolled from "../../hooks/useScrolled";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const scrolled = useScrolled();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        backdrop-blur-2xl
        transition-all
        duration-300
      "
      style={{
        background: isDark
          ? scrolled
            ? "rgba(9,9,11,.82)"
            : "rgba(9,9,11,.60)"
          : scrolled
          ? "rgba(255,255,255,.92)"
          : "rgba(255,255,255,.72)",

        borderBottom: isDark
          ? "1px solid rgba(255,255,255,.08)"
          : "1px solid rgba(0,0,0,.08)",

        boxShadow: isDark
          ? "0 8px 32px rgba(0,0,0,.25)"
          : "0 8px 30px rgba(15,23,42,.06)",
      }}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo />

          <DesktopNav />

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />

            {!loading &&
              (isAuthenticated ? (
                <>
                  <Link
                    to="/upload"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-indigo-600
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      shadow-lg
                      transition-all
                      duration-300
                      hover:scale-105
                      hover:bg-indigo-500
                    "
                  >
                    <Upload size={16} />
                    Upload
                  </Link>

                  <UserMenu />
                </>
              ) : (
                <GlowButton onClick={() => navigate("/login")}>
                  Get Started
                </GlowButton>
              ))}
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;