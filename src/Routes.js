import React from 'react';
import { Navigate } from 'react-router-dom';

// DASHBOARD
import DashboardLayout from 'modules/dashboard/layouts/DashboardLayout';
import MainLayout from 'modules/dashboard/layouts/MainLayout';
import AccountView from 'modules/dashboard/views/account/AccountView';
import CustomerListView from 'modules/dashboard/views/customer/CustomerListView';
import DashboardView from 'modules/dashboard/views/reports/DashboardView';
import LoginView from 'modules/dashboard/views/auth/LoginView';
import LoginDashboardView from 'modules/dashboard/views/auth/LoginDashboardView';
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
import { isAuthenticated } from 'services/auth';
import UsersListView from 'modules/dashboard/views/users/UsersListView';
import CategoryListView from 'modules/dashboard/views/category/CategoryListView';

const routes = [
    { path: 'admin/login', element: isAuthenticated() ? <Navigate to="/admin" /> : <LoginDashboardView /> },
    {
        path: 'admin',
        element: <DashboardLayout />,
        children: [
            { path: '/', element: !isAuthenticated() ? <Navigate to="/admin/login" /> : <DashboardView /> },
            { path: 'account', element: !isAuthenticated() ? <Navigate to="/admin/login" /> : <AccountView /> },
            { path: 'users', element: !isAuthenticated() ? <Navigate to="/admin/login" /> : <UsersListView /> },
            { path: 'customers', element: !isAuthenticated() ? <Navigate to="/admin/login" /> : <CustomerListView /> },
            { path: 'products', element: !isAuthenticated() ? <Navigate to="/admin/login" /> : <ProductListView /> },
            { path: 'categories', element: !isAuthenticated() ? <Navigate to="/admin/login" /> : <CategoryListView /> },
            { path: 'settings', element: !isAuthenticated() ? <Navigate to="/admin/login" /> : <SettingsView /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    },
    {
        path: '/loja',
        element: <MainLayout />,
        children: [
            { path: 'login', element: isAuthenticated() ? <Navigate to="/loja" /> : <LoginView /> },
            { path: 'register', element: isAuthenticated() ? <Navigate to="/loja" /> : <RegisterView /> },
            { path: '404', element: <NotFoundView /> },
            { path: '*', element: <Navigate to="/loja/404" /> }
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