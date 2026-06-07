import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaChartBar } from 'react-icons/fa';

export default function Analytics() {
  return (
    <Container className="py-4">
      <h2 className="mb-4"><FaChartBar className="me-2" />Platform Analytics</h2>

      <Alert variant="info">
        Platform growth and performance metrics will appear here.
      </Alert>

      <Row className="g-4">
        <Col md={6}>
          <Card>
            <Card.Header>User Growth</Card.Header>
            <Card.Body>
              <p className="text-muted">Chart data will be displayed here</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Booking Trends</Card.Header>
            <Card.Body>
              <p className="text-muted">Chart data will be displayed here</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mt-4">
        <Col md={6}>
          <Card>
            <Card.Header>Category Distribution</Card.Header>
            <Card.Body>
              <p className="text-muted">Chart data will be displayed here</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Revenue Analytics</Card.Header>
            <Card.Body>
              <p className="text-muted">Chart data will be displayed here</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
