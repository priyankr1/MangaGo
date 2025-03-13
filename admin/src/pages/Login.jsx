import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../AppContext/AppContext';

const Login = () => {
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const {setAToken,backendUrl}=useContext(AppContext)
     
    const onSubmitHandler=async(event)=>{
        event.preventDefault()
    try {
            const {data}=await axios.post(backendUrl + '/api/admin/login',{email,password})
            if(data.success){
                localStorage.setItem('aToken',data.token)
                setAToken(data.token)
            }else{
              toast.error(data.message)
            }
        
    } catch (error) {
        toast.error(error.message)
    }
    }
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto '>Admin Login</p>
        <div className='w-full '>
            <p>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1'  type="password" required />
        </div>
        <button className='bg-black text-gray-400 w-full py-2 rounded-md text-base' type='submit'>Login</button>
      </div>
    </form>
  );
}

export default Login;
