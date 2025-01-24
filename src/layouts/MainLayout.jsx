import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/Shared/Footer";



const MainLayout = () => {
    return (
        <div>
            <ScrollRestoration></ScrollRestoration>
            {/* header section */}
            <header>
                {/* <Navbar></Navbar> */}
                <nav>
                    <Navbar></Navbar>
                </nav>
            </header>

            {/* main section */}
            <main className="min-h-[100vh]">
                <Outlet></Outlet>
            </main>

            {/* footer section */}
            <footer className="mt-24 py-20 bg-[#e7f5e9]">
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;