

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { FaAngleDown } from "react-icons/fa";
import SearchBox from "../../components/SearchBox";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import HotelCard from "../../components/HotelCard";
const Rooms = React.memo(() => {
  const [rooms, setRooms] = useState([]);
  const [searchParams] = useSearchParams();
  const [loading,setloading]= useState(false);
  const [filters, setFilters] = useState({
    city: "",
    minPrice: 500,
    maxPrice: 100000,
    startDate: "",
    endDate: "",
  });
  

  console.log("filters",filters)
  

  useEffect(() => {
    const delayAPI = setTimeout(() => {
      fetchRooms();
    }, 1000); // 500ms ka debounce time

    return () => clearTimeout(delayAPI);
  }, [filters,searchParams]); // filters change hone par debounce hoga


  useEffect(() => {
    setloading(true)
    fetchRooms();
  }, [searchParams]);
  
  const fetchRooms = async () => {
     const loadingtimeout = setTimeout(() => {
      setloading(true)
     },300)
   
    try {
      const params= {
        ...Object.fromEntries(searchParams.entries()),
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice

      }
     
      const response = await axios.get("http://localhost:5000/api/rooms", {
        withCredentials: true,
        params: params,

      });

      if(response.data.rooms.length === 0){
        setRooms([])

      } else{
        setRooms(response.data.rooms)
      // setTimeout(() => {
      //   setloading(false)
        
      // }, 500);// setTimeout(() => {
      //   setloading(false)
        
      // }, 500);
      }
          
      console.log("rooms", response.data.rooms);
      setloading(false)

    } catch (error) {
      console.error("Error fetching rooms", error);
    } finally{

      clearTimeout(loadingtimeout)
      
    }
  };


useEffect(() => {
  if (!searchParams.get("city")) {
    navigate("?city=default&minPrice=500&maxPrice=100000");
  }
}, []);

  // ✅ Filters ko update karega bina turant API call kiye (debounce kaam karega)
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <>
      <div className="w-full">
        <Navbar />
        <SearchBox onSearch={fetchRooms || (()=>{console.log("fetchRooms called")})}  />

        <div className="containerborder  w-full md:flex md:px-20 md:gap-5 p-10">
          {/* Left Sidebar */}
          <div className="bg-white rounded-md p-4  w-full md:w-1/4 h-[250px]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-4">Filter Price</h3>
              <FaAngleDown  className="cursor-pointer" />
            </div>
            
              <div className="px-2">
                <label className="text-sm font-medium text-gray-700">
                  Min Price
                </label>
                <input
                  type="range"
                  min="500"
                  max={filters.maxPrice}

                  value={filters.minPrice}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value)
                  }
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                />
                <label className="text-sm font-medium text-gray-700 mt-2">
                  Max Price
                </label>
                <input
                  type="range"
                  min={filters.minPrice}
                  max="10000"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value)
                  }
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600">
                    ₹{filters.minPrice}
                  </span>
                  <span className="text-sm text-gray-600">
                    ₹{filters.maxPrice}
                  </span>
                </div>
              </div>
            
          </div>
          {/* Right Sidebar */}
          <div className=" w-full md:w-3/4 ">
            <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-3 gap-9">

              {loading ? (
                <p className="text-white text-3xl">Loading...</p>
              ): rooms.length > 0 ?(
                rooms.map((room) => (

                    <HotelCard key={room._id} image={`data:image/jpeg;base64,${room.image}`} city={room.city} description={room.description} title={room.title} price={room.price} name={room.hostId?.name ||"unknown host"} email={room.hostId?.email || "unknown host"} contactNumber={room.hostId?.contactNumber || "unknown number"} address={room.address} />
                
                ))

              ):(

                !loading && rooms.length === 0 && <div className="flex w-full h-full justify-center items-center">
                <p className="text-white text-3xl">No rooms available</p>
                
              </div>

              )}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
})

export default Rooms;




