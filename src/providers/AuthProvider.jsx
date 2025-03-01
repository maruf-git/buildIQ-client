/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.config'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import axios from 'axios'
// import useAxiosSecure from '../hooks/useAxiosSecure'


export const AuthContext = createContext()
// const auth = getAuth(app)


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({});
  // const axiosSecure = useAxiosSecure();


  // create user with email and password
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  // login with email and password
  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // sign in with google
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  // logout 
  const logOut = async () => {
    setLoading(true)
    return signOut(auth)
  }

  // update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      console.log('CurrentUser-->', currentUser)

      if (currentUser?.email) {
        setUser(currentUser)
        // creating jwt
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {
            email: currentUser?.email,
          },
          { withCredentials: true }
        )
        console.log("jwt status:", data);
        if (data?.token) {
          console.log('token saved in local storage');
          localStorage.setItem('access-token', data?.token);
        }

        // get user role
        // ${import.meta.env.VITE_API_URL}
        const { data: userData } = await axios.get(`${import.meta.env.VITE_API_URL}/user/${currentUser?.email}`);
        console.log('now logged in user from db:', userData);
        setRole(userData?.role);

        // const { data: userData } = await axiosSecure.get(`/user/${currentUser?.email}`);
        // console.log('now logged in user from db:', userData);
        // setRole(userData?.role);


      }
      else {
        setUser(currentUser);
        localStorage.removeItem('access-token');
      }
      setLoading(false)
    })

    return () => {
      unsubscribe(); // return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    role,
    setRole,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    paymentInfo,
    setPaymentInfo
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider