import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import CouponsTable from "../../../components/Dashboard/Admin/CouponsTable";


const ManageCoupons = () => {
    const axiosSecure = useAxiosSecure();

    const { data: coupons = [], isLoading, refetch } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/coupons`);
            return data;
        }
    })

    // change coupon validity
    const handleCouponValidity = async (coupon) => {
        let validity = coupon.validity;
        if (validity === 'Valid') validity = 'Invalid'
        else if (validity === 'Invalid') validity = 'Valid';
        const couponDetails = {
            validity,
            id: coupon._id
        }
        const { data } = await axiosSecure.patch('/coupons', couponDetails);
        if (data.modifiedCount) {
            if (coupon?.validity === 'Valid')
                toast.success('Made the Coupon Invalid');
            else toast.success('Made the Coupon Valid');
            refetch();
        }
    }
    // delete coupon
    const handleDeleteCoupon = async (id) => {
        const { data } = await axiosSecure.delete(`/coupons/${id}`);
        if (data?.deletedCount) {
            toast.success('Successfully Deleted');
            refetch();
        }
    }

    // handle coupon submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const coupon = event.target.coupon.value;
        const discount = parseInt(event.target.discount.value);
        const description = event.target.description.value;

        const couponDetails = {
            coupon,
            discount,
            description,
            validity: 'Valid',
            date: new Date()
        }
        // saving the coupon in the database
        const { data } = await axiosSecure.post('/coupons', couponDetails);
        if (data?.insertedId) {
            toast.success('Coupon Added Successfully!');
            refetch();
        } else {
            toast.error('Failed to Add Coupon!')
        }

        event.target.reset();
        document.getElementById('coupon-modal').close();
    }

    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            {/* add coupon modal */}
            <div>
                <button className="btn" onClick={() => document.getElementById('coupon-modal').showModal()}>Add a New Coupon</button>
                <dialog id="coupon-modal" className="modal">
                    <div className="modal-box">

                        {/* coupon form */}
                        <form id='coupon-form' onSubmit={handleSubmit} className="card-body">
                            <div className="mb-3">
                                <p className="text-3xl font-bold text-center">Add Coupon</p>
                            </div>
                            {/* coupon code */}
                            <div>
                                <label htmlFor="coupon" className="block text-sm font-medium mb-3">Coupon Code</label>
                                <input
                                    id="coupon"
                                    type="text"
                                    name="coupon"
                                    placeholder="enter coupon code"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            {/* Discount Percentage */}
                            <div>
                                <label htmlFor="discount" className="block text-sm font-medium mb-3">Discount Percentage</label>
                                <input
                                    id="discount"
                                    type="number"
                                    name="discount"
                                    placeholder="enter discount percentage"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            {/* Coupon Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-3">Coupon Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="5"
                                    placeholder="Write detailed content for the blog"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                ></textarea>
                            </div>
                            {/* cancel and add button */}
                            <div className="flex gap-3 mt-5">
                                <p
                                    onClick={() => {
                                        document.getElementById('coupon-modal').close();
                                        document.getElementById('coupon-form').reset();
                                    }}
                                    className="btn ">Cancel
                                </p>
                                <button className="btn">Add</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
            {/* coupon table */}
            <div className="mb-2">
                <p className="text-3xl font-bold text-center  text-[#4bb32b]">
                    All Coupons({coupons.length})
                </p>
                <div className="mt-2 h-1 w-24 bg-[#4bb32b] mx-auto rounded"></div>
            </div>
            <div>
                <CouponsTable coupons={coupons} handleCouponValidity={handleCouponValidity} handleDeleteCoupon={handleDeleteCoupon}></CouponsTable>
            </div>
        </div>
    );
};

export default ManageCoupons;