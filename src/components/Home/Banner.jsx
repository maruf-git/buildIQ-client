// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {/* slider 1 */}
                <SwiperSlide>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-between  min-h-[500px]'>
                            {/* left */}
                            <div className='w-1/2'>
                                <h1 className='font-bold text-6xl leading-[75px]'>Bringing <span className='text-green-600'>Dreams to Reality</span> with Love & care!</h1>
                                <p className='mt-5 text-xl'>Explore a diverse range of apartments, from budget-friendly options to premium luxury residences.Get in-depth details on property features, pricing, and neighborhood highlights.Experience properties as if you're there through detailed photos and virtual walkthroughs.</p>

                                <Link to='/apartments' className='mt-5 btn text-white bg-green-500 hover:bg-green-600'>Explore Your Dreams </Link>

                            </div>
                            {/* right */}
                            <div className='flex gap-3 w-[45%]'>
                                <div className='flex flex-col gap-3'>
                                    <img className='w-[167px]  h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/PmL2FVy/1.jpg" alt="" />
                                    <img className='w-[167px] h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/52tYYNW/4.jpg" alt="" />
                                </div>
                                <div className=''>
                                    <img className='w-[396px]  h-full object-cover rounded-3xl' src="https://i.ibb.co.com/52tYYNW/4.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                </SwiperSlide>

                {/* slider 2 */}
                <SwiperSlide>
                    <div className='flex justify-between  min-h-[500px]'>
                        {/* left */}
                        <div className='w-1/2'>
                            <h1 className='font-bold text-6xl leading-[75px]'>Bringing <span className='text-green-600'>Dreams to Reality</span> with Love & Care!</h1>
                            <p className='mt-5 text-xl'>Explore a diverse range of apartments, from budget-friendly options to premium luxury residences.Get in-depth details on property features, pricing, and neighborhood highlights.Experience properties as if you're there through detailed photos and virtual walkthroughs.</p>


                            <Link to='/apartments' className='mt-5 btn text-white bg-green-500 hover:bg-green-600'>Explore Your Dreams </Link>
                        </div>
                        {/* right */}
                        <div className='flex gap-3 w-[45%]'>
                            <div className='flex flex-col gap-3'>
                                <img className='w-[167px]  h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/55Bxqwb/road-green.jpg" alt="" />
                                <img className='w-[167px] h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/52tYYNW/4.jpg" alt="" />
                            </div>
                            <div>
                                <img className='w-[396px] h-full object-cover rounded-3xl' src="https://i.ibb.co.com/PmL2FVy/1.jpg" alt="" />
                            </div>

                        </div>
                    </div>
                </SwiperSlide>

                {/* slider 3 */}
                <SwiperSlide>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-between  min-h-[500px]'>
                            {/* left */}
                            <div className='w-1/2'>
                                <h1 className='font-bold text-6xl leading-[75px]'>Bringing <span className='text-green-600'>Dreams to Reality</span> with Love & care!</h1>
                                <p className='mt-5 text-xl'>Explore a diverse range of apartments, from budget-friendly options to premium luxury residences.Get in-depth details on property features, pricing, and neighborhood highlights.Experience properties as if you're there through detailed photos and virtual walkthroughs.</p>

                                <Link to='/apartments' className='mt-5 btn text-white bg-green-500 hover:bg-green-600'>Explore Your Dreams </Link>
                            </div>
                            {/* right */}
                            <div className='flex gap-3 w-[45%]'>
                                <div className='flex flex-col gap-3'>
                                    <img className='w-[167px]  h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/jJKdJmk/space.jpg" alt="" />
                                    <img className='w-[167px] h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/ZWt3y6c/flower.jpg" alt="" />
                                </div>
                                <div className=''>
                                    <img className='w-[396px]  h-full object-cover rounded-3xl' src="https://i.ibb.co.com/zbnFwRw/green-table.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* slider 4 */}
                <SwiperSlide>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-between  min-h-[500px]'>
                            {/* left */}
                            <div className='w-1/2'>
                                <h1 className='font-bold text-6xl leading-[75px]'>Bringing <span className='text-green-600'>Dreams to Reality</span> with Love & care!</h1>
                                <p className='mt-5 text-xl'>Explore a diverse range of apartments, from budget-friendly options to premium luxury residences.Get in-depth details on property features, pricing, and neighborhood highlights.Experience properties as if you're there through detailed photos and virtual walkthroughs.</p>


                                <Link to='/apartments' className='mt-5 btn text-white bg-green-500 hover:bg-green-600'>Explore Your Dreams </Link>
                            </div>
                            {/* right */}
                            <div className='flex gap-3 w-[45%]'>
                                <div className='flex flex-col gap-3'>
                                    <img className='w-[167px]  h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/MDbTHb6/5.jpg" alt="" />
                                    <img className='w-[167px] h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/xFwPmvY/3.jpg" alt="" />
                                </div>
                                <div className=''>
                                    <img className='w-[396px]  h-full object-cover rounded-3xl' src="https://i.ibb.co.com/b2jc6Yw/2.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                </SwiperSlide>

                {/* slider 5 */}
                <SwiperSlide>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-between  min-h-[500px]'>
                            {/* left */}
                            <div className='w-1/2'>
                                <h1 className='font-bold text-6xl leading-[75px]'>Bringing <span className='text-green-600'>Dreams to Reality</span> with Love & care!</h1>
                                <p className='mt-5 text-xl'>Explore a diverse range of apartments, from budget-friendly options to premium luxury residences.Get in-depth details on property features, pricing, and neighborhood highlights.Experience properties as if you're there through detailed photos and virtual walkthroughs.</p>


                                <Link to='/apartments' className='mt-5 btn text-white bg-green-500 hover:bg-green-600'>Explore Your Dreams </Link>
                            </div>
                            {/* right */}
                            <div className='flex gap-3 w-[45%]'>
                                <div className='flex flex-col gap-3'>
                                    <img className='w-[167px]  h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/KrFkkkk/gym-person.jpg" alt="" />
                                    <img className='w-[167px] h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/yyJC668/gym.jpg" alt="" />
                                </div>
                                <div className=''>
                                    <img className='w-[396px]  h-full object-cover rounded-3xl' src="https://i.ibb.co.com/z478Z3w/gym2.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>

        </div >
    );
};

export default Banner;