import { createContext, useState, useEffect } from "react";

export const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
    
        setUser(user)
        console.log("context: ", user)
      }, [])

    const API = "http://localhost:8000"
    const [user, setUser] = useState();

  return <MainContext.Provider value={{API, user, setUser}}>{children}</MainContext.Provider>;
};
