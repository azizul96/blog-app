import { Link, useNavigate } from "react-router-dom";
import useAxiosHandle from "../Hook/useAxiosHandle";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";


const SignUp = () => {
    const axiosHandle = useAxiosHandle()
    const navigate = useNavigate(null)
    const { setUser } = useContext(AuthContext)
    const handleRegister = e =>{
        e.preventDefault()
        const form = e.target; 
        const name = form.name.value
        const userId = parseInt(form.userId.value)
        const email = form.email.value
        const password = form.password.value
        console.log(name , email, userId, password);

        const userInfo = {name , email, userId, password}
        console.log(userInfo);
        axiosHandle.post('/user', userInfo)
        .then(res =>{
            if(res.data.insertedId){
                toast.success("SignUp Successfully!")
                sessionStorage.setItem('userDetails', JSON.stringify(userInfo));
                const storedUser = sessionStorage.getItem('userDetails');
                setUser(JSON.parse(storedUser));
                navigate("/")
            }
            else{
                toast.error("Something Wrong!")
            }
        })
        .catch(error => {
            console.log(error.message);
        })
    }
    return (
        <div>
            
            <div className="flex w-full container mx-auto px-6 overflow-hidden bg-white rounded-lg shadow-lg mt-10 ">

                <div className="hidden bg-cover lg:block lg:w-1/2" >
                    <img src="/login.webp" alt="" className="object-cover" />
                </div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">

                    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                        Welcome !
                    </p>

                    <form onSubmit={handleRegister}>
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Full Name</label>
                            <input type="text"  name="name" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" required/>
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >User ID</label>
                            <input type="number" min={100} max={999}  name="userId" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Between 100-999" />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Email Address</label>
                            <input type="email"  name="email" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"  required/>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Password</label>
                            </div>

                            <input type="password" name="password" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"  required/>
                        </div>

                        <div className="mt-6">
                            <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#f48039] rounded-lg hover:bg-orange-500">
                                Register
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b  md:w-1/4"></span>

                        <Link to="/login" className="text-sm font-semibold text-[#fb8500] uppercase  hover:underline">or Login</Link>

                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;