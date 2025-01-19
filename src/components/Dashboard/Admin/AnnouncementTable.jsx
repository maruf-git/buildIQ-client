/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const AnnouncementTable = ({ announcements, handleDeleteAnnouncement }) => {
    const { role } = useContext(AuthContext);
    return (
        <div>
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
        </div >
    );
};

export default AnnouncementTable;