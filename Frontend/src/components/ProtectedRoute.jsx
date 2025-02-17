import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/authProvider'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({children,allowedRole}) => {
    const {isAuth,role} = useContext(AuthContext)

    if(!isAuth){
        return <Navigate to="/login" replace />
    }
    
    if(role  !== allowedRole){
        return <Navigate to="/" replace />
    }

  return children
}

export default ProtectedRoute
