import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Map as MapIcon, List, Filter, Star } from 'lucide-react';
import MapView from '../../components/MapView';
import api from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Plumber', 'Electrician', 'Carpenter', 'Painter', 'Mason', 'Welder'];

const NearbyWorkers = () => {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [userLocation, setUserLocation] = useState([23.33, 72.33]); // Default to Kadi coords
  const [viewMode, setViewMode] = useState('map');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => toast.error("Could not get your location. Using default.")
      );
    }
  }, []);

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/map/workers');
      setWorkers(data);
    } catch (err) {
      toast.error('Failed to fetch nearby workers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
    
    // Polling for nearby workers every 60s
    const workersInterval = setInterval(fetchWorkers, 60000);
    return () => clearInterval(workersInterval);
  }, []);

  const handleHire = (worker) => {
    navigate('/client/dashboard', { state: { preSelectedWorker: worker } });
    toast.success(`Hiring ${worker.name}. Please fill job details.`);
  };

  const getMarkerIcon = (category) => {
    // Optional: different icons per category, for now using Default
    return null; 
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-80px)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Discover Workers</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Available skilled professionals in SewaPro</p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
          <button onClick={() => setViewMode('map')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}>
            <MapIcon size={20} />
          </button>
          <button onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}>
            <List size={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${category === c ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-slate-700 hover:bg-gray-50'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 h-[calc(100%-180px)]">
        {viewMode === 'map' ? (
          <MapView 
            items={workers.filter(w => category === 'All' || w.category === category)} 
            center={userLocation} 
            onAction={handleHire} 
          />
        ) : (
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto h-full">
            {workers.filter(w => category === 'All' || w.category === category).map(worker => (
              <motion.div key={worker._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl flex flex-col items-center text-center">
                <img src={worker.profilePhoto || 'https://via.placeholder.com/80'} alt={worker.name} className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white dark:border-slate-800 shadow-md" />
                <h3 className="font-bold text-gray-800 dark:text-white">{worker.name}</h3>
                <p className="text-indigo-600 text-xs font-bold mb-4">{worker.category}</p>
                <div className="flex justify-between w-full text-xs text-gray-500 mb-6">
                  <span className="flex items-center gap-1 font-bold text-yellow-500 hover:scale-110 transition-transform cursor-pointer">
                    <Star size={14} className="fill-yellow-500" /> {worker.rating}
                  </span>
                  <span className="font-bold">₹{worker.pricePerHour}/hr</span>
                  <span className="flex items-center gap-1 text-emerald-500 font-bold">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> Online
                  </span>
                </div>
                <button onClick={() => handleHire(worker)}
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-3 rounded-xl transition-all active:scale-95">
                  Hire This Worker
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyWorkers;
