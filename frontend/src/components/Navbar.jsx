import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-sm px-4 py-3 mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="font-bold text-lg">Gestionnaire</Link>
          {isAuthenticated && (
            <>
              <Link to="/clients" className="text-sm text-gray-600 hover:text-gray-800">Clients</Link>
              <Link to="/invoices" className="text-sm text-gray-600 hover:text-gray-800">Factures</Link>
            </>
          )}
        </div>

        <div>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          ) : (
            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-800">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
