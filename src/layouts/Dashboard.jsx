import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";


const Dashboard = () => {
    return (
        <div className='relative min-h-screen md:flex bg-[#f5fcf4] '>
        {/* Left Side: Sidebar Component */}
        <Sidebar />
        {/* Right Side: Dashboard Dynamic Content */}
        <div className='flex-1  md:ml-64 overflow-x-scroll'>
          <div className='p-5'>
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default Dashboard;