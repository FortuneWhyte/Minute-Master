import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAppStore } from '../../store/useAppStore';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/history', label: 'History' },
  { to: '/insights', label: 'Insights' },
  { to: '/settings', label: 'Settings' },
];

export default function TopNavBar() {
  const { session, organizationName } = useAppStore();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userEmail = session?.user?.email || '';
  const initials = userEmail.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-none font-headline antialiased tracking-tight">
      <div className="flex justify-between items-center h-16 px-8 w-full mx-auto max-w-[1440px]">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Minute Master</span>
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-700 dark:text-blue-400 font-semibold border-b-2 border-blue-700 dark:border-blue-400 pb-1 transition-all duration-200 ease-in-out active:scale-95'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors transition-all duration-200 ease-in-out active:scale-95'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Notifications — placeholder for future use */}
          <button className="p-2 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-all duration-200 ease-in-out active:scale-95 relative">
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">notifications</span>
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-all duration-200 ease-in-out active:scale-95"
            >
              <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-[10px]">
                {initials}
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                {/* User info */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">
                      {initials}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-50 truncate">{userEmail}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Signed in</p>
                    </div>
                  </div>
                  {organizationName && (
                    <div className="mt-3 flex items-center gap-2 bg-primary-container/20 px-3 py-1.5 rounded-lg">
                      <span className="material-symbols-outlined text-primary text-sm">business</span>
                      <span className="text-xs font-semibold text-primary">{organizationName}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="p-2">
                  <button
                    onClick={() => { setProfileOpen(false); navigate('/settings'); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">settings</span>
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
