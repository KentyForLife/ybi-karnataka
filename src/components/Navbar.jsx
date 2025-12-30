import React from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../pages/AdminContext.jsx';

// Link component for navigation with active state styling
const Link = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium ${
        isActive ? 'bg-brand-600 text-white' : 'text-gray-700 hover:bg-gray-100'
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  // Read admin state from context
  const { admin } = React.useContext(AdminContext);
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="text-brand-600 font-bold text-3xl">YBI</div>
        <div className="hidden md:flex items-center gap-1">
          <Link to="/">Home</Link>
          {/* Show Upload Research link only when admin context is 1 */}
          {admin === 1 && <Link to="/upload">Upload Research</Link>}
          {admin === 1 && <Link to="/upload-workshop">Upload Workshop</Link>}
          <Link to="/browse">Browse Research</Link>
          <Link to="/browse-workshops">Browse Workshops</Link>
          <Link to="/about">About</Link>
          {admin === 1 && <Link to="/admin">Manage Research</Link>}
          {admin === 1 && <Link to="/admin-workshops">Manage Workshops</Link>}
        </div>
        <div className="md:hidden">
          <NavLink to="/browse" className="text-sm text-brand-600">
            Browse
          </NavLink>
        </div>
      </div>
    </header>
  );
}
