import { useContext } from "react";
import useAxiosHandle from "../Hook/useAxiosHandle";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";


const AddBlog = () => {
    const {user} = useContext(AuthContext)
    const axiosHandle = useAxiosHandle()

    const handleSubmit = e =>{
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const body = form.body.value
        
        axiosHandle.get('/blogs')
        .then(res =>{
            const id = res.data.length + 1
            const userId = user.userId
            const blogInfo = {userId, id, title, body}
            axiosHandle.post('/blogs', blogInfo)
            .then(res =>{
                if(res.data.insertedId){
                    toast.success("Blog Added!")
                }
                else{
                    toast.error("Something Wrong!")
                }
            })
        })
        .catch(error =>{
            console.log(error);
        })
    }
    return (
        <section className="container p-6 mx-auto bg-slate-200 rounded-md shadow-xl dark:bg-gray-800 my-10 ">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-10">Add New Blog</h2>

            <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="text-gray-700 dark:text-gray-200" >Title</label>
                        <input  type="text" name="title" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" >Body </label>
                        <textarea  name="body" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>
                <div className="flex justify-end mt-6">
                    <button className="px-8 py-2.5  w-full text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Add Blog</button>
                </div>
            </form>
        </section>
    );
};

export default AddBlog;