import { useContext } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import AdminProfile from '../../../components/Dashboard/Admin/AdminProfile';
import useMyApartmentInfo from '../Member/useMyApartmentInfo';
import ContentLoadingSpinner from '../../../components/Shared/ContentLoadingSpinner';
import { FaCheck } from 'react-icons/fa6';
import { MdApartment } from 'react-icons/md';
import { IoIosCash } from 'react-icons/io';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';


const Profile = () => {
    const { user, role } = useContext(AuthContext);
    const { myApartment, isLoading } = useMyApartmentInfo();

    return (
        <div>
            {/* helmet */}
            <Helmet>
                <title>BuildIQ - Profile</title>
            </Helmet>
            <div className='flex justify-center items-center '>
                {/* md:w-4/5 lg:w-3/5 */}
                <div className='bg-white shadow-lg rounded-2xl w-full  '>
                    <div className='flex flex-col items-center justify-center p-4 '>
                        <div className='flex flex-col justify-center items-center'>
                            <img
                                alt='profile'
                                src={user?.photoURL}
                                className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                            />

                            <div className='w-[100px] p-2 px-4 text-center text-xs text-white bg-green-500  rounded-full'>
                                <p className='text-center'>{role}</p>
                            </div>
                            <div className='mt-2  text-[16px] text-center sm:text-xl font-medium text-gray-800 '>
                                <p>User Id: {user?.uid}</p>
                            </div>
                        </div>

                        <div className='w-full  mt-4 rounded-lg'>
                            <div className='flex gap-5 flex-wrap items-center justify-between text-sm text-gray-600 '>
                                <p className='flex flex-col'>
                                    Name
                                    <span className='font-bold text-black '>
                                        {user?.displayName}
                                    </span>
                                </p>
                                <p className='flex flex-col'>
                                    Email
                                    <span className='font-bold text-black '>{user?.email}</span>
                                </p>

                                <div>
                                    <button className='w-[180px] text-white bg-green-500 hover:bg-green-600 px-10 py-1 rounded-lg  cursor-pointer  block mb-1'>
                                        Update Profile
                                    </button>
                                    <button className='w-[180px] text-white bg-green-500 hover:bg-green-600 px-7 py-1 rounded-lg cursor-pointer '>
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* user apartment info */}
                        {
                            role && role !== 'admin' && <div>
                                {
                                    isLoading ? <div className='mt-10 '><ContentLoadingSpinner></ContentLoadingSpinner></div> :
                                        // profile data table
                                        <div className='mt-10 mb-5 w-full '>
                                            {/* title */}
                                            <p className='text-center text-xl font-bold text-green-600 mb-3'>Apartment Info</p>
                                            {/* table */}
                                            <div className='flex flex-col gap-2'>
                                                {/* request date */}
                                                {/* <div className='flex gap-2'>
                                                    <FaClipboardQuestion size={25} />
                                                    <p className='sm:text-xl font-semibold'>Request Date: <span className='font-normal ml-5'>{myApartment?.request_date || 'Not Requested Yet!'}</span></p>
                                                </div> */}
                                                {/* accept date */}
                                                <div className='flex gap-2'>
                                                    <FaCheck size={25} />
                                                    {/* format(new Date(myApartment?.accept_date), "MMM d, yyyy") */}
                                                    
                                                    {
                                                        myApartment?.accept_date ? <p className='sm:text-xl font-semibold'>Accept Date: <span className='font-normal ml-5'>{format(new Date(myApartment?.accept_date), "MMM d, yyyy")}</span></p> :
                                                            <p className='sm:text-xl font-semibold'>Accept Date: <span className='font-normal ml-5'>Not Accepted Yet!</span></p>
                                                    }

                                                </div>
                                                {/* floor no */}
                                                <div className='flex gap-2'>
                                                    <MdApartment size={25} />
                                                    <p className='sm:text-xl font-semibold'>Floor No : <span className='font-normal ml-5'>{myApartment?.floor_no || 'None'}</span></p>
                                                </div>
                                                {/* block no */}
                                                <div className='flex gap-2'>
                                                    <MdApartment size={25} />
                                                    <p className='sm:text-xl font-semibold'>Block : <span className='font-normal ml-5'>{myApartment?.block_no || 'None'}</span></p>
                                                </div>
                                                {/* Rent  */}
                                                <div className='flex gap-2'>
                                                    <IoIosCash size={25} />
                                                    <p className='sm:text-xl font-semibold'>Rent($) : <span className='font-normal ml-5'>{myApartment?.rent || 'None'}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div>
                {
                    role === 'admin' && <AdminProfile></AdminProfile>
                }
            </div>
        </div>
    )
}

export default Profile