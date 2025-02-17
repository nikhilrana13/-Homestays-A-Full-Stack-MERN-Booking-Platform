
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { createContext } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const navigate = useNavigate()
  const [token,setToken] = useState(null)
  const [role,setRole] = useState(null)
  const [userid,setUserid] = useState(null)
  const [username,setUsername] = useState(null)


      useEffect(() =>{
        const fetchAuthToken = async () =>{
           try {
             const response = await axios.get('http://localhost:5000/api/user/auth',{withCredentials: true})
            //  console.log(response.data)
             setToken(response.data.token)
             setRole(response.data.role)
             setUserid(response.data.userid)
             setUsername(response.data.name)
              // console.log("user id",response.data.userid)
            //  console.log('fetched role',response.data.role)
            
           } catch (error) {
            setToken(null)
            setRole(null)
            setUserid(null)
            setUsername(null)
            // console.log('auth failed',error.response?.data?.message || error.message)
            
           }  
          }

          fetchAuthToken()
      },[])

     const isAuth = !!token;

      const Logout = async()=>{
        try {
          await axios.post('http://localhost:5000/api/user/logout',{},{withCredentials: true})
          setToken(null)
          setRole(null)
          setUsername(null)
          toast.success('Logout successfully')
          navigate('/')
        } catch (error) {
          console.log('logout failed',error.response?.data?.message || error.message)
          
        }
   }
  


   
  return (
     <AuthContext.Provider value={{Logout,token,setToken,isAuth,role,setRole,userid,setUserid,username,setUsername}}>
        {children}
     </AuthContext.Provider>
  )
}

export default AuthProvider
