import React, { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-amber-100">
      {/* Logo */}
      <a href="/">
        <img src="islamipic-logo.png" alt="islamipic logo" className="h-6" />
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-5 text-sm">
        <a href="/gallery" className="hover:text-blue-400">
          Full Gallery
        </a>
        <a href="/category/3D" className="hover:text-blue-400">
          3D Renders
        </a>
        <a href="/category/calligraphy" className="hover:text-blue-400">
          Calligraphy
        </a>
        <a href="/category/arts" className="hover:text-blue-400">
          Arts
        </a>
        <a href="/category/icons" className="hover:text-blue-400">
          Icons
        </a>
        <a href="/category/textures" className="hover:text-blue-400">
          Textures
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden block text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="z-5 absolute top-12 right-4 bg-white shadow-md rounded-md p-3 md:hidden flex flex-col gap-2">
          <a href="/gallery" className="hover:text-blue-400">
            Full Gallery
          </a>
          <a href="/category/3D" className="hover:text-blue-400">
            3D Renders
          </a>
          <a href="/category/calligraphy" className="hover:text-blue-400">
            Calligraphy
          </a>
          <a href="/category/arts" className="hover:text-blue-400">
            Arts
          </a>
          <a href="/category/icons" className="hover:text-blue-400">
            Icons
          </a>
          <a href="/category/textures" className="hover:text-blue-400">
            Textures
          </a>
          <div className="flex gap-x-4">
        <a
          href="/login"
          className="hover:bg-amber-300 bg-amber-200 px-3 py-1 text-sm font-medium"
        >
          Login
        </a>
        <a
          href="/register"
          className="bg-gray-950 hover:bg-gray-800 px-3 py-1 text-sm font-medium text-white"
        >
          SignUp
        </a>
      </div>
        </div>
      )}

      {/* Login & Signup */}
      <div className="gap-x-4 hidden md:flex">
        <a
          href="/login"
          className="hover:bg-amber-300 bg-amber-200 px-3 py-1 text-sm font-medium"
        >
          Login
        </a>
        <a
          href="/register"
          className="bg-gray-950 hover:bg-gray-800 px-3 py-1 text-sm font-medium text-white"
        >
          SignUp
        </a>
      </div>
    </header>
  );
}
