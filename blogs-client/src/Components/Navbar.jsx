import { useContext, useState } from "react";
import { FaUser, FaXmark } from "react-icons/fa6";
import { FaBars, FaHome, FaPlus, FaSignInAlt } from "react-icons/fa";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Navbar = () => {
    const {user} = useContext(AuthContext)
    const [click, setClick] = useState(false);

    const toggleNav = ()=>{
        setClick(!click)
    }
    return (
        <nav className="bg-[#f48039] ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className=" flex-shrink-0">
                            <Link href="/" className="text-white text-2xl  font-bold">Blogs</Link>

                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-4 font-semibold">
                            <Link to="/" className="text-white hover:bg-white hover:text-black rounded-lg p-2 flex justify-center items-center gap-1"><FaHome/>Home</Link>
                            <Link to="/add-blog" className="text-white hover:bg-white hover:text-black rounded-lg p-2 flex justify-center items-center gap-1"><FaPlus/>Add Blog</Link>
                            <Link to="/favorites" className="text-white hover:bg-white hover:text-black rounded-lg p-2 flex justify-center items-center gap-1"><BsFillBookmarkStarFill/>Favorites</Link>

                            { user ? <p className="text-white p-2 flex justify-center items-center gap-1"><FaUser/>{user.name}</p> 
                            :
                            <Link to="/login" className="text-white hover:bg-white hover:text-black rounded-lg p-2 flex justify-center items-center gap-1"><FaSignInAlt/>Login</Link>

                            }
                            
                            
                            
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button className="text-white inline-flex justify-center items-center p-2 rounded-md  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white text-xl" onClick={toggleNav}>
                            {click ? <FaXmark/>
                            : 
                            <FaBars/>}
                        </button>
                    </div>
                </div>
            </div>
            {click && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-semibold">
                        <Link to="/" className="text-white hover:bg-white hover:text-black rounded-lg p-2 flex justify-start items-center gap-1"><FaHome/>Home</Link>

                        <Link to="/add-blog" className="text-white hover:bg-white hover:text-black rounded-lg p-2 flex justify-start items-center gap-1"><FaPlus/>Add Blog</Link>

                        <Link to="/favorites" className="text-white hover:bg-white hover:text-black rounded-lg p-2 flex justify-start items-center gap-1"><BsFillBookmarkStarFill/>Favorites</Link>

                        { user ? <p className="text-white flex p-2 justify-start items-center gap-1"><FaUser/>{user.name}</p> 
                            :
                            <Link to="/login" className="text-white hover:bg-white hover:text-black rounded-lg p-2 flex justify-center items-center gap-1"><FaSignInAlt/>Login</Link>
                        }
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;