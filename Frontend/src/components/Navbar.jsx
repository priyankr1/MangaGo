import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react"; 
import { AppContext } from '../AppContext/AppContext';

const Navbar = () => {
    const {setToken,token,userData}=useContext(AppContext)
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const logout=()=>{
        setToken(false)
        localStorage.removeItem('token')
    }
    return (
        <div className='flex items-center justify-between px-0 sm:px-20 pt-4 text-sm mb-5 bg-transparent h-15'>
            <div className='flex items-center justify-between'>
                <img onClick={() => navigate('/')} className="w-17 cursor-pointer" src={assets.assest_icon} alt="" />
                <span className='text-xl font-bold'>MangaGo</span>
            </div>

            {/* Desktop Navigation */}
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1 text-gray-500'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-gray-500 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/all-manga'>
                    <li className='py-1 text-gray-500'>ALL MANGA</li>
                    <hr className='border-none outline-none h-0.5 bg-gray-500 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/book-marked'>
                    <li className='py-1 text-gray-500'>BOOK MARKED</li>
                    <hr className='border-none outline-none h-0.5 bg-gray-500 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1 text-gray-500'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-gray-500 w-3/5 m-auto hidden' />
                </NavLink>
            </ul>

            {/* Profile Section (Old Style Restored) */}
            {
                token&&userData
                ?  <div className='relative flex items-center gap-4 pr-20 sm:pr-0'>
                <div className='flex items-center gap-2 cursor-pointer group'>
                    <img className='w-10 rounded-full' src={userData.image} alt="" />
                    <img className='w-2.5' src={assets.dropdown_icon} alt="" />

                    {/* Dropdown Menu */}
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={() => navigate('/book-marked')} className='hover:text-black cursor-pointer'>Book marked</p>
                            <p onClick={() => logout()} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>
            </div>
    :<button onClick={()=>navigate('/login')} className='bg-black text-gray-400 px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
            }
          
            {/* Mobile Menu Toggle Button */}
            <button className="md:hidden absolute top-7 right-6 z-50" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-0 left-0 w-full h-screen bg-white z-50 flex flex-col items-center justify-center space-y-6 shadow-lg">
                    {/* Close Button Inside Menu */}
                    <button className="absolute top-5 right-6" onClick={() => setMenuOpen(false)}>
                        <X size={28} />
                    </button>
                    <NavLink to="/login" onClick={() => setMenuOpen(false)} className="text-lg">Create Account</NavLink>
                    <NavLink to="/" onClick={() => setMenuOpen(false)} className="text-lg">HOME</NavLink>
                    <NavLink to="/all-manga" onClick={() => setMenuOpen(false)} className="text-lg">ALL MANGA</NavLink>
                    <NavLink to="/book-marked" onClick={() => setMenuOpen(false)} className="text-lg">BOOK MARKED</NavLink>
                    <NavLink to="/about" onClick={() => setMenuOpen(false)} className="text-lg">ABOUT</NavLink>
                </div>
            )}
        </div>
    );
}

export default Navbar;
