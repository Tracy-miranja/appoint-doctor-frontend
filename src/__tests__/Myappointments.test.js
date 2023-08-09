import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import MyAppointments from '../components/appointmentInfo/MyAppointments';

// Mock the useDispatch hook and useSelector
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

describe('MyAppointments Component', () => {
  const mockAppointments = [
    {
      id: 1,
      appointment_date: '2023-08-10T08:00:00Z',
      doctor_id: 1,
      location: {
        street: '123 Main St',
        state: 'CA',
        city: 'Los Angeles',
        zip_code: '90001',
      },
    },
    {
      id: 2,
      appointment_date: '2023-08-11T10:30:00Z',
      doctor_id: 1,
      location: {
        street: '123 Main St',
        state: 'CA',
        city: 'Los Angeles',
        zip_code: '90001',
      // ... (rest of the data)
   },
},
  ];

  const mockDoctors = [
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
      available_to: '2023-08-10T17:00',
      // ... (rest of the data)
    },
  ];

  const mockStore = configureStore([]);

  beforeEach(() => {
    useSelector.mockReturnValue({
      status: 'succeeded',
      appointments: mockAppointments,
      doctors: mockDoctors,
    });
  });

  test('matches snapshot', () => {
    const store = mockStore();

    let tree;
    act(() => {
      tree = renderer.create(
        <Provider store={store}>
          <MemoryRouter>
            <MyAppointments />
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  // Write more tests as needed...
});
