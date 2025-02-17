import axios from 'axios';
import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/authProvider';


const AddRoomform = () => {
    const {userid} = useContext(AuthContext);
    // console.log("user id",userid)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async(data) =>{
       const formData = new FormData();
       formData.append("title", data.title);
       formData.append("description", data.description);
       formData.append("price", data.price);
       formData.append("city", data.city);
       formData.append("address", data.address);
       formData.append("facilities", data.facilities);
       formData.append("startDate", data.startDate);
       formData.append("endDate", data.endDate);



       const imageFile = data.image && data.image[0] ? data.image[0] : "";
       formData.append("image", imageFile);

      //  console.log("Form Data:", data);

       


        await axios.post(`http://localhost:5000/api/host/${userid}/addroom`,formData,{withCredentials:true, headers:{"Content-Type":"multipart/form-data"}}).then((res)=>{
                if(res.data){
                    toast.success('Room added successfully 😇 ');
                   reset();
                }
        }).catch((error)=>{
            console.log('failed to add room',error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Something went wrong")
        })
    }



       

  return (
    <div className=' p-10 '>
       
        <h1 className='text-2xl font-bold text-white'>Add a room</h1>
    <form  onSubmit={handleSubmit(onSubmit)} className="max-w-md mt-8 text-white">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Title</label>
        <input
          type="text"
          id="title"
          name="title"
    
          className="w-full px-3 py-2 text-black border rounded-md"
          {...register("title", { required: true })}
        />
      </div>
      {errors.title && <span className='text-red-500'>This field is required</span>}
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          
          className="w-full px-3 py-2 text-black border rounded-md"
          {...register("description", { required: true })}
        ></textarea>
      </div>
      {errors.description && <span className='text-red-500'>This field is required</span>}
      <div className="mb-4">
        <label htmlFor="price" className="block mb-2">Price</label>
        <input
          type="number"
          id="price"
          name="price"
        
          className="w-full px-3 py-2 text-black border rounded-md"
          {...register("price", { required: true })}
        />
      </div>
      {errors.price && <span className='text-red-500'>This field is required</span>}
      <div className="mb-4">
        <label htmlFor="city" className="block mb-2">City</label>
        <input
          type="text"
          id="city"
          name="city"
        
          className="w-full px-3 py-2 text-black border rounded-md"
          {...register("city", { required: true })}
        />
      </div>
      {errors.city && <span className='text-red-500'>This field is required</span>}
      <div className="mb-4">
        <label htmlFor="address" className="block mb-2">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          className="w-full px-3 py-2 border text-black rounded-md"
          {...register("address", { required: true })}
        />
      </div>
      {errors.address && <span className='text-red-500'>This field is required</span>}

      <div className="mb-4">
        <label htmlFor="image" className="block mb-2">Choose Image </label>
  <input
    className="block w-full text-sm p-2 text-gray-900 border  border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700  dark:placeholder-gray-400"
    aria-describedby="file_input_help"
    id="file_input"
    type="file"
    {...register("image", { required: true })}
  />
  <p
    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
    id="file_input_help"
  >
    SVG, PNG, JPG or GIF (MAX. 800x400px).
  </p>

      </div>
      {errors.image && <span className='text-red-500'>This field is required</span>}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Add Room
      </button>
    </form>
      
    </div>
  )
}

export default AddRoomform
