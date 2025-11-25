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

  if(loading) return <div>Loading...</div>
  if(!r) return <div>Research not found.</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{r.title}</h2>
      <div className="text-gray-600">By {r.author}</div>
      <p className="text-gray-800">{r.description}</p>
      <div className="mt-4">
        <iframe src={r.fileURL} title={r.title} className="w-full h-[80vh] border" />
      </div>
    </div>
  )
}
