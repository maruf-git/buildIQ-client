import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider';
import homeLogo from '../../assets/images/home.png'
import Container from './Container.jsx';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);



  return (
    <div className=' shadow-sm '>
      <Container>
        <div className="navbar px-0 py-0">
          <div className="navbar-start">
            <div className='flex items-center gap-5'>
              <img src={homeLogo} className='w-[70px] ' alt="" />
              <a className="text-3xl font-semibold">BuildIQ</a>
            </div>
          </div>
          <div className='navbar-center'>
            <ul className='flex gap-5 text-xl'>
              <li>
                <NavLink
                  to='/'
                  className='p-2 font-semibold hover:border-b-[5px] hover:text-green-600 hover:border-green-500  transition'>Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to='/apartment'
                  className='p-2 font-semibold hover:border-b-[5px] hover:text-green-600 hover:border-green-500 transition'>Apartment
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            {
              user ? <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <div
                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold '
                  >
                    {user?.displayName}
                  </div>
                  <Link
                    to='/dashboard'
                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                  >
                    Dashboard
                  </Link>
                  <div
                    onClick={logOut}
                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                  >
                    Logout
                  </div>
                </ul>
              </div> : <div className="flex flex-col sm:flex-row items-center gap-3">

                <Link to="/register" className="btn btn-sm outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold">Register</Link>

                <Link to="/login" className="btn w-full sm:w-auto btn-sm outline-none border-none bg-[#009bff] hover:bg-[#0073bd] text-white !font-semibold ">Log in</Link>
              </div>
            }

          </div>
        </div>
      </Container>

    </div>
  )
}

export default Navbar