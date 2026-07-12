import Logo from "./Logo";
import Container from "../ui/Container";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className="transition-all duration-300"
      style={{
        background: isDark ? "#09090B" : "#ffffff",
        borderTop: isDark
          ? "1px solid rgba(255,255,255,.10)"
          : "1px solid rgba(0,0,0,.08)",
      }}
    >
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 py-12 md:flex-row">
          <Logo size={40} />

          <div
            className="text-center text-sm transition-colors duration-300"
            style={{
              color: isDark ? "#71717a" : "#52525b",
            }}
          >
            © {new Date().getFullYear()} <strong>VIDVERSE</strong>.
            <br />
            Where Every Video Finds Its Universe.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;