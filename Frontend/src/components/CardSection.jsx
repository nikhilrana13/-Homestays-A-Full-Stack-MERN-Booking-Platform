import React, { useEffect, useState } from 'react'

import HotelCard from './HotelCard';
import axios from 'axios';
const CardSection  = () => {
   const [rooms,setrooms] = useState([]);
   const [loading,setloading] = useState(false);



      const getAllrooms = async ()=>{
        setloading(true);
           try {
               const response =  await axios.get('http://localhost:5000/api/rooms',{withCredentials: true});
               setrooms(response.data.rooms);
               console.log("homepage rooms",response.data.rooms);
               setloading(false);
              
              
            
           } catch (error) {
              console.error('Error fetching rooms:', error);
            
           }
      }

      useEffect(()=>{
        getAllrooms();
      },[])

  return (
    <>
    <div className='container p-10 flex md:py-10 md:px-20 flex-col  '>
      <div className='flex flex-col gap-5'>
      <h1 className='text-3xl text-white font-[700]'>Discover your new favourite stay</h1>
      <p className='text-2xl text-white font-[500]'>Recently added stays:</p>
      </div>
       
        <div className='cards mt-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
         {loading ? (
                <p className="text-white text-3xl">Loading...</p>
              ): rooms.length > 0 ?(
                rooms.map((room) => (
                  
                    <HotelCard key={room._id} image={`data:image/jpeg;base64,${room.image}`} city={room.city} description={room.description} title={room.title} price={room.price} name={room.hostId?.name ||"unknown host"} email={room.hostId?.email || "unknown host"} contactNumber={room.hostId?.contactNumber || "unknown host"} address={room.address} />
                    
                
                ))

              ):(
                !loading && rooms.length === 0 && <div className="flex w-full h-full justify-center items-center">
                <p className="text-white text-3xl">No rooms found</p>
                
              </div>
              )}
        </div>
      
    </div>
   
    </>
    
  )
}

export default CardSection
