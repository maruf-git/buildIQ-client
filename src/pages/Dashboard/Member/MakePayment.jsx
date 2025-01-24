// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckOutForm from "../../../components/Dashboard/Member/CheckOutForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useNavigate } from "react-router-dom";


// todo : add publishable key
// const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK}`);

const MakePayment = () => {
    const { user, setPaymentInfo } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { data: myApartment = [], isLoading } = useQuery({
        queryKey: ['my-apartment'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`my-apartment/${user?.email}`);
            return data;
        }
    })
    // console.log("my apartment details:", myApartment);
    const { name, email, apartment_no, floor_no, block_no, rent } = myApartment;

    const handleSubmit = (event) => {
        event.preventDefault();
        const month = event.target.month.value;
        const paymentInfo = {
            name,
            email,
            apartment_no,
            floor_no,
            block_no,
            rent,
            month,
            coupon:'',
            discount:0
        }
        // console.log(paymentInfo);
        setPaymentInfo(paymentInfo);
        navigate('/payment');
    }

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    return (
        <div>
            {/* payment details form */}
            <div className={`min-h-screen py-10 `}>
                <div className="max-w-3xl mx-auto px-4">
                    <div className={`bg-white shadow-lg rounded-lg overflow-hidden`}>
                        <div className={`py-8 px-6 `}>
                            <h1 className="text-3xl font-bold text-center mb-6 text-green-600">Make Payment</h1>
                            <form onSubmit={handleSubmit} className={`space-y-6 `}>

                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        readOnly
                                        value={name}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>

                                {/* email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        readOnly
                                        value={email}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>

                                {/* apartment no,floor,block */}
                                <div className="flex gap-3 justify-between">
                                    {/* apartment no */}
                                    <div>
                                        <label htmlFor="apartment" className="block text-sm font-medium mb-2">Apartment No</label>
                                        <input
                                            id="apartment"
                                            type="text"
                                            name="apartment"
                                            readOnly
                                            value={apartment_no}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>

                                    {/* floor no */}
                                    <div>
                                        <label htmlFor="floor" className="block text-sm font-medium mb-2">Floor No</label>
                                        <input
                                            id="floor"
                                            type="text"
                                            name="floor"
                                            readOnly
                                            value={floor_no}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>

                                    {/* block */}
                                    <div>
                                        <label htmlFor="block" className="block text-sm font-medium mb-2">Block No</label>
                                        <input
                                            id="block"
                                            type="text"
                                            name="block"
                                            readOnly
                                            value={block_no}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>

                                </div>

                                {/* rent */}
                                <div>
                                    <label htmlFor="rent" className="block text-sm font-medium mb-2">Rent</label>
                                    <input
                                        id="rent"
                                        type="text"
                                        name="rent"
                                        readOnly
                                        value={rent}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>

                                {/* Month */}
                                <div>
                                    <label htmlFor="month" className="block text-sm font-medium mb-2">Month</label>
                                    <select
                                        id="month"
                                        name="month"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    >
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                        <option>April</option>
                                        <option>May</option>
                                        <option>June</option>
                                        <option>July</option>
                                        <option>August</option>
                                        <option>September</option>
                                        <option>October</option>
                                        <option>November</option>
                                        <option>December</option>
                                    </select>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
                                    >
                                        Proceed to Pay
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakePayment;