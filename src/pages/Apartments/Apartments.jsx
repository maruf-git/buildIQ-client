
import Container from "../../components/shared/Container";

import ApartmentCard from "../../components/Apartment/ApartmentCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { useState } from "react";
import useApartments from "../../hooks/useApartments";
import { Helmet } from "react-helmet-async";

const Apartments = () => {
    const [minimum, setMinimum] = useState('');
    const [maximum, setMaximum] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPageNumber, setTotalPageNumber] = useState(4);

    const { apartments, isLoading } = useApartments(minimum, maximum, pageNumber, setTotalPageNumber)



    const handleSearch = (event) => {
        event.preventDefault();
        let min = parseInt(event.target.minimum.value);
        let max = parseInt(event.target.maximum.value);
        if (min > max) {
            toast.error('Please enter a valid Range');
            return;
        }
        setPageNumber(1);
        if (min > max) {
            [min, max] = [max, min];
        }
        setMinimum(min);
        setMaximum(max);

    }




    return (
        <div className="my-10">

            {/* helmet */}
            <Helmet>
                <title>BuildIQ - Apartments</title>
            </Helmet>

            {/* search bar */}
            <Container>
                <div className="mb-10 flex  lg:flex-row gap-3 justify-center items-center ">
                    <form onSubmit={handleSearch} className="" id='search'>
                        <div className="flex flex-col lg:flex-row gap-3 items-center">
                            {/* min price */}
                            <div className="flex gap-2 items-center">
                                <label htmlFor="minimum" className="sm:text-xl font-medium">Min Price :</label>
                                <input
                                    id="minimum"
                                    type="number"
                                    name="minimum"
                                    defaultValue={minimum}
                                    placeholder="enter minimum rent"
                                    className=" input border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            {/* max price */}
                            <div className="flex gap-2 items-center">
                                <label htmlFor="maximum" className=" sm:text-xl font-medium ">Max Price : </label>
                                <input
                                    id="maximum"
                                    type="number"
                                    name="maximum"
                                    defaultValue={maximum}
                                    placeholder="enter maximum rent"
                                    className="input border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            {/* buttons */}
                            <div className="flex gap-3 items-center">
                                {/* search button */}
                                <button className="btn w-[90px] p-3 text-white  bg-green-500 hover:bg-green-600  rounded-lg ">Search</button>
                                {/* reset button */}
                                <p onClick={() => {
                                    setMinimum('');
                                    setMaximum('');
                                    setPageNumber(1);
                                    document.getElementById('search').reset();
                                }} className="btn w-[90px] p-3 text-white  bg-green-500 hover:bg-green-600  rounded-lg">Reset</p>
                            </div>
                        </div>
                    </form>

                </div>
            </Container>

            {/* apartments card */}
            <div>
                {
                    isLoading ? <LoadingSpinner></LoadingSpinner> :
                        <Container>
                            {
                                apartments?.result?.length ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
                                    {
                                        apartments?.result?.map(apartment => <ApartmentCard key={apartment._id} apartment={apartment}></ApartmentCard>)
                                    }
                                </div> : <div className="flex justify-center items-center font-bold text-3xl mt-44">No Apartments Available!</div>
                            }
                        </Container>
                }


            </div>

            {/* navigation */}
            <div className="mt-10">
                <div className="flex gap-5 justify-center items-center">
                    <button
                        disabled={pageNumber === 1}
                        onClick={() => setPageNumber(pageNumber - 1)}
                        className="btn w-[90px] p-3 text-white  bg-green-500 hover:bg-green-600  rounded-lg">Previous</button>
                    <p className="text-3xl font-semibold">{pageNumber}/{totalPageNumber}</p>
                    <button
                        disabled={pageNumber === totalPageNumber}
                        onClick={() => setPageNumber(pageNumber + 1)}
                        className="btn w-[90px] p-3 text-white  bg-green-500 hover:bg-green-600  rounded-lg">Next</button>
                </div>
            </div>
        </div>
    );
};

export default Apartments;