import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import FirebaseConfigBanner from './components/FirebaseConfigBanner'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Browse from './pages/Browse'
import Details from './pages/Details'
import About from './pages/About'
import Admin from './pages/Admin'

export default function App() {
  return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <FirebaseConfigBanner />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/research/:id" element={<Details />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
  )
}
