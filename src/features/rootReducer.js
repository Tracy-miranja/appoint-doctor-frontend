import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import appointmentSlice from './appointmentSlice';
import doctorSlice from './doctorSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  appointments: appointmentSlice,
  doctors: doctorSlice,
});

export default rootReducer;
