/* eslint-disable react/prop-types */


const CouponsTable = ({ coupons, handleCouponValidity,handleDeleteCoupon }) => {
    console.log('coupons:', coupons);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Coupon Code</th>
                            <th>Description</th>
                            <th>Discount Percentage</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            coupons.map((coupon, idx) => <tr key={coupon._id}>
                                {/* indexing */}
                                <td>{idx + 1}</td>
                                {/* coupon code */}
                                <td>{coupon?.coupon}</td>
                                {/* coupon description */}
                                <td>{coupon?.description}</td>
                                {/* Discount Percentage */}
                                <td>{coupon?.discount}</td>
                                {/* Coupon Validity */}
                                <td>{coupon?.validity}</td>
                                {/* make valid, make invalid and delete coupon button*/}
                                <td>
                                    <div className='flex gap-3 justify-center'>
                                        {/* make invalid button */}
                                        {coupon.validity === 'Valid' &&
                                            <button
                                                onClick={() => handleCouponValidity(coupon)}
                                                className="btn btn-xs bg-red-500 text-white hover:bg-red-600">Make Invalid
                                            </button>
                                        }
                                        {/* make valid button */}
                                        {coupon.validity === 'Invalid' &&
                                            <button
                                                onClick={() => handleCouponValidity(coupon)}
                                                className="btn btn-xs bg-red-500 text-white hover:bg-red-600">Make Valid
                                            </button>
                                        }
                                        {/* delete coupon */}
                                        <button
                                            onClick={() => handleDeleteCoupon(coupon._id)}
                                            className="btn btn-xs bg-red-500 text-white hover:bg-red-600">Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CouponsTable;