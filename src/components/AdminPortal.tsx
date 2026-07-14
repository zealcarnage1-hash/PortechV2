import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './AdminPortal.css';

export default function AdminPortal() {
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'contact' | 'career'>('contact');
  const [activeCareerStatus, setActiveCareerStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [contacts, setContacts] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    
    async function fetchData() {
      setLoading(true);
      try {
        const [contactRes, careerRes] = await Promise.all([
          supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
          supabase.from('career_applications').select('*').order('created_at', { ascending: false })
        ]);

        if (contactRes.data) setContacts(contactRes.data);
        if (careerRes.data) setCareers(careerRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setAuthLoading(false);
  };

  const deleteRecord = async (table: string, id: number) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) {
      if (table === 'contact_submissions') setContacts(contacts.filter(c => c.id !== id));
      else setCareers(careers.filter(c => c.id !== id));
    } else {
      alert('Failed to delete record.');
    }
  };

  const updateCareerStatus = async (id: number, status: 'approved' | 'rejected') => {
    const { error } = await supabase.from('career_applications').update({ status }).eq('id', id);
    if (!error) {
      setCareers(careers.map(c => c.id === id ? { ...c, status } : c));
    } else {
      alert(`Failed to update status: ${error.message}\n\nPlease make sure you ran the SQL script to add the status column and UPDATE policy!`);
      console.error(error);
    }
  };

  if (!session) {
    return (
      <div className="admin-login-container">
        <form className="admin-login-form" onSubmit={handleLogin}>
          <div className="admin-login-header">
            <div className="logo-container">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--blue, #0d63ce)" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </div>
            <h2>PORTECH</h2>
            <p>Admin Login</p>
          </div>
          {authError && <div className="auth-error">{authError}</div>}
          <label>
            Email
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="admin@portech.in" 
            />
          </label>
          <label>
            Password
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••" 
              />
              <button 
                type="button" 
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
          </label>
          <button type="submit" disabled={authLoading}>
            {authLoading ? 'Signing in...' : 'Sign In ↗'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-portal">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--blue, #0d63ce)" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round"/>
          </svg>
          <b>PORTECH</b>
        </div>
        <nav className="admin-nav">
          <button 
            className={activeTab === 'contact' ? 'active' : ''} 
            onClick={() => setActiveTab('contact')}
          >
            <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Contact Inquiries</span>
            <span className="count-badge">{contacts.length}</span>
          </button>
          <button 
            className={activeTab === 'career' ? 'active' : ''} 
            onClick={() => setActiveTab('career')}
          >
            <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            <span>Career Applications</span>
            <span className="count-badge">{careers.length}</span>
          </button>
        </nav>
        <div className="admin-footer">
          <button className="signout-btn" onClick={() => supabase.auth.signOut()}>
            <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <h2>{activeTab === 'contact' ? 'Contact Inquiries' : 'Career Applications'}</h2>
        </div>
        <div className="admin-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading data...</p>
            </div>
          ) : activeTab === 'contact' ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Contact Info</th>
                    <th>Message</th>
                    <th className="actions-col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length === 0 ? (
                    <tr><td colSpan={5} className="empty">No inquiries found.</td></tr>
                  ) : contacts.map(c => (
                    <tr key={c.id}>
                      <td className="date-cell">{new Date(c.created_at).toLocaleDateString()}</td>
                      <td className="name-cell">{c.name}</td>
                      <td className="contact-cell">
                        <a href={`mailto:${c.email}`}>{c.email}</a>
                        <br />
                        <a href={`tel:${c.phone}`} className="phone-link">{c.phone}</a>
                      </td>
                      <td className="message-cell">{c.message}</td>
                      <td className="actions-col">
                        <button className="delete-btn" onClick={() => deleteRecord('contact_submissions', c.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="career-section">
              <div className="status-tabs">
                <button 
                  className={activeCareerStatus === 'pending' ? 'active' : ''} 
                  onClick={() => setActiveCareerStatus('pending')}
                >
                  Pending <span>{careers.filter(c => (c.status || 'pending') === 'pending').length}</span>
                </button>
                <button 
                  className={activeCareerStatus === 'approved' ? 'active' : ''} 
                  onClick={() => setActiveCareerStatus('approved')}
                >
                  Approved <span>{careers.filter(c => c.status === 'approved').length}</span>
                </button>
                <button 
                  className={activeCareerStatus === 'rejected' ? 'active' : ''} 
                  onClick={() => setActiveCareerStatus('rejected')}
                >
                  Rejected <span>{careers.filter(c => c.status === 'rejected').length}</span>
                </button>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Applicant</th>
                      <th>Role & Experience</th>
                      <th>Resume</th>
                      <th className="actions-col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {careers.filter(c => (c.status || 'pending') === activeCareerStatus).length === 0 ? (
                      <tr><td colSpan={5} className="empty">No applications found in this status.</td></tr>
                    ) : careers.filter(c => (c.status || 'pending') === activeCareerStatus).map(c => (
                      <tr key={c.id}>
                        <td className="date-cell">{new Date(c.created_at).toLocaleDateString()}</td>
                        <td className="contact-cell">
                          <strong>{c.name}</strong><br />
                          <a href={`mailto:${c.email}`}>{c.email}</a><br />
                          <a href={`tel:${c.phone}`} className="phone-link">{c.phone}</a>
                        </td>
                        <td className="role-cell">
                          <span className="badge">{c.role}</span>
                          <p className="exp-text">{c.experience}</p>
                        </td>
                        <td>
                          {c.resume_url ? (
                            <a href={c.resume_url} target="_blank" rel="noreferrer" className="resume-link">View Resume ↗</a>
                          ) : <span className="no-file">No file attached</span>}
                        </td>
                        <td className="actions-col">
                          {activeCareerStatus === 'pending' ? (
                            <div className="action-buttons">
                              <button className="approve-btn" onClick={() => updateCareerStatus(c.id, 'approved')}>Approve</button>
                              <button className="reject-btn" onClick={() => updateCareerStatus(c.id, 'rejected')}>Reject</button>
                            </div>
                          ) : (
                            <span className={`status-label ${c.status}`}>
                              {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
