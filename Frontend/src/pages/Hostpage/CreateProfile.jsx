import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useContext } from 'react'
import { AuthContext } from '../../Context/authProvider'
const CreateProfile = () => {
    const {userid} = useContext(AuthContext)
    // console.log("user id",userid)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
        const onSubmit = async(data)=>{
            const userInfo = {
                userId:userid,
                name: data.name,
                email: data.email,
                contactNumber: data.contactNumber
            }


            await axios.post("http://localhost:5000/api/host/profile",userInfo,{withCredentials: true}).then((response)=>{
                   if(response.data){
                    console.log(response.data)
                    toast.success("Profile created successfully 😇 ")
                 
                        reset();
                    
                   }
            }).catch((error)=>{
                console.log("failed to create profile",error.response?.data?.message || error.message);
                toast.error(error.response?.data?.message || "Something went wrong")
            })
        
        }

  return (
    <div className=' p-10 gap-5 flex-col'>
        <h1 className='text-lg text-white font-[500] mb-5'>Create a profile</h1>
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
        <button type='submit' className='px-3 py-2 bg-blue-500 text-white rounded-md'>create profile</button>
        <Link to='/updateprofile' className='px-3 py-2 bg-yellow-500 text-black rounded-md'>Update</Link>
        </div>
        </form>
       
       
    </div>
  )
}

export default CreateProfile
