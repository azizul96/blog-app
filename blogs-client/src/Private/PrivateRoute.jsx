import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate } from "react-router-dom";



const PrivateRoute = ({children}) => {
    const { user } = useContext(AuthContext)
    // if(loading){
    //     return  <div className=" flex justify-center items-center mt-20">
    //                 <span className=" font-bold text-2xl">Loading...</span>
    //             </div>
    // }
    
    if(user == null){
        return <Navigate to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;