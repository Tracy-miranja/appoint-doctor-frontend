import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Appointment from '../components/appointmentInfo/Appointment';
// import { useDispatch } from 'react-redux';

jest.mock('../features/doctorSlice', () => ({
  fetchDoctors: jest.fn(() => Promise.resolve()), // Directly returning a resolved promise
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

const mockDoctorData = [
  {
    id: 1,
    name: 'Dr. Smith',
    specialization: 'Cardiology',
    available_from: '2023-08-10T08:00',
    available_to: '2023-08-10T17:00',
  },
  {
    id: 2,
    name: 'Dr. Johnson',
    specialization: 'Dermatology',
    available_from: '2023-08-10T09:00',
    available_to: '2023-08-10T18:00',
  },
  // Add more mock doctor data if needed
];

const mockStore = configureStore([]);

describe('Appointment Component', () => {
  test('matches snapshot', async () => {
    const initialState = {
      auth: {
        userName: 'John Doe',
        userID: 1,
        isAuthenticated: true,
      },
      doctors: {

        doctors: mockDoctorData,
      },
    };

    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Appointment />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
