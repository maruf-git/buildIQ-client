/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Container from "../../../components/shared/Container";
import { AuthContext } from "../../../providers/AuthProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../../../components/Dashboard/Member/CheckOutForm";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// todo : add publishable key
const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK}`);

const PaymentPage = () => {
    const { paymentInfo, setPaymentInfo } = useContext(AuthContext);
    const [couponValue, setCouponValue] = useState(0);
    console.log("now payment info:", paymentInfo);

    const handleApplyCoupon = (event) => {
        event.preventDefault();
        const coupon = event.target.coupon.value;
        console.log('coupon:', coupon);
        paymentInfo.coupon = coupon;
        paymentInfo.coupon_value = 200;
        setCouponValue(200);
        setPaymentInfo(paymentInfo);
        console.log('with coupon payment info:', paymentInfo);
        toast.success('Coupon Applied!');
    }

    return (
        <div className="">
            <Container>
                <div className="min-h-[100vh] flex justify-center items-center">
                    <div className="card card-compact bg-base-100 w-[450px] shadow-xl ">
                        <figure>
                            <img
                                className="w-full h-[200px] object-cover"
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes" />
                        </figure>

                        {/* Coupon */}
                        <form onSubmit={handleApplyCoupon} className="card-body">
                            {/* coupon input field */}
                            <div>
                                <label htmlFor="coupon" className="block text-base font-medium mb-3">Have a Coupon?</label>
                                <input
                                    id="coupon"
                                    type="text"
                                    name="coupon"
                                    placeholder="Enter coupon code"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* coupon button */}
                            <div className="mt-1">
                                <button
                                    className="btn btn-sm btn-primary">Apply Coupon</button>
                            </div>
                        </form>

                        <div className="card-body">
                            <p className="font-semibold text-xl">Payment Amount: {paymentInfo.rent - couponValue} $</p>
                        </div>

                        {/* stripe payment */}
                        <div className="card-body">
                            <Elements stripe={stripePromise}>
                                <CheckOutForm></CheckOutForm>
                            </Elements>
                            <Link to='/dashboard/make-payment' className="btn btn-primary">Cancel & Go Back</Link>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    );
};

export default PaymentPage;