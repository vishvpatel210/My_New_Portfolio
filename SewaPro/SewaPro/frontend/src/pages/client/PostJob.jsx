import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/axiosInstance';

const categories = ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Mason', 'Welder'];

const PostJob = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    address: '',
    scheduledDate: '',
    scheduledTime: '',
    estimatedHours: 2,
    budget: { min: 200, max: 500 }
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords([pos.coords.longitude, pos.coords.latitude]),
        (err) => console.log("Geolocation error:", err.message)
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
          ...form,
          location: { 
            address: form.address,
            type: 'Point',
            coordinates: coords || [0, 0]
          }
      };
      await api.post('/client/jobs', payload);
      toast.success('Job request posted successfully! 🎉');
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all mt-1";
  const labelClass = "text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-3xl p-8 w-full max-w-2xl shadow-2xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Post a Service Request</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Job Title</label>
            <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Fix leaking kitchen tap" className={inputClass} />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea required rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe what needs to be done..." className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Category</label>
            <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputClass}>
              <option value="">Select Category</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className={labelClass}>Service Address</label>
            <input required value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Street, Area, City" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Preferred Date</label>
            <input required type="date" value={form.scheduledDate} onChange={e => setForm({...form, scheduledDate: e.target.value})} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Preferred Time</label>
            <input required type="time" value={form.scheduledTime} onChange={e => setForm({...form, scheduledTime: e.target.value})} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Est. Hours</label>
            <input type="number" value={form.estimatedHours} onChange={e => setForm({...form, estimatedHours: e.target.value})} className={inputClass} />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
                <label className={labelClass}>Min Budget</label>
                <input type="number" value={form.budget.min} onChange={e => setForm({...form, budget: {...form.budget, min: Number(e.target.value)}})} className={inputClass} />
            </div>
            <div className="flex-1">
                <label className={labelClass}>Max Budget</label>
                <input type="number" value={form.budget.max} onChange={e => setForm({...form, budget: {...form.budget, max: Number(e.target.value)}})} className={inputClass} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-4 font-bold transition-all active:scale-95 disabled:opacity-50 mt-4"
          >
            {loading ? 'Posting Request...' : 'Post Job Request'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PostJob;
