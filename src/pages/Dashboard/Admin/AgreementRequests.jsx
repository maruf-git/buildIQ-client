import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import RequestsTable from "../../../components/Dashboard/Admin/RequestsTable";
import toast from "react-hot-toast";

const AgreementRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/requests');
            return data;
        }
    })


    const handleAccept = async (request) => {

        const { data } = await axiosSecure.patch('/update-request', { id: request._id, status: 'accepted' }); //checked
        if (data.modifiedCount) {
            toast.success('Accepted the Request!');
            // load requests again
            refetch();
            // update user role
            await axiosSecure.patch('/update-role', { email: request?.email, role: 'member' });
        }
    }


    const handleReject = async (request) => {
        // update request status
        const { data } = await axiosSecure.patch('/update-request', { id: request._id, status: 'rejected' }); //checked
        if (data.modifiedCount) {
            toast.success('Rejected the Request!');
            // load requests again
            refetch();
        }
    }


    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            <div className="flex justify-between items-center">
                <p>All Requests: {requests.length}</p>
                <p>Pending Requests: {requests.length}</p>
                <p>Accepted Requests: {requests.length}</p>
            </div>
            <div className="my-10">
                <RequestsTable requests={requests} handleAccept={handleAccept} handleReject={handleReject}></RequestsTable>
            </div>
        </div>
    );
};

export default AgreementRequests;