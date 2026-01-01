import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FirebaseConfigBanner from './components/FirebaseConfigBanner';
import GlobalShortcut from './components/GlobalShortcut';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Browse from './pages/Browse';
import Details from './pages/Details';
import About from './pages/About';
import Manage from './pages/Manage';
import SecretAdmin from './pages/SecretAdmin';
import { AdminProvider } from './pages/AdminContext.jsx';
import UploadWorkshop from './pages/UploadWorkshop';
import BrowseWorkshops from './pages/BrowseWorkshops';
import WorkshopDetails from './pages/WorkshopDetails';

export default function App() {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <FirebaseConfigBanner />
          <GlobalShortcut />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/research/:id" element={<Details />} />
            <Route path="/about" element={<About />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/secret-admin" element={<SecretAdmin />} />
            <Route path="/upload-workshop" element={<UploadWorkshop />} />
            <Route path="/browse-workshops" element={<BrowseWorkshops />} />
            <Route path="/workshop/:id" element={<WorkshopDetails />} />
            <Route path="/upload-research" element={<Upload />} />
          </Routes>
        </main>
      </div>
    </AdminProvider>
  );
}
