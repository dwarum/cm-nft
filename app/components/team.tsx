export default function Team() {
    return (
        <section id="team" className="flex px-4 md:pt-14 md:pb-20 md:py-20 w-full justify-center items-center mb-12">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 w-full">
                <div className="mx-auto pb-12 md:pb-20 space-y-6 text-center">
                    <div className="inline-flex items-center gap-3 pb-3
            before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-yellow-700 
            after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-yellow-700">
                        <h2 className="bg-clip-text font-nacelle text-yellow-700 text-3xl font-semibold md:text-4xl">
                            Who are we
                        </h2>
                    </div>

                    <p className="text-lg text-center">
                        We are a passionate team of dedicated individuals combining expertise in AI, blockchain, and Vedic Astrology to bring Mystic AI to life. <br />
                        As we continue to grow, we are excited to expand our capabilities and deliver more powerful features to our users!
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-12 py-6">
                    <div className="single-team relative rounded-lg group flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6" data-aos="zoom-in-up" data-aos-delay="0">
                        <div className="img">
                            <img
                                alt="image"
                                src="/images/sagittarius-s-1.svg"
                                className="rounded-lg w-full"
                            />
                        </div>
                        <div className="team-content">
                            <h3 className="text-orange-100">Bala Perry</h3>
                            <p  className="text-orange-100">Founder/CEO/SME</p>
                            <p  className="text-yellow-700">Lagna Sign - Sagittarius</p>
                        </div>
                    </div>
                    <div className="single-team relative rounded-lg group flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6" data-aos="zoom-in-up" data-aos-delay="500">
                        <div className="img">
                            <img
                                alt="image"
                                src="/images/libra-s-1.svg"
                                className="rounded-lg w-full"
                            />
                        </div>
                        <div className="team-content">
                            <h3 className="text-orange-100">Ramya</h3>
                            <p className="text-orange-100">PM/Tech Lead</p>
                            <p className="text-yellow-700">Lagna Sign- Libra</p>
                        </div>
                    </div>
                    <div className="single-team relative rounded-lg group flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6" data-aos="zoom-in-up" data-aos-delay="1000">
                        <div className="img">
                            <img
                                alt="image"
                                src="/images/scorpio-s-1.svg"
                                className="rounded-lg w-full"
                            />
                        </div>
                        <div className="team-content">
                            <h3 className="text-orange-100" >Ashok Nanda</h3>
                            <p className="text-orange-100">Lead Developer AI/ML</p>
                            <p className="text-yellow-700">Lagna Sign- Scorpio</p>
                        </div>
                    </div>
                    <div className="single-team relative rounded-lg group flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6" data-aos="zoom-in-up" data-aos-delay="1500">
                        <div className="img">
                            <img
                                alt="image"
                                src="/images/aries-s-1.svg"
                                className="rounded-lg w-full"
                            />
                        </div>
                        <div className="team-content">
                            <h3 className="text-orange-100">Arun M</h3>
                            <p  className="text-orange-100">UI/UX Developer</p>
                            <p  className="text-yellow-700">Lagna Sign- Aries</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
