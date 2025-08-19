import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Booking from '../pages/Booking'
import Services from '../components/home/Services'
import ServiceDetail from '../components/UiUx.jsx/DetailsInfo'

import AccountPage from '../pages/account/AccountPage'
import Login from '../pages/account/Login'
import Signup from '../pages/account/Signup'
import Profile from '../pages/account/Profile'
import MyAppointments from '../pages/account/MyAppointments'
import ProtectedRoute from './Protectedroute'

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/services' element={<Services />}/>
        <Route path="/services/:category" element={<ServiceDetail />} />
        <Route path='book' element={<Booking />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      
          {/* Protected routes */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/appointments"
          element={
            <ProtectedRoute>
              <MyAppointments />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      
    </Routes>
  )
}

export default AppRouter