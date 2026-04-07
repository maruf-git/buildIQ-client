import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import toast from 'react-hot-toast'
import axios from 'axios'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { imageUpload } from '../../apis/utils'
import { PiSpinnerBallFill } from 'react-icons/pi'
import { Helmet } from 'react-helmet-async'
import logo from '../../assets/images/home.png'

const Register = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, createUser, updateUserProfile, setUser, setRole } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [validationMessage, setValidationMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const name = form.name.value
    const image = form.photo.files[0];
    const pass = form.password.value

    if (pass.length < 6) { setValidationMessage("Password must be at least 6 characters"); return; }
    if (name.trim() === "") { setValidationMessage("Name cannot be empty"); return; }
    if (!/[a-z]/.test(pass)) { setValidationMessage("Password must have at least one lowercase letter"); return; }
    if (!/[A-Z]/.test(pass)) { setValidationMessage("Password must have at least one uppercase letter"); return; }
    if (!/[^a-zA-Z0-9\s]/.test(pass)) { setValidationMessage("Password must have at least one special character"); return; }
    if (!/\d/.test(pass)) { setValidationMessage("Password must have at least one number"); return; }
    if (!image) { setValidationMessage("Please select a photo"); return; }
    if (image?.type !== 'image/jpeg' && image?.type !== 'image/png') { setValidationMessage('Photo must be JPEG or PNG'); return; }

    setIsUploading(true);
    const photo = await imageUpload(image);

    try {
      const result = await createUser(email, pass);
      await updateUserProfile(name, photo);
      setUser({ ...result.user, photoURL: photo, displayName: name })
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: result?.user?.email },
        { withCredentials: true }
      )
      if (response?.data?.token) localStorage.setItem('access-token', response?.data?.token);
      const { data: userData } = await axiosSecure.post(`/users`, { email, name });
      setRole(userData?.role);
      setIsUploading(false);
      toast.success('Account created!');
      navigate('/')
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
      if (response?.data?.token) localStorage.setItem('access-token', response?.data?.token);
      const { data: userData } = await axiosSecure.post(`/users`, { email: data?.user?.email, name: data?.user?.displayName });
      setRole(userData?.role);
      toast.success('Welcome to BuildIQ!');
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const inputClass = 'block w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:border-green-400 focus:bg-white transition';

  return (
    <div className='min-h-[calc(100vh-80px)] flex items-center justify-center px-4 pt-28 pb-12 bg-gray-50'>
      <Helmet><title>BuildIQ - Register</title></Helmet>

      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
          {/* header */}
          <div className='bg-gradient-to-br from-green-600 to-green-700 px-8 pt-8 pb-6 text-center'>
            <div className='flex justify-center mb-3'>
              <img src={logo} alt='BuildIQ' className='w-12 h-12 object-contain brightness-0 invert' />
            </div>
            <h1 className='text-2xl font-bold text-white'>Create an account</h1>
            <p className='text-green-100 text-sm mt-1'>Join BuildIQ and find your perfect home</p>
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
              <span className='text-xs text-gray-400'>or register with email</span>
              <div className='flex-1 h-px bg-gray-100' />
            </div>

            {/* form */}
            <form onSubmit={handleSignUp} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1.5' htmlFor='name'>Full Name</label>
                <input required id='name' autoComplete='name' name='name' type='text' placeholder='John Doe' className={inputClass} />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1.5' htmlFor='photo'>Profile Photo</label>
                <input
                  required id='photo' name='photo' type='file' accept='image/jpeg,image/png'
                  className='block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition border border-gray-200 rounded-lg bg-gray-50'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1.5' htmlFor='LoggingEmailAddress'>Email Address</label>
                <input required id='LoggingEmailAddress' autoComplete='email' name='email' type='email' placeholder='you@example.com' className={inputClass} />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1.5' htmlFor='loggingPassword'>Password</label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required id='loggingPassword' autoComplete='new-password' name='password'
                    placeholder='••••••••'
                    className={`${inputClass} pr-10`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition'
                  >
                    {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                  </button>
                </div>
                <p className='text-xs text-gray-400 mt-1.5'>Min. 6 chars with uppercase, number & special char</p>
              </div>

              {/* validation error */}
              {validationMessage && (
                <div className='flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-lg px-3 py-2.5 text-sm'>
                  {validationMessage}
                </div>
              )}

              <button
                type='submit'
                className='w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm py-3 rounded-lg transition-colors duration-200'
              >
                {isUploading ? <PiSpinnerBallFill size={18} className='animate-spin' /> : 'Create Account'}
              </button>
            </form>

            <p className='text-center text-sm text-gray-500'>
              Already have an account?{' '}
              <Link to='/login' className='text-green-600 font-semibold hover:underline'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register