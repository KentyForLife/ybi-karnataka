/**
 * Research Paper Card Component
 * Displays a preview card for a single research paper
 * Shows title, author, description, and links to view details or open the paper
 */

import React from 'react'
import { Link } from 'react-router-dom'

export default function ResearchCard({ r }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-brand hover:scale-105 transition-all duration-300 p-6 flex flex-col border border-gray-100">
      <h3 className="text-lg font-bold text-brand-700 mb-1 line-clamp-2">{r.title}</h3>
      <div className="text-sm text-gray-500 mb-3 font-medium">{r.author}</div>
      <p className="mt-2 text-gray-700 text-sm line-clamp-3 flex-1">{r.description}</p>
      <div className="mt-5 pt-4 border-t border-gray-100">
        <Link 
          to={`/research/${r.id}`} 
          className="inline-block w-full text-center px-4 py-2 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition"
        >
          Read Full Paper →
        </Link>
      </div>
    </div>
  )
}
