import React, { useContext } from 'react';
import { assest } from '../assets/assests';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext/AppContext';

const NavBar = () => {
  const navigate = useNavigate() ;
  const {aToken,setAToken}=useContext(AppContext)

  const Logout=()=>{
    setAToken(null),
    localStorage.removeItem('aToken')
  }
  return (
    <div className=' flex justify-between  items-center px-4 sm:px-10 py-3 border-b bg-white'>
    <div className='flex items-center gap-2  text-xs'>
      <img className='w-17 cursor-pointer' src={assest.header} alt="" />
      <span onClick={()=> navigate('/')} className='break-words text-[#2b282a] whitespace-pre-wrap font-risque max-w-full max-h-full bg-none  font-m  text-[24px] leading-[108.333%] py-3 '>MangaGo</span>
      <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Admin</p>
    
    </div>
    <button onClick={()=>Logout()} className='bg-black text-gray-400 text-sm px-10 py-2 rounded-full'>Logout</button>
  </div>
  );
}

export default NavBar;
