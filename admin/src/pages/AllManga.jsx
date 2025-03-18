import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { mangas } from "../assets/assets";
import { AppContext } from "../AppContext/AppContext";

function AllManga() {
  const { type } = useParams();
  const {mangas,refreshMangas}=useContext(AppContext)
  const [showFilter, setShowFilter] = useState(false);
  const [filterMan, setFilterMan] = useState([]);
  const navigate = useNavigate();
  
  const applyfilter = () => {
    if (type) {
      setFilterMan(mangas.filter((doc) => doc.type === type));
    } else {
      setFilterMan(mangas);
    }
  };

  const applySearch = (e) => {
    if (e.target.value&&type) {
      setFilterMan(
        mangas.filter((doc) =>
          doc.type === type&&doc.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        )
      );
    }else if(e.target.value){
      setFilterMan(
        mangas.filter((doc) =>
         doc.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        )
      );
    }
    else{
      applyfilter()
    }
  };

  useEffect(()=>{
    refreshMangas()
  },[])
  useEffect(() => {
    applyfilter();
  }, [mangas, type]);
  return (
    <div className="pt-10 pl-10 h-[100vh]">
      <div className=" flex flex-col sm:flex-row gap-20  w-[75vw]">
        <p className="text-gray-600 ">Browse through the manga Genres.</p>
        <input
          className="border-2 rounded-2xl w-medium sm:w-medium h-[30px] text-sm  text-center"
          placeholder="Search"
          type="search"
          onChange={applySearch}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={` py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-gray-300 text-white" : ""
          } `}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={` flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() => {
              type === "Action"
                ? navigate("/all-manga")
                : navigate("/all-manga/Action");
            }}
            className={`w-[50vw] sm:w-auto pl-3 py-1 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              type === "Action" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Action
          </p>
          <p
            onClick={() => {
              type === "Love"
                ? navigate("/all-manga")
                : navigate("/all-manga/Love");
            }}
            className={`w-[50vw] sm:w-auto pl-3 py-1 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              type === "Love" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Love
          </p>
          <p
            onClick={() => {
              type === "Sport"
                ? navigate("/all-manga")
                : navigate("/all-manga/Sport");
            }}
            className={`w-[50vw] sm:w-auto pl-3 py-1 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              type === "Sport" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Sport
          </p>
        </div>

        <div className="w-full sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-6 sm:pl-10">
          {filterMan.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/mangas/${item._id}`);
                scroll(0, 0);
              }}
              className="bg-white rounded-lg shadow-md border-none p-4 flex flex-col items-center w-50 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img
                className="w-40 h-50 object-cover  rounded-lg"
                src={item.banner}
                alt={item.name}
              />
              <div className="text-center mt-4">
                <h2 className="break-words text-[#2b282a] whitespace-pre-wrap font-risque max-w-full max-h-m bg-none  font-m  text-[15px] sm:text-[20px] leading-[108.333%] ">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-[10px] sm:text-[14px]">
                  {item.about}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllManga;
