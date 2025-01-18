import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const CheckOutForm = () => {
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');

    // todo:calculate total price of products from cart
    const totalPrice = 120;
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        if (totalPrice) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) return;
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
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
            console.log('confirm error');
        }
        else {
            console.log('payment Intent: ', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id: ', paymentIntent.id);
                setTransactionId(paymentIntent.id);


                // now save the  payment in the database

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // todo: convert it utc date. use moment js to convert
                    cartIds: [], // todo : map the carts cart.map(item=>item._id)
                    menuItemIds: [], // todo: cart.map(item=> item.menuId)
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved:', res);

                // todo refetch cart here

                if (res.data?.paymentResult?.insertedId) {
                    toast.success("payment successful");
                }
            }
        }
    }

    return (
        <div className="border border-red-500">
            <form onSubmit={handleSubmit}>
                <CardElement>
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
                </CardElement>
                <button className="btn btn-primary btn-sm mt-3" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>

                {/* display error or success */}
                <p className="text-red-600">display error message here</p>

                {transactionId &&
                    <p className="text-green-600">Your Transaction id:{transactionId}</p>
                }

            </form>
        </div>
    );
};

export default CheckOutForm;