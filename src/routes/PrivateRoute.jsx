/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import { AuthContext } from '../providers/AuthProvider';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    
    if (loading) return <LoadingSpinner />;
    if (user) return children;
    return <Navigate to='/login' state={location.pathname} />
}

export default PrivateRoute;