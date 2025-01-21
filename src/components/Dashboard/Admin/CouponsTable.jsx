/* eslint-disable react/prop-types */


const CouponsTable = ({ coupons, handleCouponValidity, handleDeleteCoupon }) => {
    console.log('coupons:', coupons);
    return (
        <div className="p-4">
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="table w-full text-center">
                    {/* Table Head */}
                    <thead className="bg-gray-100 text-gray-800 uppercase text-sm font-semibold">
                        <tr>
                            <th className="py-3 px-6">#</th>
                            <th className="py-3 px-6">Coupon Code</th>
                            <th className="py-3 px-6">Description</th>
                            <th className="py-3 px-6">Discount Percentage</th>
                            <th className="py-3 px-6">Status</th>
                            <th className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {coupons.map((coupon, idx) => (
                            <tr
                                key={coupon._id}
                                className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } hover:bg-gray-100 transition duration-150`}
                            >
                                {/* Indexing */}
                                <td className="py-3 px-6">{idx + 1}</td>

                                {/* Coupon Code */}
                                <td className="py-3 px-6 font-semibold">{coupon?.coupon}</td>

                                {/* Description */}
                                <td className="py-3 px-6">{coupon?.description}</td>

                                {/* Discount Percentage */}
                                <td className="py-3 px-6">{coupon?.discount}%</td>

                                {/* Status */}
                                <td className="py-3 px-6">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${coupon.validity === 'Valid'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                            }`}
                                    >
                                        {coupon?.validity}
                                    </span>
                                </td>

                                {/* Action Buttons */}
                                <td className="py-3 px-6">
                                    <div className="flex gap-3 justify-center">
                                        {/* Make Invalid Button */}
                                        {coupon.validity === 'Valid' && (
                                            <button
                                                onClick={() => handleCouponValidity(coupon)}
                                                className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                                            >
                                                Make Invalid
                                            </button>
                                        )}
                                        {/* Make Valid Button */}
                                        {coupon.validity === 'Invalid' && (
                                            <button
                                                onClick={() => handleCouponValidity(coupon)}
                                                className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                                            >
                                                Make Valid
                                            </button>
                                        )}
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteCoupon(coupon._id)}
                                            className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default CouponsTable;