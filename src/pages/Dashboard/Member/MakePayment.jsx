import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../../../components/Dashboard/Member/CheckOutForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

// todo : add publishable key
const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK}`);

const MakePayment = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: myApartment = [], isLoading } = useQuery({
        queryKey: ['my-apartment'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`my-apartment/${user?.email}`);
            return data;
        }
    })

    console.log("my apartment details:", myApartment);

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;

    return (
        <div>
            {/* payment system */}
            <div className="max-w-screen-lg mx-auto">
                <h1 className="text-2xl font-semibold text-center">Make Payment</h1>
            </div>
            <div className="max-w-screen-lg mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
            {/* my apartment details and payment form */}
        </div>
    );
};

export default MakePayment;