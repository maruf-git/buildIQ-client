import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MembersTable from "../../../components/Dashboard/Admin/MembersTable";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { FaUserGroup } from "react-icons/fa6";

const ManageMembers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: members = [], isLoading, refetch } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/members');
            return data;
        }
    })

    const handleRemoveMember = async (email) => {
        const userDetails = { email, role: "user", deleteApartment: true, apartment_id: '' };
        const { data } = await axiosSecure.patch('/update-role', userDetails);
        if (data.modifiedCount) {
            toast.success('Member removed');
            refetch();
        }
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Helmet><title>BuildIQ - Manage Members</title></Helmet>

            {/* page header */}
            <div className='mb-6'>
                <h1 className='text-2xl font-bold text-gray-900'>Manage Members</h1>
                <p className='text-sm text-gray-500 mt-1'>View and remove building members</p>
            </div>

            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-base font-semibold text-gray-800'>
                    Total Members
                    <span className='ml-2 text-sm font-normal text-gray-400'>({members.length})</span>
                </h2>
            </div>

            {members.length ? (
                <MembersTable members={members} handleRemoveMember={handleRemoveMember} />
            ) : (
                <div className='text-center py-20 text-gray-400'>
                    <FaUserGroup size={40} className='mx-auto mb-3 opacity-30' />
                    <p className='font-medium'>No members yet</p>
                    <p className='text-sm mt-1'>Accepted agreement requests will appear here</p>
                </div>
            )}
        </div>
    );
};

export default ManageMembers;