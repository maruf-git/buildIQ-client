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
                {/* md:w-4/5 lg:w-3/5 */}
                <div className='bg-white shadow-lg rounded-2xl w-full'>
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
                            role && role!=='admin' && <div>
                                {
                                    isLoading ? <div className='mt-10 '><ContentLoadingSpinner></ContentLoadingSpinner></div> :
                                        <div className='mt-10 mb-5 w-full'>
                                            {/* tot;e */}
                                            <p className='text-center text-xl font-bold text-green-600 mb-3'>Apartment Info</p>
                                            {/* table */}
                                            <div className="overflow-x-auto w-full shadow-md rounded-lg">
                                                <table className="table w-full text-center">
                                                    {/* Table Head */}
                                                    <thead className="bg-gray-100 text-gray-800 uppercase text-sm font-semibold">
                                                        <tr>

                                                            <th className="py-3 px-6">Request Date</th>
                                                            <th className="py-3 px-6">Accept Date</th>
                                                            <th className="py-3 px-6">Apartment No</th>
                                                            <th className="py-3 px-6">Floor</th>
                                                            <th className="py-3 px-6">Block</th>
                                                            <th className="py-3 px-6">Rent($)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-gray-700 text-sm">

                                                        <tr >


                                                            {/* request */}
                                                            <td className="py-3 px-6 font-semibold">{myApartment?.request_date || 'Not Requested'}</td>

                                                            {/* accept date */}
                                                            <td className="py-3 px-6">
                                                                {myApartment?.accept_date || 'Not Accepted Yet'}
                                                            </td>

                                                            {/* apartment no */}
                                                            <td className="py-3 px-6"> {myApartment?.apartment_no || 'Null'}</td>

                                                            {/* floor no  */}
                                                            <td className="py-3 px-6"> {myApartment?.floor_no || 'Null'}</td>

                                                            {/* block no  */}
                                                            <td className="py-3 px-6"> {myApartment?.block_no || 'Null'}</td>

                                                            {/* rent */}
                                                            <td className="py-3 px-6"> {myApartment?.rent || 'Null'}</td>

                                                        </tr>

                                                    </tbody>
                                                </table>
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