/**
 * Upload/Submit Workshop Page
 * Allows users to submit workshop reports by providing metadata and a link
 * Admin access is controlled via AdminContext (Upload link only visible when admin=1)
 */

import React, { useState } from 'react';
import { addWorkshop } from '../firebase';

export default function UploadWorkshop() {
  // Form state: title, date, slogan, imageUrl, report
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [slogan, setSlogan] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [report, setReport] = useState('');
  const [status, setStatus] = useState(''); // Success/error message
  const [isLoading, setIsLoading] = useState(false); // Loading state for submit button

  /**
   * Handle form submission
   * Validates all fields are filled, then saves to Firebase
   * Shows success/error status and clears form on success
   */
  async function handleSubmit(e) {
    e.preventDefault();
    // Allow imageUrl to be optional for "Workshop 1"
    if (!title || !date || !slogan || !report || (!imageUrl && title !== 'Workshop 1')) {
      setStatus('Please fill all fields.');
      return;
    }
    setIsLoading(true);
    setStatus('Saving...');
    try {
      // Use placeholder URL for Workshop 1 if imageUrl is empty
      const finalImageUrl = title === 'Workshop 1' && !imageUrl ? '/workshop-report.jpg' : imageUrl;
      const docId = await addWorkshop({ title, date, slogan, imageUrl: finalImageUrl, report });
      setStatus('Saved successfully!');
      setTitle('');
      setDate('');
      setSlogan('');
      setImageUrl('');
      setReport('');
      setTimeout(() => setStatus(''), 3000);
    } catch (e) {
      console.error(e);
      setStatus('Save failed. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-brand-600 mb-2">Upload Workshop</h2>
        <p className="text-gray-600">Share your workshop report with the YBI Karnataka community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Workshop Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title of your workshop"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Workshop Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </div>

            {/* Slogan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Workshop Slogan</label>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                placeholder="A catchy slogan for your workshop"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Workshop Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </div>

            {/* Workshop Report */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Workshop Report</label>
              <textarea
                value={report}
                onChange={(e) => setReport(e.target.value)}
                placeholder="Paste your complete workshop report here..."
                rows={20}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Paste the full text of your workshop report.</p>
            </div>

            {/* Status Message */}
            {status && (
              <div className={`p-3 rounded-lg text-sm font-medium ${status.includes('✅') ? 'bg-brand-100 text-brand-700' : status.includes('❌') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                {status}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 disabled:bg-gray-400 transition-all duration-200"
            >
              {isLoading ? 'Saving...' : 'Save Workshop'}
            </button>
          </form>
        </div>

        {/* Reference & Tips */}
        <div className="bg-brand-50 rounded-lg shadow-lg p-6 border-2 border-brand-200">
          <h3 className="text-lg font-bold text-brand-600 mb-4">Reference Guide</h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-brand-600 mb-1">Workshop Title</h4>
              <p>Be clear and descriptive.</p>
            </div>
            <div>
              <h4 className="font-semibold text-brand-600 mb-1">Workshop Date</h4>
              <p>The date the workshop was held.</p>
            </div>
            <div>
              <h4 className="font-semibold text-brand-600 mb-1">Slogan</h4>
              <p>A short and catchy phrase.</p>
            </div>
            <div>
                <h4 className="font-semibold text-brand-600 mb-1">Image URL</h4>
                <p>A URL to an image for the workshop.</p>
            </div>
            <div>
              <h4 className="font-semibold text-brand-600 mb-1">Workshop Report</h4>
              <p>Paste your complete workshop report text.</p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-brand-200">
              <p className="text-xs text-gray-600">Tip: Make sure your report is complete and properly formatted before pasting.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
