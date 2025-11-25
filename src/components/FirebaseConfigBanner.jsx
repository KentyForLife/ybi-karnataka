import React from 'react'

export default function FirebaseConfigBanner() {
  const isConfigured = !!(import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_PROJECT_ID)

  if (isConfigured) return null

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <h3 className="font-bold">⚠️ Firebase Not Configured</h3>
      <p className="text-sm mt-1">
        Create a <code className="bg-red-200 px-1">.env.local</code> file in the project root with your Firebase config. See <code className="bg-red-200 px-1">.env.example</code> for template.
      </p>
    </div>
  )
}
