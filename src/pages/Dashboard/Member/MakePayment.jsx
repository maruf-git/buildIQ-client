import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../../../components/Dashboard/Member/CheckOutForm";

// todo : add publishable key
const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK}`);

const MakePayment = () => {
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
    </div>
    );
};

export default MakePayment;