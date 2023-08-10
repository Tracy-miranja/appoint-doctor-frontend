import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, Button, Container, Row, Col,
} from 'react-bootstrap';
import { fetchAppointments, deleteAppointment } from '../../features/appointmentSlice';
import NavBar from '../navbar/Navbar';
import { formatLocation, formatDateAndTime } from '../appointmentInfo/MyAppointments';

function AppointmentList() {
  const dispatch = useDispatch();
  const {
    status, error, appointments, doctors,
  } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div>
        <NavBar />
        <h1>
          loading....
        </h1>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <h1>
        loading....
      </h1>
    );
  }

  if (status === 'failed') {
    return (
      <Container>
        <Row>
          <Col md={2} className="mb-4">
            <NavBar />
          </Col>
          <Col md={10}>
            <h1>
              No appointment found.
              {error}
            </h1>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!appointments || appointments.length === 0) {
    return (
      <Container>
        <Row>
          <Col md={2} className="mb-4">
            <NavBar />
          </Col>
          <Col md={10}>
            <h1>No appointment found.</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  const handleDeleteAppointment = (appointmentId) => {
    dispatch(deleteAppointment(appointmentId));
  };

  return (
    <Container fluid className="px-0">
      <Row>
        <Col md={2}>
          <NavBar />
        </Col>
        <Col md={10}>
          <h2>My Appointments List</h2>
          <div className="scrollable">
            <Table striped bordered hover>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Appointment Date</th>
                    <th>Doctor Name</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => {
                    const doctor = doctors.find((d) => d.id === appointment.doctor_id);
                    return (
                      <tr key={appointment.id}>
                        <td>{formatDateAndTime(appointment.appointment_date)}</td>
                        <td>{doctor ? doctor.name : 'Unknown'}</td>
                        <td>{formatLocation(appointment.location)}</td>
                        <td>Active</td>
                        <Button variant="danger" onClick={() => handleDeleteAppointment(appointment.id)}>
                          Cancel
                        </Button>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>

  );
}

export default AppointmentList;
