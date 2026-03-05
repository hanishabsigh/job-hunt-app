'use client';

import { useState, useEffect } from 'react';
import { fetchJobs, updateJob, createJob, type Job } from '@/lib/supabase';
import './page.css';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Job>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newJob, setNewJob] = useState({
    company: '',
    role: '',
    salary: '',
    url: '',
    cover_letter: '',
  });

  // Load jobs from Supabase on mount
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const data = await fetchJobs();
      setJobs(data);
      setLoading(false);
    };
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) => filter === 'all' || job.status === filter
  );

  const stats = {
    total: jobs.length,
    pending: jobs.filter((j) => j.status === 'pending').length,
    approved: jobs.filter((j) => j.status === 'approved').length,
    rejected: jobs.filter((j) => j.status === 'rejected').length,
    submitted: jobs.filter((j) => j.status === 'submitted').length,
  };

  const handleApprove = async (id: number) => {
    const updated = await updateJob(id, { status: 'approved' });
    if (updated) {
      setJobs(jobs.map((job) => (job.id === id ? updated : job)));
    }
  };

  const handleReject = async (id: number) => {
    const updated = await updateJob(id, { status: 'rejected' });
    if (updated) {
      setJobs(jobs.map((job) => (job.id === id ? updated : job)));
    }
  };

  const handleSubmitted = async (id: number) => {
    const updated = await updateJob(id, { status: 'submitted' });
    if (updated) {
      setJobs(jobs.map((job) => (job.id === id ? updated : job)));
    }
  };

  const handleEdit = (job: Job) => {
    setEditingId(job.id);
    setEditForm({
      company: job.company,
      role: job.role,
      salary: job.salary,
      url: job.url,
      cover_letter: job.cover_letter,
    });
  };

  const handleSaveEdit = async (id: number) => {
    const updated = await updateJob(id, editForm);
    if (updated) {
      setJobs(jobs.map((job) => (job.id === id ? updated : job)));
      setEditingId(null);
    }
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await createJob({
      company: newJob.company,
      role: newJob.role,
      salary: newJob.salary,
      url: newJob.url,
      cover_letter: newJob.cover_letter,
      status: 'pending',
    });
    
    if (created) {
      setJobs([created, ...jobs]);
      setNewJob({
        company: '',
        role: '',
        salary: '',
        url: '',
        cover_letter: '',
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🌊 Job Hunt Tracker</h1>
        <p className="subtitle">Hani Shabsigh — Director/GPM/Head of Product ($300k+)</p>

        <div className="stats-grid">
          <div className="stat">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat">
            <div className="stat-value">{stats.approved}</div>
            <div className="stat-label">Approved</div>
          </div>
          <div className="stat">
            <div className="stat-value">{stats.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
          <div className="stat">
            <div className="stat-value">{stats.submitted}</div>
            <div className="stat-label">Submitted</div>
          </div>
        </div>
      </header>

      <div className="controls">
        <div className="filters">
          {['all', 'pending', 'approved', 'rejected', 'submitted'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-btn"
        >
          + Add Job
        </button>
      </div>

      {showAddForm && (
        <div className="add-form">
          <h3>Add New Job</h3>
          <form onSubmit={handleAddJob}>
            <input
              type="text"
              placeholder="Company Name"
              value={newJob.company}
              onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Role"
              value={newJob.role}
              onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Salary (e.g., $300k-$350k)"
              value={newJob.salary}
              onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
              required
            />
            <input
              type="url"
              placeholder="Job URL"
              value={newJob.url}
              onChange={(e) => setNewJob({ ...newJob, url: e.target.value })}
              required
            />
            <textarea
              placeholder="Cover Letter"
              value={newJob.cover_letter}
              onChange={(e) => setNewJob({ ...newJob, cover_letter: e.target.value })}
              required
            />
            <div className="form-actions">
              <button type="submit" className="save-btn">Add Job</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <p>Loading jobs from Supabase...</p>
        </div>
      ) : (
        <div className="jobs-list">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              {editingId === job.id ? (
                <div className="edit-mode">
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editForm.company || ''}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      placeholder="Company"
                      className="edit-input"
                    />
                    <input
                      type="text"
                      value={editForm.role || ''}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      placeholder="Role"
                      className="edit-input"
                    />
                    <input
                      type="text"
                      value={editForm.salary || ''}
                      onChange={(e) => setEditForm({ ...editForm, salary: e.target.value })}
                      placeholder="Salary"
                      className="edit-input"
                    />
                    <input
                      type="url"
                      value={editForm.url || ''}
                      onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                      placeholder="Job URL"
                      className="edit-input"
                    />
                    <textarea
                      value={editForm.cover_letter || ''}
                      onChange={(e) => setEditForm({ ...editForm, cover_letter: e.target.value })}
                      placeholder="Cover Letter"
                      className="edit-textarea"
                    />
                    <div className="form-actions">
                      <button onClick={() => handleSaveEdit(job.id)} className="save-btn">Save</button>
                      <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="job-header">
                    <div>
                      <h2>{job.company}</h2>
                      <p className="role">{job.role}</p>
                      <p className="salary">{job.salary}</p>
                    </div>
                    <div className="header-actions">
                      <a href={job.url} target="_blank" rel="noopener noreferrer" className="view-btn">
                        View Job
                      </a>
                      <span className={`status status-${job.status}`}>
                        {job.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="cover-letter">
                    {job.cover_letter.split('\n').map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </div>

                  <div className="actions">
                    <button onClick={() => handleEdit(job)} className="edit-btn">Edit</button>
                    {job.status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(job.id)} className="approve-btn">Approve & Apply</button>
                        <button onClick={() => handleSubmitted(job.id)} className="submit-btn">Submit Now</button>
                        <button onClick={() => handleReject(job.id)} className="reject-btn">Reject</button>
                      </>
                    )}
                    {job.status === 'approved' && (
                      <button onClick={() => handleSubmitted(job.id)} className="submit-btn">Mark Submitted</button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && filteredJobs.length === 0 && (
        <div className="empty-state">
          <p>No jobs found in this filter.</p>
        </div>
      )}
    </div>
  );
}
