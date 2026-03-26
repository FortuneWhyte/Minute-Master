import { NavLink } from 'react-router-dom';

const mobileNavItems = [
  { icon: 'dashboard', label: 'Home', to: '/' },
  { icon: 'history', label: 'History', to: '/history' },
  { icon: 'insights', label: 'Insights', to: '/insights' },
  { icon: 'settings', label: 'Settings', to: '/settings' },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 w-full md:hidden bg-slate-50/80 backdrop-blur-md z-50 px-4 py-3 flex justify-around">
      {mobileNavItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'text-blue-700' : 'text-slate-500'}`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
