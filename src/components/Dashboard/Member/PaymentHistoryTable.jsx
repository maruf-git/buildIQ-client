import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

/* eslint-disable react/prop-types */
const PaymentHistoryTable = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments-history'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payments-history/${user?.email}`);
            return data;
        }
    })

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    {/* head */}
                    <thead className="">
                        <tr>
                            {/* <th>#</th>
                            <th>Name</th>
                            <th>Email</th> */}
                            <th>Apartment No</th>
                            <th>Floor No</th>
                            <th>Block</th>
                            <th>Month</th>
                            <th>Rent</th>
                            <th>Discount</th>
                            <th>Paid Amount</th>
                            <th>Status</th>
                            <th>Payment Date</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            payments.map((payment, idx) => <tr key={payment._id}>


                                {/* apartment no */}
                                <td>{payment?.apartment_no}</td>
                                {/* floor no */}
                                <td>
                                    {payment?.floor_no}
                                </td>
                                {/* block no */}
                                <td>
                                    {payment?.block_no}
                                </td>
                                {/* Month  */}
                                <td>
                                    {payment?.month}
                                </td>
                                {/* rent */}
                                <td>
                                    {payment?.rent}$
                                </td>
                                {/* discount */}
                                <td>
                                    {payment?.coupon_value}$
                                </td>
                                {/* paid amount  */}
                                <td>
                                    {payment?.amount}$
                                </td>
                                {/* status */}
                                <td>
                                    {payment?.status}
                                </td>
                                {/* Date */}
                                <td>
                                    {payment?.date}
                                </td>
                                {/* transaction id */}
                                <td>
                                    {payment?.transactionId}
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistoryTable;