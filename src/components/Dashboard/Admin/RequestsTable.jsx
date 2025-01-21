/* eslint-disable react/prop-types */


const RequestsTable = ({ requests, handleAccept, handleReject }) => {

    return (
        <div className="p-4">
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="table w-full text-center">
                    {/* Head */}
                    <thead className="bg-gray-100 text-gray-800 uppercase text-sm font-semibold">
                        <tr>
                            <th className="py-3 px-6">#</th>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Apartment No</th>
                            <th className="py-3 px-6">Floor No</th>
                            <th className="py-3 px-6">Block</th>
                            <th className="py-3 px-6">Rent</th>
                            <th className="py-3 px-6">Request Date</th>
                            <th className="py-3 px-6">Status</th>
                            <th className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {/* Rows */}
                        {requests.map((request, idx) => (
                            <tr
                                key={request._id}
                                className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } hover:bg-gray-100 transition duration-150`}
                            >
                                <td className="py-3 px-6">{idx + 1}</td>
                                <td className="py-3 px-6">
                                    <div className="flex items-center gap-3">
                                        {/* Optionally add avatar back */}
                                        <div className="font-semibold">{request?.name}</div>
                                    </div>
                                </td>
                                <td className="py-3 px-6">{request?.email}</td>
                                <td className="py-3 px-6">{request?.apartment_no}</td>
                                <td className="py-3 px-6">{request?.floor_no}</td>
                                <td className="py-3 px-6">{request?.block_no}</td>
                                <td className="py-3 px-6">{request?.rent}$</td>
                                <td className="py-3 px-6">{request?.request_date}</td>
                                <td className="py-3 px-6">
                                    {request?.status === 'pending' && (
                                        <span className="text-yellow-500 font-semibold">Pending</span>
                                    )}
                                    {/* Uncomment this for other statuses */}
                                    {/* {request?.status === 'checked' && (
                <span className="text-green-500 font-semibold">Checked</span>
              )} */}
                                </td>
                                <td className="py-3 px-6">
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleAccept(request)}
                                            className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(request)}
                                            className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
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
        </div>

    );
};

export default RequestsTable;