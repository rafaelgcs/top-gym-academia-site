import React from 'react';
import { Navigate } from 'react-router-dom';

// DASHBOARD
import DashboardLayout from 'modules/dashboard/layouts/DashboardLayout';
import MainLayout from 'modules/dashboard/layouts/MainLayout';
import AccountView from 'modules/dashboard/views/account/AccountView';
import CustomerListView from 'modules/dashboard/views/customer/CustomerListView';
import DashboardView from 'modules/dashboard/views/reports/DashboardView';
import LoginView from 'modules/dashboard/views/auth/LoginView';
import NotFoundView from 'modules/dashboard/views/errors/NotFoundView';
import ProductListView from 'modules/dashboard/views/product/ProductListView';
import RegisterView from 'modules/dashboard/views/auth/RegisterView';
import SettingsView from 'modules/dashboard/views/settings/SettingsView';

// LANDING
import HomePage from "modules/landing/screens/HomePage";
import EquipePage from "modules/landing/screens/EquipePage";
import GalleryPage from "modules/landing/screens/GalleryPage";
import Error404 from "modules/landing/screens/errors/404";
import LandingLayout from 'modules/shared/layouts/landing_layout';

const routes = [
    {
        path: 'admin',
        element: <DashboardLayout />,
        children: [
            { path: 'account', element: <AccountView /> },
            { path: 'customers', element: <CustomerListView /> },
            { path: 'dashboard', element: <DashboardView /> },
            { path: 'products', element: <ProductListView /> },
            { path: 'settings', element: <SettingsView /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    },
    {
        path: '/loja',
        element: <MainLayout />,
        children: [
            { path: 'login', element: <LoginView /> },
            { path: 'register', element: <RegisterView /> },
            { path: '404', element: <NotFoundView /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    },
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: 'gallery', element: <GalleryPage /> },
            { path: 'equipe', element: <EquipePage /> },
            { path: '404', element: <NotFoundView /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    }
];

export default routes;