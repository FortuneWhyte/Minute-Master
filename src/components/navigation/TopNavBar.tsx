import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/history', label: 'History' },
  { to: '/insights', label: 'Insights' },
  { to: '/settings', label: 'Settings' },
];

export default function TopNavBar() {
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
          <button className="p-2 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-all duration-200 ease-in-out active:scale-95">
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">notifications</span>
          </button>
          <button className="p-2 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-all duration-200 ease-in-out active:scale-95">
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">account_circle</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
