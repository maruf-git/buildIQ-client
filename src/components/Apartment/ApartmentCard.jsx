/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdOutlineEventAvailable } from "react-icons/md";
import { LuLayers } from "react-icons/lu";
import { TbBuildingCommunity } from "react-icons/tb";

const ApartmentCard = ({ apartment }) => {
    const { apartment_image, apartment_no, floor_no, block_no, rent, _id, booking_status } = apartment;
    const { user, role, setRole } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const isAvailable = booking_status !== 'unavailable';

    const handleRequestAgreement = async () => {
        const requestDetails = {
            apartment_id: _id,
            apartment_no,
            floor_no,
            block_no,
            rent,
            apartment_image,
            name: user?.displayName,
            email: user?.email,
            status: 'pending',
            request_date: new Date(),
        }
        if (user) {
            if (role === 'admin') { toast.error('Admin can not request for apartments!'); return; }
            if (role === 'member') { toast.error('You are already a member. Can not request for more apartments!'); return; }
            const { data } = await axiosSecure.post('/request-apartment', requestDetails)
            if (data?.insertedId) toast.success('Request Sent! Please wait for confirmation.');
            else if (data?.message === 'already user') { toast.error('You already have an apartment.'); setRole('member'); }
            else if (data?.message === 'already requested') toast.error('You already have a pending request.');
            else if (data?.message === 'no-apartment') toast.error('Apartment not found!');
            else if (data?.message === 'unavailable') toast.error('This apartment is already booked!');
        } else {
            toast.error('Please login to request an apartment.');
            navigate('/login');
        }
    }

    return (
        <div className="group relative flex flex-col bg-white rounded-[24px] border border-gray-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(22,163,74,0.08)] hover:-translate-y-1 transition-all duration-400 overflow-hidden">
            
            {/* Image Container with Zoom effect */}
            <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <img
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    src={apartment_image}
                    alt={`Apartment ${apartment_no}`}
                    loading="lazy"
                />
                
                {/* Gradient Overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent pointer-events-none" />

                {/* Status Badge */}
                <span className={`absolute top-4 right-4 text-xs font-bold tracking-wide px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm border ${
                    isAvailable
                        ? 'bg-green-500/90 text-white border-white/20'
                        : 'bg-red-500/90 text-white border-white/20'
                }`}>
                    {isAvailable ? 'AVAILABLE' : 'BOOKED'}
                </span>

                {/* Info over image (Price & Apt No) */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                        <p className="text-white/80 text-sm font-medium mb-1 drop-shadow-md">Apartment</p>
                        <h3 className="text-white text-3xl font-extrabold tracking-tight drop-shadow-lg">
                            {apartment_no}
                        </h3>
                    </div>
                    <div className="bg-white/95 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-lg border border-white/50">
                        <span className="text-2xl font-black text-gray-900">${rent}</span>
                        <span className="text-sm font-medium text-gray-500">/mo</span>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col gap-5 flex-1 bg-white">
                
                {/* Minimalist Specs Grid */}
                <div className="flex justify-between items-center bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
                    <div className="flex flex-col items-center gap-1.5 flex-1">
                        <TbBuildingCommunity size={22} className="text-green-500" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Block</span>
                        <span className="text-sm font-bold text-gray-800">{block_no}</span>
                    </div>
                    
                    <div className="w-px h-10 bg-gray-200"></div>
                    
                    <div className="flex flex-col items-center gap-1.5 flex-1">
                        <LuLayers size={22} className="text-green-500" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Floor</span>
                        <span className="text-sm font-bold text-gray-800">{floor_no}</span>
                    </div>
                    
                    <div className="w-px h-10 bg-gray-200"></div>

                    <div className="flex flex-col items-center gap-1.5 flex-1">
                        <MdOutlineEventAvailable size={22} className="text-green-500" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</span>
                        <span className="text-sm font-bold text-gray-800">{isAvailable ? 'Open' : 'Taken'}</span>
                    </div>
                </div>

                {/* Call to Action Wrapper */}
                <div className="mt-auto pt-2">
                    <button
                        onClick={handleRequestAgreement}
                        disabled={!isAvailable}
                        className={`relative w-full overflow-hidden flex justify-center items-center py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 shadow-sm ${
                            isAvailable
                                ? 'bg-gray-900 hover:bg-green-600 text-white hover:shadow-[0_8px_20px_rgba(22,163,74,0.25)] hover:-translate-y-0.5'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {isAvailable ? 'Request Agreement' : 'Currently Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApartmentCard;