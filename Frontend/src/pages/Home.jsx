import React from 'react';
import Header from '../components/Header';
import SlideBar from '../components/SlideBar';
import ReadPage from '../components/ReadPage';
import Immerse from '../components/Immerse';
import Journey from '../components/Journey';

const Home = () => {
  return (
    <div>
    <Header/>
      <SlideBar/>
      <ReadPage/>
      <Immerse/>
      <Journey/>
    </div>
  );
}

export default Home;
