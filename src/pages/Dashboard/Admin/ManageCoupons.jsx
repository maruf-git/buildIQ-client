import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import CouponsTable from "../../../components/Dashboard/Admin/CouponsTable";
import couponGif from '../../../assets/images/couponGif.gif'
import { Helmet } from "react-helmet-async";
import { RiCoupon2Line } from "react-icons/ri";

const ManageCoupons = () => {
    const axiosSecure = useAxiosSecure();

    const { data: coupons = [], isLoading, refetch } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/coupons`);
            return data;
        }
    })

    const handleCouponValidity = async (coupon) => {
        let validity = coupon.validity === 'Valid' ? 'Invalid' : 'Valid';
        const { data } = await axiosSecure.patch('/coupons', { validity, id: coupon._id });
        if (data.modifiedCount) {
            toast.success(`Coupon marked as ${validity}`);
            refetch();
        }
    }

    const handleDeleteCoupon = async (id) => {
        const { data } = await axiosSecure.delete(`/coupons/${id}`);
        if (data?.deletedCount) { toast.success('Coupon deleted'); refetch(); }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const coupon = event.target.coupon.value;
        const discount = parseInt(event.target.discount.value);
        const description = event.target.description.value;
        const couponDetails = { coupon, discount, description, validity: 'Valid', date: new Date() }
        const { data } = await axiosSecure.post('/coupons', couponDetails);
        if (data?.insertedId) {
            toast.success('Coupon added!');
            refetch();
        } else {
            toast.error('Failed to add coupon');
        }
        event.target.reset();
        document.getElementById('coupon-modal').close();
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Helmet><title>BuildIQ - Manage Coupons</title></Helmet>

            {/* page header */}
            <div className='mb-6'>
                <h1 className='text-2xl font-bold text-gray-900'>Manage Coupons</h1>
                <p className='text-sm text-gray-500 mt-1'>Create, activate, and remove discount coupons</p>
            </div>

            {/* banner + add button */}
            <div className='flex flex-col sm:flex-row items-center justify-between gap-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 mb-8'>
                <div className='flex items-center gap-4'>
                    <img src={couponGif} alt='coupon' className='w-16 h-16 object-contain' />
                    <div>
                        <p className='font-semibold text-gray-800'>Add a New Coupon</p>
                        <p className='text-sm text-gray-500'>Create discounts for your tenants</p>
                    </div>
                </div>
                <button
                    className='inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 shrink-0'
                    onClick={() => document.getElementById('coupon-modal').showModal()}
                >
                    <RiCoupon2Line size={16} />
                    Add Coupon
                </button>
            </div>

            {/* modal */}
            <dialog id="coupon-modal" className="modal">
                <div className="modal-box rounded-2xl shadow-xl max-w-md">
                    <h2 className="text-xl font-bold text-gray-900 mb-5">Add New Coupon</h2>
                    <form id='coupon-form' onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1.5">Coupon Code</label>
                            <input
                                id="coupon" type="text" name="coupon"
                                placeholder="e.g. SUMMER20"
                                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-green-400 transition"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1.5">Discount (%)</label>
                            <input
                                id="discount" type="number" name="discount" min="1" max="100"
                                placeholder="e.g. 20"
                                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-green-400 transition"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                            <textarea
                                id="description" name="description" rows="3"
                                placeholder="Brief description of this coupon"
                                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-green-400 transition resize-none"
                                required
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                type='button'
                                onClick={() => {
                                    document.getElementById('coupon-modal').close();
                                    document.getElementById('coupon-form').reset();
                                }}
                                className="flex-1 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 py-2.5 rounded-lg transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className="flex-1 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 py-2.5 rounded-lg transition-colors duration-200"
                            >
                                Add Coupon
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* table section */}
            <div>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-base font-semibold text-gray-800'>
                        All Coupons
                        <span className='ml-2 text-sm font-normal text-gray-400'>({coupons.length})</span>
                    </h2>
                </div>
                {!coupons.length ? (
                    <div className='text-center py-20 text-gray-400'>
                        <RiCoupon2Line size={40} className='mx-auto mb-3 opacity-30' />
                        <p className='font-medium'>No coupons yet</p>
                    </div>
                ) : (
                    <CouponsTable coupons={coupons} handleCouponValidity={handleCouponValidity} handleDeleteCoupon={handleDeleteCoupon} />
                )}
            </div>
        </div>
    );
};

export default ManageCoupons;