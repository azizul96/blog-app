import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    
    console.log(user);
    
    useEffect(()=>{
        
        const storedUser = sessionStorage.getItem('userDetails');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        
        
    },[])
    
    const authInfo = {
        user,
        setUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;