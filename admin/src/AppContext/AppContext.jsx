import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") || null);
    const [mangas,setMangas] = useState([])

    const getManga=async()=>{
        try {
            const {data}= await axios.get(`${backendUrl}/api/admin/all-manga`)
            if(data.success){
                setMangas(data.mangas)
                localStorage.setItem('mangas', JSON.stringify(data.mangas)); 
            }else{
                console.log(data.message)
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }    
    }
    const refreshMangas = async () => {
            localStorage.removeItem('mangas'); // Clear localStorage
            await getManga(); // Fetch fresh data
        };
    useEffect(()=>{
        getManga()
    },[])
    const value = {
        backendUrl,
        aToken,setAToken,
        mangas,
        setMangas,
        refreshMangas
    };

    return <AppContext.Provider value={value}>
    {props.children}
    </AppContext.Provider>;
};

export default AppContextProvider;
