import { useContext } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import AdminProfile from '../../../components/Dashboard/Admin/AdminProfile';

const Profile = () => {
    const { user, role } = useContext(AuthContext);

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