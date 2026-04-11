import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun, Menu, X, LogOut, User } from 'lucide-react';
import { toggleTheme } from '../redux/themeSlice';
import { logout } from '../redux/authSlice';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, role } = useSelector(s => s.auth);
  const { mode } = useSelector(s => s.theme);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">🌉 SewaPro</Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
          {isAuthenticated && (
            <>
              <Link to={role === 'client' ? '/client/dashboard' : '/worker/dashboard'}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Dashboard
              </Link>
              {role === 'client' && (
                <Link to="/client/nearby" className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Nearby Workers
                </Link>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
            {mode === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-gray-600" />}
          </button>

          {isAuthenticated && <NotificationBell />}

          {isAuthenticated ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700">
                  <div className="p-3 border-b border-gray-100 dark:border-slate-700">
                    <p className="font-semibold text-sm text-gray-800 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                  </div>
                  <Link to="/profile/settings" onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
                    <User size={14} /> Settings
                  </Link>
                  <button onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 w-full">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2 text-sm font-semibold transition-all">
              Login
            </Link>
          )}

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-700 px-4 py-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setMobileOpen(false)} className="text-sm text-gray-700 dark:text-gray-300">Home</Link>
          {isAuthenticated && (
            <>
              <Link to={role === 'client' ? '/client/dashboard' : '/worker/dashboard'} onClick={() => setMobileOpen(false)} className="text-sm text-gray-700 dark:text-gray-300">Dashboard</Link>
              {role === 'client' && <Link to="/client/nearby" onClick={() => setMobileOpen(false)} className="text-sm text-gray-700 dark:text-gray-300">Nearby Workers</Link>}
              <button onClick={handleLogout} className="text-sm text-red-600 text-left">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
