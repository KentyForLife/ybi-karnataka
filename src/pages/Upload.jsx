import React, { useState } from 'react'
import { addResearch } from '../firebase'

export default function Upload(){
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')

  async function handleSubmit(e){
    e.preventDefault()
    if(!title || !author || !description || !file){
      setStatus('Please fill all fields and attach a PDF.')
      return
    }
    setStatus('Uploading...')
    try{
      const docId = await addResearch({ title, author, description, file, filename: file.name })
      setStatus('Uploaded successfully!')
      setTitle('')
      setAuthor('')
      setDescription('')
      setFile(null)
    }catch(e){
      console.error(e)
      setStatus('Upload failed. See console for details.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Upload Research</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 block w-full rounded border-gray-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input value={author} onChange={e=>setAuthor(e.target.value)} className="mt-1 block w-full rounded border-gray-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} className="mt-1 block w-full rounded border-gray-200" rows={4}></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">PDF File</label>
          <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files[0])} className="mt-1" />
        </div>
        <div className="flex items-center gap-2">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Upload</button>
          <div className="text-sm text-gray-600">{status}</div>
        </div>
      </form>
    </div>
  )
}
