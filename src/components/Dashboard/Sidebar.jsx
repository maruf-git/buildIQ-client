import { useContext, useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/home.png'
import { AuthContext } from '../../providers/AuthProvider'
import UserMenu from './UserMenu'
import MemberMenu from './MemberMenu'
import AdminMenu from './AdminMenu'
import { RxCross2 } from 'react-icons/rx'
import { FaHome } from 'react-icons/fa'

const Sidebar = () => {
  const { logOut,  role } = useContext(AuthContext);
  const [isActive, setActive] = useState(false)


  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-green-600  text-gray-800 flex justify-between md:hidden p-4'>
        <div>
          <div className='block cursor-pointer font-bold'>
            <Link to='/'>
              <img
                // className='hidden md:block'
                src={logo}
                alt='logo'
                width='50'
                height='100'
              />
            </Link>
          </div>
        </div>
        {
          !isActive && <button
            onClick={handleToggle}
            // mobile-menu-button
            className='  focus:outline-none '
          >
            <RxCross2 size={30} />
          </button>
        }
        {
          isActive && <button
            onClick={handleToggle}
            // mobile-menu-button
            className='  focus:outline-none '
          >
            <AiOutlineBars size={30} />
          </button>
        }
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden  bg-green-600  w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 pt-2 pb-3  rounded-lg justify-center items-center  mx-auto'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src={logo}
                  alt='logo'
                  width='100'
                  height='100'
                />
              </Link>
            </div>
          </div>


          <hr className='text-[#4cd734] border-[#4cd734] border-[2px] hidden md:block' />
          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-1'>
            <nav>
              {/*  Menu Items */}
              {role === 'user' && <UserMenu></UserMenu>}
              {role === 'member' && <MemberMenu></MemberMenu>}
              {role === 'admin' && <AdminMenu></AdminMenu>}

            </nav>
          </div>
        </div>

        <div>
          <hr className='text-[#4cd734] border-[#4cd734] border-[2px]' />
          <Link
          to='/'
            className='flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-green-700  transition-colors duration-300 transform'
          >
           
            <FaHome className='w-5 h-5'/>

            <span className='mx-4 font-medium'>Home</span>
          </Link>

          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-green-700  transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar;