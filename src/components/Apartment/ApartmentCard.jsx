/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdApartment } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";


const ApartmentCard = ({ apartment }) => {
    const { apartment_image, apartment_no, floor_no, block_no, rent, _id } = apartment;
    const { user, role, setRole } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

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
            if (role === 'admin') {
                console.log('hi admin');
                toast.error('Admin can not request for apartments!');
                return;
            }
            if (role === 'member') {
                toast.error('You are already a member. Can not request for more apartments!')
                return;
            }
            const { data } = await axiosSecure.post('/request-apartment', requestDetails)
            if (data?.insertedId) {
                toast.success('Request Sent! Please, wait for the confirmation!');
            }
            else if (data?.message === 'already user') {
                toast.error('You are already a member. Can not request for more apartments!')
                setRole('member');
            }
            else if (data?.message === 'already requested') {
                toast.error('You have an apartment request under pending. Can not request again. Please, wait for confirmation!');
            }
            else if (data?.message === 'no-apartment') {
                toast.error('No Such Apartment!');
            } else if (data?.message === 'unavailable') {
                toast.error('The Apartment is Already Booked! Please, checkout other apartments');
            }
        } else {
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
            <div className="card-body flex-col gap-1">
                {/* rent */}
                <div className="flex gap-2 items-center">
                    {/* <HiCash size={30} /> */}
                    {/* <FaDollarSign size={30}/> */}
                    <IoIosPricetags size={30} />
                    <h2 className="card-title">Rent: {rent}$</h2>
                </div>
                {/* Apartment No */}
                <div className="flex gap-2 items-center">
                    <MdApartment size={30} />
                    <h2 className="card-title">Apartment No: {apartment_no}</h2>
                </div>
                {/* Block and Floor */}
                <div className="flex gap-2 items-center">
                    <MdApartment size={30} />
                    <p className="card-title mr-0 pr-0">{block_no}, Floor: {floor_no}</p>
                </div>
                {/* agreement button */}
                <div className="card-actions w-full mt-2">
                    <button onClick={handleRequestAgreement} className="btn text-white  bg-green-500 hover:bg-green-600 w-full">Request Agreement</button>
                </div>
            </div>
        </div>

    );
};

export default ApartmentCard;