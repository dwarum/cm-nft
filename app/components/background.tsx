import VideoThumb from "@/public/images/hero-image-01.jpg";

export default function Background() {
  return (
    <section className="w-full flex justify-center items-center">
      <div className="mx-auto max-w-6xl px-8 sm:px-6 w-full">
        {/* Hero content */}
        <div className="py-12 md:py-48">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-20 space-y-12">
            {/* 
             ------------------------------------YELLOW GRADIENT TEXT---------------------------------
            <div>
            <h1
              className="animate-[gradient_6s_linear_infinite] 
              bg-[linear-gradient(to_right,theme(colors.stone.600),theme(colors.yellow.1000),theme(colors.stone.700),theme(colors.yellow.900),theme(colors.stone.600))] 
              bg-[length:200%_auto] bg-clip-text pb-5 text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="zoom-in-up"
            >
              Ask-to-Earn and Unlock 
            </h1>
            <h1
              className="animate-[gradient_6s_linear_infinite] 
              bg-[linear-gradient(to_right,theme(colors.stone.600),theme(colors.yellow.1000),theme(colors.stone.700),theme(colors.yellow.900),theme(colors.stone.600))] 
              bg-[length:200%_auto] bg-clip-text pb-5 text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="zoom-in-up"
            >
               Your Cosmic Conspiracy with Mystic AI
            </h1>
            </div> */}
            <div>
            <h1
              className="animate-[gradient_6s_linear_infinite] 
              bg-[length:200%_auto] bg-clip-text pb-5 text-4xl font-semibold text-yellow-1000 text-transparent md:text-3xl"
              data-aos="zoom-in-up"
            >
              Ask-to-Earn and Unlock 
            </h1>
            <h1
              className="animate-[gradient_6s_linear_infinite] 
              bg-[length:200%_auto] bg-clip-text pb-5 text-4xl font-semibold text-yellow-1000 text-transparent md:text-3xl"
              data-aos="zoom-in-up"
            >
               Your Cosmic Conspiracy with Mystic AI
            </h1> 
            </div>

            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-2xl text-yellow-1000"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Blending the ancient wisdom of Vedic Astrology with AI on Solana
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <div data-aos="fade-up" data-aos-delay={400}>
                  <a
                    className="btn group mb-4 w-full 
                    bg-yellow-1000 bg-[length:100%_100%] bg-[bottom] text-slate-1000 font-semibold text-sm
                    shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="#0"
                  >
                    <span className="relative inline-flex items-center">
                      View Collections
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
