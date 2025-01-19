/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

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
            <div>
                <div className="overflow-x-auto">
                    <table className="table text-center">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Announcement Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* rows */}
                            {
                                announcements.map((announcement, idx) => <tr key={announcement._id}>
                                    {/* indexing */}
                                    <td>{idx + 1}</td>
                                    {/* title */}
                                    <td>{announcement?.title}</td>
                                    {/* description */}
                                    <td>{announcement?.description.slice(0, 30)}...</td>
                                    {/* Date */}
                                    <td>{announcement?.date}</td>

                                    {/* actions */}
                                    <td>
                                        <div className="flex gap-5 justify-center">
                                            {/* announcement details button */}
                                            <button
                                                onClick={() => showAnnouncementDetails(announcement)}
                                                className="btn btn-xs bg-green-500 text-white hover:bg-green-600">View Details
                                            </button>

                                            {/* announcement delete button */}
                                            {
                                                role === 'admin' && <button
                                                    onClick={() => handleDeleteAnnouncement(announcement._id)}
                                                    className="btn btn-xs bg-red-500 text-white hover:bg-red-600">Delete
                                                </button>

                                            }
                                        </div>
                                    </td>
                                </tr>)
                            }
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