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

const InfoRow = ({ icon: Icon, label, value }) => (
    <div className='flex items-start gap-4 py-4 px-6 md:px-8 border-b border-gray-100 hover:bg-gray-50/50 transition-colors last:border-0'>
        <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50 flex items-center justify-center shrink-0 shadow-inner'>
            <Icon size={18} className='text-green-600 drop-shadow-sm' />
        </div>
        <div className='pt-0.5'>
            <p className='text-xs text-gray-400 font-bold uppercase tracking-wider mb-1'>{label}</p>
            <p className='text-[15px] font-bold text-gray-900'>{value}</p>
        </div>
    </div>
);

const Profile = () => {
    const { user, role } = useContext(AuthContext);
    const { myApartment, isLoading } = useMyApartmentInfo();

    return (
        <div className='max-w-4xl mx-auto'>
            <Helmet><title>BuildIQ - Your Profile</title></Helmet>

            {/* Page Header */}
            <div className='mb-8 sm:mb-12'>
                <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>Your Profile</h1>
                <p className='text-base text-gray-500 font-medium mt-1'>Manage your account settings and preferences.</p>
            </div>

            {/* Profile Header Card */}
            <div className='bg-white rounded-3xl border border-gray-200/60 shadow-[0_20px_40px_rgba(0,0,0,0.04)] overflow-hidden relative'>
                
                {/* Beautiful Abstract Cover Strip */}
                <div className='h-32 sm:h-40 bg-[url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2600&auto=format&fit=crop")] bg-cover bg-center bg-no-repeat relative'>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-green-900/60 mix-blend-multiply"></div>
                </div>

                {/* Avatar and Info Block */}
                <div className='px-6 sm:px-10 pb-8 sm:pb-10 relative'>
                    <div className='flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-6 -mt-16 sm:-mt-20 mb-6 sm:mb-8'>
                        
                        {/* Avatar Wrapper with glowing ring */}
                        <div className='relative inline-block'>
                            <div className="absolute inset-0 bg-green-500 rounded-2xl blur-md opacity-20"></div>
                            <img
                                alt={user?.displayName}
                                src={user?.photoURL}
                                referrerPolicy='no-referrer'
                                className='relative z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-xl'
                            />
                            {/* Live status dot */}
                            <div className="absolute bottom-2 right-2 z-20 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>

                        {/* Name and Title */}
                        <div className='flex-1 pb-1 pt-4 sm:pt-0'>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                                <h2 className='text-3xl font-black text-gray-900 tracking-tight'>
                                    {user?.displayName}
                                </h2>
                                <span className='inline-flex self-start items-center gap-1.5 font-bold uppercase tracking-widest bg-green-50 text-green-600 border border-green-200 px-3 py-1.5 rounded-full text-xs shadow-sm'>
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    {role} Account
                                </span>
                            </div>
                            <p className='text-sm sm:text-base font-medium text-gray-500 mt-2'>{user?.email}</p>
                        </div>

                        {/* Actions (Desktop aligned right) */}
                        <div className='flex sm:flex-col gap-3 shrink-0 pt-2 sm:pt-0'>
                            <button className='w-full sm:w-auto text-sm font-bold text-white bg-gray-900 hover:bg-green-600 px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5'>
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Developer Metadata / UID */}
                    <div className='bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                        <div>
                            <p className='text-xs text-gray-400 font-bold uppercase tracking-widest mb-1'>System UID</p>
                            <p className='text-sm font-mono font-medium text-gray-600 break-all select-all'>{user?.uid}</p>
                        </div>
                        <button className='text-xs font-bold text-gray-500 hover:text-green-600 bg-white border border-gray-200 px-4 py-2 rounded-lg transition-colors shadow-sm self-start sm:self-auto'>
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Apartment Info Widget (For Members/Users) */}
            {role && role !== 'admin' && (
                <div className='mt-8 bg-white rounded-3xl border border-gray-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.02)] overflow-hidden'>
                    <div className='px-6 md:px-8 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between'>
                        <h3 className='text-lg font-extrabold text-gray-900 tracking-tight'>Your Residence Info</h3>
                    </div>
                    
                    <div className=''>
                        {isLoading ? (
                            <div className='py-12'><ContentLoadingSpinner /></div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100'>
                                
                                <div className="flex flex-col">
                                    <InfoRow
                                        icon={FaCheck}
                                        label='Agreement Date'
                                        value={myApartment?.accept_date
                                            ? format(new Date(myApartment.accept_date), 'MMMM d, yyyy')
                                            : <span className="text-gray-400 italic font-medium">Agreement Pending</span>}
                                    />
                                    <InfoRow 
                                        icon={IoIosCash} 
                                        label='Monthly Rent' 
                                        value={myApartment?.rent ? `$${myApartment.rent.toLocaleString()}` : <span className="text-gray-400 italic">N/A</span>} 
                                    />
                                </div>
                                
                                <div className="flex flex-col">
                                    <InfoRow 
                                        icon={MdApartment} 
                                        label='Assigned Floor' 
                                        value={myApartment?.floor_no ? `Floor ${myApartment.floor_no}` : <span className="text-gray-400 italic">Unassigned</span>} 
                                    />
                                    <InfoRow 
                                        icon={MdApartment} 
                                        label='Building Block' 
                                        value={myApartment?.block_no ? `Block ${myApartment.block_no}` : <span className="text-gray-400 italic">Unassigned</span>} 
                                    />
                                </div>
                                
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Admin Stats Dashboard Widget */}
            {role === 'admin' && (
                <div className='mt-8 pt-4'>
                    <div className="mb-6">
                        <h3 className='text-lg font-extrabold text-gray-900 tracking-tight'>System Overview</h3>
                        <p className="text-sm font-medium text-gray-500 mt-1">Real-time statistics for BuildIQ.</p>
                    </div>
                    <AdminProfile />
                </div>
            )}
        </div>
    )
}

export default Profile