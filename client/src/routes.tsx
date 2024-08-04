import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AuthLayout from './components/AuthLayout';
import Root from './components/Root';
import Profile from './components/Profile';
import Todos from './components/Todos';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        path: '/profile/:id',
        element: (
          <AuthLayout authentication={false}>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: '/todos',
        element: (
          <AuthLayout authentication={false}>
            <Todos />
          </AuthLayout>
        ),
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
