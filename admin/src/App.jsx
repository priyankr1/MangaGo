import React, { useContext } from 'react'
import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashbord from './pages/Dashbord'
import AddManga from './pages/AddManga'
import { AppContext } from './AppContext/AppContext'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'

const  App=() =>{
  const {aToken}=useContext(AppContext)
  return aToken?  (
    <div>
    <div className=''>
    <ToastContainer/>
     <NavBar/>
        <div className='flex items-center h-auto'>
          <Sidebar/>
          <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-Dashbord' element={<Dashbord/>}  />
          <Route path='/add-manga' element={<AddManga/>}  />
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
