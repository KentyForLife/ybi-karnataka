import React from 'react';
import { Link } from 'react-router-dom';

export default function Upload() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded shadow border-l-4 border-brand-600">
        <h3 className="text-lg font-semibold mb-2 text-brand-600">Upload Content</h3>
        <p className="text-sm text-gray-600 mb-4">Select the type of content you want to upload.</p>
        <div className="flex space-x-4">
          <Link to="/upload-research" className="px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 font-semibold">
            Upload Research
          </Link>
          <Link to="/upload-workshop" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold">
            Upload Workshop
          </Link>
        </div>
      </div>
    </div>
  );
}
