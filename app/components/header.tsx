"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // State for toggling the menu
  const [isScrolled, setIsScrolled] = useState(false); // State for toggling the background of navbar
  const pathname = usePathname();

  //handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      }
      else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isWhitepaperPage = pathname === "/whitepaper";

  return (
    <nav id="header" className={`px-4 py-2 fixed top-0 left-0 w-full z-50 ${isWhitepaperPage ? "nav-scroll"
      :
      isScrolled ? 'nav-scroll' : 'bg-transparent'
      }`}>
      <div className="container mx-auto flex justify-between">
        {/* Vertical Logo */}
        <div className="flex flex-col items-center">
          <img src="images/logo-v.png" alt="Logo" className="w-12 h-12" />
          <span className="text-white text-md font-[customFont]">Mystic AI</span>
        </div>
        
        {/* Horizontal Logo */}
        {/* <div className="flex flex-col items-center">
          <img src="images/logo-h.png" alt="Logo" className="w-55 h-16" />
        </div> */}

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

        <div className="hidden md:flex md:items-right md:space-x-20">

          <div className="hidden md:flex md:items-center md:space-x-6">
            <a href="/" className="text-white hover:text-yellow-1000" >
              Home
            </a>
            {/* <a href="#about" className="text-md text-white hover:text-yellow-1000">
            About
          </a> */}
            <a href="#services" className="text-white hover:text-yellow-1000">
              Features
            </a>
            <a href="/whitepaper" className="text-white hover:text-yellow-1000">
              Whitepaper
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <a href="https://x.com/mysticAI">
              <img
                className="nav-social-logos"
                src="images/x-twitter-brands-solid.svg"
                alt="Link to Mystic AI Twitter"
              />
            </a>
            <a href="https://t.me/MysticAIGroup">
              <img
                className="nav-social-logos"
                src="images/telegram-brands-solid.svg"
                alt="Link to Mystic AI Telegram"
              />
            </a>
            <a href="https://mystic.ai/discord">
              <img
                className="nav-social-logos"
                src="images/discord-brands-solid.svg"
                alt="Link to Mystic AI Discord"
              />
            </a>
            <a
              className="btn group sm:w-auto bg-white text-black font-semibold text-md 
                    hover:bg-opacity-80 hover:text-black"
              href="#intro"
            >
              <span className="relative inline-flex items-center">
                Connect Wallet
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isOpen ? "block" : "hidden"
          } md:hidden flex flex-col space-y-2 mt-2`}
      >
        <a href="#home" className="text-sm text-white hover:text-yellow-1000" >
          Home
        </a>
        <a href="#about" className="text-sm text-white hover:text-yellow-1000">
          About
        </a>
        <a href="#services" className="text-sm text-white hover:text-yellow-1000">
          Features
        </a>
        <a href="#contact" className="text-sm text-white hover:text-yellow-1000">
          Whitepaper
        </a>
        <a href="#contact" className="text-sm text-white hover:text-yellow-1000">
          X
        </a>
        <a href="#contact" className="text-sm text-white hover:text-yellow-1000">
          Tel
        </a>
        <a href="#contact" className="text-sm text-white">
          Connect Wallet
        </a>
      </div>
    </nav>
  );
}