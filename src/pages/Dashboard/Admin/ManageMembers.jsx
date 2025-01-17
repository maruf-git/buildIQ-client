import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageMembers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: members = [], isLoading } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const {data}=await axiosSecure.get('/members');
            return data;
        }
    })
    console.log('total members:',members);

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            Manage Members
        </div>
    );
};

export default ManageMembers;