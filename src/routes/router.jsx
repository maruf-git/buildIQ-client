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
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement";



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
        path: "/apartment",
        element: <Apartments></Apartments>
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
      // common routes
      {
        path: 'announcements',
        element: <Announcements></Announcements>
      },

      // user routes
      {
        index: true,
        element: <Profile></Profile>
      },

      // member routes
      {
        path: 'make-payment',
        element: <MakePayment></MakePayment>
      },
      {
        path: 'payment-history',
        element: <PaymentHistory></PaymentHistory>
      },

      // admin routes
      {
        path: 'manage-members',
        element: <ManageMembers></ManageMembers>
      },
      {
        path: 'manage-coupons',
        element: <ManageCoupons></ManageCoupons>
      },
      {
        path: 'agreement-requests',
        element: <AgreementRequests></AgreementRequests>
      },
      {
        path: 'make-announcement',
        element: <MakeAnnouncement></MakeAnnouncement>
      },
    ]
  }
]);


export default router;