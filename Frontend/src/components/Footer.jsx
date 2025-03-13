import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div
      className="bg-cover bg-center h-[50vh]  sm:h-[60vh] flex items-center justify-center text-[#64e0e0]"
      style={{ backgroundImage: `url(${assets.footer_img})` }}
    >
      <div className="max-w-7xl w-full px-6 md:px-12 flex flex-col md:flex-row items-center md:items-start justify-between">
     
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <img src={assets.footer_icon} alt="Logo" className="w-20 h-20" />
          <p className="text-m">
            © 2025 MangaGo, Inc. <br />
            All rights reserved by Priyanshu Rautela.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-14 text-s mt-6 md:mt-0">
          <ul className="space-y-2 text-center md:text-left">
            <li className="font-semibold text-white">Resources</li>
            <li className='text-m font-medium'>Home</li>
            <li className='text-m font-medium'>About</li>
            <li className='text-m font-medium'>Products</li>
            <li className='text-m font-medium'>Contact</li>
          </ul>
          <ul className="space-y-2 text-center md:text-left">
            <li className="font-semibold text-white">Connect</li>
            <li className='text-m font-medium'>Twitter</li>
            <li className='text-m font-medium'>Instagram</li>
            <li className='text-m font-medium'>Facebook</li>
            <li className='text-m font-medium'>YouTube</li>
          </ul>
          <ul className="space-y-2 text-center md:text-left">
            <li className="font-semibold text-white">Explore</li>
            <li className='text-m font-medium'>Manga</li>
            <li className='text-m font-medium'>Anime</li>
            <li className='text-m font-medium'>Events</li>
            <li className='text-m font-medium'>Awards</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
