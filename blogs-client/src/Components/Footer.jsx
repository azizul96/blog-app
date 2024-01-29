import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className=" dark:bg-gray-900 bg-[#f48039]">
            <div className="container p-6 mx-auto">
                <div className="px-6  flex flex-col justify-center items-center text-white font-semibold text-2xl">
                    <Link to="/">
                        Follow Us
                    </Link>

                    <div className="flex mt-6 -mx-2">
                            <a href="#"
                                className="mx-2 text-white transition-colors duration-300  hover:text-blue-500 "
                                aria-label="LinkedIn">
                                    <FaLinkedinIn></FaLinkedinIn>
                            </a>
                            <a href="#"
                                className="mx-2 text-white transition-colors duration-300  hover:text-blue-500"
                                aria-label="Facebook">
                                <FaFacebook></FaFacebook>
                            </a>
                    </div>
                </div>

                <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700"/>

                <div>
                    <p className="text-center text-white">© Copyright 2024 - All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;