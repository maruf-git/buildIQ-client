import { useContext, useState } from "react";
import ApartmentCard from "../../components/Apartment/ApartmentCard";
import Banner from "../../components/Home/Banner";
import Container from "../../components/shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useApartments from "../../hooks/useApartments";
import Title from "../../components/Home/Title";
import { Link } from "react-router-dom";
import LocationMap from "../../components/Home/LocationMap";
import { GiIsland } from "react-icons/gi";
import { MdApartment, MdOutlineSportsGymnastics, MdRoofing } from "react-icons/md";
import { LuCircleParking } from "react-icons/lu";
import { TbPlayBasketball } from "react-icons/tb";
import { FaHouseTsunami, FaLocationDot } from "react-icons/fa6";
import { HiArrowRight } from "react-icons/hi2";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CouponCard from "../../components/Home/CouponCard";
import ContentLoadingSpinner from "../../components/Shared/ContentLoadingSpinner";
import { Helmet } from "react-helmet-async";

// Spec tile for "About the building"
const SpecTile = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col gap-2 p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <Icon size={20} className="text-green-600" />
        </div>
        <div>
            <p className="text-sm font-bold text-gray-900 mt-1">{label}</p>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">{value}</p>
        </div>
    </div>
);

const Home = () => {
    const { role } = useContext(AuthContext);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPageNumber, setTotalPageNumber] = useState(4);
    const { apartments, isLoading } = useApartments('', '', pageNumber, setTotalPageNumber);

    const { data: coupons = [], isLoading: CouponsLoading } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/coupons`);
            return data;
        }
    })

    return (
        <div className="">
            <Helmet><title>BuildIQ - Modern Living Spaces</title></Helmet>

            {/* Premium Cinematic Banner */}
            <section className="pt-32 md:pt-36 pb-12">
                <Container>
                    <Banner />
                </Container>
            </section>

            {/* Available Apartments Grid */}
            <section className="mt-16 sm:mt-24">
                <Container>
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                        <div className="max-w-xl">
                            <span className="inline-block text-xs font-bold tracking-widest text-green-600 uppercase mb-3">
                                Handpicked Listings
                            </span>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                                Discover Your Next <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">
                                    Dream Home
                                </span>
                            </h2>
                        </div>
                        <Link
                            to='/apartments'
                            className='group hidden md:inline-flex items-center gap-3 bg-white border border-gray-200 hover:border-green-500 text-gray-700 hover:text-green-600 font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md'
                        >
                            View All Apartments 
                            <HiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="py-20"><LoadingSpinner /></div>
                    ) : (
                        <>
                            {apartments?.result?.length ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                    {apartments.result.slice(0, 6).map(apartment => (
                                        <ApartmentCard key={apartment._id} apartment={apartment} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                    <MdApartment size={48} className="opacity-25 mb-3" />
                                    <p className="font-medium">No apartments available right now.</p>
                                </div>
                            )}

                            {/* Mobile View All Button */}
                            <div className="flex justify-center mt-10 md:hidden">
                                <Link
                                    to='/apartments'
                                    className='inline-flex w-full justify-center items-center gap-2 bg-gray-900 text-white font-bold px-6 py-4 rounded-xl shadow-lg'
                                >
                                    Browse All Listings <HiArrowRight size={18} />
                                </Link>
                            </div>
                        </>
                    )}
                </Container>
            </section>

            {/* Exclusive Coupons – Members Only */}
            {role && (
                <section className="mt-32 py-24 relative overflow-hidden bg-gray-900">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <Container>
                        <div className="relative z-10 text-center max-w-2xl mx-auto mb-16">
                            <span className="inline-flex py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest text-green-400 uppercase mb-4 backdrop-blur-md">
                                Resident Perks
                            </span>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                                Exclusive Member Offers
                            </h2>
                            <p className="text-gray-400 text-lg font-medium">
                                Enjoy special discounts on your rent. Copy a coupon code and apply it during payment checkout.
                            </p>
                        </div>

                        {CouponsLoading ? (
                            <ContentLoadingSpinner />
                        ) : (
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={24}
                                pagination={{ clickable: true }}
                                modules={[Pagination]}
                                className="mySwiper pb-16"
                                breakpoints={{
                                    0: { slidesPerView: 1, spaceBetween: 16 },
                                    640: { slidesPerView: 2, spaceBetween: 20 },
                                    1024: { slidesPerView: 3, spaceBetween: 24 },
                                    1280: { slidesPerView: 4, spaceBetween: 24 }
                                }}
                            >
                                {coupons
                                    .filter(c => c?.validity === 'Valid')
                                    .map(coupon => (
                                        <SwiperSlide key={coupon._id} className="pt-2">
                                            <CouponCard coupon={coupon} />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        )}
                    </Container>
                </section>
            )}

            {/* About the Building – Architectural Layout */}
            <section className="mt-20 sm:mt-32">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        
                        {/* Text and Features Side */}
                        <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                            <div>
                                <span className="inline-block text-xs font-bold tracking-widest text-green-600 uppercase mb-3">
                                    The Architecture
                                </span>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
                                    Uncompromising <br className="hidden sm:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">
                                        Design & Comfort
                                    </span>
                                </h2>
                                <p className="text-gray-500 text-base lg:text-lg leading-relaxed font-medium">
                                    A modern 10-story residential tower crafted with precision. Our spaces balance form and function, offering premium amenities designed specifically for vibrant community living.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <SpecTile icon={GiIsland} label="50,000+ Sf" value="Total Living Area" />
                                <SpecTile icon={MdApartment} label="10 Stories" value="Residential Tower" />
                                <SpecTile icon={LuCircleParking} label="Smart Parking" value="EV Ready Bays" />
                                <SpecTile icon={MdOutlineSportsGymnastics} label="Wellness" value="Pool & Gym" />
                            </div>

                            <div className="pt-2">
                                <Link
                                    to='/apartments'
                                    className='group inline-flex items-center gap-3 bg-gray-900 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(22,163,74,0.3)] hover:-translate-y-0.5'
                                >
                                    Explore the Property <HiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Image Side - Editorial Layout */}
                        <div className="lg:col-span-7 relative h-[500px] sm:h-[600px] w-full order-1 lg:order-2">
                            {/* Decorative background blur shape */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-500/20 rounded-full blur-[80px]"></div>
                            
                            <img 
                                className="absolute top-0 right-0 w-[55%] h-[60%] object-cover rounded-3xl shadow-2xl z-20 border-8 border-white" 
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2600&auto=format&fit=crop" 
                                alt="Exterior" 
                            />
                            
                            <img 
                                className="absolute bottom-0 left-0 w-[60%] h-[65%] object-cover rounded-3xl shadow-2xl z-30 border-8 border-white" 
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2600&auto=format&fit=crop" 
                                alt="Interior Living" 
                            />
                            
                            {/* Floating overlay card */}
                            <div className="hidden sm:flex absolute right-4 bottom-[15%] z-40 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-white/50 items-center gap-4 max-w-[240px]">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                                    <FaHouseTsunami size={24} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-lg font-black text-gray-900 leading-none">20 Premium</p>
                                    <p className="text-sm font-medium text-gray-500 mt-1">Smart Apartments</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
            </section>

            {/* Location Section */}
            <section className="mt-20 sm:mt-32 mb-10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 -z-10 rounded-l-[100px]"></div>
                <Container>
                    <div className='flex flex-col lg:flex-row gap-16 items-center'>
                        
                        {/* Text Content */}
                        <div className='w-full lg:w-5/12 space-y-8'>
                            <div>
                                <span className="inline-block text-xs font-bold tracking-widest text-green-600 uppercase mb-3">
                                    Neighborhood
                                </span>
                                <h2 className='font-extrabold text-4xl md:text-5xl text-gray-900 leading-[1.1] tracking-tight'>
                                    Connected to <br />
                                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400'>
                                        Everything
                                    </span>
                                </h2>
                            </div>
                            
                            <p className='text-gray-500 text-base md:text-lg leading-relaxed font-medium'>
                                Situated in the heart of Uttara, Dhaka. Enjoy green surroundings, effortless connectivity to public transit hubs, and immediate access to top tier schools, shopping, and dining.
                            </p>
                            
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/60 inline-block w-full">
                                <address className="not-italic flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                                        <FaLocationDot size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">House 16, Sector 10</p>
                                        <p className="text-gray-500 font-medium mt-0.5">Uttara, Dhaka, Bangladesh</p>
                                    </div>
                                </address>
                            </div>
                            
                            {/* <div className="pt-2">
                                <Link
                                    to='/'
                                    className='group inline-flex items-center gap-3 bg-white border-2 border-green-500 hover:bg-green-500 hover:text-white text-green-600 font-bold px-8 py-3.5 rounded-xl transition-all duration-300'
                                >
                                    Get Directions <HiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div> */}
                        </div>

                        {/* Map Container */}
                        <div className='w-full lg:w-7/12'>
                            <div className="relative w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-4 border-white">
                                {/* Simulated glow behind map */}
                                <div className="absolute inset-0 bg-green-50 animate-pulse -z-10"></div>
                                <LocationMap />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Home;