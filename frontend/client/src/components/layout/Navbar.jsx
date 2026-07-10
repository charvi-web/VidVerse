import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import GlowButton from "../ui/GlowButton";
import Container from "../ui/Container";
import useScrolled from "../../hooks/useScrolled";

const Navbar = () => {
  const scrolled = useScrolled();

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
            <GlowButton>
              Get Started
            </GlowButton>
          </div>

          <MobileMenu />

        </div>
      </Container>
    </header>
  );
};

export default Navbar;