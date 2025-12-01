import React from 'react'
import { Link } from 'react-router-dom'

export default function About(){
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-8 border-l-4 border-green-600">
        <h2 className="text-3xl font-bold text-green-600 mb-4">About YBI Karnataka</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          The Young Biomechanics Institute, Karnataka Chapter, inspires students to explore how engineering principles enhance understanding of the human body. Through our active research department and hands-on workshops with government-school students, we spark curiosity, support learning, and encourage young minds to pursue impactful careers in biomechanics.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-green-600 mb-4">Our Mission</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          We believe in the power of open knowledge and collaborative innovation. This platform stores research metadata and PDF files securely using Firebase. Contributors can upload and share their work publicly, creating a vibrant community of researchers and innovators.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
            <h4 className="font-bold text-green-600 mb-2">Accessible</h4>
            <p className="text-sm text-gray-600">Browse and access research from anywhere, anytime.</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
            <h4 className="font-bold text-green-600 mb-2">Community-Driven</h4>
            <p className="text-sm text-gray-600">Built by and for researchers and students alike.</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
            <h4 className="font-bold text-green-600 mb-2">Secure</h4>
            <p className="text-sm text-gray-600">Firebase-backed storage and management.</p>
          </div>
        </div>
      </div>

      <div className="bg-green-600 text-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Get Started Today</h3>
        <p className="text-green-100 mb-6">
          Have a research paper or project? Share it with the YBI Karnataka community and contribute to our collective knowledge.
        </p>
        <Link to="/upload" className="inline-block px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition">
          Start Uploading
        </Link>
      </div>
    </div>
  )
}
