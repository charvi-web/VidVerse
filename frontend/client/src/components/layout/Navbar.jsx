const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <h1 className="text-2xl font-bold tracking-tight">
          VID<span className="text-indigo-500">VERSE</span>
        </h1>

        <div className="flex gap-8 text-sm">
          <button>Home</button>
          <button>Explore</button>
          <button>Upload</button>
          <button>Login</button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;