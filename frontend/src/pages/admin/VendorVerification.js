import React from 'react';
import { Container, Card, Table, Button, Badge } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

export default function VendorVerification() {
  return (
    <Container className="py-4">
      <h2 className="mb-4"><FaCheckCircle className="me-2" />Vendor Verification</h2>
      <Card>
        <Card.Body>
          <Table striped hover>
            <thead>
              <tr>
                <th>Business Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="text-center text-muted">No pending vendors</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
