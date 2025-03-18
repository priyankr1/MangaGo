import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const BookMarked = () => {

  const { userData, backendUrl, token,mangaMarked,getBookedManga} = useContext(AppContext);
  const navigate = useNavigate();

  const removeMarkedManga = async(id)=>{
    try {
        const {data}= await axios.post(`${backendUrl}/api/user/delete-marked`,{id},{headers:{token:token}})
        if(data.success){
          toast.success(data.message)
          getBookedManga()
        }else{
          console.log(data.message)
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (userData) {
      getBookedManga();
    }
  }, [userData]);
  

  return (
    <div className='flex items-center sm:items-center justify-center  sm:justify-center pb-20 pt-10'>
      <div className="w-full sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-6  sm:pl-0 ">
      {
        mangaMarked?
        mangaMarked.map((item, index) => (
          <div  key={index} className='flex flex-col items-center justify-center'>
          <img className=' cursor-pointer' onClick={()=>{removeMarkedManga(item._id)}} src={assets.cancel_icon} alt="" />
          <div 
            onClick={() => {
              navigate(`/mangas/${item.mangaId}`);
              scroll(0, 0);
            }}
            className="bg-white w-65 rounded-lg shadow-md border-none p-4 flex flex-col items-center  overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
           
            <img
              className="w-50 h-60 object-cover rounded-lg"
              src={item.mangaData.banner}
              alt={item.mangaData.name}
            />
            <div className="text-center mt-4">
              <h2 className="break-words text-[#2b282a] whitespace-pre-wrap font-risque max-w-full font-m text-[15px] sm:text-[20px] leading-[108.333%]">
                {item.mangaData.name}
              </h2>
              <p className="text-gray-500 text-[10px] sm:text-[14px]">
                {item.mangaData.about}
              </p>
            </div>
          </div>
          </div>
        )) :
        <p>Loading</p>
      }
    </div>
    </div>
    
  );
};

export default BookMarked;
