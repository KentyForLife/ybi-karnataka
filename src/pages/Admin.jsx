import React, { useEffect, useState } from 'react'
import { listResearch, deleteResearch } from '../firebase'

const ADMIN_PASSWORD = 'tarunsigma123'

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
        <form onSubmit={tryLogin} className="bg-white p-6 rounded shadow max-w-sm border-l-4 border-green-600">
          <h3 className="text-lg font-semibold mb-2 text-green-600">Admin Panel</h3>
          <p className="text-sm text-gray-600 mb-4">Enter password to manage research uploads.</p>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" placeholder="Password" />
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold">Enter</button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded shadow border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-green-600">Manage Research</h3>
            <button onClick={()=>{setAuthed(false); setPassword('')}} className="text-sm text-red-600 hover:text-red-700 font-semibold">Logout</button>
          </div>

          <div className="mt-4">
            <button onClick={refresh} className="px-4 py-2 bg-green-100 text-green-600 rounded font-semibold hover:bg-green-200">Refresh</button>
          </div>

          <div className="mt-4">
            {loading ? <div className="text-gray-600">Loading...</div> : (
              <div className="space-y-3">
                {list.length === 0 && <div className="text-gray-600">No research found</div>}
                {list.map(i=> (
                  <div key={i.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-green-400">
                    <div>
                      <div className="font-medium text-green-700">{i.title}</div>
                      <div className="text-sm text-gray-600">{i.author}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a href={i.fileURL} target="_blank" rel="noreferrer" className="text-sm text-green-600 hover:text-green-700 font-semibold">Open</a>
                      <button onClick={()=>handleDelete(i.id, i.storagePath)} className="text-sm text-red-600 hover:text-red-700 font-semibold">Delete</button>
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
