
import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../Context/authProvider'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const   Navbar = () => {
   const navigate = useNavigate()
   const {isAuth,Logout} = useContext(AuthContext)   
   const[showlogout,setshowlogout] = useState(false)
   const [showloginbutton,setshowloginbutton] = useState(false)
  

   useEffect(()=>{
      if(isAuth){
        const timer = setTimeout(()=>{
          setshowlogout(true)
         },500)
          return () => clearTimeout(timer)
      } else{
         setshowlogout(false)


         const loginTimer = setTimeout(()=>{
          setshowloginbutton(true) 
         },500)
         return () =>clearTimeout(loginTimer)
      }
   },[isAuth])
  return (
    <nav className="flex justify-between items-center   py-4 px-4 sm:px-6">

  <div>
    <h4 className="text-2xl font-bold text-white">
    <Link to='/' className='text-[1.5rem]  text-white font-bold'>Homestays</Link>
    </h4>
  </div>

  <div className="flex flex-wrap justify-between p-3 items-center  min-h-[80px] space-x-4 sm:ml-auto mt-4 sm:mt-0">
        
        {
          isAuth ? (
            <>
                {showlogout && (
                  <button onClick={Logout}  className="px-4 py-2 text-sm rounded-full cursor-pointer text-black font-bold  bg-white border-2
                  transition-all ease-in-out duration-300 hover:bg-transparent hover:text-gray-500">
                    Logout
                  </button>) }
            </>
          ):(
          <div className='flex gap-4'>
              {showloginbutton && (
                 <>
                 <NavLink  to='/login' className="px-4 py-2 text-sm cursor-pointer rounded-full font-bold text-gray-500 border-2 bg-transparent hover:bg-gray-50 transition-all ease-in-out duration-300">
             Login
           </NavLink>
           <NavLink to='/signup' className="px-4 py-2 text-sm rounded-full cursor-pointer text-black font-bold  bg-white border-2
           transition-all ease-in-out duration-300 hover:bg-transparent hover:text-gray-500">
             Sign Up
           </NavLink>
                 </>
              )}
             
        
        </div>

          )
        }
   <div>
   </div>
</div>
</nav>
   
  )
}

export default   Navbar
