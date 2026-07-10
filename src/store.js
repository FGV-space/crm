import { configureStore } from '@reduxjs/toolkit';
import app from './modules/App/appSlice';
import user from './modules/User/userSlice';
import dashboard from './modules/Dashboard/dashboardSlice';
import authority from './modules/Authority/authoritySlice';
import camera from './modules/Camera/cameraSlice';
import negotiations from './modules/Negotiations/negotiationsSlice';

export default configureStore({
  reducer: {
    app,
    user,
    dashboard,
    authority,
    camera,
    negotiations,
  },
});
