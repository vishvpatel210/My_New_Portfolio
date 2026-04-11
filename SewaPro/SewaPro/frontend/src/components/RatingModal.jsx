import { useState } from 'react';
import { Star, X } from 'lucide-react';
import api from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const RatingModal = ({ workerId, jobId, workerName, workerPhoto, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating) return toast.error('Please select a rating');
    setLoading(true);
    try {
      await api.patch(`/jobs/${jobId}/rate`, { rating, review });
      toast.success('Rating submitted!');
      onSubmit?.();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Rate Worker</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl"><X size={18} /></button>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <img src={workerPhoto || `https://ui-avatars.com/api/?name=${workerName}&background=6366f1&color=fff`}
            alt={workerName} className="w-12 h-12 rounded-full object-cover" />
          <p className="font-semibold text-gray-800 dark:text-white">{workerName}</p>
        </div>
        <div className="flex gap-2 mb-6 justify-center">
          {[1,2,3,4,5].map(star => (
            <button key={star} onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}>
              <Star size={36} className={`transition-colors ${(hover || rating) >= star ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-slate-600'}`} />
            </button>
          ))}
        </div>
        <textarea value={review} onChange={e => setReview(e.target.value)}
          placeholder="Write a review (optional)..."
          rows={3}
          className="w-full border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all mb-4" />
        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-3 font-semibold transition-all active:scale-95 disabled:opacity-50">
          {loading ? 'Submitting...' : 'Submit Rating'}
        </button>
      </div>
    </div>
  );
};
export default RatingModal;
