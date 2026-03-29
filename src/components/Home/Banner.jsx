// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';

// slide data
const slides = [
    {
        tag: 'Premium Residences',
        headline: 'Find Your Perfect',
        sub: 'Living Space',
        desc: 'Explore budget-friendly to premium luxury apartments. Get in-depth details, pricing, and immersive photo walkthroughs.',
        img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2600&auto=format&fit=crop'
    },
    {
        tag: 'Scenic Surroundings',
        headline: 'Where Nature Meets',
        sub: 'Modern Comfort',
        desc: 'Wake up to serene green spaces and lush surroundings. Experience the perfect balance of city living and natural beauty.',
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2600&auto=format&fit=crop'
    },
    {
        tag: 'Modern Interiors',
        headline: 'Thoughtfully Designed',
        sub: 'Spaces For You',
        desc: 'Designer finishes, open layouts, and every detail crafted for the way you live today.',
        img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2600&auto=format&fit=crop'
    },
    {
        tag: 'Luxury Living',
        headline: 'Elevate Your',
        sub: 'Everyday Life',
        desc: 'Premium apartments with world-class amenities, rooftop gardens, and resort-style living.',
        img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2600&auto=format&fit=crop'
    }
];

const Banner = () => {
    return (
        <div className='relative w-full rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]'>
            <Swiper
                effect={'fade'}
                fadeEffect={{ crossFade: true }}
                centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ 
                    clickable: true,
                    bulletClass: 'swiper-custom-bullet',
                    bulletActiveClass: 'swiper-custom-bullet-active',
                }}
                modules={[Autoplay, Pagination, EffectFade]}
                className='mySwiper h-[500px] sm:h-[600px] lg:h-[700px] w-full'
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i} className='relative w-full h-full group overflow-hidden'>
                        {/* Background Image with slow pan */}
                        <div className="absolute inset-0 w-full h-full scale-[1.05] group-[.swiper-slide-active]:scale-100 transition-transform duration-[8000ms] ease-out">
                            <img
                                className='w-full h-full object-cover'
                                src={slide.img}
                                alt={slide.tag}
                            />
                            {/* Cinematic Gradients */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/60 to-transparent mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-80"></div>
                        </div>

                        {/* Content Container */}
                        <div className='relative h-full flex items-center max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
                            <div className='w-full md:max-w-xl lg:max-w-2xl text-left'>
                                {/* Slide-in Tag */}
                                <div className='inline-block mb-6 overflow-hidden'>
                                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md text-green-400 text-xs font-bold tracking-widest uppercase translate-y-full opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 transition-all duration-700 delay-300'>
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)]"></span>
                                        {slide.tag}
                                    </div>
                                </div>

                                {/* Headline Sequence */}
                                <div className="space-y-2 mb-6 pointer-events-none">
                                    <div className="overflow-hidden">
                                        <h1 className='text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] translate-y-full opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 transition-all duration-700 delay-500'>
                                            {slide.headline}
                                        </h1>
                                    </div>
                                    <div className="overflow-hidden">
                                        <h1 className='text-4xl sm:text-5xl lg:text-7xl font-light text-green-400 tracking-tight leading-[1.1] italic translate-y-full opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 transition-all duration-700 delay-700'>
                                            {slide.sub}
                                        </h1>
                                    </div>
                                </div>

                                {/* Slide-up Description */}
                                <div className="overflow-hidden mb-10">
                                    <p className='text-gray-300 text-base md:text-lg font-medium leading-relaxed max-w-lg translate-y-8 opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 transition-all duration-700 delay-1000'>
                                        {slide.desc}
                                    </p>
                                </div>

                                {/* Slide-up Buttons */}
                                <div className='flex flex-wrap items-center gap-4 translate-y-8 opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 transition-all duration-700 delay-[1200ms]'>
                                    <Link
                                        to='/apartments'
                                        className='group/btn inline-flex items-center gap-3 bg-green-500 text-gray-900 font-bold px-8 py-4 rounded-full text-sm hover:bg-green-400 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                                    >
                                        Explore Apartments
                                        <HiArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {/* Custom Pagination Styles */}
            <style>{`
                .swiper-custom-bullet {
                    display: inline-block;
                    width: 32px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.3);
                    margin: 0 4px !important;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .swiper-custom-bullet-active {
                    background: #22c55e;
                    width: 48px;
                    box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
                }
                .swiper-pagination {
                    bottom: 30px !important;
                }
            `}</style>
        </div>
    );
};

export default Banner;