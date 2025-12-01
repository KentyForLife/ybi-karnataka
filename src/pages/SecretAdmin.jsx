import React, { useEffect, useState, useContext } from 'react'
import { listResearch, deleteResearch } from '../firebase'
import { AdminContext } from './AdminContext.jsx'

// Hard-coded admin password for secret admin page access
const ADMIN_PASSWORD = 'tarunsigma123'

export default function SecretAdmin(){
  const [password, setPassword] = useState('')        // Password input
  const [authed, setAuthed] = useState(false)          // Track if user is authenticated
  const [list, setList] = useState([])                 // List of research items
  const [loading, setLoading] = useState(false)        // Loading state for API calls
  
  // Get setAdmin function from AdminContext to update admin state across the app
  const { setAdmin } = useContext(AdminContext)

  useEffect(()=>{ if(authed) refresh() }, [authed])

  async function refresh(){
    setLoading(true)
    try{
      const items = await listResearch()
      setList(items.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0)))
    }catch(e){ console.error(e) }
    setLoading(false)
  }

  // Handle admin login: check password and set admin context to 1 if correct
  function tryLogin(e){
    e.preventDefault()
    if(password === ADMIN_PASSWORD){
      // Password is correct: mark as authenticated
      setAuthed(true)
      
      // Set admin context flag to 1 so navbar shows Upload button
      try{ 
        if(typeof setAdmin === 'function') setAdmin(1) 
      }catch(e){ 
        console.error(e) 
      }
      
      // Clear password field
      setPassword('')
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
    <div className="max-w-4xl mx-auto py-8">
      {!authed ? (
        <form onSubmit={tryLogin} className="bg-white p-6 rounded shadow max-w-sm mx-auto">
          <h3 className="text-lg font-semibold mb-2">Admin Access</h3>
          <p className="text-sm text-gray-600 mb-4">Enter password to manage research uploads.</p>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded p-2 mb-3" placeholder="Password" />
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded">Enter</button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded shadow">
            <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Admin - Manage Research</h3>
            {/* Logout button: reset authentication and admin context */}
            <button onClick={()=>{
              setAuthed(false)              // Mark as not authenticated
              setPassword('')               // Clear password
              
              // Reset admin context to 0 to hide Upload button from navbar
              try{ 
                if(typeof setAdmin === 'function') setAdmin(0) 
              }catch(e){ 
                console.error(e) 
              }
            }} className="text-sm text-red-600">Logout</button>
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
                      <div className="font-medium text-green-700">{i.title}</div>
                      <div className="text-sm text-gray-600">{i.author}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={i.fileURL} target="_blank" rel="noreferrer" className="text-sm text-green-600">Open</a>
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
