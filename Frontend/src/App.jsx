import React from 'react';
import{Route, Routes, useParams} from "react-router-dom"
import Navbar from './components/Navbar';
import {ToastContainer} from 'react-toastify'
import Manga from './pages/Manga';
import BookMarked from './pages/BookMarked';
import About from './pages/About';
import AllManga from './pages/AllManga';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Login from './pages/Login';

const App = () => {
  return (
    <div>
       <div className="">
      <ToastContainer/>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/all-manga' element={<AllManga/>}  />
      <Route path='/all-manga/:type' element={<AllManga/>}  />
      <Route path='/about' element={<About/>}  />
      <Route path='/login' element={<Login/>}/>
      <Route path='/book-marked' element={<BookMarked/>}  />
      <Route path='/mangas/:id' element={<Manga />}  />
      <Route path='/my-profile' element={<Profile/>}/>
      
    </Routes>
    <Footer/>
     </div>
    </div>
  );
}

export default App;
