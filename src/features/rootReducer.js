import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import doctorSlice from './doctorSlice';
import appointmentSlice from './appointmentSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  doctors: doctorSlice,
  appointments: appointmentSlice,
  users: userSlice,
});

export default rootReducer;
