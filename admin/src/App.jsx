import React, { useContext } from 'react'
import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashbord from './pages/Dashbord'
import AddManga from './pages/AddManga'
import { AppContext } from './AppContext/AppContext'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import AllManga from './pages/AllManga'
import UpdateManga from './pages/UpdateManga'

const  App=() =>{
  const {aToken}=useContext(AppContext)
  return aToken?  (
    <div>
    <div className=''>
    <ToastContainer/>
     <NavBar/>
        <div className='flex items-center'>
          <Sidebar/>
          <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-Dashbord' element={<Dashbord/>}  />
          <Route path='/add-manga' element={<AddManga/>}  />
          <Route path='/all_manga' element={<AllManga/>} />
          <Route path='/all-manga/:type' element={<AllManga/>}  />
          <Route path='/mangas/:id' element={<UpdateManga/>}  />

          </Routes>
        </div>
    </div>
  </div>
  ):(
    <>
    <Login/>
    <ToastContainer/>
    </>
  )

}
export default App
