
import { useQuery } from "@tanstack/react-query";
import BlogCard from "../Components/BlogCard";
import useAxiosHandle from "../Hook/useAxiosHandle";
import Footer from "../Components/Footer";
import Swal from "sweetalert2";


const Home = () => {
    const axiosHandle = useAxiosHandle()
    const {data: blogs = [], refetch} = useQuery({
        queryKey: ['blogs'],
        queryFn: async() =>{
            const res = await axiosHandle.get('/blogs')
            return res.data
        }
        
    })

    const handleDelete = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
          })
        .then((result) => {
            if (result.isConfirmed) {

                axiosHandle.delete(`/blogs/${id}`)
                .then(res =>{
                    console.log(res.data);
                    if(res.data.deletedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Blog post has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    }
                    
                })
            }
        });
    }
    return (
        <div>
            <div>
                <div className="w-full bg-center bg-cover " >
                    <img className="w-full" src="/banner.png" alt="" />
                </div>
                {/* style={{backgroundImage:  'url(/banner.png)'}} */}
            </div>
            <div className="my-10 flex flex-col gap-4 container mx-auto px-6">
                {
                    blogs?.map(blog => <BlogCard key={blog._id} blog={blog} handleDelete={handleDelete}></BlogCard>)
                }
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
        
    );
};

export default Home;