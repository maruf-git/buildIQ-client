/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { format } from "date-fns";
import { RxCross2 } from "react-icons/rx";
import { TbSpeakerphone } from "react-icons/tb";

const AnnouncementTable = ({ announcements, handleDeleteAnnouncement }) => {
    const { role } = useContext(AuthContext);
    const [selected, setSelected] = useState(null);

    return (
        <div>
            {/* card grid for small screens, table for md+ */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            {['#', 'Title', 'Description', 'Date', 'Actions'].map(h => (
                                <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 bg-white">
                        {announcements.map((announcement, idx) => (
                            <tr key={announcement._id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                                <td className="px-4 py-3 font-medium text-gray-800">{announcement?.title}</td>
                                <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">
                                    {announcement?.description}
                                </td>
                                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                    {format(new Date(announcement?.date), "MMM d, yyyy")}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setSelected(announcement)}
                                            className="text-xs font-semibold text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-colors duration-200"
                                        >
                                            View
                                        </button>
                                        {role === 'admin' && (
                                            <button
                                                onClick={() => handleDeleteAnnouncement(announcement._id)}
                                                className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors duration-200"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* mobile cards */}
            <div className="md:hidden space-y-3">
                {announcements.map((announcement) => (
                    <div key={announcement._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                                <TbSpeakerphone size={16} className="text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-800 truncate">{announcement?.title}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{format(new Date(announcement?.date), "MMM d, yyyy")}</p>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{announcement?.description}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={() => setSelected(announcement)}
                                className="flex-1 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 py-2 rounded-lg transition-colors"
                            >
                                View Details
                            </button>
                            {role === 'admin' && (
                                <button
                                    onClick={() => handleDeleteAnnouncement(announcement._id)}
                                    className="flex-1 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 py-2 rounded-lg transition-colors"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* details modal */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-900">Announcement</h3>
                            <button
                                onClick={() => setSelected(null)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <RxCross2 size={18} />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <p className="text-lg font-bold text-gray-900">{selected?.title}</p>
                            <p className="text-xs text-gray-400">{format(new Date(selected?.date), "MMMM d, yyyy")}</p>
                            <p className="text-sm text-gray-600 leading-relaxed">{selected?.description}</p>
                        </div>
                        <div className="px-6 pb-5">
                            <button
                                onClick={() => setSelected(null)}
                                className="w-full text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 py-2.5 rounded-lg transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnnouncementTable;