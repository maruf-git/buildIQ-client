/* eslint-disable react/prop-types */


const MembersTable = ({ members, handleRemoveMember }) => {
    return (
        <div className="p-4">
  <div className="overflow-x-auto shadow-md rounded-lg">
    <table className="table w-full text-center">
      {/* Table Head */}
      <thead className="bg-gray-100 text-gray-800 uppercase text-sm font-semibold">
        <tr>
          <th className="py-3 px-6">#</th>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Email</th>
          <th className="py-3 px-6">Action</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm">
        {members.map((member, idx) => (
          <tr
            key={member._id}
            className={`${
              idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            } hover:bg-gray-100 transition duration-150`}
          >
            {/* Index */}
            <td className="py-3 px-6">{idx + 1}</td>

            {/* Name and Photo */}
            <td className="py-3 px-6">
              <div className="flex justify-center items-center gap-3">
                <div>
                  <div className="font-bold">{member?.name || 'Null'}</div>
                </div>
              </div>
            </td>

            {/* Email */}
            <td className="py-3 px-6">{member?.email}</td>

            {/* Action Button */}
            <td className="py-3 px-6">
              <button
                onClick={() => handleRemoveMember(member.email)}
                className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    );
};

export default MembersTable;