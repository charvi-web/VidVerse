import Navbar from "../components/layout/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#09090B] text-white overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;