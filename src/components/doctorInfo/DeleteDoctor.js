import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, Button, Container, Row, Col,
} from 'react-bootstrap';
import NavBar from '../navbar/Navbar';
import { fetchDoctors, deleteDoctor } from '../../features/doctorSlice';

function DeleteDoctor() {
  return (
    <div>
      <h2>Delete Doctor Page</h2>
      {/* Add your logic and UI to delete a doctor */}
    </div>
  );
}

export default DeleteDoctor;
