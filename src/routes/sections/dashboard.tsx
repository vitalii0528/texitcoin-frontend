import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { paths } from '../paths';

// ----------------------------------------------------------------------
const UserListPage = lazy(() => import('src/pages/User/List'));
const UserCreatePage = lazy(() => import('src/pages/User/Create'));
const UserEditPage = lazy(() => import('src/pages/User/Edit'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const MemberListPage = lazy(() => import('src/pages/Member/List'));
const MemberCreatePage = lazy(() => import('src/pages/Member/Create'));
const MemberEditPage = lazy(() => import('src/pages/Member/Edit'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const SaleListPage = lazy(() => import('src/pages/Sale/List'));
const SaleCreatePage = lazy(() => import('src/pages/Sale/Create'));
// const SaleEditPage = lazy(() => import('src/pages/Sale/Edit'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const DashboardPage = lazy(() => import('src/pages/Dashboard'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const RewardPage = lazy(() => import('src/pages/Reward/List'));
const RewardCreatePage = lazy(() => import('src/pages/Reward/Create'));
// const RewardDetailPage = lazy(() => import('src/pages/MemberStatistics/List'));
// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: '',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <Navigate to={paths.dashboard.history.root} replace />, index: true },
      {
        path: 'dashboard',
        children: [{ index: true, element: <DashboardPage /> }],
      },
      {
        path: 'members',
        children: [
          { index: true, element: <MemberListPage /> },
          { path: 'new', element: <MemberCreatePage /> },
          { path: ':id', element: <MemberEditPage /> },
        ],
      },
      {
        path: 'sales',
        children: [
          { index: true, element: <SaleListPage /> },
          { path: 'new', element: <SaleCreatePage /> },
          // { path: ':id', element: <SaleEditPage /> },
        ],
      },
      {
        path: 'reward',
        children: [
          { index: true, element: <RewardPage /> },
          { path: 'new', element: <RewardCreatePage /> },
          // { path: ':id', element: <RewardDetailPage /> },
        ],
      },
      {
        path: 'users',
        children: [
          { index: true, element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          {
            path: ':id',
            children: [
              { index: true, element: <Navigate to="general" replace /> },
              {
                path: ':tab',
                element: <UserEditPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];
