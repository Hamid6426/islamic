import React from "react";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-6 py-3 bg-amber-100">
      <a href="/">
      <img src="islamipic-logo.svg" alt="islamipic logo" className="h-6" />
      </a>
      <div className="flex gap-6 font-medium">
        <a href="/gallery" className="hover:text-blue-400">
          Full Gallery
        </a>
        <a href="/3D" className="hover:text-blue-400">
          3D Images
        </a>
        <a href="/calligraphy" className="hover:text-blue-400">
          Calligraphy
        </a>
        <a href="/arts" className="hover:text-blue-400">
          Arts
        </a>
        <a href="/islamic-icons" className="hover:text-blue-400">
          Islamic Icons
        </a>
        <a href="/textures" className="hover:text-blue-400">
          Textures
        </a>
      </div>
      <div className="flex gap-x-4">
        <a
          href="/login"
          className="hover:bg-amber-300 bg-amber-200 px-4 py-2 font-bold"
        >
          Login
        </a>
        <a
          href="/register"
          className="bg-gray-950 hover:bg-gray-800 px-4 py-2 font-bold text-white"
        >
          SignUp
        </a>
      </div>
    </header>
  );
}
