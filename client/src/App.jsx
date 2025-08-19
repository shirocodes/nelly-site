import React from 'react'
import { AuthProvider } from './context/AuthContext'
import AppRouter from './routes/AppRouter'
import Layout from './components/layout/Layout'

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <AppRouter />
      </Layout> 
    </AuthProvider> 
  )
}

export default App