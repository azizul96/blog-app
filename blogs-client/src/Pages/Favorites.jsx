import { useEffect, useState } from "react";
import FavoriteCard from "../Components/FavoriteCard";

const Favorites = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const favoritesFromStorage = JSON.parse(sessionStorage.getItem('favorites')) || [];
        setBlogs(favoritesFromStorage);
    }, []);
    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 my-10 container mx-auto px-4">
            {
                blogs?.map(blog => <FavoriteCard key={blog.id} blog={blog}></FavoriteCard>)
            }
        </div>
    );
};

export default Favorites;