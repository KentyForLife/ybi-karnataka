/**
 * Browse Workshops Page
 * Displays all workshops in a grid with cards
 * Workshops are sorted by most recent first
 */

import React, { useEffect, useState } from 'react';
import { listWorkshops } from '../firebase';
import WorkshopCard from '../components/WorkshopCard';

export default function BrowseWorkshops() {
  const [list, setList] = useState([]); // Array of workshops
  const [loading, setLoading] = useState(true); // Loading indicator

  // Fetch all workshops on component mount
  useEffect(() => {
    setLoading(true);
    listWorkshops()
      .then((r) => {
        // Sort workshops by creation date (newest first)
        setList(r.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fadeInUp">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent mb-2">Browse Workshops</h2>
        <p className="text-gray-500">Explore workshops from the YBI community</p>
      </div>
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin text-4xl text-brand-600">⟳</div>
          <p className="text-gray-600 mt-4">Loading workshops...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.length === 0 && (
            <div className="col-span-full text-center py-16 bg-gradient-to-r from-brand-50 to-brand-100 rounded-xl border border-brand-200">
              <p className="text-gray-700 text-lg font-semibold">No workshops uploaded yet.</p>
              <p className="text-gray-500 text-sm mt-1">Be the first to contribute!</p>
            </div>
          )}
          {list.map((workshop, i) => (
            <div key={workshop.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
              <WorkshopCard workshop={workshop} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}