import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Waves, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    document.documentElement.classList.add("dark");
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}
      `}
    >
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 h-[88px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">WaveConnect</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition"
          >
            Features
          </a>
          <Link
            to="/security"
            className="text-gray-300 hover:text-white transition"
          >
            Security
          </Link>
          <Link
            to="/pricing"
            className="text-gray-300 hover:text-white transition"
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-white transition"
          >
            About
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 text-white">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/login" className="text-gray-300 hover:text-white">
            Sign In
          </Link>

          <Link
            to="/signup"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl px-8 py-6 space-y-4">
          <a
            href="#features"
            className="block text-lg text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <Link
            to="/security"
            className="block text-lg text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Security
          </Link>
          <Link
            to="/pricing"
            className="block text-lg text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="block text-lg text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
