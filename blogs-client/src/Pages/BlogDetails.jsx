import { useContext, useEffect, useState } from "react";
import Comment from "../Components/Comment";
import { useParams } from "react-router-dom";
import useAxiosHandle from "../Hook/useAxiosHandle";
import { MdBookmarkAdd } from "react-icons/md";
import { AuthContext } from "../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import useAxiosHandle from "../Hook/useAxiosHandle";
// import { useQuery } from "@tanstack/react-query";



const BlogDetails = () => {
    const {id}  = useParams()
    const {user} = useContext(AuthContext)
    const [filteredComments, setFilteredComments] = useState([]);
    const [blog, setBlog] = useState({});
    const axiosHandle = useAxiosHandle()
    const [favorites, setFavorites] = useState([]);

    const {data: comments =[], refetch} = useQuery({
        queryKey: ['comment'],
        queryFn: async()=>{
            const res = await axiosHandle.get('/comment')
            return res.data
        }
    })

    useEffect(() => {
        axiosHandle.get('/blogs')
        .then(res =>{
            const filterBlog = res.data.find(item => item.id == id)
            setBlog(filterBlog)
        })
    }, [axiosHandle, id]); 

    useEffect(() => {
        const filterComment = comments.filter(comment => comment.blogId == id)
        sessionStorage.setItem('filteredComments', JSON.stringify(filterComment));
        // Retrieve filtered comments from session storage
        const storedComments = sessionStorage.getItem('filteredComments');
        if (storedComments) {
            setFilteredComments(JSON.parse(storedComments));
        }
    }, [comments, id]);


    useEffect(() => {
        const favoritesFromStorage = JSON.parse(sessionStorage.getItem('favorites')) || [];
        setFavorites(favoritesFromStorage);
    }, []);

    const handleSubmit = e =>{
        e.preventDefault()
        if(!user){
           return toast.error("user not found")
        }
        const form = e.target
        const body = form.body.value
        const blogId = blog.id
        const name = user.name
        const email = user.email
        axiosHandle.get('/comment')
        .then(res =>{
            const id = res.data.length + 1
            const commentInfo = {blogId, id, name, email, body}
            axiosHandle.post('/comment', commentInfo)
            .then(res =>{
                if(res.data.insertedId){
                    toast.success("Comment Added!")
                    refetch()
                }
                else{
                    toast.error("Something Wrong!")
                }
            })
        })
    }

    const handleFavorite = ()=>{
        const updatedFavorites = [...favorites, blog];
        setFavorites(updatedFavorites);
        sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        toast.success("Added into favorites")
    }
    const handleDelete = (id) =>{
        console.log(id);
        axiosHandle.delete(`/comment/${id}`)
        .then(res =>{
            console.log(res.data);
            if(res.data.deletedCount > 0){
                toast.success("Comment Deleted!")
                refetch()
            }
            
        })
    }
    return (
        <section className="bg-white dark:bg-gray-900 container mx-auto px-6">
            <div className=" py-10 ">
                <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
                    <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src="/blog.png"alt=""/>

                    <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                        
                        <h1 className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white">
                            {blog.title}
                        </h1>

                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                            {blog.body}
                        </p>
                        <button onClick={handleFavorite} className="flex justify-center items-center gap-2 bg-orange-500 text-white font-medium px-2 py-1 rounded-sm mt-6">Add to favorite <MdBookmarkAdd className="text-lg"/></button>
        
                    </div>
                </div>
            </div>
            <div className="mb-10">
                <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Write Comment</label>
                        <textarea name="body" className="block w-full h-12 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border-2 outline-none border-gray-200 rounded-lg  focus:border-orange-400" placeholder="Comment"></textarea>
                        <div className="text-right">
                            <button className="bg-orange-500 text-white px-3 py-1 rounded-sm mt-1">Submit</button>
                        </div>
                </form>
            </div>
            <div className="mb-10">
                <h1 className="font-semibold border-b-2 inline-block mb-10">Comments</h1>
                {
                    filteredComments.map(comment => <Comment key={comment.id} comment={comment} handleDelete={handleDelete}></Comment>)
                }
            </div>
        </section>
    );
};

export default BlogDetails;