/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { AuthData } from 'src/auth/AuthWrapper';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const { user } = AuthData();

  const elemntChild = [
    { element: <IndexPage />, index: true, role: '*' },
    { path: 'user', element: <UserPage />, role: 'Leader' },
    { path: 'products', element: <ProductsPage />, role: 'Leader' },
    { path: 'blog', element: <BlogPage />, role: 'Leader' },
  ];

  const routes = useRoutes([
    {
      element: user.isAuthenticated ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" />
      ),
      children: elemntChild.filter((e) => {
        if (e.role !== '*') {
          return e.role === user.role;
        }
        return true;
      }),
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
