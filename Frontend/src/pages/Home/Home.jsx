import React from 'react'
import Navbar from '../../components/Navbar'
import Hotelsearch from '../../components/Hotelsearch'
import CardSection from '../../components/CardSection'
import Footer from '../../components/Footer'
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='section1' >
        <Hotelsearch />
        <CardSection />
      </div>
      <Footer />
     
       
    </div>
  )
}

export default Home
