import React, { useEffect, useState } from 'react'
import { listResearch, deleteResearch } from '../firebase'

const ADMIN_PASSWORD = 'ybi123'

export default function Admin(){
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(authed) refresh()
  }, [authed])

  async function refresh(){
    setLoading(true)
    const items = await listResearch()
    setList(items.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0)))
    setLoading(false)
  }

  function tryLogin(e){
    e.preventDefault()
    if(password === ADMIN_PASSWORD){
      setAuthed(true)
    } else {
      alert('Incorrect password')
    }
  }

  async function handleDelete(id, storagePath){
    if(!confirm('Delete this research?')) return
    try{
      await deleteResearch(id, storagePath)
      await refresh()
    }catch(e){ console.error(e); alert('Failed to delete') }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!authed ? (
        <form onSubmit={tryLogin} className="bg-white p-6 rounded shadow max-w-sm">
          <h3 className="text-lg font-semibold mb-2">Admin</h3>
          <p className="text-sm text-gray-600 mb-4">Enter password to manage research uploads.</p>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded p-2 mb-3" placeholder="Password" />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Enter</button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Admin - Manage Research</h3>
            <button onClick={()=>{setAuthed(false); setPassword('')}} className="text-sm text-red-600">Logout</button>
          </div>

          <div className="mt-4">
            <button onClick={refresh} className="px-3 py-1 bg-gray-100 rounded">Refresh</button>
          </div>

          <div className="mt-4">
            {loading ? <div>Loading...</div> : (
              <div className="space-y-3">
                {list.length === 0 && <div className="text-gray-600">No research found</div>}
                {list.map(i=> (
                  <div key={i.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-indigo-700">{i.title}</div>
                      <div className="text-sm text-gray-600">{i.author}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={i.fileURL} target="_blank" rel="noreferrer" className="text-sm text-indigo-600">Open</a>
                      <button onClick={()=>handleDelete(i.id, i.storagePath)} className="text-sm text-red-600">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
