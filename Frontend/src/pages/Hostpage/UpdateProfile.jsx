import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from '../../Context/authProvider'


const UpdateProfile = () => {
  const navigate = useNavigate()
  const {userid} = useContext(AuthContext)
  // console.log("user id in update profile",userid)
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

        
        useEffect(()=>{
              const fetchUserData = async()=>{
                   try {
                          const res = await axios.get(`http://localhost:5000/api/host/${userid}`,{withCredentials:true})
                          console.log(res.data)

                          if(res.data?.host){
                            reset(res.data?.host)
                          }

                   } catch (error) {
                    console.log('failed to fetch host data',error.response?.data?.message || error.message);
                   }
                  }
                  if(userid){
                    fetchUserData()

                  }
        },[userid,reset])


       
          const onSubmit = async(data)=>{
                 const userInfo = {
                     name:data.name,
                     email:data.email,
                     contactNumber: data.contactNumber,
                 }
                
                 await axios.put(`http://localhost:5000/api/host/${userid}/update`,userInfo,{withCredentials:true}).then((res)=>{
                       if(res.data){
                            toast.success('Profile updated successfully 😇 ')
                            navigate('/host')
                       }
                 }).catch((error)=>{
                     console.log('failed to update profile',error.response?.data?.message || error.message);
                     toast.error(error.response?.data?.message || "Something went wrong")
                 })

          }
  return (
    <div className=' p-10 gap-5 flex-col'>
    <h1 className='text-lg text-white font-[500] mb-5'>Update a profile</h1>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-md '>
        <label className='text-white'>Name</label>
        <input type="text" className='px-3 py-2 rounded-md ' placeholder='Enter host name'
        {...register("name", { required: true })} />
        <br/>
        {errors.name && <span className='text-red-500'>This field is required</span>}
        <label className='text-white'>Email</label>
        <input type="email" className='px-3 py-2 rounded-md ' placeholder='Enter email'  {...register("email", { required: true })} />
        <br/>
        {errors.email && <span className='text-red-500'>This field is required</span>}
        <label className='text-white'>Contact Number</label>
        <input type="text" className='px-3 py-2 rounded-md' placeholder='Enter contact number'  {...register("contactNumber", { required: true })} />
        <br/>
        {errors.contactNumber && <span className='text-red-500'>This field is required</span>}
    <div className='flex gap-3 flex-wrap'>
    <button type='submit' className='px-3 py-2 bg-blue-500 text-white rounded-md'>Update profile</button>
    </div>
    </form>
   
   
</div>
  )
}

export default UpdateProfile
