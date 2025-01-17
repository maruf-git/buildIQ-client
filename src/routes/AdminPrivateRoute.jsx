/* eslint-disable react/prop-types */
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const AdminPrivateRoute = ({ children }) => {
    const { user, loading, role, logOut } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <LoadingSpinner />;
    if (user) {
        if (role !== 'admin') {
            logOut();
            toast.error('Forbidden Access!');
            return <Navigate to='/login' state={location.pathname} />
        }
        return children;
    };
    return <Navigate to='/login' state={location.pathname} />
};

export default AdminPrivateRoute;