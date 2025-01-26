import { format } from 'date-fns';

/* eslint-disable react/prop-types */
const PaymentHistoryTable = ({ payments }) => {
    

    return (
        <div className="p-4">
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="table w-full text-center">
                    {/* Table Head */}
                    <thead className="bg-gray-100 text-gray-800 uppercase text-sm font-semibold">
                        <tr>
                            <th className="py-3 px-6">#</th>
                            <th className="py-3 px-6">Apartment No</th>
                            <th className="py-3 px-6">Floor No</th>
                            <th className="py-3 px-6">Block</th>
                            <th className="py-3 px-6">Month</th>
                            <th className="py-3 px-6">Rent</th>
                            <th className="py-3 px-6">Discount</th>
                            <th className="py-3 px-6">Paid Amount</th>
                            <th className="py-3 px-6">Status</th>
                            <th className="py-3 px-6">Payment Date</th>
                            <th className="py-3 px-6">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {payments.map((payment, idx) => (
                            <tr
                                key={payment._id}
                                className={`${payments.indexOf(payment) % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } hover:bg-gray-100 transition duration-150`}
                            >
                                {/* Index */}
                                <td className="py-3 px-6">{idx + 1}</td>

                                {/* Apartment No */}
                                <td className="py-3 px-6">{payment?.apartment_no}</td>

                                {/* Floor No */}
                                <td className="py-3 px-6">{payment?.floor_no}</td>

                                {/* Block No */}
                                <td className="py-3 px-6">{payment?.block_no}</td>

                                {/* Month */}
                                <td className="py-3 px-6">{payment?.month}</td>

                                {/* Rent */}
                                <td className="py-3 px-6">{payment?.rent}$</td>

                                {/* Discount */}
                                <td className="py-3 px-6">{payment?.discount}$</td>

                                {/* Paid Amount */}
                                <td className="py-3 px-6">{payment?.amount}$</td>

                                {/* Status */}
                                <td className="py-3 px-6">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${payment?.status === 'paid'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-yellow-100 text-yellow-600'
                                            }`}
                                    >
                                        {payment?.status}
                                    </span>
                                </td>

                                {/* Payment Date */}
                                
                                <td className="py-3 px-6">{format(new Date(payment?.date), "MMM d, yyyy")}</td>

                                {/* Transaction ID */}
                                <td className="py-3 px-6">{payment?.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default PaymentHistoryTable;