import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Dashboard/Common/Profile";
import Announcements from "../pages/Dashboard/Common/Announcements";
import Apartments from "../pages/Apartments/Apartments";



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
          element:<Apartments></Apartments>
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