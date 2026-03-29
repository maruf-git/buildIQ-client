import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";

const Dashboard = () => {
    return (
        <div className='relative min-h-screen md:flex bg-gray-50 font-sans selection:bg-green-500/30'>
            {/* Elegant Sidebar */}
            <Sidebar />
            
            {/* Main Content Area */}
            <div className='flex-1 md:ml-[280px] min-h-screen transition-all duration-300'>
                <div className='p-5 md:p-10 max-w-[1600px] mx-auto opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]'>
                    <Outlet />
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;