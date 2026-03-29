import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isKulsPage = location.pathname === "/peminatan/kuls";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(!isKulsPage);

  useEffect(() => {
    setShowNavbar(!isKulsPage);
  }, [isKulsPage]);

  useEffect(() => {
    if (!isKulsPage) return;

    const handleScroll = () => {
      setShowNavbar(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isKulsPage]);

  const isActive = (path) => location.pathname === path;
  // Khusus untuk mengecek apakah kita sedang di dalam lingkup peminatan
  const isPeminatanActive = location.pathname.startsWith("/peminatan");

  const menuPeminatan = [
    "ORFIL",
    "WIRE",
    "OX-LABORATORY",
    "TOBO",
    "POJOKOMIK",
    "PIXELPALS",
    "SPICE",
    "KULS",
    "MOSAIC",
    "ICON",
    "MVP",
    "VOTE",
    "FLUI",
  ];

  const navLinks = [
    { name: "Home", id: "home", path: "/" },
    { name: "Blog", id: "blog", path: "/blog" },
    { name: "Karya", id: "karya", path: "/karya" },
    { name: "Membership", id: "membership", path: "/membership" },
    { name: "Contact Us", id: "contact-us", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 px-4 transition-opacity duration-500 ease-out ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <nav className="h-[70px] w-full bg-black/40 rounded-full border border-white/10 backdrop-blur-md px-6 md:px-8 flex items-center justify-between shadow-lg">
        {/* 1. LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src="src/assets/logo.png" alt="UI" className="h-8 w-8" />
          {/* <span className="font-bold text-2xl text-white tracking-widest">|</span> */}
          <img
            src="src/assets/polar-logo.png"
            alt="Polar"
            className="h-8 w-fit"
          />
        </Link>

        {/* 2. MENU DESKTOP */}
        <div className="hidden lg:flex items-center gap-8 text-white font-medium">
          {/* Link Sebelum Peminatan (Home & Blog) */}
          {navLinks.slice(0, 2).map((link) => (
            <Link key={link.id} to={link.path} className="relative py-1 group">
              {link.name}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 ${isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </Link>
          ))}

          {/* DROPDOWN PEMINATAN (Sekarang Bisa Diklik) */}
          <div className="relative group py-1">
            <Link
              to="/peminatan"
              className="flex items-center gap-1 transition-colors hover:text-gray-300"
            >
              Peminatan <span className="text-[10px]">▼</span>
            </Link>
            {/* Garis bawah aktif jika berada di /peminatan atau detailnya */}
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 ${isPeminatanActive ? "w-full" : "w-0 group-hover:w-full"}`}
            ></span>

            {/* Dropdown Box */}
            <div className="absolute top-full left-0 mt-4 w-52 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="py-2 flex flex-col max-h-[350px] overflow-y-auto">
                {menuPeminatan.map((item) => (
                  <Link
                    key={item}
                    to={`/peminatan/${item.toLowerCase()}`}
                    className="px-5 py-2 text-[13px] font-bold text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Link Sisa (Karya, Membership, Contact) */}
          {navLinks.slice(2).map((link) => (
            <Link key={link.id} to={link.path} className="relative py-1 group">
              {link.name}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 ${isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </Link>
          ))}
        </div>

        {/* 3. SEARCH BAR */}
        <div className="hidden md:block relative">
          <input
            type="text"
            placeholder="Searching..."
            className="bg-white/20 border border-white/10 rounded-full px-6 py-2 text-sm w-44 lg:w-64 focus:outline-none text-white placeholder:text-gray-300"
          />
        </div>

        {/* 4. HAMBURGER BUTTON (Mobile Only) */}
        <button
          className="lg:hidden text-white p-2 z-[60] relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* 5. MOBILE MENU */}
        {isMenuOpen && (
          <div className="absolute top-[85px] left-0 right-0 bg-white rounded-3xl p-8 flex flex-col gap-4 lg:hidden shadow-2xl border border-gray-200 overflow-y-auto max-h-[80vh]">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-bold ${isActive(link.path) ? "text-black" : "text-gray-400"}`}
              >
                {link.name}
              </Link>
            ))}

            {/* Peminatan di Mobile */}
            <div className="border-t border-gray-100 pt-4">
              <Link
                to="/peminatan"
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-bold block mb-4 ${isPeminatanActive ? "text-black" : "text-gray-400"}`}
              >
                Peminatan
              </Link>
              <div className="grid grid-cols-2 gap-2">
                {menuPeminatan.map((item) => (
                  <Link
                    key={item}
                    to={`/peminatan/${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xs font-bold text-gray-700 bg-gray-50 p-3 rounded-xl hover:bg-gray-100"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
