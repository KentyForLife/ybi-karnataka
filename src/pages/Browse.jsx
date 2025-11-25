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
      <h2 className="text-2xl font-semibold mb-4">Browse Research</h2>
      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.length === 0 && <div className="text-gray-600">No research uploaded yet.</div>}
          {list.map(r=> <ResearchCard key={r.id} r={r} />)}
        </div>
      )}
    </div>
  )
}
