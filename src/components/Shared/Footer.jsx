import { Link } from "react-router-dom";
import logo from '../../assets/images/home.png'
import Container from "./Container";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa6";


const Footer = () => {
    return (
        <div>
            <Container>
                <div className="flex justify-between">
                    {/* logo and description and social */}
                    <div className="w-1/2">
                        <div className="flex  justify-center gap-10">
                            <Link to='/' className="w-full">
                                <img className="h-[200px] w-full object-cover" src={logo} alt="" />
                            </Link>
                            <div>
                                <Link to='/' className="font-bold text-3xl">Build<span className="text-green-600">IQ</span></Link>
                                <p className="mt-5">Explore a diverse range of apartments, from budget-friendly options to premium luxury residences. Begin your journey with us today and take the first step toward your new home.</p>
                                <div>
                                    <div className="flex mt-4 space-x-4">
                                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=" text-slate-600 hover:text-slate-900">
                                            <FaFacebook size={30} />
                                        </a>
                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900">
                                            <FaTwitter size={30} />
                                        </a>
                                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900">
                                            <FaYoutube size={30} />
                                        </a>
                                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900">
                                            <FaLinkedin size={30} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-10">
                        {/* company */}
                        <div className="flex flex-col gap-2">
                            <h1 className="mb-3 font-bold text-xl">Company</h1>
                            <Link to=''>About Us</Link>
                            <Link to=''>Careers</Link>
                            <Link to=''>Blog</Link>
                            <Link to=''>Contact Us</Link>

                        </div>
                        {/* Services */}
                        <div className="flex flex-col gap-2">
                            <h1 className="mb-3 font-bold text-xl">Services</h1>
                            <Link to=''>Popular Locations</Link>
                            <Link to=''>New Listing</Link>
                            <Link to=''>Careers</Link>
                            <Link to=''>Tenant Reviews</Link>
                            <Link to=''>Neighborhood Guide</Link>
                        </div>
                        {/* legal */}
                        <div className="flex flex-col gap-2">
                            <h1 className="mb-3 font-bold text-xl">Privacy Policy</h1>
                            <Link to=''>Terms & Conditions</Link>
                            <Link to=''>Privacy Policy</Link>
                            <Link to=''>Refund Policy</Link>
                            <Link to=''>Tenant Rights </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;