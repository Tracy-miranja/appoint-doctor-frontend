import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, Button, Container, Row, Col,
} from 'react-bootstrap';
import NavBar from '../navbar/Navbar';
import { fetchDoctors, deleteDoctor } from '../../features/doctorSlice';

function DeleteDoctor() {
  const dispatch = useDispatch();
  const {
    status, error, doctors, references,
  } = useSelector((state) => state.doctors);
  const totalCount = references ? references
    .reduce((count, appointments) => count + appointments.length, 0) : 0;
  useEffect(() => {
    dispatch(fetchDoctors());
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
  return (
    <div>
      <h2>Delete Doctor Page</h2>
      {/* Add your logic and UI to delete a doctor */}
    </div>
  );
}

export default DeleteDoctor;
