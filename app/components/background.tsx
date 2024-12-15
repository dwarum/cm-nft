export default function Background() {
  return (
    <section id="background" className="w-full min-h-screen flex justify-center backgroundImage">
      <div className="container mx-auto max-w-6xl px-6 py-12 md:py-24">
        {/* Hero content */}
        {/* <div className="py-12 md:py-24"> */}
        {/* Section header */}
        <div className="py-12 md:py-48 text-center space-y-12">
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
          <div className="py-16"  data-aos="zoom-in-up">
            <h1
              className="animate-[gradient_6s_linear_infinite] 
              bg-[length:200%_auto] bg-clip-text pb-5 text-2xl text-white md:text-[40px] leading-relaxed"
             
            >
              Ask-to-Earn and Unlock Your Cosmic Conspiracy <br /> with Mystic AI
            </h1>
          </div>

          <div className="mx-auto max-w-3xl" data-aos="zoom-in-up">
            <p
              className="mb-8 text-sm md:text-2xl text-white"
            >
              Blending the ancient wisdom of Vedic Astrology with AI on Solana
            </p>
            {/* <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center py-12">
              <div data-aos="fade-up" data-aos-delay={400}>
                <a
                  className="btn group mb-4 w-full sm:w-auto bg-black text-white font-semibold text-sm 
                    shadow-md hover:bg-opacity-80"
                  href="#intro"
                >
                  <span className="relative inline-flex items-center">
                    Learn More
                  </span>
                </a>
              </div>
            </div> */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </section>
  );
}
