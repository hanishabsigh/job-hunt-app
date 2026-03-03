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

type StatsBoardProps = {
  jobs: Job[];
};

export default function StatsBoard({ jobs }: StatsBoardProps) {
  const total = jobs.length;
  const approved = jobs.filter((j) => j.status === 'approved').length;
  const submitted = jobs.filter((j) => j.status === 'submitted').length;
  const pending = jobs.filter((j) => j.status === 'pending').length;

  const stats = [
    { label: 'Total Jobs', value: total, color: 'bg-blue-500' },
    { label: 'Pending', value: pending, color: 'bg-yellow-500' },
    { label: 'Approved', value: approved, color: 'bg-green-500' },
    { label: 'Submitted', value: submitted, color: 'bg-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-slate-500 transition"
        >
          <p className="text-slate-400 text-sm font-medium mb-2">{stat.label}</p>
          <p className={`text-4xl font-bold ${stat.color === 'bg-blue-500' ? 'text-blue-400' : stat.color === 'bg-yellow-500' ? 'text-yellow-400' : stat.color === 'bg-green-500' ? 'text-green-400' : 'text-purple-400'}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
