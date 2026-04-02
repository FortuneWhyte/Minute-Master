import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard/Dashboard';
import History from './pages/History/History';
import Insights from './pages/Insights/Insights';
import Settings from './pages/Settings/Settings';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ProtectedRoute from './components/layout/ProtectedRoute';

const router = createBrowserRouter([
  // Public routes
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },

  // Protected routes
  {
    element: <ProtectedRoute />,
    children: [
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
    ],
  },
]);

export default router;
