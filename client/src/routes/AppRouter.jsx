import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Booking from '../pages/Booking'
import Services from '../components/home/Services'
import ServiceDetail from '../components/UiUx.jsx/DetailsInfo'

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/services' element={<Services />}/>
        <Route path="/services/:category" element={<ServiceDetail />} />
        <Route path='book' element={<Booking />}/>
    </Routes>
  )
}

export default AppRouter