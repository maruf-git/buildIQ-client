import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AnnouncementTable from "../../../components/Dashboard/Admin/AnnouncementTable";
import announcementImg from '../../../assets/images/announcement.png'
import { Helmet } from "react-helmet-async";
import { TbSpeakerphone } from "react-icons/tb";

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
        const { data } = await axiosSecure.delete(`/announcements/${id}`);
        if (data.deletedCount) { toast.success('Announcement deleted'); refetch(); }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (role !== 'admin') return;
        const title = event.target.title.value;
        const description = event.target.description.value;
        const { data } = await axiosSecure.post('/announcements', { title, description, date: new Date() });
        if (data.insertedId) {
            toast.success('Announcement posted!');
            refetch();
            event.target.reset();
        } else {
            toast.error('Something went wrong');
        }
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Helmet><title>BuildIQ - Announcements</title></Helmet>

            {/* page header */}
            <div className='mb-6'>
                <h1 className='text-2xl font-bold text-gray-900'>Announcements</h1>
                <p className='text-sm text-gray-500 mt-1'>
                    {role === 'admin' ? 'Post updates and news for all residents' : 'Stay up to date with building news'}
                </p>
            </div>

            {/* admin post form */}
            {role === 'admin' && (
                <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8'>
                    <div className='flex flex-col md:flex-row'>
                        {/* illustration */}
                        <div className='md:w-48 bg-green-50 flex items-center justify-center p-6 shrink-0'>
                            <img className='w-28 object-contain' src={announcementImg} alt='announcement' />
                        </div>
                        {/* form */}
                        <div className='flex-1 p-6'>
                            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Post an Announcement</h2>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                                    <input
                                        id="title" type="text" name="title"
                                        placeholder="Announcement title"
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-green-400 transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                    <textarea
                                        id="description" name="description" rows="3"
                                        placeholder="Write your announcement here..."
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-green-400 transition resize-none"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
                                >
                                    <TbSpeakerphone size={16} />
                                    Post Announcement
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* list */}
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-base font-semibold text-gray-800'>
                    All Announcements
                    <span className='ml-2 text-sm font-normal text-gray-400'>({announcements.length})</span>
                </h2>
            </div>

            {!announcements.length ? (
                <div className='text-center py-20 text-gray-400'>
                    <TbSpeakerphone size={40} className='mx-auto mb-3 opacity-30' />
                    <p className='font-medium'>No announcements yet</p>
                </div>
            ) : (
                <AnnouncementTable announcements={announcements} handleDeleteAnnouncement={handleDeleteAnnouncement} />
            )}
        </div>
    );
};

export default Announcements;