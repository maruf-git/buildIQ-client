import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { TbHome, TbHomeCheck, TbHomeOff } from "react-icons/tb";
import { FaUser, FaUserCheck } from "react-icons/fa";
import ContentLoadingSpinner from "../../Shared/ContentLoadingSpinner";

const StatCard = ({ icon: Icon, label, value, className }) => (
    <div className={`rounded-2xl p-6 text-white flex items-center justify-between shadow-sm ${className}`}>
        <div>
            <p className='text-4xl font-extrabold tracking-tight'>{value}</p>
            <p className='text-sm font-medium opacity-90 mt-1'>{label}</p>
        </div>
        <div className='opacity-80'>
            <Icon size={48} />
        </div>
    </div>
);

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure()
    const { data: statistics = [], isLoading } = useQuery({
        queryKey: ['statistics'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/statistics');
            return data;
        }
    })

    if (isLoading) return <div className="py-12"><ContentLoadingSpinner /></div>

    return (
        <div>
            <h3 className='text-base font-semibold text-gray-900 mb-4'>Building Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                    icon={TbHome}
                    label="Total Apartments"
                    value={statistics?.totalApartments}
                    className="total-apartments"
                />
                <StatCard
                    icon={TbHomeCheck}
                    label="Available"
                    value={`${statistics?.availablePercentage}%`}
                    className="available-apartments"
                />
                <StatCard
                    icon={TbHomeOff}
                    label="Unavailable"
                    value={`${statistics?.unavailablePercentage}%`}
                    className="unavailable-apartments"
                />
                <StatCard
                    icon={FaUser}
                    label="Total Users"
                    value={statistics?.totalUsers}
                    className="users"
                />
                <StatCard
                    icon={FaUserCheck}
                    label="Total Members"
                    value={statistics?.totalMembers}
                    className="members"
                />
            </div>
        </div>
    );
};

export default AdminProfile;