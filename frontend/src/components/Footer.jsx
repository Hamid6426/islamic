import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="flex flex-row p-6 bg-amber-100">
        <div className="w-full grid grid-cols-4">
          <div className="flex items-center justify-center">
            <img
              src="islamipic-logo.svg"
              alt="islamipic logo"
              className="h-6"
            />
          </div>

          <div className="flex flex-col justify-start items-start font-medium gap-2">
            <a href="/gallery" className="hover:text-blue-400">
              About
            </a>
            <a href="/gallery" className="hover:text-blue-400">
              Contact
            </a>
            <a href="/gallery" className="hover:text-blue-400">
              Privacy Policy
            </a>
            <a href="/gallery" className="hover:text-blue-400">
              Terms & Conditions
            </a>
          </div>

          <div className="flex flex-col justify-start items-start font-medium gap-2">
            <a href="/gallery" className="hover:text-blue-400">
              Full Gallery
            </a>
            <a href="/gallery" className="hover:text-blue-400">
              3D Images
            </a>
            <a href="/gallery" className="hover:text-blue-400">
              Calligraphy
            </a>
            <a href="/gallery" className="hover:text-blue-400">
              Calligraphy
            </a>
          </div>

          <div className="flex flex-col justify-start items-start font-medium gap-2">
            <a href="/gallery" className="hover:text-blue-400">
              Full Gallery
            </a>
            <a href="/gallery" className="hover:text-blue-400">
              3D Images
            </a>
            <a href="/gallery" className="hover:text-blue-400">
              Calligraphy
            </a>
            <a href="/gallery" className="hover:text-blue-400">
              Calligraphy
            </a>
          </div>
        </div>
      </footer>
      <div className="text-center py-2 border-t border-amber-300">
        Copyright © 2025 
        <a className="hover:text-blue-600" href="/admin/dashboard"> Islamipic</a>
      </div>
    </div>
  );
}
