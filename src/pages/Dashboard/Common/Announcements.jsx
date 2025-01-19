import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Announcements = () => {
    const { role } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
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

        const { data } = await axiosSecure.post('/announcements', announcementDetails);
        if (data.insertedId) {
            toast.success('Announcement Successful!');
            event.target.reset();
        } else {
            toast.error('Something Went Wrong! Please try again!');
        }
    }
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
                <p className="text-center font-bold text-3xl">All Announcements</p>
            </div>

        </div>
    );
};

export default Announcements;