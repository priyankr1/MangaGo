import React from 'react';
import { NavLink } from 'react-router-dom';
import { assest } from '../assets/assests'; 

const Sidebar = () => {
  return (
    <div className='min-h-screen bg-white  '>
      <ul className='text-[#515151] mt-5'>
        <NavLink 
          className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary ' : ''}`} 
          to={'/admin-dashboard'}
        >
          <img src={assest.home_icon} alt="" />  
          <p>Dashboard</p>
        </NavLink>
        <NavLink 
          className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary ' : ''}`} 
          to={'/add-manga'}
        >
          <img src={assest.add_icon} alt="" /> 
          <p>Add Manga</p>
        </NavLink>
        <NavLink 
          className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary ' : ''}`} 
          to={'/all_manga'}
        >
          <img className='w-8' src={assest.allmanga} alt="" />  
          <p>All Manga</p>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
