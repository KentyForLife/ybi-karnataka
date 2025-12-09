/**
 * Upload/Submit Research Paper Page
 * Allows users to submit research papers by providing metadata and a link
 * Admin access is controlled via AdminContext (Upload link only visible when admin=1)
 */

import React, { useState } from 'react'
import { addResearch } from '../firebase'

export default function Upload(){
  // Form state: title, author, description, content (full paper text)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('') // Full research paper content
  const [status, setStatus] = useState('') // Success/error message
  const [isLoading, setIsLoading] = useState(false) // Loading state for submit button

  /**
   * Handle form submission
   * Validates all fields are filled, then saves to Firebase
   * Shows success/error status and clears form on success
   */
  async function handleSubmit(e){
    e.preventDefault()
    if(!title || !author || !description || !content){
      setStatus('Please fill all fields including the full research content.')
      return
    }
    setIsLoading(true)
    setStatus('Saving...')
    try{
      const docId = await addResearch({ title, author, description, content })
      setStatus('Saved successfully!')
      setTitle('')
      setAuthor('')
      setDescription('')
      setContent('')
      setTimeout(() => setStatus(''), 3000)
    }catch(e){
      console.error(e)
      setStatus('Save failed. Check console for details.')
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-brand-600 mb-2">Upload Research</h2>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Abstract / Summary</label>
              <textarea 
                value={description} 
                onChange={e=>setDescription(e.target.value)} 
                placeholder="Brief summary of your research, key findings, and methodology..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </div>

            {/* Full Research Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Research Paper Content</label>
              <textarea 
                value={content}
                onChange={e=>setContent(e.target.value)}
                placeholder="Paste your complete research paper content here (introduction, methodology, results, conclusion, references, etc.)..."
                rows={20}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Paste the full text of your research paper. You can format it with line breaks.</p>
            </div>

            {/* Status Message */}
            {status && (
              <div className={`p-3 rounded-lg text-sm font-medium ${status.includes('✅') ? 'bg-brand-100 text-brand-700' : status.includes('❌') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                {status}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 disabled:bg-gray-400 transition-all duration-200"
            >
              {isLoading ? 'Saving...' : 'Save Research'}
            </button>
          </form>
        </div>

        {/* Reference & Tips */}
        <div className="bg-brand-50 rounded-lg shadow-lg p-6 border-2 border-brand-200">
          <h3 className="text-lg font-bold text-brand-600 mb-4">Reference Guide</h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-brand-600 mb-1">Research Title</h4>
              <p>Be clear and descriptive. Include keywords relevant to your research.</p>
            </div>
            <div>
              <h4 className="font-semibold text-brand-600 mb-1">Author Name</h4>
              <p>Can be individual or team name. Include all primary contributors.</p>
            </div>
            <div>
              <h4 className="font-semibold text-brand-600 mb-1">Abstract / Summary</h4>
              <p>Write a brief abstract. Include purpose, methodology, and key findings.</p>
            </div>
            <div>
              <h4 className="font-semibold text-brand-600 mb-1">Full Content</h4>
              <p>Paste your complete research paper text. Include all sections: intro, methods, results, discussion, and references.</p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-brand-200">
              <p className="text-xs text-gray-600">Tip: Make sure your research is complete and properly formatted before pasting.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
