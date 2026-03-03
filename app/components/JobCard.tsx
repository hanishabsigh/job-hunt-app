import { useState } from 'react';

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

type JobCardProps = {
  job: Job;
  isEditing: boolean;
  onEditStart: () => void;
  onEditCancel: () => void;
  onUpdateCoverLetter: (jobId: string, newText: string) => void;
  onApprove: (jobId: string) => void;
};

export default function JobCard({
  job,
  isEditing,
  onEditStart,
  onEditCancel,
  onUpdateCoverLetter,
  onApprove,
}: JobCardProps) {
  const [coverLetter, setCoverLetter] = useState(job.cover_letter);

  const statusColors: Record<Job['status'], string> = {
    pending: 'bg-yellow-500',
    approved: 'bg-green-500',
    submitted: 'bg-blue-500',
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6 shadow-lg border border-slate-600 hover:border-slate-500 transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{job.company}</h2>
          <p className="text-slate-400">{job.role}</p>
          <p className="text-sm text-slate-500 mt-1">{job.salary}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${statusColors[job.status]}`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>

      {/* Cover Letter Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">Cover Letter</label>
        {isEditing ? (
          <>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full h-32 bg-slate-600 text-white rounded border border-slate-500 p-3 focus:outline-none focus:border-blue-500"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  onUpdateCoverLetter(job.id, coverLetter);
                }}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setCoverLetter(job.cover_letter);
                  onEditCancel();
                }}
                className="px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-slate-300 line-clamp-3">{job.cover_letter}</p>
            <button
              onClick={onEditStart}
              className="mt-2 px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-700"
            >
              Edit
            </button>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {job.status === 'pending' && (
          <button
            onClick={() => onApprove(job.id)}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 transition"
          >
            Approve & Apply
          </button>
        )}
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition text-center"
        >
          View Job
        </a>
      </div>
    </div>
  );
}
