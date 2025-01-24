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

// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import {  Pagination } from 'swiper/modules';
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CouponCard from "../../components/Home/CouponCard";
import ContentLoadingSpinner from "../../components/Shared/ContentLoadingSpinner";

const Home = () => {
    const { user, role } = useContext(AuthContext);
    const [minimum, setMinimum] = useState('');
    const [maximum, setMaximum] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPageNumber, setTotalPageNumber] = useState(4);
    const { apartments, isLoading } = useApartments(minimum, maximum, pageNumber, setTotalPageNumber);

    const { data: coupons = [], isLoading: CouponsLoading } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/coupons`);
            return data;
        }
    })


    return (
        <div>
            {/* banner section */}
            <section className="mt-6">
                <Container>
                    <Banner></Banner>
                </Container>
            </section>

            {/* apartments section */}
            <section className="mt-24">
                <Container>
                    {/* section title */}
                    <div>
                        <Title title='Get Your Apartment' des='Explore a diverse range of apartments, from budget-friendly options to premium luxury residences. Begin your journey with us today and take the first step toward your new home.'></Title>
                    </div>
                    {/* apartments card */}
                    <div>
                        {
                            isLoading ? <LoadingSpinner></LoadingSpinner> :
                                <Container>
                                    {
                                        apartments?.result?.length ? <div className="grid grid-cols-3 gap-5 ">
                                            {
                                                apartments?.result?.map(apartment => <ApartmentCard key={apartment._id} apartment={apartment}></ApartmentCard>)
                                            }
                                        </div> : <div className="flex justify-center items-center font-bold text-3xl mt-44">No Apartments Available!</div>
                                    }
                                </Container>
                        }


                    </div>
                    <div className="flex justify-center mt-10">
                        <Link to='/apartments' className="btn  text-white bg-green-500 hover:bg-green-600">See More</Link>
                    </div>
                </Container>
            </section>

            {/* coupons section */}
            <section className="mt-24">
                <Container>
                    {/* section title */}
                    <div>
                        <Title title='Grab A Coupon' des='Explore a diverse range of apartments, from budget-friendly options to premium luxury residences. Begin your journey with us today and take the first step toward your new home.'></Title>
                    </div>

                    
                        {
                            CouponsLoading ? <ContentLoadingSpinner></ContentLoadingSpinner>: <div >
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={20}
                                    centeredSlides={false}
                                    pagination={{
                                        clickable: true,
                                    }}
                                   
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        coupons.map(coupon => <SwiperSlide key={coupon._id}>
                                            {coupon?.validity === 'Valid' && <CouponCard coupon={coupon}></CouponCard>}
                                        </SwiperSlide>)
                                    }


                                </Swiper>
                            </div>
                        }

                  


                </Container>
            </section>

            {/* about the building section */}
            <section className="mt-24">
                <Container>
                    {/* section title */}
                    <div>
                        <Title title='About the Building' des='Explore a diverse range of apartments, from budget-friendly options to premium luxury residences. Begin your journey with us today and take the first step toward your new home.'></Title>
                    </div>
                    {/* building details content */}
                    <div >
                        <div className='flex justify-between min-h-[500px]'>
                            {/* left */}
                            <div className='flex gap-3 w-[60%]'>
                                <div>
                                    <img className='w-[520px] h-full object-cover rounded-3xl' src="https://i.ibb.co.com/PmL2FVy/1.jpg" alt="" />
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <img className='w-[200px]  h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/55Bxqwb/road-green.jpg" alt="" />
                                    <img className='w-[200px] h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/52tYYNW/4.jpg" alt="" />
                                </div>
                            </div>
                            {/* right */}
                            <div className=''>
                                <div className="flex flex-col gap-3">
                                    {/* building at a glance */}
                                    <div className="space-y-1">
                                        <p className="text-3xl font-bold mb-3">Building <span className="text-green-600">At a Glance:</span></p>
                                        {/* total build up area */}
                                        <div className="flex gap-2 items-center">
                                            <GiIsland size={25} />
                                            <p className="text-xl"><span className="font-semibold">Total Build-Up Area :</span> Over 50,000 Sq. Ft.</p>
                                        </div>
                                        {/* Common Area size */}
                                        <div className="flex gap-2 items-center">
                                            <MdApartment size={25} />
                                            <p className="text-xl"><span className="font-semibold">Floors :</span> 10-Story Residential Tower</p>
                                        </div>
                                        {/* Total Apartments */}
                                        <div className="flex gap-2 items-center">
                                            <MdApartment size={25} />
                                            <p className="text-xl"><span className="font-semibold"> Apartments :</span> 20 Premium Apartments.</p>
                                        </div>
                                        {/* parking Area size */}
                                        <div className="flex gap-2 items-center">
                                            <LuCircleParking size={25} />
                                            <p className="text-xl"><span className="font-semibold">Parking :</span> Parking for Each Unit, Plus Visitor Parking.</p>
                                        </div>

                                    </div>

                                    {/* apartments at a glance */}
                                    <div className="space-y-1">
                                        <p className="text-3xl font-bold mb-3">Apartments <span className="text-green-600">At a Glance:</span></p>
                                        {/* apartment size */}
                                        <div className="flex gap-2 items-center">
                                            <MdApartment size={25} />
                                            <p className="text-xl"><span className="font-semibold">Apartments Size :</span> 1,200 to 2,500 Sq. Ft.</p>
                                        </div>
                                        {/* apartment size */}
                                        <div className="flex gap-2 items-center">
                                            <FaHouseTsunami size={25} />
                                            <p className="text-xl"><span className="font-semibold">Rooms :</span> 2-4 Rooms in Each Apartment.</p>
                                        </div>

                                    </div>


                                    {/* community features */}
                                    <div className="space-y-1">
                                        <p className="text-3xl font-bold mb-3">Features <span className="text-green-600">At a Glance:</span></p>
                                        {/* Gym Area size */}
                                        <div className="flex gap-2 items-center">
                                            <MdOutlineSportsGymnastics size={25} />
                                            <p className="text-xl"><span className="font-semibold">Gym :</span> A Modern well Equipped Gymnasium.</p>
                                        </div>
                                        {/* Gym Area size */}
                                        <div className="flex gap-2 items-center">
                                            <MdRoofing size={25} />
                                            <p className="text-xl"><span className="font-semibold">Rooftop :</span> Garden and Swimming Pool.</p>
                                        </div>
                                        {/* children Area size */}
                                        <div className="flex gap-2 items-center">
                                            <TbPlayBasketball size={25} />
                                            <p className="text-xl"><span className="font-semibold">Kids Zone :</span> Dedicated for Children's Playing.</p>
                                        </div>
                                    </div>

                                    {/* see more details button */}
                                    <Link to='/apartments' className='mt-3 w-[130px] btn text-white bg-green-500 hover:bg-green-600'>More details </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>
            </section>

            {/* Location */}
            <section className="mt-24">
                <Container>
                    {/* section title */}
                    <div>
                        <Title title='Building Location' des='Explore a diverse range of apartments, from budget-friendly options to premium luxury residences. Begin your journey with us today and take the first step toward your new home.'></Title>
                    </div>
                    {/* display map */}
                    <div>
                        <div className='flex justify-between  min-h-[500px]'>
                            {/* left */}
                            <div className='w-1/2'>
                                <h1 className='font-bold text-5xl '>Let's <span className='text-green-600'>Move towards your Dream</span> to make it Reality!</h1>
                                <p className='mt-5 text-xl'>Explore a diverse range of apartments, from budget-friendly options to premium luxury residences.Get in-depth details on property features, pricing, and neighborhood highlights.</p>

                                <address className="mt-5">
                                    <div className="flex gap-2 items-center">
                                        <FaLocationDot size={30} />
                                        <div className="">
                                            <p className="text-xl"> House 16, Uttara Sector 10</p>
                                            <p>Dhaka, Bangladesh</p>
                                        </div>

                                    </div>

                                </address>


                                <Link to='/apartments' className='mt-5 btn text-white bg-green-500 hover:bg-green-600'>Contact Us </Link>
                            </div>
                            {/* right */}
                            <div className='flex gap-3 w-[45%]'>



                                <LocationMap></LocationMap>

                            </div>

                        </div>
                    </div>
                </Container>
            </section>

        </div>
    );
};

export default Home;