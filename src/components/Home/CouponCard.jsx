/* eslint-disable react/prop-types */

import { useState } from 'react';
import homeLogo from '../../assets/images/home.png'
import toast from 'react-hot-toast';


const CouponCard = ({ coupon }) => {

    const [copied, setCopied] = useState(false);
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(coupon?.coupon)
        .then(() => {
          setCopied(true);
          toast.success(`${coupon?.coupon} is copied!`)
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        })
        .catch((err) => console.error("Error copying text: ", err));
    };

    return (
        <div className="shadow-xl mb-10">
            <div className="card bg-base-100 w-full my-auto">
                <figure className="px-5 pt-5">
                    <img
                        src={homeLogo}
                        alt="Shoes"
                        className="rounded-xl h-[180px] object-cover" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{coupon?.discount}% OFF</h2>
                    <p>{coupon?.description}</p>
                    <div className="card-actions">
                        <button onClick={copyToClipboard} className="btn text-white bg-green-500 hover:bg-green-600"> {copied ? "Copied!" : "Collect Coupon"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CouponCard;