/**
 * Workshop Details Page
 * Displays full details of a single workshop
 * Shows title, date, slogan, and report
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWorkshop } from '../firebase';

export default function WorkshopDetails() {
  // Get workshop ID from URL params
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null); // Workshop data
  const [loading, setLoading] = useState(true); // Loading indicator

  // Fetch workshop details when component mounts or ID changes
  useEffect(() => {
    setLoading(true);
    getWorkshop(id)
      .then((res) => {
        setWorkshop(res);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin text-3xl">...</div>
        <p className="text-gray-600 mt-2">Loading workshop...</p>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg">
        <p className="text-red-600 font-semibold">Workshop not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b-2 border-brand-200 pb-4">
        <h2 className="text-3xl font-bold text-brand-600 mb-2">{workshop.title}</h2>
        <div className="flex items-center gap-4 text-gray-600">
          <span className="font-medium">{workshop.date}</span>
        </div>
      </div>

      {/* Slogan Section */}
      <div className="bg-brand-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-brand-600 mb-3">Slogan</h3>
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{workshop.slogan}</p>
      </div>

      {/* Workshop Report Section */}
      <div className="bg-white p-8 rounded-lg border-2 border-brand-200">
        <h3 className="text-xl font-semibold text-brand-600 mb-4">Workshop Report</h3>
        {workshop.report ? (
          <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
            {workshop.report}
          </div>
        ) : (
          <p className="text-gray-600 italic">No content available.</p>
        )}
      </div>
    </div>
  );
}
