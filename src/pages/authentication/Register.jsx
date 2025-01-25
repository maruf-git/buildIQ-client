import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import toast from 'react-hot-toast'
import axios from 'axios'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { FaEye, FaEyeSlash } from 'react-icons/fa'


const Register = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, createUser, updateUserProfile, setUser, setRole } =
    useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [validationMessage, setValidationMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const name = form.name.value
    const photo = form.photo.value
    const pass = form.password.value

    if (pass.length < 6) {
      setValidationMessage("Password must be at least 6 characters");
      return;
    }
    if (name.trim() === "") {
      setValidationMessage("Name can not be empty");
      return;
    }
    if (photo.trim() === "") {
      setValidationMessage("Photo URL can not be empty");
      return;
    }
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialRegex = /[^a-zA-Z0-9\s]/;
    const lowercaseRegex = /[a-z]/;
    // validation
    if (!lowercaseRegex.test(pass)) {
      setValidationMessage("Password must have at least one lowercase letter");
      return;
    }
    if (!uppercaseRegex.test(pass)) {
      setValidationMessage("Password must have at least one uppercase letter");
      return;
    }
    if (!specialRegex.test(pass)) {
      setValidationMessage("Password must have at least one special character");
      return;
    }
    if (!numberRegex.test(pass)) {
      setValidationMessage("Password must have at least one number");
      return;
    }

    try {
      //2. User Registration
      const result = await createUser(email, pass);
      // update user
      await updateUserProfile(name, photo);
      console.log("result from register:", result);
      // optimize set user 
      setUser({ ...result.user, photoURL: photo, displayName: name })

      // saving new user in db and assigning role
      // ${import.meta.env.VITE_API_URL}
      const { data: userData } = await axiosSecure.post(`/users`, { email, name });
      console.log('new user in db:', userData);
      setRole(userData?.role);

      toast.success('Signup Successful')
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  // handle password show eye button
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  console.log('validate message:', validationMessage);

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      // login in user/signup user
      const data = await signInWithGoogle();

      // generating jwt
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: data?.user?.email,
        },
        { withCredentials: true }
      )
      // console.log("response from user api:",response);
      if (response?.data?.token) {
        // console.log('found token is :',response?.data?.token)
        localStorage.setItem('access-token', response?.data?.token);
      }

      // saving new user in db and assigning role
      // ${import.meta.env.VITE_API_URL}
      const { data: userData } = await axiosSecure.post(`/users`, { email: data?.user?.email, name: data?.user?.displayName });
      console.log('new user in db:', userData);
      setRole(userData?.role);

      toast.success('Signin Successful')
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg '>
        <div className='w-full px-6 py-8 md:px-8'>
          <p className='mt-3 text-xl text-center text-green-600 '>
            Get Your Free Account Now.
          </p>
          {/* google sign in option */}
          <div
            onClick={handleGoogleSignIn}
            className='flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 '
          >
            {/* google logo */}
            <div className='px-4 py-2'>
              <svg className='w-6 h-6' viewBox='0 0 40 40'>
                <path
                  d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                  fill='#FFC107'
                />
                <path
                  d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
                  fill='#FF3D00'
                />
                <path
                  d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
                  fill='#4CAF50'
                />
                <path
                  d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                  fill='#1976D2'
                />
              </svg>
            </div>
            {/* google sign in text */}
            <span className='w-5/6 px-4 py-3 font-bold text-center'>
              Sign in with Google
            </span>
          </div>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  lg:w-1/4'></span>
            <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
              or Registration with email
            </div>
            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>

          {/* register with email and password */}
          <form onSubmit={handleSignUp}>
            {/* name */}
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='name'
              >
                Username
              </label>
              <input
                required
                id='name'
                autoComplete='name'
                name='name'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-green-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-green-300'
                type='text'
              />
            </div>
            {/* photo url */}
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='photo'
              >
                Photo URL
              </label>
              <input
                required
                id='photo'
                autoComplete='photo'
                name='photo'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-green-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-green-300'
                type='url'
              />
            </div>
            {/* email */}
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='LoggingEmailAddress'
              >
                Email Address
              </label>
              <input
                required
                id='LoggingEmailAddress'
                autoComplete='email'
                name='email'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-green-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-green-300'
                type='email'
              />
            </div>
            {/* password */}
            <div className='mt-4 relative'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-600 '
                  htmlFor='loggingPassword'
                >
                  Password
                </label>
              </div>

              <input
                type={`${showPassword ? "text" : "password"}`}
                required
                id='loggingPassword'
                autoComplete="current-password"
                name='password'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-green-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-green-300'
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute inset-y-0 right-3 top-[25px] text-gray-500"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* validation message */}
            <div className='mt-4'>
              {
                validationMessage && <p className='text-red-600'>{validationMessage} hello</p>
              }
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50'
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* or sign in option */}
          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  md:w-1/4'></span>
            <Link
              to='/login'
              className='text-xs text-gray-500 uppercase  hover:underline'
            >
              or sign in
            </Link>
            <span className='w-1/5 border-b  md:w-1/4'></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register