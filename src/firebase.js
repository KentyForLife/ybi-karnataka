// IMPORTANT: Create .env.local with your Firebase config (copy from .env.example)
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const isConfigured = !!(firebaseConfig && (firebaseConfig.apiKey || firebaseConfig.projectId || firebaseConfig.appId))

const errMsg = 'Firebase is not configured. Please open src/firebase.js and paste your Firebase config object.'

let addResearch, listResearch, getResearch, deleteResearch

if (!isConfigured) {
  // Provide clear runtime errors when functions are used without configuration.
  const throwConfig = () => { throw new Error(errMsg) }

  addResearch = async () => { throwConfig() }
  listResearch = async () => { throwConfig() }
  getResearch = async () => { throwConfig() }
  deleteResearch = async () => { throwConfig() }

} else {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const storage = getStorage(app)

  const researchCollection = collection(db, 'research')

  async function uploadFile(file, path) {
    const sRef = storageRef(storage, path)
    await uploadBytes(sRef, file)
    const url = await getDownloadURL(sRef)
    return { url, path }
  }

  addResearch = async function ({ title, author, description, file, filename }) {
    const timestamp = Date.now()
    const path = `research/${timestamp}_${filename}`
    const { url } = await uploadFile(file, path)

    const docRef = await addDoc(researchCollection, {
      title,
      author,
      description,
      fileURL: url,
      storagePath: path,
      createdAt: serverTimestamp(),
    })

    return docRef.id
  }

  listResearch = async function () {
    const snapshot = await getDocs(researchCollection)
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
  }

  getResearch = async function (id) {
    const d = await getDoc(doc(db, 'research', id))
    if (!d.exists()) return null
    return { id: d.id, ...d.data() }
  }

  deleteResearch = async function (id, storagePath) {
    // delete storage object then firestore doc
    if (storagePath) {
      try {
        await deleteObject(storageRef(storage, storagePath))
      } catch (e) {
        console.warn('Failed to delete storage object', e)
      }
    }
    await deleteDoc(doc(db, 'research', id))
  }

}

export { addResearch, listResearch, getResearch, deleteResearch }
export default { addResearch, listResearch, getResearch, deleteResearch }
