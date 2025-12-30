/**
 * Workshop Card Component
 * Displays a preview card for a single workshop
 * Shows title, date, slogan, and image
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default function WorkshopCard({ workshop }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-brand hover:scale-105 transition-all duration-300 p-6 flex flex-col border border-gray-100">
      <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-48 object-cover rounded-t-xl mb-4" />
      <h3 className="text-lg font-bold text-brand-700 mb-1 line-clamp-2">{workshop.title}</h3>
      <div className="text-sm text-gray-500 mb-3 font-medium">{workshop.date}</div>
      <p className="mt-2 text-gray-700 text-sm line-clamp-3 flex-1">{workshop.slogan}</p>
      <div className="mt-5 pt-4 border-t border-gray-100">
        <Link
          to={`/workshop/${workshop.id}`}
          className="inline-block w-full text-center px-4 py-2 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition"
        >
          View Workshop Report →
        </Link>
      </div>
    </div>
  );
}