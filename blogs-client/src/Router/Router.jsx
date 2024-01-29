import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import BlogDetails from "../Pages/BlogDetails";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import AddBlog from "../Pages/AddBlog";
import PrivateRoute from "../Private/PrivateRoute";
import Favorites from "../Pages/Favorites";
import UpdateBlog from "../Pages/UpdateBlog";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/detail/:id",
            element: <BlogDetails></BlogDetails>,
        },
        {
            path: "/signup",
            element: <SignUp></SignUp>
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
          path: "/add-blog",
          element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
        },
        {
          path: "/update/:id",
          element: <UpdateBlog></UpdateBlog>
        },
        {
          path: "/favorites",
          element: <Favorites></Favorites>
        }
      ]
    },
  ]);

export default router;