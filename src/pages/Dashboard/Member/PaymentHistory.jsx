import { useContext } from "react";
import PaymentHistoryTable from "../../../components/Dashboard/Member/PaymentHistoryTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { IoCashOutline } from "react-icons/io5";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments-history'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payments-history/${user?.email}`);
            return data;
        }
    })

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <Helmet><title>BuildIQ - Payment History</title></Helmet>

            {/* page header */}
            <div className='mb-6'>
                <h1 className='text-2xl font-bold text-gray-900'>Payment History</h1>
                <p className='text-sm text-gray-500 mt-1'>View all your past rent payments</p>
            </div>

            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-base font-semibold text-gray-800'>
                    All Payments
                    <span className='ml-2 text-sm font-normal text-gray-400'>({payments.length})</span>
                </h2>
            </div>

            {payments.length ? (
                <PaymentHistoryTable payments={payments} />
            ) : (
                <div className='text-center py-20 text-gray-400'>
                    <IoCashOutline size={40} className='mx-auto mb-3 opacity-30' />
                    <p className='font-medium'>No payments yet</p>
                    <p className='text-sm mt-1'>Your rent payments will appear here</p>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;