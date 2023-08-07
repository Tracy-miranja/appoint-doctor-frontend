/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

export const getAppointmentsThunk = createAsyncThunk('doctor/getDoctorsThunk', async () => {
  try {
    // const token = localStorage.getItem('');
    const token = localStorage.getItem('token');
    const response = await axios.get('http://127.0.0.1:3000/appointments/', {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    toast.error(error);
    throw new Error('Failed to fetch doctors');
  }
});

export const addAppointmentThunk = createAsyncThunk('appointments/addAppointmentThunk', async (appointmentData) => {
  try {
    const token = sessionStorage.getItem('authToken');

    const response = await axios.post('http://127.0.0.1:3000/appointments/', appointmentData, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error);
    throw new Error('Failed to create appointment');
  }
});

const myAppointmentsSlice = createSlice({
  name: 'appointments',
  initialState: { myAppointments: [], status: 'idle' },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointmentsThunk.fulfilled, (state, action) => {
        state.status = 'success';
        state.myAppointments = action.payload;
      })
      .addCase(addAppointmentThunk.fulfilled, (state, action) => {
        state.myAppointments.push(action.payload);
        state.status = 'success';
      });
  },
});

export default myAppointmentsSlice.reducer;
