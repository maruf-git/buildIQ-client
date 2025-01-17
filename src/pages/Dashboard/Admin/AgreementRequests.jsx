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

    // update request status in database
    const updateStatus = async (id, status) => {
        const { data } =await axiosSecure.patch('/update-request', { id, status });
        console.log("update status:", data);
        if (data.modifiedCount) {
            if (status === 'accepted') {
                toast.success('Request Accepted!');
            }
            else {
                toast.error('Request Rejected!');
            }
            refetch();
        }
    }

    const handleAccept = (request) => {
        updateStatus(request._id, 'accepted');
    }

    const handleReject = (request) => {
        updateStatus(request._id, 'rejected');
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