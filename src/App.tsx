import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import Tasks from './pages/Tasks';
import Home from './pages/Home';
import Analytics from './pages/Analytics';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/home',
        index: true,
        element: <Home />,
      },
      {
        path: '/tasks',
        element: <Tasks />,
      },
      {
        path: '/analytics',
        element: <Analytics />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
