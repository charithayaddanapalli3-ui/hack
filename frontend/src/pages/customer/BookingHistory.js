import React from 'react';
import { Container, Card, Alert, Table } from 'react-bootstrap';
import { FaCalendar } from 'react-icons/fa';

export default function BookingHistory() {
  return (
    <Container className="py-4">
      <h2 className="mb-4"><FaCalendar className="me-2" />My Bookings</h2>
      
      <Card>
        <Card.Body>
          <Alert variant="info">
            Your booking history will appear here. You'll be able to track the status of all your bookings with local vendors.
          </Alert>
          <Table striped hover>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No bookings yet
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
