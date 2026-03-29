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
                    
                    {/* Upper row: Avatar pulling up over the banner */}
                    <div className='-mt-16 sm:-mt-20 mb-4 sm:mb-6'>
                        {/* Avatar Wrapper */}
                        <div className='relative inline-block shrink-0 select-none'>
                            <div className="absolute inset-0 bg-black/10 rounded-3xl blur-md translate-y-2"></div>
                            <img
                                alt={user?.displayName || 'User'}
                                src={user?.photoURL || 'https://i.ibb.co.com/F3x77jT/user.jpg'}
                                referrerPolicy='no-referrer'
                                className='relative z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover border-[6px] border-white shadow-xl bg-gray-50'
                            />
                            {/* Verified Badge */}
                            <div className="absolute -bottom-2 -right-3 z-20 bg-green-500 border-4 border-white text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform cursor-default">
                                Verified
                            </div>
                        </div>
                    </div>

                    {/* Lower row: Info Block (Names, Badges, Buttons) isolated in the white space */}
                    <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6 mb-6 sm:mb-8'>
                        {/* Name and Title */}
                        <div className='flex-1 pb-1 sm:pb-3'>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-1.5">
                                <h2 className='text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-none'>
                                    {user?.displayName || 'Unknown User'}
                                </h2>
                                
                                {/* Dark Role Pill */}
                                <div className='inline-flex self-start sm:self-auto items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 shadow-sm cursor-default hover:bg-slate-800 transition-colors'>
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className='text-[10px] font-bold uppercase tracking-[0.2em] text-white'>
                                        {role || 'User'}
                                    </span>
                                </div>
                            </div>
                            <p className='text-sm sm:text-base font-semibold text-gray-500'>{user?.email}</p>
                        </div>

                        {/* Actions (Desktop aligned right) */}
                        <div className='flex sm:flex-col gap-3 shrink-0 pt-2 sm:pt-0 sm:pb-2'>
                            <button className='w-full sm:w-auto text-sm font-bold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-sm'>
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
                    <AdminProfile />
                </div>
            )}
        </div>
    );
};

export default Profile;