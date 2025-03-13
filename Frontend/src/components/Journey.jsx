import React from 'react';
import { mangas } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

const Journey = () => {
  const navigate =useNavigate()
  return (
    <div className="bg-[#fafbfe] flex items-center justify-center py-16">
      <div className="flex flex-col w-[80%]">
        
        {/* Heading Section */}
        <div className="mb-6 text-left">
          <p className="text-red-500 font-medium mb-2">Explore the Vibrant Anime Manga Community</p>
          <div className="flex justify-between items-center py-4">
            <p className="break-words text-[#333033] whitespace-pre-wrap font-risque max-w-full max-h-m bg-none  font-m  text-[30px] sm:text-[40px] leading-[108.333%] pl-10 sm:pl-0">Connect with Fellow Enthusiasts</p>
            <p className="text-gray-500 hidden md:block">Dive into the Extraordinary</p>
          </div>
        </div>

        {/* Manga Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-10">
          {mangas.slice(3,8).map((item, index) => (
            <div onClick={()=>{navigate(`/mangas/${item._id}`);scrollTo(0,0)}} key={index} className="flex flex-col items-center  gap-5 ">
              <img 
              src={item.img} 
                alt={item.heading} 
                className="w-[180px] h-[250px] object-cover rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              />
              <div>
              <p className="text-gray-500 text-lg font-m mt-2">{item.heading}</p>
              <p className="text-gray-400 text-m">Read More</p>
              </div>
             
            </div>
          ))}
        </div>

        {/* Button Section */}
        <div className="flex justify-center mt-8">
          <button onClick={()=>{navigate('/all-manga');scrollTo(0,0)}} className="bg-black text-gray-400 px-6 py-3 rounded-lg text-lg cursor-pointer font-medium transition hover:bg-gray-800">
            Start Your Journey
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Journey;
