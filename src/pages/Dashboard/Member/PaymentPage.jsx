/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Container from "../../../components/shared/Container";
import { AuthContext } from "../../../providers/AuthProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../../../components/Dashboard/Member/CheckOutForm";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import homeLogo from '../../../assets/images/home.png'

// todo : add publishable key
const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK}`);

const PaymentPage = () => {
    const { paymentInfo, setPaymentInfo } = useContext(AuthContext);
    const [discount, setDiscount] = useState(0);
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    // console.log("now payment info:", paymentInfo);

    const handleApplyCoupon = async (event) => {
        event.preventDefault();

        // reset paymentInfo to default(without discount);
        paymentInfo.discount = (0);
        setDiscount(paymentInfo.discount);
        setPaymentInfo(paymentInfo);
        setIsCouponApplied(false);

        // taking coupon input value
        const coupon = event.target.coupon.value;
        // console.log('coupon:', coupon);
        paymentInfo.coupon = coupon;

        // finding the coupon in the data base
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/coupons/${coupon}`);
        // console.log('coupon find data:', data);
        if (!data) {
            toast.error('Invalid coupon');
            return;
        }
        if (data?.validity === 'Invalid') {
            toast.error('Coupon validity expired!');
            return;
        }
        // calculating discount amount from percentage
        paymentInfo.discount = (data?.discount * paymentInfo?.rent / 100);
        setDiscount(paymentInfo.discount);
        setPaymentInfo(paymentInfo);
        setIsCouponApplied(true);

        // console.log('with coupon payment info:', paymentInfo);
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
                                src={homeLogo}
                                alt="Shoes" />
                        </figure>

                        {/* Coupon */}
                        <form onSubmit={handleApplyCoupon} className="card-body">
                            {/* coupon input field */}
                            <div>
                                <label htmlFor="coupon" className="block text-base font-medium mb-3">Have a Coupon?</label>
                                <input
                                    required
                                    id="coupon"
                                    type="text"
                                    name="coupon"
                                    placeholder="Enter coupon code"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            {/* coupon button */}
                            <div className="mt-1">
                                <button
                                    className="btn btn-sm text-white bg-green-500 hover:bg-green-600">Apply Coupon</button>
                            </div>
                        </form>

                        <div className="card-body">
                            {
                                isCouponApplied === false &&
                                <p className="font-semibold text-xl">Payment Amount: {paymentInfo.rent - discount} $</p>
                            }
                            {
                                isCouponApplied === true &&
                                <div>
                                    <p className="font-semibold text-xl">Payment Amount: <span className="line-through text-red-600" >{paymentInfo.rent} </span>$ </p>
                                    <p className="font-semibold text-xl">Pay Now: {paymentInfo.rent - discount} $</p>
                                </div>


                            }


                        </div>

                        {/* stripe payment */}
                        <div className="card-body">
                            <Elements stripe={stripePromise}>
                                <CheckOutForm></CheckOutForm>
                            </Elements>
                            <Link to='/dashboard/make-payment' className="btn text-white bg-red-500 hover:bg-red-600">Cancel & Go Back</Link>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    );
};

export default PaymentPage;