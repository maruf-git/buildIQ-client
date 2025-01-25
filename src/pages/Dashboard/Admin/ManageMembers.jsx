import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MembersTable from "../../../components/Dashboard/Admin/MembersTable";
import toast from "react-hot-toast";


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
        console.log("member id", email);
        // update role
        const userDetails = { email, role: "user", deleteApartment: true, apartment_id: '' };
        const { data } = await axiosSecure.patch('/update-role', userDetails);
        if (data.modifiedCount) {
            toast.success(`Removed Member!`);
            refetch();
        }
    }


    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <div className="mb-2">
                <p className="text-3xl font-bold text-center  text-green-600">
                    Total Members({members.length})
                </p>
                <div className="mt-2 h-1 w-24 bg-[#4bb32b] mx-auto rounded"></div>
            </div>
            {
                !members.length && <p className="text-center font-semibold text-2xl my-20">No Members Yet!</p>
            }
            {
                members.length && <div>
                    <MembersTable members={members} handleRemoveMember={handleRemoveMember}></MembersTable>
                </div>
            }
        </div>
    );
};

export default ManageMembers;