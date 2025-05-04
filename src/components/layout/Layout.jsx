import React from 'react'
import { Link } from 'react-router-dom'

const Layout = ({children}) => {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/book">Book Now</Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>© 2025 Behavior Analyst</p>
      </footer>
    </>
  )
}

export default Layout