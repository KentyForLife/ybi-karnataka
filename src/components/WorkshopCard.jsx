/**
 * Workshop Card Component
 * Displays a preview card for a single workshop
 * Shows title, date, slogan, and image
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function WorkshopCard({ workshop }) {
  // Always use local image, fallback if imageUrl doesn't exist or is empty
  const imageUrl = workshop.imageUrl && workshop.imageUrl.trim() ? workshop.imageUrl : '/workshop-report.jpg';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100 group hover:shadow-xl"
    >
      {/* Image container with overlay */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-200">
        <motion.img 
          src={imageUrl} 
          alt={workshop.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {e.target.src = '/workshop-report.jpg'}}
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Accent bar */}
      <div className="h-1 bg-gradient-to-r from-green-600 to-green-400" />

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-green-700 mb-1 line-clamp-2 group-hover:text-green-800 transition">{workshop.title}</h3>
        <div className="text-sm text-gray-500 mb-3 font-medium flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full" />
          {workshop.date}
        </div>
        <p className="text-gray-700 text-sm line-clamp-3 flex-1 leading-relaxed">{workshop.slogan}</p>
        <div className="mt-5 pt-4 border-t border-gray-100">
          <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
            <Link
              to={`/workshop/${workshop.id}`}
              className="inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-600 transition shadow-md"
            >
              View Workshop Report →
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}