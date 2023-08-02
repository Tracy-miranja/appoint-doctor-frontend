import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentsThunk } from '../../features/appointmentSlice';

// import NavBar from '../navbar/Navbar';

function MyAppointments() {
  const dispatch = useDispatch();

  // const { status, error } = useSelector((state) => state.appointments);
  const appointments = useSelector((state) => state.appointments.myAppointments);
  useEffect(() => {
    dispatch(getAppointmentsThunk());
  }, []);

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  // if (status === 'failed') {
  //   return (
  //     <div>
  //       Error:
  //       {' '}
  //       {error}
  //     </div>
  //   );
  // }

  if (!appointments || appointments.length === 0) {
    return <div>No appointments found.</div>;
  }

  console.log(appointments);
  // const groupSize = 3;
  // const totalGroups = Math.ceil(appointments.length / groupSize);

  // const handleNextGroup = () => {
  //   setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % totalGroups);
  // };

  // const handlePrevGroup = () => {
  //   setCurrentGroupIndex((prevIndex) => (prevIndex - 1 + totalGroups) % totalGroups);
  // };

  return (
    <div>
      <h1>My Appointments</h1>
      <div className="container">
        {appointments.map((appointment) => (
          <div className="card mb-3" key={appointment.id}>
            <div className="card-body">
              <h5 className="card-title">{appointment.appointment_date}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{appointment.doctor_id}</h6>
              <p className="card-text">{appointment.patient_id}</p>
              <p className="card-text">{appointment.status}</p>
              <p className="card-text">{appointment.location}</p>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
