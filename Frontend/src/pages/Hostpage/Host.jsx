
import React from 'react'
import Navbar from '../../components/Navbar'
import AddRoomform from './AddRoomform'
import CreateProfile from './CreateProfile'
import { useContext } from 'react'
import { AuthContext } from '../../Context/authProvider'



const Host = () => {
  const {username} = useContext(AuthContext);
  // console.log("username",username)
  return (
    <div>
        <Navbar />
       <div className=' mt-20'>
        <div className='p-10'>
        <h1 className='text-3xl text-slate-200  font-bold'>Welcome,😎 <span>{username }</span></h1>
        </div>
        <CreateProfile />
        <AddRoomform />
          
       </div>
      
       
       
    </div>
  )
}

export default Host
