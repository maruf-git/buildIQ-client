/* eslint-disable react/prop-types */


const MembersTable = ({ members, handleRemoveMember }) => {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            members.map((member, idx) => <tr key={member._id}>
                                {/* indexing */}
                                <td>{idx + 1}</td>
                                {/* name and photo */}
                                <td>
                                    <div className="flex justify-center items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{member?.name || 'Null'}</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>

                                </td>
                                {/* email */}
                                <td>{member?.email}</td>
                                {/* remove button */}
                                <td>
                                    <button
                                        onClick={() => handleRemoveMember(member.email)}
                                        className="btn btn-xs bg-red-500 text-white hover:bg-red-600">Remove
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MembersTable;