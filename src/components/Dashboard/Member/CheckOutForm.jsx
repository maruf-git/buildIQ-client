import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";


const CheckOutForm = () => {
    const { user, paymentInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');



    // todo:calculate total price of products from cart
    // const totalPrice = 120;
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        if (paymentInfo?.rent) {
            axiosSecure.post('/create-payment-intent', {
                rent: paymentInfo?.rent,
                coupon: paymentInfo?.coupon,
                discount: paymentInfo?.discount
            })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, paymentInfo?.coupon, paymentInfo?.discount, paymentInfo?.rent])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) return;
        // Use your card Element with other Stripe.js APIs
        // paymentMethod
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            toast.error(confirmError.message);
            // console.log('confirm error');
        }
        else {
            // console.log('payment Intent: ', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id: ', paymentIntent.id);

                // now save the  payment in the database
                const payment = {
                    email: paymentInfo?.email,
                    name: paymentInfo?.name,
                    apartment_no: paymentInfo?.apartment_no,
                    floor_no: paymentInfo?.floor_no,
                    block_no: paymentInfo?.block_no,
                    month: paymentInfo?.month,
                    rent: paymentInfo?.rent,
                    amount: paymentInfo?.rent,
                    coupon: paymentInfo?.coupon,
                    discount: paymentInfo?.discount,
                    transactionId: paymentIntent?.id,
                    status: 'paid',
                    date: new Date()
                }

                const res = await axiosSecure.post('/payments', payment);

                if (res.data?.paymentResult?.insertedId) {
                    toast.success("payment successful");
                    navigate('/dashboard/payment-history');
                }
            }
        }
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                {/* <CardElement> */}
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                {/* </CardElement> */}
                <button className="btn btn-primary w-full mt-5" type="submit" disabled={!stripe || !clientSecret}>
                    Pay Now
                </button>

            </form>
        </div>
    );
};

export default CheckOutForm;