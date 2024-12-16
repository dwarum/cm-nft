import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

import { Autoplay } from "swiper/modules";
import { useEffect } from "react";

export default function Rewards() {
  const houses = [
    {
      name: "João da Silva",
      role: "Dev Front-end",
      img: "/images/logo.jpg",
    },
    {
      name: "Maria Santos",
      role: "Dev Back-end",
      img: "/images/logo.png",
    },
    {
      name: "Pedro Oliveira",
      role: "Dev Mobile",
      img: "/images/logo(1).png",
    },
    {
      name: "Ana Pereira",
      role: "Dev Front-end",
      img: "/images/puzzle.png",
    },
    {
      name: "João da Silva",
      role: "Dev Front-end",
      img: "/images/logo.jpg",
    },
    {
      name: "Maria Santos",
      role: "Dev Back-end",
      img: "/images/logo.png",
    },
    {
      name: "Pedro Oliveira",
      role: "Dev Mobile",
      img: "/images/logo(1).png",
    },
    {
      name: "Ana Pereira",
      role: "Dev Front-end",
      img: "/images/puzzle.png",
    },
    {
      name: "João da Silva",
      role: "Dev Front-end",
      img: "/images/logo.jpg",
    },
    {
      name: "Maria Santos",
      role: "Dev Back-end",
      img: "/images/logo.png",
    },
    {
      name: "Pedro Oliveira",
      role: "Dev Mobile",
      img: "/images/logo(1).png",
    },
    {
      name: "Ana Pereira",
      role: "Dev Front-end",
      img: "/images/puzzle.png",
    }
  ];

  const breakpoints = {
    1440: {
      slidesPerView: 6.2,
    },
    1200: {
      slidesPerView: 5.6,
    },
    1024: {
      slidesPerView: 3.8,
    },
    768: {
      slidesPerView: 3.6,
    },
    640: {
      slidesPerView: 3.4,
    },
    400: {
      slidesPerView: 2.2,
    },
    250: {
      slidesPerView: 1.8,
      slidesPerGroup: 1,
    },
  }

  const SwiperAutoplayFix = () => {
    const swiper = useSwiper();

    useEffect(() => {
      swiper.update(); // Force Swiper to recalculate and update
    }, [swiper]);

    return null;
  };
  return (
    <section id="rewards" className="flex-col px-4 md:pt-14 md:pb-20 md:py-20 w-full justify-center items-center" data-aos="fade-up">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="mx-auto pb-12 md:pb-20 space-y-6 text-center">
          <div className="inline-flex items-center gap-3 pb-3
            before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-yellow-700 
            after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-yellow-700">
            <h2 className="bg-clip-text font-nacelle text-yellow-700 text-3xl font-semibold md:text-4xl">
              How can you join
            </h2>
          </div>
          <p className="text-lg text-center">
            Mint your <span className='text-yellow-700'>NFTs</span> and join the clan. Ask more and earn more NFTs for additional features.
            <br />
            As pioneers, you'll receive <span className='text-yellow-700'>$MYSTC</span> token airdrop at our launch and life-time access to Mystic AI.
            You stake and earn. We will buy-back and burn.
          </p>
          <p className="space-x-2 pt-8">
            <button
              className="inline-block border-2 border-yellow-700 text-orange-100 font-semibold py-2 px-4 
            rounded hover:bg-yellow-700 hover:text-black transition duration-300">
              Mint on Magic Eden
            </button>
            <button
              className="inline-block border-2 border-yellow-700 text-orange-100 font-semibold py-2 px-4 
            rounded hover:bg-yellow-700 hover:text-black transition duration-300">
              Buy $MYSTC
            </button>
          </p>
        </div>
        <Swiper
          speed={2300}
          className="volunteersSwiper mb-12"
          loop={false}
          autoplay={{ delay: 1000 }}
          modules={[Autoplay]}
          breakpoints={breakpoints}
        >
          <SwiperAutoplayFix />
          {houses.map((house, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="flex h-[13.688rem] w-[9.813rem] flex-col items-center justify-center gap-1.5 rounded-lg bg-zinc-50 p-4 shadow-lg">
                <figure>
                  <img
                    src={house.img}
                    alt={house.name}
                  />
                </figure>
                <p className="mt-2 text-center text-xs font-bold sm:text-neutral-500">
                  {house.name}
                </p>
                <p className="text-center text-xs">{house.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
