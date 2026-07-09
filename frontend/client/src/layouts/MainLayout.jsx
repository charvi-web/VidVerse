import Navbar from "../components/layout/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;