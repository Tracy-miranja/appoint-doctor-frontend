import React, { useEffect } from 'react';
import {
  Table, Button, Container, Row, Col, Alert,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../features/userSlice';
import NavBar from '../navbar/Navbar';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
    dispatch(fetchUsers());
  };

  if (status === 'loading') {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Container fluid className="px-0">
      <Row>
        <Col md={2}>
          <NavBar />
        </Col>
        <Col md={10}>
          <h2>User List</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="scrollable">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;
