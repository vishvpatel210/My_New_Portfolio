import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Shield, Clock, Star, Bell, IndianRupee, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';

const Landing = () => {
  const categories = [
    { emoji: '🔧', name: 'Plumber', count: '120+' },
    { emoji: '⚡', name: 'Electrician', count: '95+' },
    { emoji: '🪚', name: 'Carpenter', count: '80+' },
    { emoji: '🖌️', name: 'Painter', count: '70+' },
    { emoji: '🧱', name: 'Mason', count: '60+' },
    { emoji: '🔩', name: 'Welder', count: '50+' },
  ];

  const features = [
    { icon: Shield, title: 'Verified Workers', desc: 'All workers are ID-verified and background-checked before listing.' },
    { icon: MapPin, title: 'Real-Time Map', desc: 'See nearby workers live on map with live GPS location.' },
    { icon: IndianRupee, title: 'Transparent Pricing', desc: 'Clear per-hour rates. No hidden fees, no surprises.' },
    { icon: Calendar, title: 'Calendar Booking', desc: 'Schedule and manage bookings with a visual calendar.' },
    { icon: Star, title: 'Ratings & Reviews', desc: 'Honest reviews after every job. Quality is guaranteed.' },
    { icon: Bell, title: 'Instant Notifications', desc: 'Real-time alerts for job requests, confirmations, and updates.' },
  ];

  const testimonials = [
    { name: 'Rajesh Sharma', role: 'Home Owner', city: 'Ahmedabad', rating: 5, text: 'Found a great plumber in 10 minutes! The live map feature is amazing.' },
    { name: 'Priya Mehta', role: 'Property Manager', city: 'Surat', rating: 5, text: 'Booking workers for multiple flats is so easy now. Highly recommended!' },
    { name: 'Amit Patel', role: 'Business Owner', city: 'Vadodara', rating: 5, text: 'All workers are verified. I feel safe hiring from SewaPro.' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-indigo-500/30 border border-indigo-500/50 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              🏆 #1 Worker Booking Platform in India
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Find Trusted Skilled Workers <span className="text-indigo-400">Near You</span> — Instantly
            </h1>
            <p className="text-lg text-indigo-200 mb-8 max-w-2xl mx-auto">
              Connect with verified plumbers, electricians, carpenters and more in your city. Real-time location. Transparent pricing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-8 py-3.5 font-semibold text-lg transition-all active:scale-95">
                Get Started →
              </Link>
              <Link to="/login" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl px-8 py-3.5 font-semibold text-lg transition-all">
                ▶ Watch Demo
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-16">
            {[['500+', 'Workers'], ['1000+', 'Jobs Done'], ['50+', 'Cities'], ['4.8★', 'Rating']].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-white">{val}</p>
                <p className="text-indigo-300 text-sm">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">How It Works</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Get help in just 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, icon: '📝', title: 'Post a Job', desc: 'Describe what you need — plumber, electrician, or carpenter. Add location and schedule.' },
              { step: 2, icon: '🗺️', title: 'Find Nearby Worker', desc: 'See available workers near you on live map. View profiles and ratings.' },
              { step: 3, icon: '✅', title: 'Get It Done', desc: 'Track job progress in real-time. Rate and review after completion.' },
            ].map(s => (
              <motion.div key={s.step} whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 p-6 text-center">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">{s.step}</div>
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Worker Categories</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Skilled professionals for every need</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(c => (
              <motion.div key={c.name} whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 p-6 text-center cursor-pointer">
                <div className="text-4xl mb-3">{c.emoji}</div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">{c.name}</p>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{c.count} workers</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SewaPro */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Why SewaPro?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 p-6">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">What People Say</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Trusted by thousands across Gujarat</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} className="text-amber-400">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500">{t.role} · {t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find a Skilled Worker?</h2>
            <p className="text-indigo-200 mb-8 text-lg">
              Join thousands of homeowners and businesses using SewaPro to get work done fast and reliably.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup"
                className="bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl px-8 py-3.5 font-semibold text-lg transition-all active:scale-95">
                Get Started for Free →
              </Link>
              <Link to="/workers"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl px-8 py-3.5 font-semibold text-lg transition-all">
                Browse Workers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">SewaPro</h3>
            <p className="text-sm leading-relaxed">
              Connecting skilled workers with those who need them. Fast, verified, and transparent.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/workers" className="hover:text-white transition-colors">Find Workers</Link></li>
              <li><Link to="/post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Register as Worker</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-800 text-center text-sm">
          © {new Date().getFullYear()} SewaPro. All rights reserved. Made with ❤️ in Gujarat, India.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
