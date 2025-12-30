/**
 * Admin Panel for Managing Research Papers and Workshops
 * Allows authenticated admins to view and delete research and workshop submissions
 * Password protected - hard-coded password for access
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listResearch, deleteResearch, listWorkshops, deleteWorkshop } from '../firebase';

const ADMIN_PASSWORD = 'tarunsigma123'; // Hard-coded admin password

export default function Manage() {
  const [password, setPassword] = useState(''); // Password input
  const [authed, setAuthed] = useState(false); // Authentication state
  const [researchList, setResearchList] = useState([]); // List of research papers
  const [workshopList, setWorkshopList] = useState([]); // List of workshops
  const [researchLoading, setResearchLoading] = useState(false);
  const [workshopsLoading, setWorkshopsLoading] = useState(false);

  // Load data when user authenticates
  useEffect(() => {
    if (authed) {
      refreshResearch();
      refreshWorkshops();
    }
  }, [authed]);

  /**
   * Fetch all research papers from database
   */
  async function refreshResearch() {
    setResearchLoading(true);
    const items = await listResearch();
    setResearchList(items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
    setResearchLoading(false);
  }

  /**
   * Fetch all workshops from database
   */
  async function refreshWorkshops() {
    setWorkshopsLoading(true);
    const items = await listWorkshops();
    setWorkshopList(items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
    setWorkshopsLoading(false);
  }

  /**
   * Attempt admin login with password
   */
  function tryLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      alert('Incorrect password');
    }
  }

  /**
   * Delete a research paper
   */
  async function handleResearchDelete(id) {
    if (!confirm('Delete this research?')) return;
    try {
      await deleteResearch(id);
      await refreshResearch();
    } catch (e) {
      console.error(e);
      alert('Failed to delete research');
    }
  }

  /**
   * Delete a workshop
   */
  async function handleWorkshopDelete(id) {
    if (!confirm('Delete this workshop?')) return;
    try {
      await deleteWorkshop(id);
      await refreshWorkshops();
    } catch (e) {
      console.error(e);
      alert('Failed to delete workshop');
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {!authed ? (
        <form onSubmit={tryLogin} className="bg-white p-6 rounded shadow max-w-sm border-l-4 border-brand-600">
          <h3 className="text-lg font-semibold mb-2 text-brand-600">Admin Panel</h3>
          <p className="text-sm text-gray-600 mb-4">Enter password to manage content.</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            placeholder="Password"
          />
          <button className="w-full px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 font-semibold">Enter</button>
        </form>
      ) : (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Manage Content</h2>
                <button onClick={() => { setAuthed(false); setPassword(''); }} className="text-sm text-red-600 hover:text-red-700 font-semibold">
                    Logout
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Manage Research Section */}
            <div className="bg-white p-6 rounded shadow border-l-4 border-brand-600">
                <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-brand-600">Manage Research</h3>
                </div>
                <div className="mt-4">
                <button onClick={refreshResearch} className="px-4 py-2 bg-brand-100 text-brand-600 rounded font-semibold hover:bg-brand-200">
                    Refresh
                </button>
                </div>
                <div className="mt-4">
                {researchLoading ? (
                    <div className="text-gray-600">Loading...</div>
                ) : (
                    <div className="space-y-3">
                    {researchList.length === 0 && <div className="text-gray-600">No research found</div>}
                    {researchList.map(i => (
                        <div key={i.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-brand-400">
                        <div>
                            <div className="font-medium text-brand-700">{i.title}</div>
                            <div className="text-sm text-gray-600">{i.author}</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to={`/research/${i.id}`} className="text-sm text-brand-600 hover:text-brand-700 font-semibold">
                            View
                            </Link>
                            <button onClick={() => handleResearchDelete(i.id)} className="text-sm text-red-600 hover:text-red-700 font-semibold">
                            Delete
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            </div>

            {/* Manage Workshops Section */}
            <div className="bg-white p-6 rounded shadow border-l-4 border-green-600">
                <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-green-600">Manage Workshops</h3>
                </div>
                <div className="mt-4">
                <button onClick={refreshWorkshops} className="px-4 py-2 bg-green-100 text-green-600 rounded font-semibold hover:bg-green-200">
                    Refresh
                </button>
                </div>
                <div className="mt-4">
                {workshopsLoading ? (
                    <div className="text-gray-600">Loading...</div>
                ) : (
                    <div className="space-y-3">
                    {workshopList.length === 0 && <div className="text-gray-600">No workshops found</div>}
                    {workshopList.map(i => (
                        <div key={i.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-green-400">
                        <div>
                            <div className="font-medium text-green-700">{i.title}</div>
                            <div className="text-sm text-gray-600">{i.date}</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to={`/workshop/${i.id}`} className="text-sm text-green-600 hover:text-green-700 font-semibold">
                            View
                            </Link>
                            <button onClick={() => handleWorkshopDelete(i.id)} className="text-sm text-red-600 hover:text-red-700 font-semibold">
                            Delete
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>
      )}
    </div>
  );
}