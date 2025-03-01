import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import RequestsTable from "../../../components/Dashboard/Admin/RequestsTable";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

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
            await axiosSecure.patch('/update-role', { email: request?.email, role: 'member', apartment_id: request?.apartment_id });
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
            {/* helmet */}
            <Helmet>
                <title>BuildIQ - Agreement Requests</title>
            </Helmet>
            <div className="mb-2">
                <p className="text-3xl font-bold text-center  text-green-600">
                    All Requests({requests.length})
                </p>
                <div className="mt-2 h-1 w-24 bg-[#4bb32b] mx-auto rounded"></div>
            </div>
            {
                requests.length ? <div className="mb-10">
                    <RequestsTable requests={requests} handleAccept={handleAccept} handleReject={handleReject}></RequestsTable>
                </div> :
                    <p className="text-center font-semibold text-2xl my-20">No Requests Yet!</p>
            }
        </div>
    );
};

export default AgreementRequests;