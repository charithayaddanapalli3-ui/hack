import React from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { FaUsers } from 'react-icons/fa';

export default function UserManagement() {
  return (
    <Container className="py-4">
      <h2 className="mb-4"><FaUsers className="me-2" />User Management</h2>
      <Card>
        <Card.Body>
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="text-center text-muted">No users</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
