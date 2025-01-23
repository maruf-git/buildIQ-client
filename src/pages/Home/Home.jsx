import { useState } from "react";
import ApartmentCard from "../../components/Apartment/ApartmentCard";
import Banner from "../../components/Home/Banner";
import Container from "../../components/shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useApartments from "../../hooks/useApartments";
import Title from "../../components/Home/Title";
import { Link } from "react-router-dom";

const Home = () => {
    const [minimum, setMinimum] = useState('');
    const [maximum, setMaximum] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPageNumber, setTotalPageNumber] = useState(4);

    const { apartments, isLoading } = useApartments(minimum, maximum, pageNumber, setTotalPageNumber);
    return (
        <div>
            {/* banner section */}
            <section className="mt-5 mb-20">
                <Container>
                    <Banner></Banner>
                </Container>
            </section>

            {/* apartments section */}
            <section className="my-20">
                <Container>
                    {/* apartments card */}
                    <div>
                        <Title title='Get Your Apartment' des='Explore a diverse range of apartments, from budget-friendly options to premium luxury residences. Begin your journey with us today and take the first step toward your new home.'></Title>
                    </div>
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

        </div>
    );
};

export default Home;