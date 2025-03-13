import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className='p-10 flex flex-col sm:flex-row items-center justify-center sm:justify-evenly'>
     <div className='relative right-0 top-0 sm:right-12 sm:top-[72px]'>
        <img className='w-130' src={assets.assest_heroimg} alt="" />
      </div>
      <div className='flex flex-col sm:block sm:relative right-0 bottom-0 sm:right-10 sm:bottom-5'>
      <p className=' text-gray-500  text-2xl sm:text-xl font-medium'>Discover the Captivating World of Anime Manga</p>
      <p className='break-words text-[#2b282a] whitespace-pre-wrap font-risque max-w-full max-h-full bg-none  font-m  text-[60px] leading-[108.333%] py-3  '>Immerse Yourself in <span className="hidden sm:inline"><br /></span> the Enchanting </p>
      <p className="pt-4 text-gray-500 font-medium sm:font-normal text-xl sm:text-m">
  Anime Manga: Where Imagination Soars! Explore a universe of captivating
  <span className="hidden sm:inline"><br /></span> 
  stories, breathtaking visuals, and unforgettable characters.
</p>

      <button onClick={() => {
  const thirdSection = document.getElementById("readpage");
  if (thirdSection) {
    window.scrollTo({
      top: thirdSection.offsetTop,
      behavior: "smooth"
    });
  }
}} className='bg-black font-semibold text-sm sm:text-base text-[#c2c0bd] px-8 py-3 cursor-pointer rounded-full mt-6 hover:scale-105 transition-all w-m '>Explore Now</button>
      </div>
      </div>
  );
}

export default Header;
