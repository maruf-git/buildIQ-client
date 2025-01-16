import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Dashboard from "../layouts/Dashboard";
import Apartment from "../pages/Apartment/Apartment";
import Profile from "../pages/Dashboard/Common/Profile";
import Announcements from "../pages/Dashboard/Common/Announcements";



const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/apartment",
          element:<Apartment></Apartment>
        },
        {
          path:"/login",
          element:<Login></Login>,
        },
        {
          path:"/register",
          element:<Register></Register>,
        }
      ]
    },
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        // user routes
        {
          index:true,
          element:<Profile></Profile>
        },
        {
          path:'announcements',
          element:<Announcements></Announcements>
        },





        // member routes






        // admin routes
      ]
    }
  ]);
  

export default router;