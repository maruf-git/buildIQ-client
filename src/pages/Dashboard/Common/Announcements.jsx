import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AnnouncementTable from "../../../components/Dashboard/Admin/AnnouncementTable";

const Announcements = () => {
    const { role } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: announcements = [], isLoading, refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/announcements`);
            return data;
        }
    })

    const handleDeleteAnnouncement = async (id) => {
        const { data } = await axiosSecure.delete( `/announcements/${id}`);
        if (data.deletedCount) {
            toast.success('Deleted the Announcement!');
            refetch();
        }
    }

    // handle announcement form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (role !== 'admin') return;
        const title = event.target.title.value;
        const description = event.target.description.value;
        const announcementDetails = {
            title,
            description,
            date: new Date()
        }
        // save the announcement to the database
        const { data } = await axiosSecure.post('/announcements', announcementDetails);
        if (data.insertedId) {
            toast.success('Announcement Successful!');
            refetch();
            event.target.reset();
        } else {
            toast.error('Something Went Wrong! Please try again!');
        }
    }
    if (isLoading) <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            {/* announcement form */}
            {
                role === 'admin' &&
                <div className={`mb-10`}>
                    <div className="max-w-2xl mx-auto px-4">
                        <div className={`bg-white shadow-lg rounded-lg overflow-hidden`}>
                            <div className={`py-8 px-6 `}>
                                <h1 className="text-3xl font-semibold text-center mb-6">Make Announcement</h1>
                                {/* form */}
                                <form onSubmit={handleSubmit} className={`space-y-6 `}>
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                                        <input
                                            id="title"
                                            type="text"
                                            name="title"
                                            placeholder="Enter announcement title"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    {/* Coupon Description */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium mb-3">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows="5"
                                            placeholder="Write your announcement here"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                                        >
                                            Announce
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {/* Announcements */}
            <div>
                <p className="text-center font-bold text-3xl mb-5">All Announcements</p>
                {/* announcement table */}
                <div>
                    <AnnouncementTable announcements={announcements} handleDeleteAnnouncement={handleDeleteAnnouncement}></AnnouncementTable>
                </div>
            </div>

        </div>
    );
};

export default Announcements;