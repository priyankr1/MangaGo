import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mangas } from "../assets/assets";
import { FaInfoCircle } from "react-icons/fa"; // Import icons
import RelatedManga from "../components/RelatedManga";

const Manga = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);

  useEffect(() => {
    const foundManga = mangas.find((manga) => manga._id === id);
    setManga(foundManga);
  }, [id]);

  return (
    manga && (
      <div className="flex flex-col">
      <div className="bg-white rounded-2xl  p-6 py-6 sm:py-10  w-full max-w-4xl mx-auto flex flex-col md:flex-row md:items-center gap-5 ">
   
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            className="w-60 h-auto rounded-lg shadow-md"
            src={manga.img}
            alt={manga.heading}
          />
        </div>

      
        <div className="w-full md:w-2/3">
          <h1 className='break-words text-[#2b282a] whitespace-pre-wrap font-risque max-w-full max-h-m bg-none  font-m  text-[20px] sm:text-[40px] leading-[108.333%] '>
            {manga.heading}
          </h1>
          <p className="text-gray-500">Genres: {manga.type}</p>
          <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm inline-block mt-2">
            Realsed-On:{manga.realsedon}
          </span>

          {/* About Section */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold flex items-center gap-1">
              About <FaInfoCircle className="text-gray-500" />
            </h2>
            <p className="text-gray-600 text-sm mt-1">{manga.text}</p>
          </div>

          {/* Sections (Buttons) */}
          <div className="mt-4 flex flex-wrap gap-2">
            {manga.section.map((sec, index) => (
              <button
                key={index}
                className="w-20 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-all"
              >
                {sec}
              </button>
            ))}
          </div>
        </div>
        </div>
        <RelatedManga  id={manga._id} type={manga.type}/>
      </div>
    )
  );
};

export default Manga;
