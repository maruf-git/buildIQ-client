import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider';
import homeLogo from '../../assets/images/home.png'
import Container from './Container.jsx';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className=' shadow-sm '>
      <Container>
        {/* navbar mobile */}
        {/* <div className='hidden'>
          <div className="navbar-start">
            <div className='flex items-center gap-5'>
              <img src={homeLogo} className='w-[70px] ' alt="" />
              <Link to='/' className="text-3xl font-bold">Build<span className='text-green-600'>IQ</span></Link>
            </div>
          </div>
        </div> */}
        {/* navbar general */}
        <div className="navbar px-0 py-0  ">
          <div className="navbar-start">
            <div className='flex items-center gap-5'>
              <img src={homeLogo} className='w-[70px] ' alt="" />
              <Link to='/' className="text-3xl font-bold">Build<span className='text-green-600'>IQ</span></Link>
            </div>
          </div>
          <div className='navbar-center hidden md:flex'>
            <ul className='flex gap-5 text-xl'>
              <li>
                <NavLink
                  to='/'
                  className='p-2 font-semibold hover:border-b-[5px] hover:text-green-600 hover:border-green-500  transition'>Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to='/apartments'
                  className='p-2 font-semibold hover:border-b-[5px] hover:text-green-600 hover:border-green-500 transition'>Apartments
                </NavLink>
              </li>

            </ul>
          </div>
          <div className="navbar-end">
            {
              user ?
              // user mobile menu
                <div className="dropdown dropdown-end ">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        referrerPolicy="no-referrer"
                        alt={user?.displayName}
                        src={user?.photoURL} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-color rounded-box z-[10] mt-3 w-52 p-2 shadow">
                    <div
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold '
                    >
                      {user?.displayName}
                    </div>
                    <NavLink
                      to='/'
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to='/apartments'
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Apartments
                    </NavLink>
                    <NavLink
                      to='/dashboard'
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Dashboard
                    </NavLink>
                    <div
                      onClick={logOut}
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                    >
                      Logout
                    </div>
                  </ul>
                </div>
                :
                // no user navbar end
                <div>
                  {/* general navbar */}
                  <div className=" flex-col sm:flex-row items-center gap-3 hidden md:flex">
                    <Link to="/register" className="btn btn-sm outline-none border-none bg-green-500 hover:bg-green-600 text-white !font-semibold">Register</Link>
                    <Link to="/login" className="btn w-full sm:w-auto btn-sm outline-none border-none  bg-green-500 hover:bg-green-600 text-white !font-semibold ">Log in</Link>
                  </div>

                  {/* mobile navbar */}
                  <div className="dropdown dropdown-end md:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      {/* <div className="w-10 rounded-full">
                    <img
                      referrerPolicy="no-referrer"
                      alt={user?.displayName}
                      src={user?.photoURL} />
                  </div> */}
                      <GiHamburgerMenu size={30} />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-color rounded-box z-[10] mt-3 w-52 p-2 shadow">

                      <NavLink
                        to='/'
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Home
                      </NavLink>
                      <NavLink
                        to='/apartments'
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Apartments
                      </NavLink>
                      <NavLink
                        to='/register'
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Register
                      </NavLink>
                      <NavLink
                        to='/login'
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Login
                      </NavLink>


                    </ul>
                  </div>


                </div>

            }

          </div>
        </div>
      </Container>

    </div>
  )
}

export default Navbar