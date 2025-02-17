import React from 'react'
import SearchBox from  '../components/SearchBox'

const Hotelsearch = ({onSearch}) => {
  return (
    <div className=' flex flex-col max-w-full-screen-2xl md:px-20 py-20  md:gap-5 '>
      <div className='flex flex-col p-5 md:p-10'>
         <h1 className='text-[2.5rem] sm:text-[4rem] text-white font-[700]'>Find a <span className='text-gray-500'>host</span> for every journey</h1>
         <p className='text-[1rem] text-white md:text-[1.2rem]'>Discover the best local rental properties that fits your every travel needs</p>
      </div>
      <div>
         <SearchBox onSearch={onSearch} />
         
      </div>


    </div>
  )
}

export default Hotelsearch
