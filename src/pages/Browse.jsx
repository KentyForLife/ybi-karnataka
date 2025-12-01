import React, { useEffect, useState } from 'react'
import { listResearch } from '../firebase'
import ResearchCard from '../components/ResearchCard'

export default function Browse(){
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    listResearch().then(r=>{
      setList(r.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0)))
      setLoading(false)
    }).catch(e=>{
      console.error(e)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-green-600 mb-2">Browse Research</h2>
        <p className="text-gray-600">Explore research papers from the YBI Karnataka community</p>
      </div>
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin text-3xl">...</div>
          <p className="text-gray-600 mt-2">Loading research papers...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.length === 0 && (
            <div className="col-span-full text-center py-12 bg-green-50 rounded-lg">
              <p className="text-gray-600 text-lg">No research uploaded yet.</p>
              <p className="text-gray-500 text-sm">Be the first to contribute!</p>
            </div>
          )}
          {list.map(r=> <ResearchCard key={r.id} r={r} />)}
        </div>
      )}
    </div>
  )
}
