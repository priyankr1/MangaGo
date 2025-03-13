import React, { useEffect, useState } from 'react';
import { mangas } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

const RelatedManga = ({ id, type }) => {
    const navigate=useNavigate()
  const [manga, setManga] = useState([]);

  useEffect(() => {
    const foundManga = mangas.filter((manga) => manga.type === type && manga._id !== id);
    setManga(foundManga);
  }, [id, type]);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h2 className="break-words text-[#2b282a] whitespace-pre-wrap font-risque max-w-full max-h-m bg-none  font-m  text-[20px] sm:text-[40px] leading-[108.333%] ">Related Mangas</h2>
        <p className="text-gray-500">Simply browse through our extensive list of trusted mangas.</p>
      </div>

      {/* Manga Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {manga.map((item, index) => (
          <div
            key={index}
            onClick={()=>{ navigate(`/mangas/${item._id}`);scroll(0,0)}}
            className="bg-white rounded-lg shadow-md border-none p-4 flex flex-col items-center w-72 transition-transform hover:scale-105"
          >
            <img className="w-50 h-60 object-cover rounded-lg" src={item.img} alt={item.heading} />
            <div className="text-center mt-4">
              <h2 className="break-words text-[#2b282a] whitespace-pre-wrap font-risque max-w-full max-h-m bg-none  font-m  text-[10px] sm:text-[20px] leading-[108.333%] ">{item.heading}</h2>
              <p className="text-gray-500 text-[14px]">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button onClick={()=> {navigate('/all-manga');scrollTo(0,0)}} className=' border-2 border-gray-300 bg-black font-semibold text-sm sm:text-base text-[#7a7978] px-10 py-3 rounded-full mt-6 hover:scale-105 transition-all cursor-pointer w-m'>
        More
      </button>
    </div>
  );
};

export default RelatedManga;
