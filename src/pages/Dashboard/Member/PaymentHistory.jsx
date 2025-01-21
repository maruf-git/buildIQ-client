import { useContext } from "react";
import PaymentHistoryTable from "../../../components/Dashboard/Member/PaymentHistoryTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

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

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    return (
        <div>
            <div className="mb-2">
                    <p className="text-3xl font-bold text-center  text-[#4bb32b]">
                        Payments History({payments.length})
                    </p>
                    <div className="mt-2 h-1 w-24 bg-[#4bb32b] mx-auto rounded"></div>
                </div>
            {/* payment history table */}
            <div>
                <PaymentHistoryTable payments={payments}></PaymentHistoryTable>
            </div>
        </div>
    );
};

export default PaymentHistory;