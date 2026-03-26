import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard/Dashboard';
import History from './pages/History/History';
import Insights from './pages/Insights/Insights';
import Settings from './pages/Settings/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'history', element: <History /> },
      { path: 'insights', element: <Insights /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);

export default router;
