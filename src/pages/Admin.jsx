/**
 * Admin Panel for Managing Research Papers
 * Allows authenticated admins to view and delete research submissions
 * Password protected - hard-coded password for access
 * Accessed via traditional admin login (not the secret shortcut)
 */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listResearch, deleteResearch } from '../firebase'

const ADMIN_PASSWORD = 'tarunsigma123' // Hard-coded admin password

export default function Admin(){
  const [password, setPassword] = useState('') // Password input
  const [authed, setAuthed] = useState(false) // Authentication state
  const [list, setList] = useState([]) // List of research papers
  const [loading, setLoading] = useState(false) // Loading indicator

  // Load research papers when user authenticates
  useEffect(()=>{
    if(authed) refresh()
  }, [authed])

  /**
   * Fetch all research papers from database
   * Sorted by most recent first
   */
  async function refresh(){
    setLoading(true)
    const items = await listResearch()
    setList(items.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0)))
    setLoading(false)
  }

  /**
   * Attempt admin login with password
   * Compares against hard-coded ADMIN_PASSWORD
   */
  function tryLogin(e){
    e.preventDefault()
    if(password === ADMIN_PASSWORD){
      setAuthed(true)
    } else {
      alert('Incorrect password')
    }
  }

  /**
   * Delete a research paper after confirmation
   * Only available to authenticated admins
   */
  async function handleDelete(id){
    if(!confirm('Delete this research?')) return
    try{
      await deleteResearch(id)
      await refresh()
    }catch(e){ console.error(e); alert('Failed to delete') }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!authed ? (
          <form onSubmit={tryLogin} className="bg-white p-6 rounded shadow max-w-sm border-l-4 border-brand-600">
            <h3 className="text-lg font-semibold mb-2 text-brand-600">Admin Panel</h3>
          <p className="text-sm text-gray-600 mb-4">Enter password to manage research uploads.</p>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" placeholder="Password" />
            <button className="w-full px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 font-semibold">Enter</button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded shadow border-l-4 border-brand-600">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-brand-600">Manage Research</h3>
            <button onClick={()=>{setAuthed(false); setPassword('')}} className="text-sm text-red-600 hover:text-red-700 font-semibold">Logout</button>
          </div>

          <div className="mt-4">
            <button onClick={refresh} className="px-4 py-2 bg-brand-100 text-brand-600 rounded font-semibold hover:bg-brand-200">Refresh</button>
          </div>

          <div className="mt-4">
            {loading ? <div className="text-gray-600">Loading...</div> : (
              <div className="space-y-3">
                {list.length === 0 && <div className="text-gray-600">No research found</div>}
                {list.map(i=> (
                  <div key={i.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-brand-400">
                    <div>
                        <div className="font-medium text-brand-700">{i.title}</div>
                      <div className="text-sm text-gray-600">{i.author}</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to={`/research/${i.id}`} className="text-sm text-brand-600 hover:text-brand-700 font-semibold">View</Link>
                      <button onClick={()=>handleDelete(i.id)} className="text-sm text-red-600 hover:text-red-700 font-semibold">Delete</button>
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
