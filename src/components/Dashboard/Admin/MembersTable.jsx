/* eslint-disable react/prop-types */

const MembersTable = ({ members, handleRemoveMember }) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        {['#', 'Member', 'Email', 'Action'].map(h => (
                            <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                    {members.map((member, idx) => (
                        <tr key={member._id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    {/* avatar initials */}
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 font-semibold text-xs flex items-center justify-center shrink-0">
                                        {(member?.name || 'M').charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-medium text-gray-800">{member?.name || '—'}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-gray-500">{member?.email}</td>
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => handleRemoveMember(member.email)}
                                    className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors duration-200"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MembersTable;