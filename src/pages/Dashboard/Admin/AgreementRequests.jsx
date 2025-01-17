import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import RequestsTable from "../../../components/Dashboard/Admin/RequestsTable";

const AgreementRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/requests');
            return data;
        }
    })
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    
    return (
        <div>
            <div className="flex justify-between items-center">
                <p>All Requests: {requests.length}</p>
                <p>Pending Requests: {requests.length}</p>
                <p>Accepted Requests: {requests.length}</p>
            </div>
            <div className="my-10">
                <RequestsTable requests={requests}></RequestsTable>
            </div>
        </div>
    );
};

export default AgreementRequests;