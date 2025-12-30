/**
 * Admin Panel for Managing Workshops
 * Allows authenticated admins to view, add, and delete workshop submissions
 * Password protected - hard-coded password for access
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listWorkshops, deleteWorkshop, addWorkshop } from '../firebase';

const ADMIN_PASSWORD = 'tarunsigma123'; // Hard-coded admin password

export default function AdminWorkshops() {
  const [password, setPassword] = useState(''); // Password input
  const [authed, setAuthed] = useState(false); // Authentication state
  const [list, setList] = useState([]); // List of workshops
  const [loading, setLoading] = useState(false); // Loading indicator
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state for adding a new workshop
  const [form, setForm] = useState({
    title: '',
    date: '',
    slogan: '',
    imageUrl: '',
    report: ''
  });

  // Load workshops when user authenticates
  useEffect(() => {
    if (authed) {
      refresh();
    }
  }, [authed]);

  /**
   * Fetch all workshops from database
   * Sorted by most recent first
   */
  async function refresh() {
    setLoading(true);
    const items = await listWorkshops();
    setList(items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
    setLoading(false);
  }

  /**
   * Attempt admin login with password
   * Compares against hard-coded ADMIN_PASSWORD
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
   * Delete a workshop after confirmation
   * Only available to authenticated admins
   */
  async function handleDelete(id) {
    if (!confirm('Delete this workshop?')) return;
    try {
      await deleteWorkshop(id);
      await refresh();
    } catch (e) {
      console.error(e);
      alert('Failed to delete');
    }
  }

  /**
   * Handle form input changes for adding a workshop
   */
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  /**
   * Handle submission of the add workshop form
   */
  async function handleAddSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.date || !form.slogan || !form.imageUrl) {
      return alert('Please fill out all fields');
    }
    try {
      setLoading(true);
      await addWorkshop(form);
      await refresh();
      setShowAddForm(false);
      setForm({ title: '', date: '', slogan: '', imageUrl: '', report: '' }); // Reset form
    } catch (err) {
      console.error(err);
      alert('Error uploading workshop');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!authed ? (
        <form onSubmit={tryLogin} className="bg-white p-6 rounded shadow max-w-sm border-l-4 border-brand-600">
          <h3 className="text-lg font-semibold mb-2 text-brand-600">Admin Panel - Workshops</h3>
          <p className="text-sm text-gray-600 mb-4">Enter password to manage workshop uploads.</p>
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
        <div className="bg-white p-6 rounded shadow border-l-4 border-brand-600">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-brand-600">Manage Workshops</h3>
            <button onClick={() => { setAuthed(false); setPassword(''); }} className="text-sm text-red-600 hover:text-red-700 font-semibold">
              Logout
            </button>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button onClick={refresh} className="px-4 py-2 bg-brand-100 text-brand-600 rounded font-semibold hover:bg-brand-200">
              Refresh
            </button>
            <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-green-100 text-green-600 rounded font-semibold hover:bg-green-200">
              {showAddForm ? 'Cancel' : 'Add Workshop'}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddSubmit} className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="title" value={form.title} onChange={handleFormChange} placeholder="Title" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" />
                    <input name="date" value={form.date} onChange={handleFormChange} placeholder="Date (e.g., January 1, 2024)" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" />
                    <input name="slogan" value={form.slogan} onChange={handleFormChange} placeholder="Slogan" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" />
                    <input name="imageUrl" value={form.imageUrl} onChange={handleFormChange} placeholder="Image URL" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200" />
                </div>
              <button type="submit" className="mt-4 w-full px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 font-semibold">
                {loading ? 'Uploading...' : 'Submit Workshop'}
              </button>
            </form>
          )}

          <div className="mt-4">
            {loading ? (
              <div className="text-gray-600">Loading...</div>
            ) : (
              <div className="space-y-3">
                {list.length === 0 && <div className="text-gray-600">No workshops found</div>}
                {list.map(i => (
                  <div key={i.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-brand-400">
                    <div>
                      <div className="font-medium text-brand-700">{i.title}</div>
                      <div className="text-sm text-gray-600">{i.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link to={`/workshop/${i.id}`} className="text-sm text-brand-600 hover:text-brand-700 font-semibold">
                        View
                      </Link>
                      <button onClick={() => handleDelete(i.id)} className="text-sm text-red-600 hover:text-red-700 font-semibold">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
