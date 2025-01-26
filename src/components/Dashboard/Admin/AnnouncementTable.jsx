/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { format } from "date-fns";

const AnnouncementTable = ({ announcements, handleDeleteAnnouncement }) => {
    const { role } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const showAnnouncementDetails = (announcement) => {
        document.getElementById('announcement-modal').showModal()
        setTitle(announcement?.title);
        setDescription(announcement?.description);
    }
    return (
        <div>
            {/* announcement table */}
            <div className="p-4">
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="table w-full text-center">
                        {/* Table Head */}
                        <thead className="bg-gray-100 text-gray-800 uppercase text-sm font-semibold">
                            <tr>
                                <th className="py-3 px-6">#</th>
                                <th className="py-3 px-6">Title</th>
                                <th className="py-3 px-6">Description</th>
                                <th className="py-3 px-6">Announcement Date</th>
                                <th className="py-3 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {announcements.map((announcement, idx) => (
                                <tr
                                    key={announcement._id}
                                    className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                        } hover:bg-gray-100 transition duration-150`}
                                >
                                    {/* Index */}
                                    <td className="py-3 px-6">{idx + 1}</td>

                                    {/* Title */}
                                    <td className="py-3 px-6 font-semibold">{announcement?.title}</td>

                                    {/* Description */}
                                    <td className="py-3 px-6">
                                        {announcement?.description.slice(0, 30)}...
                                    </td>

                                    {/* Announcement Date */}
                                    <td className="py-3 px-6">{format(new Date(announcement?.date), "MMM d, yyyy")}</td>

                                    {/* Actions */}
                                    <td className="py-3 px-6">
                                        <div className="flex gap-3 justify-center">
                                            {/* View Details Button */}
                                            <button
                                                onClick={() => showAnnouncementDetails(announcement)}
                                                className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                                            >
                                                View Details
                                            </button>

                                            {/* Delete Button (Admin Only) */}
                                            {role === 'admin' && (
                                                <button
                                                    onClick={() => handleDeleteAnnouncement(announcement._id)}
                                                    className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
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
            </div>

            {/* announcement details modal */}
            <div>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="announcement-modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div>
                            <p className="text-2xl mb-2"> <span className="text-2xl font-semibold">Title:</span> {title}</p>
                            <p className="text-2xl font-semibold">Description:</p>
                            <p>{description}</p>
                        </div>
                    </div>
                </dialog>
            </div>
        </div >
    );
};

export default AnnouncementTable;