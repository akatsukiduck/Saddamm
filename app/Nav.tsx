"use client";
import { useState } from "react";

interface NavProps {
  cartCount: number;
  onCartClick: () => void;
  toggleTheme: () => void;
  isDark: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Nav = ({ cartCount, onCartClick, toggleTheme, isDark, searchTerm, setSearchTerm }: NavProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full px-4 md:px-6 py-4 bg-[#0f172a]/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/20260524_2246_image-removebg-preview.png" alt="TechForge" className="h-9 w-9 object-contain" />
          <h1 className="font-bold text-xl md:text-2xl tracking-tight">Saddam Tech</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={onCartClick}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-white/30 hover:border-white hover:bg-white/10 relative"
          >
            🛒 
            <span className="hidden md:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <a href="#contact" className="hidden md:block border-2 border-white rounded-2xl px-5 py-2 text-sm font-medium hover:bg-white hover:text-black transition">
            Contact
          </a>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl p-2">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm"
          />
          <a href="#contact" className="text-center py-3 border border-white/30 rounded-2xl">Contact Us</a>
        </div>
      )}
    </div>
  );
};

export default Nav;