import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext } from 'react'
import { AuthContext } from '../Context/authProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
     const {setRole,setToken,setUserid} = useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async(data)=>{
        
        const userInfo = {
            email:data.email,
            password:data.password,
        }


        await axios.post("http://localhost:5000/api/user/login",userInfo,{withCredentials: true}).then((response)=>{
            if(response.data.token){
                setToken(response.data.token)
                setRole(response.data.user.role)
                setUserid(response.data.user._id)
                // console.log("user id",response.data.user._id)
                // console.log('role after login',response.data.user.role);
                toast.success("Login successfully 😇 ")
                setTimeout(()=>{
                   if(response.data.role === "guest"){
                    navigate('/');
                   } else{
                    navigate('/host');
                   }
                },2000) 
            }
               
              


        }).catch((error)=>{
          console.log("login error",error);
            toast.error(error.response?.data?.message || "Something went wrong")
        })



    }



  return (
   <>
    <div className='text-start flex justify-between mt-4  px-5 min-h-[20vh] py-5'>
        <Link to='/' className='text-[1.5rem]  text-white font-bold'>Homestays</Link>
         <Link to='/' className='text-[0.85rem]  px-5 py-2 mr-10 text-white font-[500]'>Home</Link>
    </div>
 <section className="bg-[#] dark:bg-gray-900">
     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
       <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
           Login
         </h1>
         <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
           <div>
             <label
               htmlFor="email"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
             >
              email
             </label>
             <input
               type="email"
               name="email"
               id="email"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Enter your email"
               required=""
               {...register("email", { required: true })}
             />
           </div>
           {errors.email && <span className='text-red-500'>This field is required</span>}
           <div>
             <label
               htmlFor="password"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
             >
               Password
             </label>
             <input
               type="password"
               name="password"
               id="password"
               placeholder="••••••••"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               required=""
               {...register("password", { required: true })}
             />
           </div>
           {errors.password && <span className='text-red-500'>This field is required</span>}
           <button
             type="submit"
             className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
           >
             Login
           </button>
           <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Not registered yet ?{" "}
             <Link
               to="/signup"
               className="font-medium text-primary-600 hover:underline dark:text-primary-500"
             >
               signup here
             </Link>
           </p>
         </form>
       </div>
     </div>
   </div>
   
 </section>

   </>
  )
}

export default Login
