export default function Offerings() {
  return (
    <section id="offerings" className="flex px-4 py-12 md:pt-14 md:pb-20 w-full justify-center items-center" data-aos="fade-up">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="mx-auto pb-12 md:pb-20 space-y-6 text-center">
          <div className="inline-flex items-center gap-3 pb-3
            before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-yellow-1000 
            after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-yellow-1000">
            <h2 className="bg-clip-text font-nacelle text-white text-3xl font-semibold md:text-4xl">
              What is in store
            </h2>
          </div>
          <p className="text-lg text-center">
            Explore our unique offerings, ask and earn $MYSTC tokens and NFT rewards.
            As we grow, so will our features. Stay connected for more updates!
          </p>
        </div>
        {/* Cards Section */}
        <div className="flex flex-wrap justify-center items-stretch ml-[-6px]">
          <div className="w-full sm:w-1/2 lg:w-1/4" data-aos="fade-up-right">
            <div className="serviceBox border-gray-1100 md:border-r md:border-b sm:border-0 text-center">
              <div className="service-icon"><span className="ti-help"></span></div>
              <h3 className="title">Personal Horoscope Insights</h3>
              <p className="description text-sm">Have any astrological questions? Mystic AI is here answer all your horoscope questions.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4" data-aos="fade-up-right">
            <div className="serviceBox border-gray-1100 md:border-r md:border-b sm:border-0 text-center">
              <div className="service-icon"><span className="ti-timer"></span></div>
              <h3 className="title">Round the Clock Assistance</h3>
              <p className="description text-sm">Need to consult at your comfort and convenience? Available anytime and anywhere you need.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4" data-aos="fade-up-left">
            <div className="serviceBox border-gray-1100 md:border-r md:border-b sm:border-0 text-center">
              <div className="service-icon"><span className="ti-heart-broken"></span></div>
              <h3 className="title">Relationship Guidance</h3>
              <p className="description text-sm">Single, seeing someone, or committed? Ask and you will be guided for a happily ever after.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4" data-aos="fade-up-left">
            <div className="serviceBox border-gray-1100 md:border-b sm:border-0 text-center">
              <div className="service-icon"><span className="ti-zoom-in"></span></div>
              <h3 className="title">Future Predictions</h3>
              <p className="description text-sm">Curious about what's ahead? Mystic AI will predict life events based on your Vimshottari Dasha.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4" data-aos="fade-up-right">
            <div className="serviceBox border-gray-1100 md:border-r sm:border-0 text-center">
              <div className="service-icon"><span className="ti-user"></span></div>
              <h3 className="title">Personal Coaching</h3>
              <p className="description text-sm">Looking for a personal coach? Mystic AI is here to guide you based on your horoscope.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4" data-aos="fade-up-right">
            <div className="serviceBox border-gray-1100 md:border-r sm:border-0 text-center">
              <div className="service-icon"><span className="ti-headphone-alt"></span></div>
              <h3 className="title">Immersive Experience</h3>
              <p className="description text-sm">Prefer seeing and listening? Voice Integration coming soon for a personalized experience.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4" data-aos="fade-up-left">
            <div className="serviceBox border-gray-1100 md:border-r sm:border-0 text-center">
              <div className="service-icon"><span className="ti-blackboard"></span></div>
              <h3 className="title">Astrology Learning</h3>
              <p className="description text-sm">Want to learn astrology? Coming soon: Mystic AI is here to help you master it.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4" data-aos="fade-up-left">
            <div className="serviceBox border-gray-1100 sm:border-0 text-center">
              <div className="service-icon"><span className="ti-game"></span></div>
              <h3 className="title">Fun and Games</h3>
              <p className="description text-sm">Want to play online astrological games and earn services? Exciting options coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
