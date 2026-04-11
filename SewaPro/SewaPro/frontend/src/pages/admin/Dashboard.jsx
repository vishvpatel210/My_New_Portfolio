import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Users, Briefcase, CalendarCheck, IndianRupee, LogOut } from 'lucide-react';
import api from '../../utils/axiosInstance';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalWorkers: 0, openJobs: 0, bookingsToday: 0, totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/admin/dashboard');
      setStats(data);
    } catch {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const cards = [
    { label: 'Total Workers', value: stats.totalWorkers, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Open Jobs', value: stats.openJobs, icon: Briefcase, color: 'bg-yellow-100 text-yellow-600' },
    { label: "Today's Bookings", value: stats.bookingsToday, icon: CalendarCheck, color: 'bg-purple-100 text-purple-600' },
    { label: 'Total Revenue', value: `₹${stats.totalRevenue}`, icon: IndianRupee, color: 'bg-green-100 text-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">👔 Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Welcome, {user?.name}</p>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-200 transition-all">
            <LogOut size={14} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <motion.div key={c.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.color}`}>
                <c.icon size={18} />
              </div>
              {loading ? (
                <div className="h-8 bg-gray-100 rounded animate-pulse mb-1" />
              ) : (
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{c.value}</p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[
              { label: 'Manage Workers', path: '/admin/workers' },
              { label: 'Manage Jobs', path: '/admin/jobs' },
              { label: 'Calendar', path: '/admin/calendar' },
              { label: 'Map View', path: '/admin/map' },
            ].map(link => (
              <button key={link.label} onClick={() => navigate(link.path)}
                className="p-3 bg-indigo-50 dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-semibold hover:bg-indigo-100 transition-all">
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;