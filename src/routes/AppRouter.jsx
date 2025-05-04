import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/home/Home'
import Booking from '../pages/Booking'

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='book' element={<Booking />}/>
    </Routes>
  )
}

export default AppRouter