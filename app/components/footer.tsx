"use client";

import Link from "next/link";


export default function Footer() {
    
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Footer illustration */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
          aria-hidden="true"
        >

        </div>
        <div className="footer-main-div">
          {/* 1st block */}
          <div className="footer-child-div space-y-2">
            <h3 className="font-semibold text-sm text-white hover:text-yellow-1000">Whitepaper</h3>
          </div>
          {/* 2nd block */}
          <div className="footer-child-div space-y-2">
            <h3 className="font-semibold text-sm text-white hover:text-yellow-1000">Privacy Policy</h3>
          </div>
          {/* 3rd block */}
          <div className="footer-child-div space-y-2">
            <h3 className="font-semibold text-sm text-white hover:text-yellow-1000">Terms and Conditions</h3>
          </div>
          <div className="copyright">
            <h3 className="font-thin text-sm text-gray-1000">Copyright | All Rights Reserved</h3>
          </div>
        </div>
      </div>
    </footer>
  );
}