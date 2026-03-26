import { Outlet } from 'react-router-dom';
import TopNavBar from './components/navigation/TopNavBar';
import SideNavBar from './components/navigation/SideNavBar';
import MobileBottomNav from './components/navigation/MobileBottomNav';

export default function App() {
  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container min-h-screen">
      <TopNavBar />
      <SideNavBar />
      <main className="lg:ml-64 pt-24 pb-12 px-6 md:px-12 max-w-[1440px] mx-auto">
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  );
}
