import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import toast from 'react-hot-toast'
import axios from 'axios'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { PiSpinnerBallFill } from 'react-icons/pi'
import { Helmet } from 'react-helmet-async'
import logo from '../../assets/images/home.png'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const axiosSecure = useAxiosSecure();
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const from = location?.state || '/'
  const { signIn, signInWithGoogle, setRole } = useContext(AuthContext)

  const handleSignIn = async e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const pass = form.password.value
    setIsUploading(true);
    try {
      await signIn(email, pass);
      setIsUploading(false);
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      setIsUploading(false);
      toast.error(err?.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: data?.user?.email },
        { withCredentials: true }
      )
      if (response?.data?.token) {
        localStorage.setItem('access-token', response?.data?.token);
      }
      const { data: userData } = await axiosSecure.post(`/users`, { email: data?.user?.email, name: data?.user?.displayName });
      setRole(userData?.role);
      toast.success('Welcome back!');
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err);
      toast.error(err?.message)
    }
  }

  return (
    <div className='min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-gray-50'>
      <Helmet><title>BuildIQ - Login</title></Helmet>

      <div className='w-full max-w-md'>
        {/* card */}
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
          {/* header */}
          <div className='bg-gradient-to-br from-green-600 to-green-700 px-8 pt-8 pb-6 text-center'>
            <div className='flex justify-center mb-3'>
              <img src={logo} alt='BuildIQ' className='w-12 h-12 object-contain brightness-0 invert' />
            </div>
            <h1 className='text-2xl font-bold text-white'>Welcome back</h1>
            <p className='text-green-100 text-sm mt-1'>Sign in to your BuildIQ account</p>
          </div>

          <div className='px-8 py-7 space-y-5'>
            {/* google */}
            <button
              type='button'
              onClick={handleGoogleSignIn}
              className='w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 py-2.5 rounded-lg text-sm font-medium text-gray-700 transition-colors duration-200'
            >
              <svg className='w-5 h-5' viewBox='0 0 40 40'>
                <path d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z' fill='#FFC107' />
                <path d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z' fill='#FF3D00' />
                <path d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z' fill='#4CAF50' />
                <path d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z' fill='#1976D2' />
              </svg>
              Continue with Google
            </button>

            {/* divider */}
            <div className='flex items-center gap-3'>
              <div className='flex-1 h-px bg-gray-100' />
              <span className='text-xs text-gray-400 whitespace-nowrap'>or sign in with email</span>
              <div className='flex-1 h-px bg-gray-100' />
            </div>

            {/* form */}
            <form onSubmit={handleSignIn} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1.5' htmlFor='LoggingEmailAddress'>
                  Email address
                </label>
                <input
                  id='LoggingEmailAddress'
                  autoComplete='email'
                  name='email'
                  type='email'
                  placeholder='you@example.com'
                  className='block w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:border-green-400 focus:bg-white transition'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1.5' htmlFor='loggingPassword'>
                  Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='loggingPassword'
                    autoComplete='current-password'
                    name='password'
                    placeholder='••••••••'
                    className='block w-full px-4 py-2.5 pr-10 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:border-green-400 focus:bg-white transition'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition'
                    aria-label='Toggle password visibility'
                  >
                    {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type='submit'
                className='w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm py-3 rounded-lg transition-colors duration-200'
              >
                {isUploading ? <PiSpinnerBallFill size={18} className='animate-spin' /> : 'Sign in'}
              </button>
            </form>

            <p className='text-center text-sm text-gray-500'>
              Don&apos;t have an account?{' '}
              <Link to='/register' className='text-green-600 font-semibold hover:underline'>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login