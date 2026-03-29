import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import RequestsTable from "../../../components/Dashboard/Admin/RequestsTable";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { TbClipboardList } from "react-icons/tb";

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
        const { data: ApartmentStatus } = await axiosSecure.get(`/apartment-status/${request?.apartment_id}`)
        if (!ApartmentStatus?.isAvailable) {
            toast.error('Apartment already allocated to another user!');
            return;
        }
        await axiosSecure.patch('/update-request', { id: request._id, status: 'checked' });
        const { data } = await axiosSecure.patch(`/allocate-apartment/${request?.apartment_id}`, { booking_status: 'unavailable' });
        if (data.modifiedCount) {
            toast.success('Request accepted!');
            refetch();
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
            await axiosSecure.patch('/update-role', { email: request?.email, role: 'member', apartment_id: request?.apartment_id });
        }
    }

    const handleReject = async (request) => {
        const { data } = await axiosSecure.patch('/update-request', { id: request._id, status: 'checked' });
        if (data?.modifiedCount) {
            toast.success('Request rejected');
            refetch();
        }
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Helmet><title>BuildIQ - Agreement Requests</title></Helmet>

            {/* page header */}
            <div className='mb-6'>
                <h1 className='text-2xl font-bold text-gray-900'>Agreement Requests</h1>
                <p className='text-sm text-gray-500 mt-1'>Review and respond to pending apartment requests</p>
            </div>

            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-base font-semibold text-gray-800'>
                    All Requests
                    <span className='ml-2 text-sm font-normal text-gray-400'>({requests.length})</span>
                </h2>
            </div>

            {requests.length ? (
                <RequestsTable requests={requests} handleAccept={handleAccept} handleReject={handleReject} />
            ) : (
                <div className='text-center py-20 text-gray-400'>
                    <TbClipboardList size={40} className='mx-auto mb-3 opacity-30' />
                    <p className='font-medium'>No pending requests</p>
                    <p className='text-sm mt-1'>New requests will appear here</p>
                </div>
            )}
        </div>
    );
};

export default AgreementRequests;