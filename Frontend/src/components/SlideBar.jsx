import React from 'react';
import { assets } from '../assets/assets';

const SlideBar = () => {
    const slideImg =[{
        img:assets.slide1_img
    },{
        img:assets.slide2_img
    },{
        img:assets.slide3_img
    }]
  return (
    <div className='pt-10 flex flex-col items-center'>
      <h1 className='break-words text-[#2b282a] whitespace-pre-wrap font-risque max-w-full max-h-full bg-none  font-m  text-[60px] leading-[108.333%] py-15 '>Explore The</h1>
      <div className='flex items-center justify-center gap-2 sm:gap-7'>
        {
            slideImg.map((item,index)=>(
              <img 
              key={index} 
              className="w-30 sm:w-105 transition-all duration-300 hover:scale-105 rounded-lg" 
              src={item.img} 
              alt="" 
            />            
            ))
        }
      </div>
    </div>
  );
}

export default SlideBar;
