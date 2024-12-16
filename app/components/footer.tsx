"use client";

export default function Footer() {

  return (
    <footer id="footer" className="py-4 mt-16 bg-[#191A1C]">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex w-full justify-between">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <img src="images/logo.png" alt="Mystic AI Logo" className="mb-4" />
            <div className="flex space-x-4">
              <a href="https://x.com/mysticAI">
                <img
                  className="social-logos"
                  src="images/x-twitter-brands-solid.svg"
                  alt="Link to Mystic AI Twitter"
                />
              </a>
              <a href="https://t.me/MysticAIGroup">
                <img
                  className="social-logos"
                  src="images/telegram-brands-solid.svg"
                  alt="Link to Mystic AI Telegram"
                />
              </a>
              <a href="https://mystic.ai/discord">
                <img
                  className="social-logos"
                  src="images/discord-brands-solid.svg"
                  alt="Link to Mystic AI Discord"
                />
              </a>
            </div>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/3 mt-16 text-right">
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-1000 hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-1000 hover:text-gray-400">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-1100 pt-4 text-center text-sm">
          <h3 className="font-thin text-sm text-gray-1000">
            Copyright &copy; 2024 | All Rights Reserved.
          </h3>
        </div>
      </div>
    </footer>



  );
}