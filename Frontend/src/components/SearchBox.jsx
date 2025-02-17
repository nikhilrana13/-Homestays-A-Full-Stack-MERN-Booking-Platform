import React, { useEffect } from 'react'
import '../index.css'
import { useState } from 'react'
import { useNavigate, useLocation,useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const SearchBox = React.memo(({onSearch}) => {
const navigate = useNavigate();
const location = useLocation();
const [searchParams] = useSearchParams();

    const [filters,setFilters] = useState({
      
        city: searchParams.get("city") || "",
        minPrice: searchParams.get("minPrice") || 500,
        maxPrice: searchParams.get("maxPrice") || 100000,
        startDate: searchParams.get("startDate") || "",
        endDate: searchParams.get("endDate") || ""
          
    })


    useEffect(() => {
      setFilters({
        city: searchParams.get("city") || "",
        minPrice: searchParams.get("minPrice") || 500,
        maxPrice: searchParams.get("maxPrice") || 100000,
        startDate: searchParams.get("startDate") || "",
        endDate: searchParams.get("endDate") || "",
      });
    }, [searchParams]);


    // useEffect(() => {
    //   if (!onSearch) {
    //     console.log("onSearch is undefined!");
    //   }
    // }, [onSearch]);
  
    const handleSearch = ()=>{ 
      // if (onSearch) {
      //   onSearch(); // Function call karein
      //   console.log("onSearch called");
      // } else {
      //   console.error("onSearch is not provided"); // Debugging ke liye
      // }

      if(!filters.city.trim()){
        toast.error('Please enter a city!');
        return
      } 
       
      if(!filters.startDate.trim()){
        toast.error("Please enter a start date");
        return
      } 

      if(!filters.endDate.trim()){
        toast.error("Please enter an end date");
        return
      }

      const queryString = new URLSearchParams(filters).toString();
      navigate(`/rooms?${queryString}`);
      onSearch(filters);
    }

  
  
  
  
  return (

    <div className="max-w-screen-xl mx-auto min-h-[50vh] px-4 py-8">
    <div className="bg-transparent rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-white  text-center mb-6">Find Your Perfect Stay</h2>
      <form  onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Destination Input */}
          <div className="flex flex-col">
  
            <label htmlFor="destination" className="text-sm font-medium text-white">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              required
              placeholder="Enter your destination"
              value = {filters.city}
              onChange={(e)=>setFilters({...filters,city:e.target.value})} 
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
          </div>

         

          {/* Check-in Date Input */}
          <div className="flex flex-col">
            <label htmlFor="check-in" className="text-sm font-medium text-white">Check-in</label>
            <input
              type="date"
              id="check-in"
              name="check-in"
              required
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:text-gray-500"
              value = {filters.startDate}
              onChange = {(e)=>setFilters({...filters,startDate:e.target.value})}
         
            />
          </div>

          {/* Check-out Date Input */}
          <div className="flex flex-col">
            <label htmlFor="check-out" className="text-sm font-medium text-white">Check-out</label>
            <input
              type="date"
              id="check-out"
              name="check-out"
              required
              value = {filters.endDate}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              onChange = {(e)=>setFilters({...filters,endDate:e.target.value})}
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="text-center mt-6">
          <button
            type="button" onClick={handleSearch}
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-white hover:border-[1px] hover:text-black focus:outline-none"
          >
            {location.pathname === "/" ? "Search" :"Update search"}
          </button>
        </div>
      </form>
    </div>
  </div>

    
  )
})

export default SearchBox
