import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { TbHome, TbHomeCheck, TbHomeOff } from "react-icons/tb";
import { FaUser, FaUserCheck } from "react-icons/fa";


const AdminProfile = () => {
    const axiosSecure = useAxiosSecure()
    const { data: statistics = [], isLoading } = useQuery({
        queryKey: ['statistics'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/statistics');
            return data;
        }
    })

    console.log('statistics:', statistics);
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="mt-10">
            {/* total apartments, available and unavailable percentage */}
            <div className="grid grid-cols-3 gap-5">
                {/* total apartments */}
                <div className="w-full border rounded-lg shadow-md flex justify-center items-center total-apartments text-white">
                    <div className="w-full flex justify-between items-center   px-5 py-10">
                        <TbHome size={70} />
                        <div className="flex flex-col gap-3">
                            <p className="text-6xl font-bold"> {statistics?.totalApartments}</p>
                            <p className="text-2xl">Total Apartments</p>
                        </div>
                    </div>
                </div>
                {/* available apartments */}
                <div className="w-full border rounded-lg shadow-md flex justify-center items-center available-apartments text-white">
                    <div className="w-full flex justify-between items-center px-5 py-10">
                        {/* <GrHome size={70} className="" /> */}
                        <TbHomeCheck size={70} />
                        <div className="flex flex-col gap-3">
                            <p className="text-6xl font-bold"> {statistics?.availablePercentage}%</p>
                            <p className="text-2xl">Available Apartments</p>
                        </div>
                    </div>
                </div>
                {/* unavailable apartments */}
                <div className="w-full border rounded-lg shadow-md flex justify-center items-center unavailable-apartments text-white">
                    <div className="w-full flex justify-between items-center px-5 py-10">
                        <TbHomeOff size={70} />
                        <div className="flex flex-col gap-3">
                            <p className="text-6xl font-bold"> {statistics?.unavailablePercentage}%</p>
                            <p className="text-2xl">Unavailable Apartments</p>
                        </div>
                    </div>
                </div>
                {/* total Users */}
                <div className="w-full border rounded-lg shadow-md flex justify-center items-center users text-white">
                    <div className="w-full flex justify-between items-center px-5 py-10">
                        {/* <FaRegUser size={65} /> */}
                        <FaUser size={60} />
                        <div className="flex flex-col gap-3">
                            <p className="text-6xl font-bold"> {statistics?.totalUsers}</p>
                            <p className="text-2xl">Total Users</p>
                        </div>
                    </div>
                </div>
                {/* total Members */}
                <div className="w-full border rounded-lg shadow-md flex justify-center items-center members text-white">
                    <div className="w-full flex justify-between items-center px-5 py-10">
                        {/* <FaRegUser size={65} /> */}
                        <FaUserCheck size={70} />
                        <div className="flex flex-col gap-3">
                            <p className="text-6xl font-bold"> {statistics?.totalMembers}</p>
                            <p className="text-2xl">Total Members</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;