import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  const [displayedText, setDisplayedText] = useState('')
  const [displayedSubText, setDisplayedSubText] = useState('')
  const fullText = 'YBI Karnataka'
  const fullSubText = 'A student led research repository for biomechanics enthusiasts.'

  useEffect(() => {
    let charIndex = 0
    const titleInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(titleInterval)
      }
    }, 80)
    return () => clearInterval(titleInterval)
  }, [])

  useEffect(() => {
    let delay = fullText.length * 80 + 300
    let charIndex = 0
    const subtitleTimeout = setTimeout(() => {
      const subtitleInterval = setInterval(() => {
        if (charIndex <= fullSubText.length) {
          setDisplayedSubText(fullSubText.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(subtitleInterval)
        }
      }, 30)
      return () => clearInterval(subtitleInterval)
    }, delay)
    return () => clearTimeout(subtitleTimeout)
  }, [])

  return (
    <div className="space-y-16">
      {/* Hero Section with Background */}
      <div 
        className="relative text-center py-32 rounded-lg overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(0, 0, 0, 0.2)), url("https://images.pexels.com/photos/3862627/pexels-photo-3862627.jpeg?auto=compress&cs=tinysrgb&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '450px'
        }}
      >
        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-white min-h-16">
            {displayedText}
            {displayedText.length < fullText.length && <span className="animate-pulse">|</span>}
          </h1>
          <p className="mt-6 text-xl text-white min-h-8">
            {displayedSubText}
            {displayedSubText.length < fullSubText.length && <span className="animate-pulse">|</span>}
          </p>
          <div className="mt-10 flex justify-center gap-4">
           
            <Link to="/browse" className="px-8 py-3  bg-green-600 text-white rounded-md font-semibold hover:bg-white/10 transition">
              Browse Research
            </Link>
          </div>
        </div>
      </div>

    
       
      {/* Contact Section */}
      <div className="bg-green-600 text-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <p className="text-green-100 mb-2">Phone: +91 12345678</p>
            <p className="text-green-100 mb-2">Email: contact@ybi-karnataka.com</p>
            <p className="text-green-100">Location: Karnataka, India</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Connect With Us</h3>
            <p className="text-green-100 mb-4">Join our community and contribute your research today. We welcome submissions from students, researchers, and innovators.</p>
            
          </div>
        </div>
      </div>
    </div>
  )
}
