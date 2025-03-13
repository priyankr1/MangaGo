import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") || null);

    const value = {
        backendUrl,
        aToken,setAToken
    };

    return <AppContext.Provider value={value}>
    {props.children}
    </AppContext.Provider>;
};

export default AppContextProvider;
