/**
 * Research Paper Details Page
 * Displays full details of a single research paper
 * Shows title, author, abstract, and embeds or links to the PDF
 */

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getResearch } from '../firebase'

export default function Details(){
  // Get research ID from URL params
  const { id } = useParams()
  const [r, setR] = useState(null) // Research paper data
  const [loading, setLoading] = useState(true) // Loading indicator

  // Fetch research details when component mounts or ID changes
  useEffect(()=>{
    setLoading(true)
    getResearch(id).then(res=>{
      setR(res)
      setLoading(false)
    }).catch(e=>{console.error(e); setLoading(false)})
  }, [id])

  if(loading) return (
    <div className="text-center py-12">
      <div className="inline-block animate-spin text-3xl">...</div>
      <p className="text-gray-600 mt-2">Loading research paper...</p>
    </div>
  )
  if(!r) return (
    <div className="text-center py-12 bg-red-50 rounded-lg">
      <p className="text-red-600 font-semibold">Research not found.</p>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="border-b-2 border-brand-200 pb-4">
        <h2 className="text-3xl font-bold text-brand-600 mb-2">{r.title}</h2>
        <div className="flex items-center gap-4 text-gray-600">
          <span className="font-medium">By {r.author}</span>
        </div>
      </div>
      
      {/* Abstract Section */}
      <div className="bg-brand-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-brand-600 mb-3">Abstract</h3>
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{r.description}</p>
      </div>
      
      {/* Full Research Content Section */}
      <div className="bg-white p-8 rounded-lg border-2 border-brand-200">
        <h3 className="text-xl font-semibold text-brand-600 mb-4">Full Research Paper</h3>
        {r.content ? (
          <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
            {r.content}
          </div>
        ) : (
          <p className="text-gray-600 italic">No content available.</p>
        )}
      </div>
    </div>
  )
}
