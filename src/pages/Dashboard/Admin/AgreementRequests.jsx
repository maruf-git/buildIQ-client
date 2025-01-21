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

        // check if the room available or not
        const { data: ApartmentStatus } = await axiosSecure.get(`/apartment-status/${request?.apartment_id}`)
        if (!ApartmentStatus?.isAvailable) {
            toast.error('Can not Accept! You have already allocated the Apartment to a user!');
            return;
        }
        // check mark the request
        await axiosSecure.patch('/update-request', { id: request._id, status: 'checked' }); //checked
        // if the room is available then allocate the room and set the room status unavailable
        const { data } = await axiosSecure.patch(`/allocate-apartment/${request?.apartment_id}`, { booking_status: 'unavailable' });

        if (data.modifiedCount) {
            toast.success('Accepted the Request!');
            // load requests again
            refetch();
            // save the accepted request details to the accepted requests collection
            const acceptedRequest = {
                apartment_id: request.apartment_id,
                apartment_no: request.apartment_no,
                floor_no: request.floor_no,
                block_no: request.block_no,
                rent: request.rent,
                apartment_image: request.apartment_image,
                name: request.name,
                email: request.email,
                request_date: request.request_date,
                status: 'accepted',
                accept_date: new Date(),
                request_id: request._id
            }
            await axiosSecure.post('/accepted-requests', acceptedRequest);
            // update user role
            await axiosSecure.patch('/update-role', { email: request?.email, role: 'member',apartment_id:request?.apartment_id });
        }
    }


    const handleReject = async (request) => {
        // update request status
        const { data } = await axiosSecure.patch('/update-request', { id: request._id, status: 'checked' }); //checked
        if (data?.modifiedCount) {
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