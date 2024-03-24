import { createContext, useState, useEffect } from "react";

export const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {

    const API = "http://localhost:8000"
    const [user, setUser] = useState();
    const [ready, setReady] = useState(false);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user)
        console.log("context: ", user)
        setReady(true)
      }, [])

  return <MainContext.Provider value={{API, user, setUser, ready}}>{children}</MainContext.Provider>;
};
