import React, { useContext, useState } from 'react';
import { assets, userData } from '../assets/assets';
import axios from 'axios'
import { AppContext } from '../AppContext/AppContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const{token,userData,setUserData,backendUrl,loadUserData}=useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateProfile=async()=>{
        try {
          const formData= new FormData()
          formData.append('name',userData.name)
          formData.append('phone',userData.phone)
          formData.append('address',JSON.stringify(userData.address))

          if (image) {
            image&&formData.append('image', image); 
        }
        

          const {data}=await axios.post(`${backendUrl}/api/user/update-profile`,formData,{headers:{token}})
          if(data.success){
            toast.success(data.message)
            setIsEdit(false)
            await loadUserData()
          }else{
            console.log(data.message)
            toast.error(data.message)
          }
        } catch (error) {
          console.log(error.message)
          toast.error(error.message)
        }
  }
  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm pl-10 sm:pl-20 py-20'>
      {isEdit ? (
        <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 h-35 rounded opacity-75' src={image ? URL.createObjectURL(image) :userData.image || null} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? null : assets.upload_icon} alt="" />

          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
        </label>
      ) : (
        <img className='w-38 h-38 rounded' src={userData.image} alt="" />
      )}

      {isEdit ? (
        <input
          className='bg-gray-50 text-2xl font-medium max-w-60 mt-4'
          type="text"
          name="name"
          value={userData.name}
          onChange={e=>{setUserData(prev=({...prev,name:e.target.value}))}}
        />
      ) : (
        <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      )}

      <hr className='bg-zinc-400 h-[1px] border-none' />

      <div>
        <p className='text-neutral-500 underline mt-3'> CONTACT INFORMATION </p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-800'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input
              className='bg-gray-100 mx-w-52'
              type="number"
              name="phone"
              value={userData.phone} onChange={e=>setUserData(prev=>({...prev,phone:e.target.value }))}
            />
          ) : (
            <p className='text-blue-400'>{userData.phone}</p>
          )}

          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <p>
              <input
                className='bg-gray-50'
                type="text"
                name="line1"
                value={userData.address.line1}  onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line1:e.target.value }}))}
              />
              <br />
              <input
                className='bg-gray-50'
                type="text"
                name="line2"
                value={userData.address.line2}  onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line2:e.target.value }}))}
              />
            </p>
          ) : (
            <p className='text-gray-500'>{userData.address.line1} <br />{userData.address.line2}</p>
          )}
        </div>
      </div>

      <div className='mt-10'>
        {isEdit ? (
          <button
            className='border border-primary px-8 py-2 rounded-full hover:bg-black hover:text-gray-400 transition-all'
            onClick={updateProfile}
          >
            Save Information
          </button>
        ) : (
          <button
            className='border border-primary px-8 py-2 rounded-full hover:bg-black hover:text-gray-400 transition-all'
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
