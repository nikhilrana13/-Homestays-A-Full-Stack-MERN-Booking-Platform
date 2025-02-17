import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Rooms from './pages/Rooms/Rooms'
import SignUp from './components/SignUp'
import Login from './components/Login'
import  { Toaster } from 'react-hot-toast';
import Host from './pages/Hostpage/Host'
import ProtectedRoute from './components/ProtectedRoute'
import UpdateProfile from './pages/Hostpage/UpdateProfile'
 


function App() {

  return (
    <>
      
      <div className="App">
           <Routes>
                <Route path="/" element={<Home/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/login' element={<Login/>} />
                <Route path="/rooms" element={<Rooms/>} />
                <Route path="/host" element={ <ProtectedRoute allowedRole='host'> <Host /> </ProtectedRoute> } />
                <Route path="/updateprofile" element={<ProtectedRoute allowedRole='host'> <UpdateProfile /> </ProtectedRoute>} />
                 
           </Routes>
           <Toaster />
      </div>
    
     
    </>
  )
}

export default App
