import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;