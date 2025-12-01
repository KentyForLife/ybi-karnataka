import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getResearch } from '../firebase'

export default function Details(){
  const { id } = useParams()
  const [r, setR] = useState(null)
  const [loading, setLoading] = useState(true)

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
      <div className="border-b-2 border-green-200 pb-4">
        <h2 className="text-3xl font-bold text-green-600 mb-2">{r.title}</h2>
        <div className="flex items-center gap-4 text-gray-600">
          <span>By {r.author}</span>
        </div>
      </div>
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="font-semibold text-green-600 mb-2">Abstract</h3>
        <p className="text-gray-800 leading-relaxed">{r.description}</p>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-green-600 mb-3">Research Paper</h3>
        <iframe src={r.fileURL} title={r.title} className="w-full h-[80vh] border-2 border-green-200 rounded-lg" />
      </div>
    </div>
  )
}
