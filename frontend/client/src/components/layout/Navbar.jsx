import { useNavigate } from "react-router-dom";

import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import GlowButton from "../ui/GlowButton";
import Container from "../ui/Container";
import useScrolled from "../../hooks/useScrolled";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const scrolled = useScrolled();
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        transition-all
        duration-500
        ${
          scrolled
            ? "border-b border-white/10 bg-black/40 backdrop-blur-3xl"
            : "bg-transparent"
        }
      `}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">

          <Logo />

          <DesktopNav />

          <div className="hidden lg:block">
            {!loading &&
              (isAuthenticated ? (
                <UserMenu />
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
