'use client';

import { useEffect, useState } from 'react';
import JobCard from './components/JobCard';
import StatsBoard from './components/StatsBoard';

type Job = {
  id: string;
  company: string;
  role: string;
  salary: string;
  url: string;
  cover_letter: string;
  status: 'pending' | 'approved' | 'submitted';
  created_at: string;
  updated_at: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'submitted'>('all');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs', { method: 'GET' });
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      // Initialize jobs
      const res = await fetch('/api/jobs', { method: 'POST' });
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = filter === 'all' ? jobs : jobs.filter((j) => j.status === filter);

  const handleUpdateCoverLetter = async (jobId: string, newText: string) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cover_letter: newText }),
      });
      const updated = await res.json();
      setJobs(jobs.map((j) => (j.id === jobId ? updated[0] : j)));
      setEditingId(null);
    } catch (err) {
      console.error('Failed to update job:', err);
    }
  };

  const handleApprove = async (jobId: string) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const updated = await res.json();
      setJobs(jobs.map((j) => (j.id === jobId ? updated[0] : j)));
    } catch (err) {
      console.error('Failed to approve job:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-2">Job Hunt Tracker</h1>
          <p className="text-slate-400 text-lg">Track, edit, and approve your job applications</p>
        </div>

        {/* Stats */}
        <StatsBoard jobs={jobs} />

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8">
          {(['all', 'pending', 'approved', 'submitted'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading jobs...</p>
          </div>
        ) : (
          <>
            {/* Jobs Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isEditing={editingId === job.id}
                  onEditStart={() => setEditingId(job.id)}
                  onEditCancel={() => setEditingId(null)}
                  onUpdateCoverLetter={handleUpdateCoverLetter}
                  onApprove={handleApprove}
                />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">No jobs with status: {filter}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
