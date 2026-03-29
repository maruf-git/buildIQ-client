/* eslint-disable react/prop-types */

import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdCheck } from 'react-icons/md';
import { IoCopyOutline } from 'react-icons/io5';

const CouponCard = ({ coupon }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(coupon?.coupon)
            .then(() => {
                setCopied(true);
                toast.success(`"${coupon?.coupon}" copied!`);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => toast.error('Failed to copy'));
    };

    return (
        <div className="group relative w-full overflow-hidden bg-white rounded-[24px] border border-gray-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(22,163,74,0.08)] hover:-translate-y-1 transition-all duration-400">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-green-500/20 transition-all duration-500"></div>
            
            <div className="p-6 flex flex-col items-center text-center">
                {/* Discount Badge */}
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100/50 mb-4 shadow-inner">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 tracking-tight">
                        {coupon?.discount}%
                    </span>
                    <span className="text-sm font-bold text-green-700 ml-1 mt-2 uppercase tracking-wide">
                        OFF
                    </span>
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2 h-10 mb-5 max-w-[200px]">
                    {coupon?.description}
                </p>

                {/* Perforated Divider */}
                <div className="relative w-full border-t-2 border-dashed border-gray-200 my-1">
                    <div className="absolute -left-8 -top-3 w-6 h-6 rounded-full bg-gray-50 border border-t-transparent border-r-transparent border-gray-100 rotate-45 shadow-inner"></div>
                    <div className="absolute -right-8 -top-3 w-6 h-6 rounded-full bg-gray-50 border border-b-transparent border-l-transparent border-gray-100 -rotate-45 shadow-inner"></div>
                </div>

                {/* Code & Copy Section */}
                <div className="w-full mt-5 pt-1 flex items-center justify-between gap-3 bg-gray-50/80 p-1.5 pr-2 pl-4 rounded-xl border border-gray-100">
                    <span className="font-mono text-sm font-bold text-gray-800 tracking-widest uppercase">
                        {coupon?.coupon}
                    </span>
                    <button
                        onClick={copyToClipboard}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                            copied
                                ? 'bg-green-100 text-green-600'
                                : 'bg-gray-200/50 hover:bg-green-500 hover:text-white text-gray-400'
                        }`}
                        title="Copy Code"
                    >
                        {copied ? <MdCheck size={18} /> : <IoCopyOutline size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CouponCard;