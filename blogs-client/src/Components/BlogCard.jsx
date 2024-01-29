import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";



const BlogCard = ({blog, handleDelete}) => {

    return (
        <div className="flex overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="w-1/3 bg-cover" style={{backgroundImage: 'url(/blog.png)'}}></div>

            <div className="w-2/3 p-4 md:p-4">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">{blog.title}</h1>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{blog.body.slice(0, 200)}...</p>

                <div className="flex items-end justify-between mt-4">
                    <div className="flex justify-center items-center gap-2">
                        <button  className="text-xl text-green-500"><Link to={`/update/${blog.id}`}><FaEdit/></Link></button>
                        
                        <button onClick={()=>handleDelete(blog._id)} className="text-xl text-red-500"><FaTrash/></button>
                    </div>
                    <div className="flex flex-col items-center gap-4"> 
                        <button  className="px-3 py-1 text-sm md:font-semibold text-white bg-[#f48039] rounded-full "><Link to={`/detail/${blog.id}`}>See Details </Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;

