import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-extrabold text-indigo-600">YBI Karnataka</h1>
      <p className="mt-4 text-lg text-gray-700">A community repository for research and innovation.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/upload" className="px-6 py-3 bg-indigo-600 text-white rounded-md">Upload Research</Link>
        <Link to="/browse" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md">Browse Research</Link>
      </div>
    </div>
  )
}
