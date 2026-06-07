import React from 'react';
import { Container, Card, Alert, Table } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

export default function Reviews() {
  return (
    <Container className="py-4">
      <h2 className="mb-4"><FaStar className="me-2" />Customer Reviews</h2>
      <Alert variant="info">Reviews and ratings from your customers will appear here</Alert>
      <Card>
        <Card.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="text-center text-muted">No reviews yet</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
