import React from 'react'
import { Link } from 'react-router-dom'

export default function About(){
  return (
    <div className="space-y-8 animate-fadeInUp">
      <div className="bg-gradient-to-r from-brand-50 via-white to-brand-50 rounded-2xl shadow-brand border border-brand-200 p-8">
        <h2 className="text-4xl font-bold text-brand-700 mb-4">About YBI Karnataka</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          The Young Biomechanics Institute, Karnataka Chapter, inspires students to explore how engineering principles enhance understanding of the human body. Through our active research department and hands-on workshops with government-school students, we spark curiosity, support learning, and encourage young minds to pursue impactful careers in biomechanics.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h3 className="text-3xl font-bold text-brand-700 mb-6">Our Mission</h3>
        <p className="text-gray-700 leading-relaxed mb-8">
          We believe in the power of open knowledge and collaborative innovation. This platform stores research metadata and PDF files securely using Firebase. Contributors can upload and share their work publicly, creating a vibrant community of researchers and innovators.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gradient-to-br from-brand-50 to-brand-100 p-6 rounded-xl border-l-4 border-brand-600 hover:shadow-brand transition-shadow">
            <h4 className="font-bold text-brand-700 mb-2 text-lg">Accessible</h4>
            <p className="text-sm text-gray-700">Browse and access research from anywhere, anytime.</p>
          </div>
          <div className="bg-gradient-to-br from-brand-50 to-brand-100 p-6 rounded-xl border-l-4 border-brand-600 hover:shadow-brand transition-shadow">
            <h4 className="font-bold text-brand-700 mb-2 text-lg">Community-Driven</h4>
            <p className="text-sm text-gray-700">Built by and for researchers and students alike.</p>
          </div>
          <div className="bg-gradient-to-br from-brand-50 to-brand-100 p-6 rounded-xl border-l-4 border-brand-600 hover:shadow-brand transition-shadow">
            <h4 className="font-bold text-brand-700 mb-2 text-lg">Secure</h4>
            <p className="text-sm text-gray-700">Firebase-backed storage and management.</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-2xl shadow-brand-lg p-10">
        <h3 className="text-3xl font-bold mb-4">Get Started Today</h3>
        <p className="text-brand-100 mb-8 text-lg">
          Have a research paper or project? Share it with the YBI Karnataka community and contribute to our collective knowledge.
        </p>
        <Link to="/upload" className="inline-block px-8 py-3 bg-white text-brand-700 rounded-lg font-bold hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl">
          Start Uploading
        </Link>
      </div>
    </div>
  )
}
