import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import RelatedManga from "../components/RelatedManga";
import { AppContext } from "../AppContext/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Manga = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { mangas, backendUrl, token, userData, mangaMarked, getBookedManga, setMangaMarked } = useContext(AppContext);
  const [manga, setManga] = useState(null);
  const [pages, setPages] = useState([])
  const [isTrue, setIsTrue] = useState(false);
  const [prevSec, setPrevSec] = useState("");
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0)
  const [isHovering, setIsHovering] = useState(false);
  const [totalRating,setTotalRating] = useState()
  const foundManga = () => {
    if (mangas.length > 0) {
      const foundManga = mangas.find((m) => m._id === id);
      setManga(foundManga || null);
    }
  }
  const seasonPage = (secName, page) => {
    if (token) {
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
    }
    else {
      navigate('/login')
      toast.error("Login to read the manga")
    }

  };

  const mangaMark = async () => {
    if (token) {
      try {
        if (userData) {

          const { data } = await axios.post(`${backendUrl}/api/user/book-mark`, {
            userId: userData._id,
            mangaId: id
          }, { headers: { token: token } });
          if (data.success) {
            setMangaMarked(prevManga => [...prevManga, manga]);
            toast.success(data.message)
          } else {
            toast.error(data.message)
          }
        }
      } catch (error) {
        toast.error(error.message)
      }
    } else {
      navigate('/login')
      toast.error("Login to Book Mark the manga")
    }
  }


  const rateManga = async (index) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/add-rating`, {
        userId: userData._id,
        mangaId: id,
        rating: index
      }, { headers: { token: token } });

      if (data.success) {
        const latestRating = data.userRating?.ratingDetails?.find(item => item.mangaId === id);

        // Set the rating, if found
        setUserRating(latestRating ? latestRating.rating : 0);
        toast.success("Rating added")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const getRating = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-rating`, {
        params: { mangaId: id }
      });

      if (data.success) {
        setRating(data.averageRating ? data.averageRating : 0);
        setTotalRating(data.ratingCount ? data.ratingCount : 0)
      } else {
        console.log(data.error);
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch rating");
    }
  };
  const getUserRating = async () => {
    try {
      console.log("hello")
      const { data } = await axios.get(`${backendUrl}/api/user/user-rating`, {
        params: { userId: userData?._id, mangaId: id },
        headers: { token: token }
      });
      if (data.success) {
        setUserRating(data.Rating);
        console.log(data.Rating)
      } else {
        console.log(data.error);
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (id) getRating();
  }, [id, userRating]);


  useEffect(() => {
    if (userData) getUserRating();
  }, [userData])

  useEffect(() => {
    foundManga();
  }, [id, mangas]);

  useEffect(() => {
    getBookedManga();
  }, [userData, id]);

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
          {rating > 0 ? (
            <div
              className="flex items-center mt-4"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="text-lg font-semibold mr-2 transition-opacity duration-500 ease-in-out hover:opacity-70">
                {isHovering ? "Your Rating:" : "Total Rating:"}
              </span>


              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={index < (isHovering ? userRating : rating) ? assets.field_star : assets.blank_star}
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => rateManga(index + 1)}
                />
              ))}

              <p className="text-2xl font-semibold ml-2">{totalRating}</p>
            </div>
          ) : (
            <div className="flex items-center mt-4">
              <span className="text-lg font-semibold mr-2">Rate this Manga:</span>
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={assets.blank_star} 
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => rateManga(index + 1)}
                />
              ))}
            </div>
          )
          }
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
          !(mangaMarked?.some(m => m._id === id)) ?
            <img onClick={mangaMark} className="w-10 h-8 relative bottom-0 sm:bottom-24" src={assets.book_marked} alt="" /> : ""
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
