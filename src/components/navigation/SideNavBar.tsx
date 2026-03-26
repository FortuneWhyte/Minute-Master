import { NavLink } from 'react-router-dom';

interface SideNavItem {
  icon: string;
  label: string;
  to: string;
  iconFill?: boolean;
}

const sideNavItems: SideNavItem[] = [
  { icon: 'input', label: 'Input Gate', to: '/' },
  { icon: 'database', label: 'Data Preview', to: '/history' },
  { icon: 'edit_note', label: 'Edit Mode', to: '/insights' },
  { icon: 'bolt', label: 'Actions', to: '/settings' },
];

export default function SideNavBar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-0 h-screen bg-slate-100 dark:bg-slate-950 py-6 gap-2 z-40 pt-20">
      <div className="px-6 mb-8">
        <h2 className="text-lg font-black text-blue-700 dark:text-blue-400">Minute Master</h2>
        <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold mt-1">Architectural Editor</p>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {sideNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 rounded-l-xl shadow-sm transition-transform duration-150 ease-out font-headline text-sm font-medium'
                : 'flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/50 rounded-lg transition-transform duration-150 ease-out font-headline text-sm font-medium'
            }
          >
            <span
              className="material-symbols-outlined"
              style={item.iconFill ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-4 mt-auto">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
            JD
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate">Jane Doe</p>
            <p className="text-[10px] text-slate-500 truncate">Premium Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
