import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointmentThunk } from '../../features/appointmentSlice';
// import { fetchDoctors } from '../../features/doctorSlice';
// import { fetchDoctors } from '../../features/doctorSlice';
const fetchDoctors = {}; // delete this line and uncomment line above

const Appointment = () => {
  const dispatch = useDispatch();

  const [appointmentDate, setAppointmentDate] = useState('');
  const [doctorId, setDoctorId] = useState('');
  // const [patientId, setPatientId] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const listDoctors = useSelector((state) => state.doctors.doctors);

  useEffect(() => { // Fetch doctors on component mount
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleAddAppointment = async (e) => {
    e.preventDefault();

    const appointmentData = {
      appointment: {
        appointment_date: appointmentDate,
        doctor_id: doctorId,
        patient_id: sessionStorage.getItem('userId'),
        status: {
          active: true,
          expire: false,
          cancel: false,
        },
        location: {
          street,
          city,
          state,
          zip_code: zipCode,
        },
      },
    };

    try {
      dispatch(addAppointmentThunk(appointmentData));
      setAppointmentDate('');
      setDoctorId('');
      setStreet('');
      setCity('');
      setState('');
      setZipCode('');

      // Optionally, display a success message to the user.
    } catch (error) {
      error.message = 'Failed to create appointment';
    }
  };

  const handleDoctorSelect = (e) => {
    const selectedDoctorId = parseInt(e.target.value, 10);
    setDoctorId(selectedDoctorId);
  };

  return (
    <div>
      <form className="container mt-4" onSubmit={handleAddAppointment}>
        <div className="form-group row">
          {/* <label htmlFor="appointmentDate" className="col-sm-2 col-form-label">
            Appointment Date:
          </label> */}
          <div className="col-sm-10">
            <input
              type="datetime-local"
              className="form-control"
              id="appointmentDate"
              placeholder="Enter appointment date"
              required
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          {/* <label htmlFor="doctorId" className="col-sm-2 col-form-label">
            Doctor name:
          </label> */}
          <div className="col-sm-10">
            <select
              className="form-control"
              id="doctorId"
              name="doctorId"
              placeholder="Select a doctor"
              required
              value={doctorId}
              onChange={handleDoctorSelect}
            >
              <option value="">Select a doctor</option>
              {listDoctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group row">
          {/* <label htmlFor="street" className="col-sm-2 col-form-label">
            Street:
          </label> */}
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Street"
              id="street"
              name="street"
              required
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          {/* <label htmlFor="city" className="col-sm-2 col-form-label">
            City:
          </label> */}
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              id="city"
              required
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          {/* <label htmlFor="state" className="col-sm-2 col-form-label">
            State:
          </label> */}
          <div className="col-sm-10">
            <input
              type="text"
              required
              className="form-control"
              id="state"
              name="state"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          {/* <label htmlFor="zipCode" className="col-sm-2 col-form-label">
            Zip Code:
          </label> */}
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="zipCode"
              name="zipCode"
              required
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-12 text-center">
            <button type="submit" className="btn btn-primary">
              Add Appointment
            </button>
          </div>
        </div>
      </form>

    </div>
  );
};

export default Appointment;
