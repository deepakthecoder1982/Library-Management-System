import { createContext, useState } from "react";

export const ContextApi = createContext();

const ContextApiProvider = ({children}) => {
    const [isAuth,setIsAuth] = useState(false);
    const [isRole,setIsRole] = useState("");
    return (
    <ContextApi.Provider value={{setIsRole,isRole,isAuth,setIsAuth}}>
        {children}
    </ContextApi.Provider>
    )
}

export default ContextApiProvider