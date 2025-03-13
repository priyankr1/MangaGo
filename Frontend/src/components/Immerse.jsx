import React from 'react';

const Immerse = () => {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center  h-auto sm:h-[35vh] gap-[8vw] py-10 bg-[#1f1f23]">
    
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="break-words text-[#fbfaf9] whitespace-pre-wrap font-risque max-w-full max-h-m bg-none font-m text-[20px] sm:text-[30px] leading-[108.333%] pl-10 sm:pl-0">
              Immerse Yourself in the Anime
            </p>
            <p className="text-gray-400 text-m">
              Discover the Enchanting Worlds and Captivating Characters
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Connect with the Passionate Anime Manga Community</p>
          </div>
        </div>
  
        <div className="flex flex-col sm:flex-row gap-[8vw] w-full sm:w-auto justify-center">
          <div className="flex flex-row sm:flex-row gap-6 sm:gap-[8vw]">
            <ul className="flex flex-col gap-4">
              <li className="text-gray-400 font-semibold">Explore </li>
              <li className="text-gray-400">Discover </li>
              <li className="text-gray-400">Learn More</li>
            </ul>
            <ul className="flex flex-col gap-4"> 
                <li className="text-gray-400 font-semibold">Embrace</li>
            </ul>
  
            <ul className="flex flex-col gap-4">
              <li className="text-gray-400 font-semibold">Dive into </li>
              <li className="text-gray-400">Uncover the </li>
              <li className="text-gray-400">Explore the</li>
            </ul>
  
            <ul className="flex flex-col gap-4">
              <li className="text-gray-400 font-semibold">Connect</li>
              <li className="text-gray-400">Discover the </li>
              <li className="text-gray-400">Immerse</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  

export default Immerse;
