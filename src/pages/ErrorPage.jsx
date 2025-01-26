import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="bg-color flex items-center justify-center h-screen text-white">
            <Helmet>
                <title>BuildIQ - Page Not Found!</title>
            </Helmet>
            <div className="text-center">
                <h1 className="text-9xl font-bold text-green-500">404</h1>
                <p className="text-2xl mt-4 text-green-500">Oops! Page not found.</p>
                <p className="text-gray-400 mt-2 ">The page you are looking for doesn’t exist.</p>
                <Link to="/" className="mt-6 btn  text-white bg-green-500   font-semibold hover:bg-green-600 transition">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
