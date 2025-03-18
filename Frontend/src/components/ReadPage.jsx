import React, { useEffect,useContext} from 'react';
import { mangas } from '../assets/assets';
import {useNavigate} from 'react-router-dom'
import { AppContext } from '../AppContext/AppContext';
const ReadPage = () => {
    const {mangas}=useContext(AppContext)
    const navigate = useNavigate()
    return (
        <div className='flex flex-col justify-center items-center py-10' id='readpage'>
            <div className=' flex flex-col justify-center items-center h-40  gap-5'>
                <h2 className='text-[20px] text-gray-500 font-m '>Explore the Captivating Visuals</h2>
                <h1 className='break-words text-[#2b282a] whitespace-pre-wrap font-risque max-w-full max-h-m bg-none  font-m  text-[40px] sm:text-[50px] leading-[108.333%] pl-10 sm:pl-0'>Immerse Yourself in the Animated World</h1>
            </div>
            <button onClick={()=>{navigate('/all-manga');scrollTo(0,0)}} className='bg-black font-semibold text-sm sm:text-base text-[#c2c0bd] px-8 py-3 rounded-full mt-6 hover:scale-105 active:scale-105 w-m '>All Manga</button>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-10 py-10'>
                {
                    
                    mangas?mangas.slice(0,3).map((item, index) => (
                        <div onClick={() => { navigate(`/mangas/${item._id}`); scrollTo(0,0)} } className="w-100 flex flex-col items-center justify-center gap-10 " key={index}>
                            <img
                                className=" w-60 h-85 rounded-lg transition-transform duration-300 hover:scale-105"
                                src={item.banner}
                                alt="" />
                            <div className='px-10 sm:px-0'>
                                <h2 className="break-words text-[#2b282a] whitespace-pre-wrap font-risque max-w-full max-h-m bg-none  font-m  text-[15px] sm:text-[20px] leading-[108.333%] ">{item.name}</h2>
                                <p className='text-gray-400 text-lg'>{item.about}</p>
                                <div className="flex justify-between items-center w-full">
                                    <button className=' border-2 border-gray-300 font-semibold text-sm sm:text-base text-[#7a7978] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all cursor-pointer w-m'>Read Manga</button>
                                </div>
                            </div>
                        </div>
                    )):
                    <p>Loading</p>
                }
            </div>
        
        </div>
    );
}

export default ReadPage;
