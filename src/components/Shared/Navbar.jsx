import { useContext, useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider';
import homeLogo from '../../assets/images/home.png'
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full ${
      isActive
        ? 'text-green-700 bg-green-50 border border-green-200/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]'
        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50/80 border border-transparent hover:border-gray-200/50'
    }`;

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'pt-2 md:pt-4 px-2 md:px-4' : 'pt-4 px-4'}`}>
      <header className={`mx-auto max-w-7xl transition-all duration-500 overflow-visible ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl'
          : 'bg-transparent'
      }`}>
        <div className={`flex items-center justify-between px-5 md:px-8 transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
          
          {/* Brand Logo */}
          <Link to='/' className='flex items-center gap-2.5 shrink-0 group'>
            <div className='bg-gradient-to-br from-green-50 to-green-100 p-2 rounded-xl group-hover:shadow-md transition-shadow duration-300'>
                <img src={homeLogo} className='w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110' alt='BuildIQ' />
            </div>
            <span className='text-2xl font-black tracking-tighter text-gray-900'>
              Build<span className='text-green-500'>IQ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-2'>
            <NavLink to='/' end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to='/apartments' className={navLinkClass}>
              Apartments
            </NavLink>
          </nav>

          {/* Desktop User/Auth Actions */}
          <div className='hidden md:flex items-center gap-4'>
            {user ? (
              <div className='relative group'>
                <button className='flex items-center gap-3 p-1.5 pr-3 bg-white border border-gray-100 shadow-sm rounded-full hover:shadow-md hover:border-green-200 transition-all duration-300'>
                  <img
                    referrerPolicy='no-referrer'
                    alt={user?.displayName}
                    src={user?.photoURL}
                    className='w-8 h-8 rounded-full object-cover border border-gray-100'
                  />
                  <span className='text-sm font-semibold text-gray-700 max-w-[100px] truncate'>
                    {user?.displayName?.split(' ')[0]}
                  </span>
                </button>
                {/* Dropdown Menu */}
                <div className='absolute right-0 top-[110%] w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 overflow-hidden'>
                  <div className='p-4 bg-gray-50/50 border-b border-gray-100'>
                    <p className='text-sm font-bold text-gray-900 truncate'>{user?.displayName}</p>
                    <p className='text-xs text-gray-500 truncate mt-0.5'>{user?.email}</p>
                  </div>
                  <div className='p-2 flex flex-col gap-1'>
                    <Link to='/dashboard' className='px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors'>Dashboard</Link>
                    <Link to='/apartments' className='px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors flex items-center justify-between'>
                       Find Apartments
                       <span className='w-2 h-2 rounded-full bg-green-500'></span>
                    </Link>
                  </div>
                  <div className='p-2 border-t border-gray-100'>
                    <button
                      onClick={logOut}
                      className='w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors'
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex items-center gap-2 bg-gray-50/50 p-1.5 rounded-full border border-gray-100 backdrop-blur-sm shadow-sm'>
                <Link
                  to='/login'
                  className='text-sm font-semibold text-gray-600 hover:text-gray-900 px-5 py-2.5 rounded-full hover:bg-white transition-all duration-200'
                >
                  Log In
                </Link>
                <Link
                  to='/register'
                  className='text-sm font-bold bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full shadow-[0_4px_12px_rgba(34,197,94,0.3)] hover:shadow-[0_6px_16px_rgba(34,197,94,0.4)] transition-all duration-300 transform hover:-translate-y-0.5'
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className='md:hidden relative p-2.5 bg-gray-50 border border-gray-100 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors'
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label='Toggle menu'
          >
            {mobileOpen ? <RxCross2 size={20} /> : <GiHamburgerMenu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-x-4 top-[88px] bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-400 overflow-hidden ${
        mobileOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
      }`}>
        <div className='p-4 space-y-2'>
          <NavLink
            to='/'
            end
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive 
                 ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200/60 shadow-sm' 
                 : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`
            }
          >Home</NavLink>
          <NavLink
            to='/apartments'
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive 
                 ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200/60 shadow-sm' 
                 : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`
            }
          >Apartments</NavLink>
          
          <div className='h-px bg-gray-100 my-2'></div>
          
          {user ? (
            <>
              <div className='px-4 flex items-center gap-3 py-2'>
                <img src={user?.photoURL} alt="user" className='w-10 h-10 rounded-full object-cover border border-gray-200' />
                <div className='overflow-hidden'>
                  <p className='text-sm font-bold text-gray-900 truncate'>{user?.displayName}</p>
                  <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
                </div>
              </div>
              <NavLink
                to='/dashboard'
                className={({ isActive }) =>
                  `block px-4 py-3 mt-2 rounded-xl text-sm font-semibold transition-colors ${isActive ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'}`
                }
              >Dashboard</NavLink>
              <button
                onClick={logOut}
                className='w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors mt-1'
              >
                Sign out
              </button>
            </>
          ) : (
            <div className='grid grid-cols-2 gap-3 pt-2'>
              <Link
                to='/login'
                className='flex items-center justify-center text-sm font-bold border-2 border-green-500 text-green-600 hover:bg-green-50 px-4 py-3 rounded-xl transition-colors'
              >
                Log in
              </Link>
              <Link
                to='/register'
                className='flex items-center justify-center text-sm font-bold bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl transition-colors shadow-[0_4px_12px_rgba(34,197,94,0.3)]'
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;