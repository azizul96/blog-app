
import useAxiosHandle from "../Hook/useAxiosHandle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateBlog = () => {
    const {id} = useParams()
    const [blog, setBlog] = useState({});
    const axiosHandle = useAxiosHandle()

    useEffect(() => {
        axiosHandle.get('/blogs')
        .then(res =>{
            const filterBlog = res.data.find(item => item.id == id)
            setBlog(filterBlog)
        })
    }, [axiosHandle, id]); 
    
    const handleSubmit = e =>{
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const body = form.body.value
        const updateInfo = {title, body}
        axiosHandle.patch(`/blogs/${blog._id}` , updateInfo)
        .then(res =>{
            if(res.data.modifiedCount > 0){
                toast.success('Updated successfully' );
            }
        })
    }
    return (
        <section className="container p-6 mx-auto bg-slate-200 rounded-md shadow-xl dark:bg-gray-800 my-10 ">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-10">Update Blog</h2>

            <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="text-gray-700 dark:text-gray-200" >Title</label>
                        <input  type="text" name="title" defaultValue={blog.title} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" >Body </label>
                        <textarea  name="body" defaultValue={blog.body} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>
                <div className="flex justify-end mt-6">
                    <button className="px-8 py-2.5  w-full text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Add Blog</button>
                </div>
            </form>
        </section>
    );
};

export default UpdateBlog;