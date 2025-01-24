import { useContext } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import AdminProfile from '../../../components/Dashboard/Admin/AdminProfile';
import useMyApartmentInfo from '../Member/useMyApartmentInfo';
import ContentLoadingSpinner from '../../../components/Shared/ContentLoadingSpinner';

const Profile = () => {
    const { user, role } = useContext(AuthContext);
    const { myApartment, isLoading } = useMyApartmentInfo();

    return (
        <div>
            <div className='flex justify-center items-center '>
                {/* <Helmet>
        <title>Profile</title>
      </Helmet> */}
                <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
                    <div className='flex flex-col items-center justify-center p-4 '>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />

                        <p className='p-2 px-4 text-xs text-white bg-green-500  rounded-full'>
                            {role}
                        </p>
                        <p className='mt-2 text-xl font-medium text-gray-800 '>
                            User Id: {user?.uid}
                        </p>
                        <div className='w-full p-2 mt-4 rounded-lg'>
                            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
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
                                    <button className='text-white bg-green-500 hover:bg-green-600 px-10 py-1 rounded-lg  cursor-pointer  block mb-1'>
                                        Update Profile
                                    </button>
                                    <button className='text-white bg-green-500 hover:bg-green-600 px-7 py-1 rounded-lg cursor-pointer '>
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* user apartment info */}
                        {
                            isLoading ? <div className='mt-10'><ContentLoadingSpinner></ContentLoadingSpinner></div> : <div className='mt-10 w-[500px] mx-auto border border-red-600'>
                                <p className='text-center text-xl font-bold text-green-600'>Apartment Info</p>
                                <div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <p>Request Date : {myApartment?.request_date}</p>
                                        <p>Accept Date : {myApartment?.request_date || 'Not Accepted Yet'}</p>
                                        <p>Apartment No: {myApartment?.apartment_no || 'Null'}</p>
                                        <p>Floor No: {myApartment?.floor_no || 'Null'}</p>
                                        <p>Block No: {myApartment?.block_no || 'Null'}</p>
                                        <p>Rent: {myApartment?.rent || 'Null'}</p>
                                    </div>
                                </div>
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