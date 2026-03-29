import { useContext, useState, useEffect } from 'react'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/images/home.png'
import { AuthContext } from '../../providers/AuthProvider'
import UserMenu from './UserMenu'
import MemberMenu from './MemberMenu'
import AdminMenu from './AdminMenu'
import { RxCross2 } from 'react-icons/rx'
import { FaHome } from 'react-icons/fa'

const Sidebar = () => {
  const { logOut, user, role } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setActive(false);
  }, [location.pathname]);

  const handleToggle = () => setActive(!isActive)

  return (
    <>
      {/* Mobile Topbar */}
      <div className='bg-white/90 backdrop-blur-md border-b border-gray-100 flex justify-between items-center md:hidden px-4 h-16 shadow-sm sticky top-0 z-50'>
        <Link to='/' className='flex items-center gap-2.5 group'>
          <img src={logo} alt='logo' className='w-8 h-8 object-contain transition-transform group-hover:scale-105' />
          <span className='text-xl font-black text-gray-900 tracking-tight'>Build<span className='text-green-500'>IQ</span></span>
        </Link>
        <button onClick={handleToggle} className='p-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-600 hover:text-gray-900 transition'>
          {isActive ? <RxCross2 size={24} /> : <AiOutlineBars size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isActive && (
        <div 
          className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={handleToggle}
        />
      )}

      {/* Main Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between w-[280px] bg-gradient-to-br from-slate-950 to-gray-950 shadow-[20px_0_40px_rgba(0,0,0,0.2)] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 overflow-y-auto`}
      >
        {/* Background Decorative Mesh */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none"></div>

        {/* Top Content (Logo + User Menu) */}
        <div className='relative z-10 px-6 pt-6 md:pt-8 pb-4'>
          
          {/* Mobile Close Button & Logo */}
          <div className='flex md:hidden items-center justify-between mb-8'>
             <Link to='/' className='flex items-center gap-2 group'>
                <img src={logo} alt='logo' className='w-6 h-6 object-contain brightness-0 invert opacity-90' />
                <span className='text-xl font-black tracking-tighter text-white'>Build<span className='text-green-400'>IQ</span></span>
             </Link>
             <button onClick={handleToggle} className='p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition'>
                <RxCross2 size={20} />
             </button>
          </div>

          {/* Logo – Desktop */}
          <Link to='/' className='hidden md:flex items-center gap-3 group mb-8'>
            <div className='p-2 bg-white/5 border border-white/10 rounded-xl group-hover:bg-white/10 transition-colors'>
                <img src={logo} alt='logo' className='w-7 h-7 object-contain brightness-0 invert opacity-90' />
            </div>
            <span className='text-2xl font-black tracking-tighter text-white'>Build<span className='text-green-400'>IQ</span></span>
          </Link>

          {/* User Profile Mini-Card */}
          {user && (
            <div className='w-full bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 shadow-inner backdrop-blur-sm mb-6'>

              <img
                src={user?.photoURL}
                alt={user?.displayName}
                referrerPolicy='no-referrer'
                className='w-12 h-12 rounded-xl object-cover border border-white/20 shadow-sm'
              />
              <div className='overflow-hidden flex-1'>
                <p className='text-sm font-bold text-white truncate'>{user?.displayName}</p>
                <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    <span className='text-[10px] font-bold uppercase tracking-widest text-green-400'>
                        {role || 'User'}
                    </span>
                </div>
              </div>
            </div>
          )}

          <div className='h-px bg-white/5 w-full my-6' />

          {/* Nav Items Group */}
          <div className='mb-2'>
              <p className='text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 pl-3'>
                  Main Menu
              </p>
              <nav className='space-y-1.5'>
                {role === 'user' && <UserMenu />}
                {role === 'member' && <MemberMenu />}
                {role === 'admin' && <AdminMenu />}
              </nav>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className='px-6 pb-8 relative z-10 space-y-2 mt-auto'>
          <div className='h-px bg-white/5 w-full mb-6' />
          
          <NavLink
            to='/'
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
                    isActive
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                }`
            }
          >
            <FaHome size={18} className="opacity-80" />
            <span>Back to Home</span>
          </NavLink>
          
          <button
            onClick={logOut}
            className='flex w-full items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-300 text-sm font-bold tracking-wide group'
          >
            <GrLogout size={18} className="opacity-80 group-hover:-translate-x-1 transition-transform" />
            <span>Sign out securely</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar;