/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const ApartmentCard = ({ apartment }) => {
    const { apartment_image, apartment_no, floor_no, block_no, rent,_id } = apartment;
    const {user}=useContext(AuthContext);
    const navigate = useNavigate();
    console.log(navigate)
    const handleRequestAgreement=()=>{
        const requestDetails={
            apartment_id:_id,
            apartment_no,
            floor_no,
            block_no,
            rent,
            apartment_image,
            name:user?.displayName,
            email:user?.email
        }
        if(user){
            toast.success('Request Sent! Please, wait for the confirmation!');
        }else{
            toast.error('Please login to Request for the Apartment');
            navigate('/login')
        }

    }

    return (
        <div className="card card-compact bg-base-100  shadow-xl">
            <figure>
                <img
                    className="w-full h-[250px] object-cover"
                    src={apartment_image}
                    alt="apartment_image" />
            </figure>
            <div className="card-body flex-col gap-0">
                <h2 className="card-title">Rent: {rent}$</h2>
                <h2 className="card-title">Apartment No: {apartment_no}</h2>
                <p className="card-title mr-0 pr-0">{block_no}, Floor: {floor_no}</p>
                {/* agreement button */}
                <div className="card-actions w-full mt-2">
                    <button onClick={handleRequestAgreement} className="btn btn-primary w-full">Request Agreement</button>
                </div>
            </div>
        </div>

    );
};

export default ApartmentCard;