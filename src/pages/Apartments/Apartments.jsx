import Container from "../../components/shared/Container";
import ApartmentCard from "../../components/Apartment/ApartmentCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import useApartments from "../../hooks/useApartments";
import { Helmet } from "react-helmet-async";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";
import { BiSearchAlt } from "react-icons/bi";
import { RxReset } from "react-icons/rx";

const Apartments = () => {
    const [minimum, setMinimum] = useState('');
    const [maximum, setMaximum] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPageNumber, setTotalPageNumber] = useState(4);

    const { apartments, isLoading } = useApartments(minimum, maximum, pageNumber, setTotalPageNumber);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pageNumber]);

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

    const handleReset = () => {
        setMinimum('');
        setMaximum('');
        setPageNumber(1);
        document.getElementById('search').reset();
    }

    // generating pagination array [1, 2, ...]
    const pages = Array.from({ length: totalPageNumber }, (_, i) => i + 1);

    return (
        <div className="">
            <Helmet><title>BuildIQ - Find Apartments</title></Helmet>

            {/* Beautiful Page Hero */}
            <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gray-50 border-b border-gray-100">
                <div className="absolute inset-0 bg-[url('https://i.ibb.co.com/PmL2FVy/1.jpg')] bg-cover bg-center bg-no-repeat opacity-[0.03]"></div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-300/10 rounded-full blur-[100px]"></div>

                <Container>
                    <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 font-bold tracking-wider text-xs uppercase mb-2">
                            Available Listings
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            Find Your Perfect <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">
                                Living Space
                            </span>
                        </h1>
                        <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-xl mx-auto">
                            Browse out curated collection of premium apartments, from cozy studios to stunning luxury penthouses.
                        </p>
                    </div>
                </Container>
            </div>

            <Container>
                {/* Floating Search Filter Bar */}
                <div className="relative z-20 -mt-10 mb-16 max-w-4xl mx-auto bg-white rounded-3xl p-4 md:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-gray-100/60 backdrop-blur-xl">
                    <form onSubmit={handleSearch} id='search' className="flex flex-col md:flex-row items-end gap-4 w-full">
                        
                        <div className="flex-1 w-full relative">
                            <label htmlFor="minimum" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                Minimum Rent ($)
                            </label>
                            <input
                                id="minimum"
                                type="number"
                                name="minimum"
                                defaultValue={minimum}
                                placeholder="e.g. 500"
                                className="w-full pl-5 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all shadow-inner"
                                required
                            />
                        </div>

                        <div className="flex-1 w-full relative">
                            <label htmlFor="maximum" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                Maximum Rent ($)
                            </label>
                            <input
                                id="maximum"
                                type="number"
                                name="maximum"
                                defaultValue={maximum}
                                placeholder="e.g. 2000"
                                className="w-full pl-5 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all shadow-inner"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                            <button
                                type="submit"
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-900 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(22,163,74,0.3)] hover:-translate-y-0.5"
                            >
                                <BiSearchAlt size={20} />
                                <span>Find</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex-none flex items-center justify-center p-3.5 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-2xl transition-colors duration-300"
                                aria-label="Reset Filters"
                            >
                                <RxReset size={20} />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Apartment Grid */}
                <div className="min-h-[400px]">
                    {isLoading ? (
                        <div className="pt-20"><LoadingSpinner /></div>
                    ) : (
                        <>
                            {apartments?.result?.length ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                    {apartments.result.map(apartment => (
                                        <ApartmentCard key={apartment._id} apartment={apartment} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-32 text-gray-400">
                                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
                                        <BiSearchAlt size={40} className="text-gray-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">No matches found</h3>
                                    <p className="text-gray-500 font-medium max-w-sm text-center">
                                        We couldn&apos;t find any apartments matching your price range. Try adjusting your filters.
                                    </p>
                                    <button
                                        onClick={handleReset}
                                        className="mt-6 font-bold text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-6 py-2.5 rounded-xl transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Modern Pagination */}
                {!isLoading && apartments?.result?.length > 0 && totalPageNumber > 1 && (
                    <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <p className="text-sm font-semibold text-gray-500">
                            Showing page <span className="font-bold text-gray-900">{pageNumber}</span> of {totalPageNumber}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={pageNumber === 1}
                                onClick={() => setPageNumber(pageNumber - 1)}
                                className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-gray-200 font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <HiArrowLeft size={18} />
                            </button>
                            
                            {/* Page Numbers */}
                            <div className="hidden sm:flex items-center gap-1.5 px-2">
                                {pages.map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setPageNumber(page)}
                                        className={`w-11 h-11 rounded-full text-sm font-bold transition-all shadow-sm ${
                                            pageNumber === page
                                                ? 'bg-green-500 text-white shadow-[0_4px_12px_rgba(34,197,94,0.3)]'
                                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-green-600'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                disabled={pageNumber === totalPageNumber}
                                onClick={() => setPageNumber(pageNumber + 1)}
                                className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-gray-200 font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <HiArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Apartments;