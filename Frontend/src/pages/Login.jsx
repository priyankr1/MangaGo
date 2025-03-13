import React, {useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext/AppContext';

const Login = () => {
  const{backendUrl,token,setToken}=useContext(AppContext)
  const [state, setstate] = useState('Sign up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const onSubmit=async(event)=>{
    event.preventDefault()
    try {
      if(state==='Sign up'){
        const {data}=await axios.post(backendUrl+`/api/user/register`,{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token);
        }else{
          toast.error(data.message)
        }
      }else{
        const {data}= await axios.post(backendUrl+`/api/user/login`,{password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token);
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
        toast.error(error.message)
    }
  }
  useEffect(() => {
    if (token) {
      navigate('/')
      
    }
  }, [token])
  return (
    <form onSubmit={onSubmit} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-sm shadow-lg'>
        <p className='text-2xl font-semibold '>{state === 'Sign up' ? 'Create Acount' : 'Login'}</p>
        <p>Please {state === 'Sign up' ? 'sign up' : 'log in'} to  read Manga</p>
        {
          state === 'Sign up' && <div className='w-full '>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-3' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }

        <div className='w-full '>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-3' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-3' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>
        <button type='submit' className='bg-black text-gray-400 w-full py-2 rounded-md text-base '>{state === 'Sign up' ? 'Create Acount' : 'Login'}</button>
        {
          state === "Sign up" ? <p>Already have an account? <span onClick={() => setstate('Login')} className='text-primary underline cursor-pointer'>Login here</span> </p> :
            <p>Already have an account? <span onClick={() => setstate('Sign up')} className='text-primary underline cursor-pointer'>click here</span> </p>
        }
      </div>
    </form>
  );
}

export default Login;
