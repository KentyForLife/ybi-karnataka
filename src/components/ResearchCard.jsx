import React from 'react'
import { Link } from 'react-router-dom'

export default function ResearchCard({ r }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <h3 className="text-lg font-semibold text-indigo-700">{r.title}</h3>
      <div className="text-sm text-gray-600">{r.author}</div>
      <p className="mt-2 text-gray-700 text-sm line-clamp-3">{r.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <Link to={`/research/${r.id}`} className="text-sm text-indigo-600 hover:underline">View details</Link>
        <a href={r.fileURL} target="_blank" rel="noreferrer" className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">Open PDF</a>
      </div>
    </div>
  )
}
