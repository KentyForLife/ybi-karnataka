import React, { useState } from 'react'
import { addResearch } from '../firebase'

export default function Upload(){
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    if(!title || !author || !description || !file){
      setStatus('Please fill all fields and attach a PDF.')
      return
    }
    setIsLoading(true)
    setStatus('Uploading...')
    try{
      const docId = await addResearch({ title, author, description, file, filename: file.name })
      setStatus('Uploaded successfully!')
      setTitle('')
      setAuthor('')
      setDescription('')
      setFile(null)
      setTimeout(() => setStatus(''), 3000)
    }catch(e){
      console.error(e)
      setStatus('Upload failed. Check console for details.')
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-green-600 mb-2">Upload Research</h2>
        <p className="text-gray-600">Share your research paper with the YBI Karnataka community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Research Title</label>
              <input 
                type="text"
                value={title} 
                onChange={e=>setTitle(e.target.value)} 
                placeholder="Enter the title of your research"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Author Name</label>
              <input 
                type="text"
                value={author} 
                onChange={e=>setAuthor(e.target.value)} 
                placeholder="Your name or research team"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea 
                value={description} 
                onChange={e=>setDescription(e.target.value)} 
                placeholder="Describe your research, key findings, and methodology..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* PDF File */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">PDF File</label>
              <div className="relative">
                <input 
                  type="file" 
                  accept="application/pdf" 
                  onChange={e=>setFile(e.target.files[0])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white file:font-semibold hover:file:bg-green-700"
                />
                {file && <p className="text-sm text-green-600 mt-2">File selected: {file.name}</p>}
              </div>
            </div>

            {/* Status Message */}
            {status && (
              <div className={`p-3 rounded-lg text-sm font-medium ${status.includes('✅') ? 'bg-green-100 text-green-700' : status.includes('❌') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                {status}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-all duration-200"
            >
              {isLoading ? 'Uploading...' : 'Upload Research'}
            </button>
          </form>
        </div>

        {/* Reference & Tips */}
        <div className="bg-green-50 rounded-lg shadow-lg p-6 border-2 border-green-200">
          <h3 className="text-lg font-bold text-green-600 mb-4">Reference Guide</h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-green-600 mb-1">Research Title</h4>
              <p>Be clear and descriptive. Include keywords relevant to your research.</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-1">Author Name</h4>
              <p>Can be individual or team name. Include all primary contributors.</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-1">Description</h4>
              <p>Write a brief abstract. Include purpose, methodology, and key findings.</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-1">PDF File</h4>
              <p>Upload your complete research paper in PDF format (all pages).</p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-green-200">
              <p className="text-xs text-gray-600">Tip: Make sure your research is original and follows academic guidelines.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
