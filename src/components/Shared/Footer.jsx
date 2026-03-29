import { Link } from "react-router-dom";
import logo from '../../assets/images/home.png'
import Container from "../../components/shared/Container";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-400 mt-20">
            <Container>
                <div className="pt-14 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                        {/* brand */}
                        <div className="lg:col-span-1">
                            <Link to='/' className="flex items-center gap-2 mb-4">
                                <img className="w-8 h-8 object-contain brightness-0 invert" src={logo} alt="BuildIQ" />
                                <span className="text-xl font-bold text-white">
                                    Build<span className="text-green-500">IQ</span>
                                </span>
                            </Link>
                            <p className="text-sm leading-relaxed text-gray-400">
                                Explore a diverse range of apartments, from budget-friendly options to premium luxury residences. Begin your journey today.
                            </p>
                            <div className="flex mt-5 gap-3">
                                {[
                                    { Icon: FaFacebook, href: 'https://www.facebook.com/mdmaruf55', label: 'Facebook' },
                                    { Icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
                                    { Icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
                                    { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/md-maruf-ur-rahman-munna/', label: 'LinkedIn' },
                                ].map(({ Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-green-600 text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <Icon size={15} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* company */}
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
                            <ul className="space-y-2.5">
                                {['About Us', 'Careers', 'Blog', 'Contact Us'].map(item => (
                                    <li key={item}>
                                        <Link to='' className="text-sm hover:text-green-400 transition-colors duration-200">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* services */}
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h3>
                            <ul className="space-y-2.5">
                                {['Popular Locations', 'New Listings', 'Tenant Reviews', 'Neighborhood Guide'].map(item => (
                                    <li key={item}>
                                        <Link to='' className="text-sm hover:text-green-400 transition-colors duration-200">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* legal */}
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
                            <ul className="space-y-2.5">
                                {['Terms & Conditions', 'Privacy Policy', 'Refund Policy', 'Tenant Rights'].map(item => (
                                    <li key={item}>
                                        <Link to='' className="text-sm hover:text-green-400 transition-colors duration-200">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-gray-500">© {new Date().getFullYear()} BuildIQ. All rights reserved.</p>
                        <p className="text-xs text-gray-600">Built with ❤️ for modern living</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;