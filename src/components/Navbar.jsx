import React from 'react'
import { NavLink } from 'react-router-dom'

const Link = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
    }
  >
    {children}
  </NavLink>
)

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="text-indigo-600 font-bold text-xl">YBI Karnataka</div>
          <div className="hidden md:flex items-center gap-1">
            <Link to="/">Home</Link>
            <Link to="/upload">Upload Research</Link>
            <Link to="/browse">Browse Research</Link>
            <Link to="/about">About</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </div>
        <div className="md:hidden">
          <NavLink to="/browse" className="text-sm text-indigo-600">Browse</NavLink>
        </div>
      </div>
    </header>
  )
}
