/* eslint-disable react/prop-types */


const RequestsTable = ({ requests }) => {
    console.log(requests);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    {/* head */}
                    <thead className="">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Apartment No</th>
                            <th>Floor No</th>
                            <th>Block</th>
                            <th>Rent</th>
                            <th>Request Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            requests.map((request, idx) => <tr key={request._id}>
                                {/* index */}
                                <td>{idx + 1}</td>
                                {/* requester name */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        {/* <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div> */}

                                        <div className="font-semibold">{request?.name}</div>

                                    </div>
                                </td>
                                {/* email */}
                                <td>
                                    {request?.email}
                                </td>
                                {/* apartment no */}
                                <td>{request?.apartment_no}</td>
                                {/* floor no */}
                                <td>
                                    {request?.floor_no}
                                </td>
                                {/* block no */}
                                <td>
                                    {request?.block_no}
                                </td>
                                {/* rent */}
                                <td>
                                    {request?.rent}$
                                </td>
                                {/* request date */}
                                <td>
                                    {request?.request_date}
                                </td>
                                {/* status */}
                                <td>
                                    {request?.status === "pending" && <p className="text-yellow-500 font-semibold">Pending</p>}
                                    {request?.status === "accepted" && <p className="text-green-500 font-semibold ">Accepted</p>}

                                </td>
                                {/* request action button */}
                                <td>
                                    <div className="flex gap-1 items-center">
                                        {/* accept button  */}
                                        <button className="btn btn-xs bg-green-500 text-white hover:bg-green-600">Accept</button>
                                        {/* reject button */}
                                        <button className="btn btn-xs bg-red-500 text-white hover:bg-red-600">Reject</button>
                                    </div>
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

export default RequestsTable;