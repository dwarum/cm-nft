"use client";

import { useState } from "react";
import Link from "next/link";


export default function Header() {
    const [isOpen, setIsOpen] = useState(false); // State for toggling the menu
  return (
<nav className="px-4 py-3 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-right">
        {/* Logo */}
        <a className="navbar-brand" href="#">
          <img src="images/logo.png" alt=""/></a> 
        {/* Hamburger Menu */}
        <button
          className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className= "hidden md:flex md:items-center md:space-x-6">
          <a href="#home" className="font-semibold text-sm text-white hover:text-yellow-1000" >
            Home
          </a>
          <a href="#about" className="font-semibold text-sm text-white hover:text-yellow-1000">
            About
          </a>
          <a href="#services" className="font-semibold text-sm text-white hover:text-yellow-1000">
            Features
          </a>
          <a href="#contact" className="font-semibold text-sm text-white hover:text-yellow-1000">
            Whitepaper
          </a>
          <a href="#contact" className="font-semibold text-sm text-white hover:text-yellow-1000">
            X
          </a>
          <a href="#contact" className="font-semibold text-sm text-white hover:text-yellow-1000">
            Tel
          </a>
          <button className="font-semibold text-sm text-slate-1000 px-2 py-1 bg-yellow-1000 rounded-2xl ">
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden flex flex-col space-y-2 mt-2`}
      >
        <a href="#home" className="font-semibold text-sm text-white hover:text-yellow-1000" >
            Home
          </a>
          <a href="#about" className="font-semibold text-sm text-white hover:text-yellow-1000">
            About
          </a>
          <a href="#services" className="font-semibold text-sm text-white hover:text-yellow-1000">
            Features
          </a>
          <a href="#contact" className="font-semibold text-sm text-white hover:text-yellow-1000">
            Whitepaper
          </a>
          <a href="#contact" className="font-semibold text-sm text-white hover:text-yellow-1000">
            X
          </a>
          <a href="#contact" className="font-semibold text-sm text-white hover:text-yellow-1000">
            Tel
          </a>
          <a href="#contact" className="font-semibold text-sm text-slate-1000">
            Connect Wallet
          </a>
      </div>
    </nav>
  );
}