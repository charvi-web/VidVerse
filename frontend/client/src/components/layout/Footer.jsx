import Logo from "./Logo";
import Container from "../ui/Container";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#09090B]">
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 py-12 md:flex-row">

          <Logo size={40} />

          <div className="text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} VIDVERSE.
            <br />
            Where Every Video Finds Its Universe.
          </div>

          <div className="flex items-center gap-4">

            <a
              href="#"
              className="rounded-xl bg-white/5 p-3 transition hover:bg-indigo-600"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="#"
              className="rounded-xl bg-white/5 p-3 transition hover:bg-sky-500"
            >
              <FaTwitter size={18} />
            </a>

            <a
              href="#"
              className="rounded-xl bg-white/5 p-3 transition hover:bg-blue-600"
            >
              <FaLinkedin size={18} />
            </a>

          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;