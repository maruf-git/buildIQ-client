import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Dashboard/Common/Profile";
import Announcements from "../pages/Dashboard/Common/Announcements";
import Apartments from "../pages/Apartments/Apartments";
import PrivateRoute from "./PrivateRoute";
import MakePayment from "../pages/Dashboard/Member/MakePayment";
import PaymentHistory from "../pages/Dashboard/Member/PaymentHistory";
import ManageMembers from "../pages/Dashboard/Admin/ManageMembers";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons";
import AgreementRequests from "../pages/Dashboard/Admin/AgreementRequests";
import AdminPrivateRoute from "./AdminPrivateRoute";
import MemberPrivateRoute from "./MemberPrivateRoute";
import PaymentPage from "../pages/Dashboard/Member/PaymentPage";
import AboutUs from "../pages/Home/AboutUs";
import ErrorPage from "../pages/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/apartments",
        element: <Apartments></Apartments>
      },
      {
        path:'/about-us',
        element:<AboutUs></AboutUs>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute>
      <Dashboard></Dashboard>
    </PrivateRoute>,
    children: [
      // common routes to all 
      {
        index: true,
        element: <Profile></Profile>
      },

      // only user and member route
      {
        path: 'announcements',
        element:
          <Announcements></Announcements>

      },

      // only member routes
      {
        path: 'make-payment',
        element: <MemberPrivateRoute>
          <MakePayment></MakePayment>
        </MemberPrivateRoute>
      },
      {
        path: 'payment-history',
        element: <MemberPrivateRoute>
          <PaymentHistory></PaymentHistory>
        </MemberPrivateRoute>
      },

      // only admin routes
      {
        path: 'manage-members',
        element: <AdminPrivateRoute>
          <ManageMembers></ManageMembers>
        </AdminPrivateRoute>
      },
      {
        path: 'manage-coupons',
        element: <AdminPrivateRoute>
          <ManageCoupons></ManageCoupons>
        </AdminPrivateRoute>
      },
      {
        path: 'agreement-requests',
        element: <AdminPrivateRoute>
          <AgreementRequests></AgreementRequests>
        </AdminPrivateRoute>
      },
      
    ]
  },
  {
    path: '/payment',
    element: <MemberPrivateRoute>
      <PaymentPage></PaymentPage>
    </MemberPrivateRoute>
  },
  {
    path:'*',
    element:<ErrorPage></ErrorPage>
  }
]);


export default router;