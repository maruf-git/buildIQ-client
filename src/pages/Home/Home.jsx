import { useState } from "react";
import ApartmentCard from "../../components/Apartment/ApartmentCard";
import Banner from "../../components/Home/Banner";
import Container from "../../components/shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useApartments from "../../hooks/useApartments";
import Title from "../../components/Home/Title";
import { Link } from "react-router-dom";
import LocationMap from "../../components/Home/LocationMap";

const Home = () => {
    const [minimum, setMinimum] = useState('');
    const [maximum, setMaximum] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPageNumber, setTotalPageNumber] = useState(4);

    const { apartments, isLoading } = useApartments(minimum, maximum, pageNumber, setTotalPageNumber);
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

            {/* about the building section */}
            <section className="mt-24">
                <Container>
                    {/* section title */}
                    <div>
                        <Title title='About the Building' des='Explore a diverse range of apartments, from budget-friendly options to premium luxury residences. Begin your journey with us today and take the first step toward your new home.'></Title>
                    </div>
                    {/* building details content */}
                    <div>
                        <div className='flex justify-between  min-h-[500px]'>
                            {/* left */}
                            <div className='flex gap-3 w-[45%]'>
                                <div>
                                    <img className='w-[396px] h-full object-cover rounded-3xl' src="https://i.ibb.co.com/PmL2FVy/1.jpg" alt="" />
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <img className='w-[167px]  h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/55Bxqwb/road-green.jpg" alt="" />
                                    <img className='w-[167px] h-[50%] object-cover rounded-3xl' src="https://i.ibb.co.com/52tYYNW/4.jpg" alt="" />
                                </div>
                            </div>
                            {/* right */}
                            <div className='w-1/2'>
                                <h1 className='font-bold text-6xl leading-[75px]'>Bringing <span className='text-green-600'>Dreams to Reality</span> with Love & Care!</h1>
                                <p className='mt-5 text-xl'>Explore a diverse range of apartments, from budget-friendly options to premium luxury residences.Get in-depth details on property features, pricing, and neighborhood highlights.Experience properties as if you're there through detailed photos and virtual walkthroughs.</p>


                                <Link to='/apartments' className='mt-5 btn text-white bg-green-500 hover:bg-green-600'>Explore Your Dreams </Link>
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
                                <h1 className='font-bold text-6xl leading-[75px]'>Bringing <span className='text-green-600'>Dreams to Reality</span> with Love & Care!</h1>
                                <p className='mt-5 text-xl'>Explore a diverse range of apartments, from budget-friendly options to premium luxury residences.Get in-depth details on property features, pricing, and neighborhood highlights.Experience properties as if you're there through detailed photos and virtual walkthroughs.</p>


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