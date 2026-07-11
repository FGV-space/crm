import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Layout from "./modules/Layout";
import { PrivateRoute } from "./modules/PrivateRoute";
import Dashboard from "./modules/Dashboard/pages/DashboardMainPage";
import AuthorityListPage from "./modules/Authority/pages/AuthorityListPage/AuthorityListPage";
import AuthorityDetailPage from "./modules/Authority/pages/AuthorityDetailPage/AuthorityDetailPage";
import CameraListPage from './modules/Camera/pages/CameraListPage/CameraListPage';
import SiteDetailPage from './modules/Authority/pages/SiteDetailPage/SiteDetailPage';
import NegotiationsListPage from './modules/Negotiations/pages/NegotiationsListPage/NegotiationsListPage';
import NegotiationsWizardPage from './modules/Negotiations/pages/NegotiationsWizardPage/NegotiationsWizardPage';
import NegotiationsDetailPage from './modules/Negotiations/pages/NegotiationsDetailPage/NegotiationsDetailPage';
import Login from "./modules/User/pages/LoginPage";
import NoPage from "./modules/NoPage";
import Map from "./modules/Map/pages/MapMainPage";

import { history } from "./util/history";
import { setData } from "./modules/User/userSlice";

export default function Vms() {
  history.navigate = useNavigate();
  history.location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { auth } = useSelector(state => state.user);

  useEffect(() => {
    const data = localStorage.getItem('vms.user');
    if (data) {
      dispatch(setData({ user: JSON.parse(data) }));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout />
        }
      >
        <Route
          index
          exact
          path="/dashboard"
          element={
            <Dashboard />
          }
        />
        <Route
          index
          exact
          path="/map"
          element={
            <Map />
          }
        />
        <Route
          path="/authority"
          element={
            <AuthorityListPage />
          }
        />
        <Route
          path="/authority/:id"
          element={
            <AuthorityDetailPage />
          }
        />
        <Route
          path="/authority/site/:id"
          element={
            <SiteDetailPage />
          }
        />
        <Route
          path="/cameras"
          element={
            <CameraListPage />
          }
        />
        <Route
          path="/negotiations"
          element={
            <NegotiationsListPage />
          }
        />
        <Route
          path="/negotiations/:id"
          element={
            <NegotiationsDetailPage />
          }
        />
        <Route
          exact
          path="/negotiations/wizard"
          element={
            <NegotiationsWizardPage />
          }
        />
        <Route
          path="*"
          element={<NoPage />}
        />
      </Route>
      <Route
        exact
        path="/login"
        element={<Login />}
      />
    </Routes>
  );
}
