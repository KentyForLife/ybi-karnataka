import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import FirebaseConfigBanner from './components/FirebaseConfigBanner'
import GlobalShortcut from './components/GlobalShortcut'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Browse from './pages/Browse'
import Details from './pages/Details'
import About from './pages/About'
import Admin from './pages/Admin'
import SecretAdmin from './pages/SecretAdmin'
// Import AdminProvider to provide admin context to entire app
import { AdminProvider } from './pages/AdminContext.jsx'

export default function App() {
  return (
    // Wrap entire app with AdminProvider so all components can access admin state
    <AdminProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Navigation bar (shows Upload link when admin === 1) */}
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {/* Show Firebase config banner if settings are missing */}
          <FirebaseConfigBanner />
          {/* Global keyboard shortcut listener for Ctrl+Shift+A to open secret admin */}
          <GlobalShortcut />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/research/:id" element={<Details />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            {/* Secret admin page - accessible via Ctrl+Shift+A shortcut */}
            <Route path="/secret-admin" element={<SecretAdmin />} />
          </Routes>
        </main>
      </div>
    </AdminProvider>
  )
}
