import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageCoupons = () => {
    const axiosSecure = useAxiosSecure();

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
            validity:'valid'
        }
        // saving the coupon in the database
        const { data } = await axiosSecure.post('/coupons', couponDetails);
        if (data?.insertedId) {
            toast.success('Coupon Added Successfully!');
        } else {
            toast.error('Failed to Add Coupon!')
        }

        event.target.reset();
        document.getElementById('coupon-modal').close();
    }

    return (
        <div>
            {/* add coupon modal */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
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
    );
};

export default ManageCoupons;