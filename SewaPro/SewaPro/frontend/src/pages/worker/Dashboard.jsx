import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Briefcase, Star, CheckCircle, Clock, LogOut, MapPin, DollarSign, XCircle, Play, Phone, List, Map as MapIcon } from 'lucide-react';
import api from '../../utils/axiosInstance';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import MapView from '../../components/MapView';

const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return Math.floor(seconds) + " secs ago";
};

const WorkerDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [nearbyJobs, setNearbyJobs] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState(0);
  const [viewMode, setViewMode] = useState('list');
  const [workerLocation, setWorkerLocation] = useState([72.8777, 19.0760]); // Mumbai default
  
  const locInterval = useRef(null);
  const pollingInterval = useRef(null);

  const fetchData = async () => {
    try {
      // Profile for availability
      const profile = await api.get('/worker/profile');
      setIsAvailable(profile.data.isAvailable);
      if (profile.data.liveLocation?.coordinates?.[0] !== 0) {
        setWorkerLocation([profile.data.liveLocation.coordinates[0], profile.data.liveLocation.coordinates[1]]);
      }

      // Nearby Jobs
      await fetchNearbyJobs();

      // Earnings & Completed Jobs
      const earningsRes = await api.get('/worker/earnings');
      setEarnings(earningsRes.data.totalEarnings);
      setCompletedJobs(earningsRes.data.jobs);

      // Active Jobs
      const activeRes = await api.get('/worker/active-jobs');
      setActiveJobs(activeRes.data);

    } catch (err) {
      console.error("Dashboard fetch error:", err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const coords = [pos.coords.longitude, pos.coords.latitude];
          setWorkerLocation(coords);
          await api.patch('/worker/location', { coordinates: coords });
        } catch (e) {
          console.error("Location update failed", e);
        }
      });
    }
  };

  useEffect(() => {
    fetchData();
    
    // Polling for nearby jobs every 30s
    pollingInterval.current = setInterval(() => {
      fetchNearbyJobs();
    }, 30000);

    return () => {
      clearInterval(pollingInterval.current);
      if (locInterval.current) clearInterval(locInterval.current);
    };
  }, []);

  const fetchNearbyJobs = async () => {
    try {
      const { data } = await api.get('/worker/nearby-jobs');
      setNearbyJobs(data);
    } catch (e) { console.error(e); }
  };

  const [locationLoading, setLocationLoading] = useState(false);

  const handleGoOnline = async () => {
    setLocationLoading(true);
    try {
      if (!navigator.geolocation) {
        toast.error('Geolocation not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Got location:', latitude, longitude);

          try {
            // First update availability
            const availRes = await api.patch('/worker/availability', { isAvailable: true });
            
            // Then update location [longitude, latitude] - MongoDB order
            await api.patch('/worker/location', {
              coordinates: [longitude, latitude]
            });

            setIsAvailable(true);
            setWorkerLocation([longitude, latitude]);
            toast.success('You are now Online! 📍 Location saved.');
            
            // Fetch jobs after going online
            fetchNearbyJobs();
            
            // Start location polling
            if (locInterval.current) clearInterval(locInterval.current);
            locInterval.current = setInterval(updateLocation, 60000);
            
          } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update status');
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          setLocationLoading(false);
          switch(error.code) {
            case 1: toast.error('Location permission denied. Please allow location in browser settings.'); break;
            case 2: toast.error('Location unavailable. Try again.'); break;
            case 3: toast.error('Location request timed out. Try again.'); break;
            default: toast.error('Could not get location.');
          }
        },
        { 
          enableHighAccuracy: true, 
          timeout: 15000,
          maximumAge: 0
        }
      );
    } catch (err) {
      setLocationLoading(false);
      toast.error('Failed to go online');
    }
  };

  const handleGoOffline = async () => {
    try {
      await api.patch('/worker/availability', { isAvailable: false });
      setIsAvailable(false);
      if (locInterval.current) clearInterval(locInterval.current);
      toast.success('🔴 You are now Offline');
    } catch {
      toast.error('Failed to go offline');
    }
  };

  const toggleAvailability = () => {
    if (isAvailable) {
      handleGoOffline();
    } else {
      handleGoOnline();
    }
  };

  const handleAcceptJob = async (id) => {
    try {
      await api.post(`/worker/jobs/${id}/accept`);
      toast.success('Job accepted! Client will be notified');
      setNearbyJobs(prev => prev.filter(j => j._id !== id));
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to accept job');
    }
  };

  const handleRejectJob = async (id) => {
    try {
      await api.post(`/worker/jobs/${id}/reject`);
      toast.success('Job rejected');
      setNearbyJobs(prev => prev.filter(j => j._id !== id));
    } catch (err) {
      toast.error('Failed to reject job');
    }
  };

  const handleCompleteJob = async (id) => {
    try {
      await api.patch(`/worker/jobs/${id}/complete`);
      toast.success('Job marked complete! Waiting for client rating.');
      fetchData();
    } catch (err) {
      toast.error('Failed to mark complete');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const stats = [
    { label: 'Pending Requests', value: nearbyJobs.length, icon: Clock, color: 'bg-amber-100 text-amber-600' },
    { label: 'Active Jobs', value: activeJobs.length, icon: Play, color: 'bg-indigo-100 text-indigo-600' },
    { label: 'Completed Jobs', value: completedJobs.length, icon: CheckCircle, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Total Earnings', value: `₹${earnings}`, icon: DollarSign, color: 'bg-blue-100 text-blue-600' },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 text-white">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Worker Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Hello, {user?.name}. You are currently {isAvailable ? 'Online' : 'Offline'}.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={toggleAvailability}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
                isAvailable
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-100 dark:shadow-none'
                  : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-slate-700 dark:text-gray-300 border border-gray-100 dark:border-slate-600 shadow-none'
              }`}
            >
              <MapPin size={16} />
              {isAvailable ? 'Go Offline' : 'Go Online'}
            </button>
            <button
              onClick={handleLogout}
              className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all shadow-sm"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                <s.icon size={24} />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{s.label}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Nearby Jobs & Active Job Section */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Active Job Section */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <Play size={20} className="text-indigo-600" />
                    Active Jobs
                </h2>
                <div className="space-y-4">
                    {activeJobs.length === 0 ? (
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl text-center text-gray-400 border border-dashed border-gray-200 dark:border-slate-700">
                            No active jobs. Accept a request to start working!
                        </div>
                    ) : activeJobs.map(job => (
                        <motion.div key={job._id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border-l-4 border-l-indigo-500 border border-gray-100 dark:border-slate-700">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{job.title}</h3>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                        <p className="font-semibold text-indigo-600">{job.clientId?.name}</p>
                                        <a href={`tel:${job.clientId?.phone}`} className="flex items-center gap-1 text-emerald-600 hover:underline">
                                            <Phone size={12} /> {job.clientId?.phone}
                                        </a>
                                    </div>
                                </div>
                                <button onClick={() => handleCompleteJob(job._id)}
                                    className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-none">
                                    Mark as Complete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Nearby Job Requests */}
            <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <MapPin size={20} className="text-amber-500" />
                      Nearby Job Requests
                  </h2>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-gray-100 dark:border-slate-700">
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode==='list'?'bg-indigo-600 text-white':'text-gray-400'}`}><List size={16}/></button>
                    <button onClick={() => setViewMode('map')} className={`p-2 rounded-lg transition-all ${viewMode==='map'?'bg-indigo-600 text-white':'text-gray-400'}`}><MapIcon size={16}/></button>
                  </div>
                </div>

                <div className="space-y-4">
                {viewMode === 'map' ? (
                  <div className="h-[400px] rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700">
                    <MapView 
                      items={nearbyJobs} 
                      center={[workerLocation[1], workerLocation[0]]} 
                      onAction={handleAcceptJob} 
                    />
                  </div>
                ) : (
                <AnimatePresence>
                {nearbyJobs.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-slate-800 p-12 rounded-3xl text-center text-gray-400 border border-gray-100 dark:border-slate-700">
                    <Briefcase size={40} className="mx-auto mb-4 opacity-20" />
                    <p>No new jobs in your area right now. Polling every 30s...</p>
                    </motion.div>
                ) : nearbyJobs.map(job => (
                    <motion.div key={job._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-[10px] font-bold rounded-lg uppercase">
                                {job.category}
                            </span>
                            <p className="text-xs text-gray-400">{formatTimeAgo(job.createdAt)}</p>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">{job.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1 font-semibold text-gray-600 dark:text-gray-300">
                                <Briefcase size={12}/> {job.clientId?.name}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin size={12}/> {job.location?.address}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                            <p className="text-sm font-bold text-indigo-600">₹{job.budget?.min} - ₹{job.budget?.max}</p>
                            <p className="text-xs text-gray-400 flex items-center gap-1 font-medium"><Clock size={12}/>{job.estimatedHours} hrs</p>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={() => handleAcceptJob(job._id)}
                        className="flex-1 md:flex-none bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all">
                        Accept
                        </button>
                        <button onClick={() => handleRejectJob(job._id)}
                        className="p-2.5 bg-red-50 dark:bg-red-900/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                        <XCircle size={20} />
                        </button>
                    </div>
                    </motion.div>
                ))}
                </AnimatePresence>
                )}
                </div>
            </section>
          </div>

          {/* Recently Completed */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Recently Completed</h2>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
                <div className="space-y-6">
                    {completedJobs.slice(0, 5).map(job => (
                        <div key={job._id} className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800 dark:text-white line-clamp-1">{job.title}</p>
                                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">₹{job.budget?.max} • Earned</p>
                            </div>
                        </div>
                    ))}
                    {completedJobs.length === 0 && <p className="text-center text-gray-400 text-sm">No completed jobs yet.</p>}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
