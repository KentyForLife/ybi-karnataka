# YBI Karnataka — React + Tailwind + Firebase

A simple React app for YBI Karnataka to upload, browse, and manage research PDFs.

## Features

- Home, Upload Research, Browse Research, Research Details, About, Admin pages
- Upload PDF files to Firebase Storage and store metadata in Firestore
- Admin page protected by a simple hard-coded password (`ybi123`) for delete operations
- Environment-based Firebase config (safe to share on GitHub)

## Quick Start

### 1. Clone & Install

```powershell
git clone https://github.com/YOUR_USERNAME/ybi-karnataka.git
cd ybi-karnataka
npm install
```

### 2. Configure Firebase

1. Create a Firebase project: https://console.firebase.google.com/
2. Enable **Firestore Database** and **Storage** from the console
3. Go to **Project Settings → Web** and copy your config
4. Create `.env.local` in the project root (copy from `.env.example`):
   ```
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   ```
5. **DO NOT commit `.env.local`** — it contains secrets. It's in `.gitignore` by default.

### 3. Run Dev Server

```powershell
npm run dev
```

Then open the URL shown (e.g., `http://localhost:5173`).

## Firebase Security Rules

After uploading test data, set up Firestore and Storage rules in the Firebase console:

**Firestore Rules:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /research/{document=**} {
      allow read: if true;
      allow write: if false;  // Restrict uploads for production
    }
  }
}
```

**Storage Rules:**
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /research/{allPaths=**} {
      allow read: if true;
      allow write: if false;  // Restrict uploads for production
    }
  }
}
```

## Sharing on GitHub

✅ **Safe to share** — Firebase config is stored in `.env.local`, not in the repo.

**Steps:**
1. Initialize Git: `git init`
2. Create a GitHub repo
3. Push to GitHub:
   ```powershell
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/ybi-karnataka.git
   git branch -M main
   git push -u origin main
   ```

Friends cloning the repo will see `.env.example` and know to create their own `.env.local`.

## Tech Stack

- **React 18** — UI framework
- **Tailwind CSS** — Styling
- **Vite** — Build tool
- **Firebase** — Backend (Firestore + Storage)
- **React Router** — Navigation

## Admin Page

- URL: `/admin`
- Password: `ybi123` (for development only)
- For production, replace with proper authentication.

## Notes

- The `src/firebase.js` exports: `addResearch`, `listResearch`, `getResearch`, `deleteResearch`
- Each research doc stores: `title`, `author`, `description`, `fileURL`, `storagePath`, `createdAt`
- PDFs are stored in Firebase Storage at `research/{timestamp}_{filename}`

## Build for Production

```powershell
npm run build
npm run preview
```

---

Built with ❤️ for YBI Karnataka.
