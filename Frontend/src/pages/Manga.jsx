import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import RelatedManga from "../components/RelatedManga";
import { AppContext } from "../AppContext/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Manga = () => {
  const { id } = useParams();
  const { mangas, backendUrl , token ,userData  , mangaMarked } = useContext(AppContext);
  const [manga, setManga] = useState(null);
  const [pages, setPages] = useState([])
  const [bookMark,setBookMark]= useState(true)
  const [isTrue, setIsTrue] = useState(false);
  const [prevSec, setPrevSec] = useState("");
  const foundManga = () => {
    if (mangas.length > 0) {
      const foundManga = mangas.find((m) => m._id === id);
      console.log("Found Manga:", foundManga.seasons);
      setManga(foundManga || null);
    }
  }
  const seasonPage = (secName, page) => {
    console.log(secName);
    if (isTrue && prevSec === secName) {
      setIsTrue(false);
      setPages([]);
      setPrevSec("");
      return;
    }
    setPrevSec(secName);
    setPages(page)
    setIsTrue(true);
  };

  const mangaMark = async()=>{
    console.log("hello bhai")
    try {
      if(userData){
          const markedData={
            userId:userData._id,
            mangaId:id,
            mangaData:manga
          }
          const {data} =await axios.post(`${backendUrl}/api/user/book-mark`,markedData,{headers:{token:token}})
          if(data.success){
            toast.success(data.message)
            setBookMark(false)
          }else{
            toast.error(data.message)
          }
      }
    } catch (error) {
     toast.error(error.message) 
    }
  }
  useEffect(() => {
    foundManga();
  }, [id, mangas]);
  
  if (!manga) {
    return <p className="text-2xl">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl p-6 py-6 sm:py-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row md:items-center gap-5">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            className="w-60 h-auto rounded-lg shadow-md"
            src={manga.banner}
            alt={manga.name}
          />
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="break-words text-[#2b282a] font-risque max-w-full text-[20px] sm:text-[40px]">
            {manga.name}
          </h1>
          <p className="text-gray-500">Genres: {manga.type}</p>
          <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm inline-block mt-2">
            Released-On: {manga.realsedon}
          </span>

          <div className="mt-4">
            <h2 className="text-lg font-semibold flex items-center gap-1">
              About <FaInfoCircle className="text-gray-500" />
            </h2>
            <p className="text-gray-600 text-sm mt-1">{manga.about}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {manga.seasons &&
              manga.seasons.map((sec, index) => (
                <button
                  onClick={() => seasonPage(sec.season_name, sec.pages)}
                  key={index}
                  className="w-20 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-all"
                >
                  {sec.season_name}
                </button>
              ))}
          </div>
          
        </div>
          {
            bookMark?
            <img onClick={mangaMark} className="w-10 h-8 relative bottom-0 sm:bottom-24" src={assets.book_marked} alt="" />:""
          }
      </div>
      <div className="h-auto w-[80%] flex flex-col items-center justify-center scrollbar-visible">
        {
          pages.map((p, index) => (
            <img src={p.image_url} key={index} alt="" />
          ))
        }
      </div>
      <RelatedManga id={manga._id} type={manga.type} setIsTrue={setIsTrue} setPages={setPages} />
    </div>
  );
};

export default Manga;
