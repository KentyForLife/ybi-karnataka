/**
 * Research Paper Card Component
 * Displays a preview card for a single research paper
 * Shows title, author, description, and links to view details or open the paper
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ResearchCard({ r }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 flex flex-col border border-gray-100 overflow-hidden group"
    >
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-600 to-brand-400" />
      
      <h3 className="text-lg font-bold text-brand-700 mb-2 line-clamp-2 group-hover:text-brand-800 transition">{r.title}</h3>
      <div className="text-sm text-gray-500 mb-3 font-medium flex items-center gap-1">
        <span className="inline-block w-1.5 h-1.5 bg-brand-600 rounded-full" />
        {r.author}
      </div>
      <p className="mt-2 text-gray-700 text-sm line-clamp-3 flex-1 leading-relaxed">{r.description}</p>
      <div className="mt-5 pt-4 border-t border-gray-100">
        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
          <Link 
            to={`/research/${r.id}`} 
            className="inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-lg hover:from-brand-700 hover:to-brand-600 transition shadow-md"
          >
            Read Full Paper →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
