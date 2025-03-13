import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userData, setUserData] = useState(null);

    const loadUserData = async () => { // Accept token as argument
        if (!token) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
                headers: { token}  // Use currentToken instead of outdated token
            });
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const updateToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("token", newToken);
            loadUserData(); // Pass newToken to avoid outdated value
        } else {
            localStorage.removeItem("token");
            setUserData(null);
        }
    };

    // Fetch user data when token changes
    useEffect(() => {
        if (token) {
            loadUserData();
        }
    }, [token]); 

    const value = {
        backendUrl,
        token,
        setToken: updateToken,
        userData,
        setUserData,
        loadUserData,
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
