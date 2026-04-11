import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Briefcase, CheckCircle, Clock, MapPin, Star, Phone } from 'lucide-react';
import api from '../../utils/axiosInstance';
import PostJob from './PostJob';
import RatingModal from '../../components/RatingModal';
import toast from 'react-hot-toast';

const ClientDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [stats, setStats] = useState({ active: 0, completed: 0, totalSpent: 0 });

  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/client/jobs');
      setJobs(data);
      
      const active = data.filter(j => ['Pending', 'Accepted', 'In-Progress'].includes(j.status)).length;
      const completed = data.filter(j => j.status === 'Completed').length;
      const totalSpent = data.filter(j => j.status === 'Completed').reduce((sum, j) => sum + (j.budget?.max || 0), 0);
      
      setStats({ active, completed, totalSpent });
    } catch (err) {
      toast.error('Failed to fetch jobs');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Accepted': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'In-Progress': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'Completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Cancelled': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Client Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your service requests</p>
        </div>
        <button 
          onClick={() => setIsPostModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          <Plus size={20} />
          Post a New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Active Jobs', val: stats.active, icon: Briefcase, color: 'indigo' },
          { label: 'Completed', val: stats.completed, icon: CheckCircle, color: 'emerald' },
          { label: 'Total Spent', val: `₹${stats.totalSpent}`, icon: Clock, color: 'blue' }
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
            <div className={`p-4 rounded-xl bg-${s.color}-100 dark:bg-${s.color}-900/30 text-${s.color}-600 dark:text-${s.color}-400`}>
              <s.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{s.label}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Your Recent Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-400">
            No jobs posted yet. Click the button above to start!
          </div>
        ) : jobs.map((job) => (
          <motion.div key={job._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow relative overflow-hidden group">
            
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(job.status)}`}>
                {job.status === 'Pending' ? '🟠 PENDING' : 
                 job.status === 'Accepted' ? '🟢 ACCEPTED' : 
                 job.status === 'Completed' ? '🔵 COMPLETED' : 
                 job.status === 'Cancelled' ? '🔴 CANCELLED' : job.status}
              </span>
              <p className="text-xs text-gray-400">{new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{job.description}</p>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6">
              <MapPin size={14} className="text-indigo-500" />
              {job.location?.address || 'Service Location'}
            </div>

            {/* Worker Info Segment for Accepted/Completed */}
            {job.acceptedBy && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                        <img src={job.acceptedBy.profilePhoto || 'https://via.placeholder.com/32'} className="w-8 h-8 rounded-full border border-indigo-200" alt="worker" />
                        <div>
                            <p className="text-xs font-bold text-gray-800 dark:text-white leading-tight">{job.acceptedBy.name}</p>
                            <p className="text-[10px] text-indigo-600 font-semibold">{job.acceptedBy.category}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                        <a href={`tel:${job.acceptedBy.phone}`} className="flex items-center gap-1 text-emerald-600 font-bold hover:underline">
                            <Phone size={10} /> {job.acceptedBy.phone}
                        </a>
                        <div className="flex items-center gap-1 text-yellow-500 font-bold">
                            <Star size={10} className="fill-yellow-500" /> {job.acceptedBy.rating}
                        </div>
                    </div>
                    {job.status === 'Accepted' && (
                        <div className="mt-3 flex items-center gap-2">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </div>
                            <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Worker is on the way!</p>
                        </div>
                    )}
                </div>
            )}

            {job.status === 'Pending' && (
                <div className="mb-6 py-3 px-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl text-[10px] text-amber-600 font-bold text-center">
                    Waiting for worker...
                </div>
            )}

            <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Budget</p>
                <p className="text-sm font-bold text-indigo-600">₹{job.budget?.min} - ₹{job.budget?.max}</p>
              </div>
              {job.status === 'Completed' && !job.isRated && (
                <button 
                  onClick={() => { setSelectedJob(job); setIsRatingModalOpen(true); }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-100 dark:shadow-none"
                >
                  Rate Worker
                </button>
              )}
              {job.isRated && (
                <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 px-2 py-1 rounded-lg">
                  <Star size={14} className="fill-yellow-500" />
                  <span className="text-sm font-bold">{job.rating}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {isPostModalOpen && (
        <PostJob onClose={() => setIsPostModalOpen(false)} onSuccess={fetchJobs} />
      )}
      
      {isRatingModalOpen && selectedJob && (
        <RatingModal 
          isOpen={isRatingModalOpen} 
          onClose={() => setIsRatingModalOpen(false)} 
          jobId={selectedJob._id} 
          onSuccess={fetchJobs}
        />
      )}
    </div>
  );
};

export default ClientDashboard;
