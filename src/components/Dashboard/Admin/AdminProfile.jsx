import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { TbHome, TbHomeCheck, TbHomeOff } from "react-icons/tb";
import { FaUser, FaUserCheck } from "react-icons/fa6";
import ContentLoadingSpinner from "../../Shared/ContentLoadingSpinner";

const StatCard = ({ icon: Icon, label, value, gradientFrom, gradientTo, glowColor }) => (
    <div className='relative group bg-white rounded-[24px] p-6 lg:p-8 border border-gray-100/80 shadow-[0_12px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden hover:-translate-y-1'>
        
        {/* Soft Background Glow Mesh */}
        <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
        <div className={`absolute -left-10 -bottom-10 w-32 h-32 bg-gradient-to-tr ${gradientFrom} ${gradientTo} rounded-full blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity duration-500`}></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            {/* Value & Label */}
            <div>
                <p className='text-[13px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2'>{label}</p>
                <div className='flex items-baseline gap-1'>
                    <p className='text-4xl md:text-5xl font-black text-gray-900 tracking-tight'>{value}</p>
                </div>
            </div>

            {/* Icon Block */}
            <div className='shrink-0'>
                <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-lg ${glowColor} border border-white/20 group-hover:scale-110 transition-transform duration-500`}>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Icon size={28} className='text-white drop-shadow-sm relative z-10' />
                </div>
            </div>
            
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

    if (isLoading) return <div className="py-20"><ContentLoadingSpinner /></div>

    return (
        <div className="">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <h3 className='text-2xl font-black text-gray-900 tracking-tight'>Command Center</h3>
                    <p className='text-sm font-medium text-gray-500 mt-1 flex items-center gap-2'>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        System metrics updating in real-time
                    </p>
                </div>
                <button className="text-sm font-bold text-gray-600 bg-white border border-gray-200 px-5 py-2.5 rounded-xl hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm transition-all">
                    Export Report
                </button>
            </div>

            {/* Top Tier Metrics (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <StatCard
                    icon={TbHome}
                    label="Total Apartments"
                    value={statistics?.totalApartments || 0}
                    gradientFrom="from-blue-500"
                    gradientTo="to-indigo-600"
                    glowColor="shadow-blue-500/30"
                />
                <StatCard
                    icon={FaUser}
                    label="Total Registered Users"
                    value={statistics?.totalUsers || 0}
                    gradientFrom="from-purple-500"
                    gradientTo="to-fuchsia-600"
                    glowColor="shadow-purple-500/30"
                />
            </div>

            {/* Second Tier Metrics (3 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <StatCard
                    icon={TbHomeCheck}
                    label="Available Units"
                    value={`${statistics?.availablePercentage || 0}%`}
                    gradientFrom="from-emerald-400"
                    gradientTo="to-green-600"
                    glowColor="shadow-green-500/30"
                />
                <StatCard
                    icon={TbHomeOff}
                    label="Rented Units"
                    value={`${statistics?.unavailablePercentage || 0}%`}
                    gradientFrom="from-rose-500"
                    gradientTo="to-red-600"
                    glowColor="shadow-red-500/30"
                />
                <StatCard
                    icon={FaUserCheck}
                    label="Active Members"
                    value={statistics?.totalMembers || 0}
                    gradientFrom="from-amber-400"
                    gradientTo="to-orange-500"
                    glowColor="shadow-orange-500/30"
                />
            </div>
            
            {/* Optional Chart Placeholder for visual weight */}
            {/* <div className="mt-5 bg-white rounded-[24px] p-6 lg:p-8 border border-gray-100/80 shadow-[0_12px_30px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 tracking-tight">Occupancy Trends</h4>
                        <p className="text-sm font-medium text-gray-400 mt-0.5">Monthly overview of building capacity.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500 border border-white"></span>
                        <span className="w-3 h-3 rounded-full border border-gray-300"></span>
                        <span className="w-3 h-3 rounded-full border border-gray-300"></span>
                    </div>
                </div>
                Decorative Chart Graph
                <div className="h-48 w-full flex items-end gap-2 sm:gap-4 pt-4">
                    {[40, 60, 45, 80, 55, 90, 75, 100, 85, 95, 60, 40].map((height, i) => (
                        <div key={i} className="relative flex-1 bg-gray-50 rounded-t-lg overflow-hidden group">
                           <div 
                             className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                             style={{ height: `${height}%` }}
                           ></div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest px-2">
                    <span>Jan</span>
                    <span>Jun</span>
                    <span>Dec</span>
                </div>
            </div> */}
        </div>
    );
};

export default AdminProfile;