/**
 * Secret Admin Panel (Hidden Route: /secret-admin)
 * Accessed via secret keyboard shortcut (Ctrl+Shift+A)
 * Allows admins to manage uploads and unlock Upload link in navbar
 * Uses AdminContext to control navbar visibility
 */

import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { listResearch, deleteResearch } from '../firebase'
import { AdminContext } from './AdminContext.jsx'

const ADMIN_PASSWORD = 'tarunsigma123' // Hard-coded password

export default function SecretAdmin(){
  const [password, setPassword] = useState('') // Password input
  const [authed, setAuthed] = useState(false) // Authentication state
  const [list, setList] = useState([]) // List of research papers
  const [loading, setLoading] = useState(false) // Loading indicator
  
  // Get setAdmin function from context to toggle Upload link visibility in navbar
  const { setAdmin } = useContext(AdminContext)

  // Refresh research list when user authenticates
  useEffect(()=>{ if(authed) refresh() }, [authed])

  /**
   * Fetch all research papers and sort by newest first
   */
  async function refresh(){
    setLoading(true)
    try{
      const items = await listResearch()
      setList(items.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0)))
    }catch(e){ console.error(e) }
    setLoading(false)
  }

  /**
   * Handle admin login and enable Upload link
   * Sets admin context to 1, making Upload link visible in navbar
   */
  function tryLogin(e){
    e.preventDefault()
    if(password === ADMIN_PASSWORD){
      setAuthed(true)
      // Enable Upload link in navbar via AdminContext
      try{ 
        if(typeof setAdmin === 'function') setAdmin(1) 
      }catch(e){ 
        console.error(e) 
      }
      setPassword('')
    } else {
      alert('Incorrect password')
    }
  }

  /**
   * Delete a research paper after user confirmation
   */
  async function handleDelete(id){
    if(!confirm('Delete this research?')) return
    try{
      await deleteResearch(id)
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
          <button className="w-full px-4 py-2 bg-brand-600 text-white rounded">Enter</button>
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
                      <div className="font-medium text-brand-700">{i.title}</div>
                      <div className="text-sm text-gray-600">{i.author}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={`/research/${i.id}`} className="text-sm text-brand-600">View</Link>
                      <button onClick={()=>handleDelete(i.id)} className="text-sm text-red-600">Delete</button>
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
