import PaymentHistoryTable from "../../../components/Dashboard/Member/PaymentHistoryTable";


const PaymentHistory = () => {
    return (
        <div>
            <p className="text-3xl font-bold text-center mb-5">Payment History</p>
            {/* payment history table */}
            <div>
                <PaymentHistoryTable></PaymentHistoryTable>
            </div>
        </div>
    );
};

export default PaymentHistory;