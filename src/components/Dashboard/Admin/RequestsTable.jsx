/* eslint-disable react/prop-types */

import { format } from "date-fns";

const RequestsTable = ({ requests, handleAccept, handleReject }) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        {['#', 'Name', 'Email', 'Apt No', 'Floor', 'Block', 'Rent', 'Date', 'Status', 'Action'].map(h => (
                            <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                    {requests.map((request, idx) => (
                        <tr key={request._id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                            <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{request?.name}</td>
                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{request?.email}</td>
                            <td className="px-4 py-3 text-gray-700">{request?.apartment_no}</td>
                            <td className="px-4 py-3 text-gray-700">{request?.floor_no}</td>
                            <td className="px-4 py-3 text-gray-700">{request?.block_no}</td>
                            <td className="px-4 py-3 font-medium text-gray-800">${request?.rent}</td>
                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                {format(new Date(request?.request_date), "MMM d, yyyy")}
                            </td>
                            <td className="px-4 py-3">
                                {request?.status === 'pending' && (
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                                        Pending
                                    </span>
                                )}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleAccept(request)}
                                        className="text-xs font-semibold text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-colors duration-200"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(request)}
                                        className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors duration-200"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestsTable;