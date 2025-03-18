import React, { createContext, use, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userData, setUserData] = useState(null);
    const [mangaMarked, setMangaMarked] = useState([]);
    const [mangas, setMangas] = useState(() => {
        const storedMangas = localStorage.getItem('Mangas');
        return storedMangas ? JSON.parse(storedMangas) : [];
    });

  
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

    const getManga=async()=>{
     try {
       const {data}= await axios.get(`${backendUrl}/api/admin/all-manga`)
       if(data.success){
        setMangas(data.mangas)
        localStorage.setItem('mangas', JSON.stringify(data.mangas)); 
       }else{
        toast.error(data.message)
       }
       
     } catch (error) {
        toast.error(error.message)
     }
    }
    const refreshMangas = async () => {
        localStorage.removeItem('mangas'); // Clear localStorage
        await getManga(); // Fetch fresh data
    };

      const getBookedManga = async () => {
        try {
          if (userData) {
            const userId = userData._id;
            const { data } = await axios.get(`${backendUrl}/api/user/booked-manga`, { params: { userId }, headers: { token } })
    
            if (data.success) {
              setMangaMarked(data.mangaData);
              console.log(data);
            } else {
              console.log(data.message);
              toast.error(data.message);
            }
          }
        } catch (error) {
          console.log(error.message);
          toast.error(error.message);
        }
      };


    // Fetch user data when token changes
    useEffect(() => {
        if (token) {
            loadUserData();
        }
    }, [token]); 
    useEffect(()=>{
        getManga()
    },[])
    const value = {
        backendUrl,
        token,
        setToken: updateToken,
        userData,
        setUserData,
        loadUserData,
        mangas,
        refreshMangas,
        getManga,
        mangaMarked, setMangaMarked,
        getBookedManga
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
