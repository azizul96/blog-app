import { Link, useNavigate } from "react-router-dom";
import useAxiosHandle from "../Hook/useAxiosHandle";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";



const Login = () => {
    const { setUser } = useContext(AuthContext)
    const axiosHandle = useAxiosHandle()
    const navigate = useNavigate(null)

    const handleLogin = e =>{
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        axiosHandle.get(`/user/${email}` )
        .then(res => {
            const data = res.data
            if(data.email !== email || data.password !== password){
                toast.error("Not Found !")
            }
            else{
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    userId: data.userId,
                    password: data.password
                }
                toast.success("Login Successfully!")
                sessionStorage.setItem('userDetails', JSON.stringify(userInfo));
                const storedUser = sessionStorage.getItem('userDetails');
                setUser(JSON.parse(storedUser));
                navigate("/")
            }
            
        })
        
    }
    return (
        <div>
            <div className="flex w-full container mx-auto px-6 overflow-hidden bg-white rounded-lg shadow-lg my-10 bg-transparent">

                <div className="hidden bg-cover lg:block lg:w-1/2" >
                    <img src="/login.webp" alt="" className="object-cover" />
                </div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    {/* <div className="flex justify-center mx-auto">
                        <img className="w-20" src="/logo.png" alt=""/>
                    </div> */}

                    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                        Welcome back!
                    </p>

                    <form onSubmit={handleLogin}>
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Email Address</label>
                            <input type="email"  name="email" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"  />
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Password</label>
                            </div>

                            <input type="password" name="password" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"  />
                        </div>

                        <div className="mt-6">
                            <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#f48039] rounded-lg hover:bg-orange-500 ">
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-4 mb-5">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                        <Link to="/signup" className="text-sm font-semibold text-[#fb8500] uppercase dark:text-gray-400 hover:underline">or Sign Up</Link>

                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;