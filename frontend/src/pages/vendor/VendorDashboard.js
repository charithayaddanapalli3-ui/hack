import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaTachometerAlt } from 'react-icons/fa';

export default function VendorDashboard() {
  return (
    <Container className="py-4">
      <div className="dashboard-header text-white rounded p-4 mb-4">
        <h2><FaTachometerAlt className="me-2" />Vendor Dashboard</h2>
        <p>Manage your business on LocalLink</p>
      </div>

      <Alert variant="info">
        Your vendor dashboard will show key metrics and business stats.
      </Alert>

      <Row className="g-4">
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-value">0</div>
              <div className="stat-label">Profile Views</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-value">0</div>
              <div className="stat-label">Pending Requests</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-value">0.0</div>
              <div className="stat-label">Average Rating</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
