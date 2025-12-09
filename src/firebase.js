/**
 * Firebase Configuration & Database Functions
 * This file initializes Firebase and provides CRUD operations for research papers
 * Environment variables are loaded from .env.local (create from .env.example)
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'

// Load Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Check if Firebase is properly configured
const isConfigured = !!(firebaseConfig && (firebaseConfig.apiKey || firebaseConfig.projectId || firebaseConfig.appId))

const errMsg = 'Firebase is not configured. Please open src/firebase.js and paste your Firebase config object.'

// Declare export functions - will be assigned based on configuration status
let addResearch, listResearch, getResearch, deleteResearch

// If Firebase is not configured, throw an error when functions are called
if (!isConfigured) {
  const throwConfig = () => { throw new Error(errMsg) }

  addResearch = async () => { throwConfig() }
  listResearch = async () => { throwConfig() }
  getResearch = async () => { throwConfig() }
  deleteResearch = async () => { throwConfig() }

} else {
  // Firebase is configured - initialize app
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  // Reference to the 'research' collection in Firestore
  const researchCollection = collection(db, 'research')

  /**
   * Add a new research paper to the database
   * Stores: title, author, description, content (full research paper text), and creation timestamp
   * Returns: document ID of the newly created research entry
   */
  addResearch = async function ({ title, author, description, content }) {
    const docRef = await addDoc(researchCollection, {
      title,
      author,
      description,
      content, // Full text content of the research paper
      createdAt: serverTimestamp(), // Firebase server timestamp
    })
    return docRef.id
  }

  /**
   * Retrieve all research papers from the database
   * Returns: array of research objects with id and all fields
   */
  listResearch = async function () {
    const snapshot = await getDocs(researchCollection)
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
  }

  /**
   * Retrieve a single research paper by ID
   * Returns: research object with all fields, or null if not found
   */
  getResearch = async function (id) {
    const d = await getDoc(doc(db, 'research', id))
    if (!d.exists()) return null
    return { id: d.id, ...d.data() }
  }

  /**
   * Delete a research paper from the database by ID
   * Only callable from admin pages with authentication
   */
  deleteResearch = async function (id) {
    await deleteDoc(doc(db, 'research', id))
  }

}

export { addResearch, listResearch, getResearch, deleteResearch }
export default { addResearch, listResearch, getResearch, deleteResearch }
