/* eslint-disable react/prop-types */

const CouponsTable = ({ coupons, handleCouponValidity, handleDeleteCoupon }) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        {['#', 'Code', 'Description', 'Discount', 'Status', 'Actions'].map(h => (
                            <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                    {coupons.map((coupon, idx) => (
                        <tr key={coupon._id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                            <td className="px-4 py-3">
                                <span className="font-mono font-semibold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md text-xs tracking-wider">
                                    {coupon?.coupon}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">{coupon?.description}</td>
                            <td className="px-4 py-3 font-semibold text-gray-700">{coupon?.discount}%</td>
                            <td className="px-4 py-3">
                                <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full border ${
                                    coupon.validity === 'Valid'
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-red-50 text-red-600 border-red-200'
                                }`}>
                                    {coupon?.validity}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    {coupon.validity === 'Valid' ? (
                                        <button
                                            onClick={() => handleCouponValidity(coupon)}
                                            className="text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 px-3 py-1.5 rounded-lg transition-colors duration-200"
                                        >
                                            Invalidate
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleCouponValidity(coupon)}
                                            className="text-xs font-semibold text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-colors duration-200"
                                        >
                                            Validate
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteCoupon(coupon._id)}
                                        className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors duration-200"
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
    );
};

export default CouponsTable;