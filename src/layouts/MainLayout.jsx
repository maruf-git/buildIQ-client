import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/Shared/Footer";



const MainLayout = () => {
    return (
        <div>
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
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;