import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaTachometerAlt } from 'react-icons/fa';

export default function AdminDashboard() {
  return (
    <Container className="py-4">
      <div className="dashboard-header text-white rounded p-4 mb-4">
        <h2><FaTachometerAlt className="me-2" />Admin Dashboard</h2>
        <p>Platform management and analytics</p>
      </div>

      <Alert variant="info">
        Admin dashboard with platform statistics and management tools.
      </Alert>

      <Row className="g-4">
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-value">0</div>
              <div className="stat-label">Total Users</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-value">0</div>
              <div className="stat-label">Total Vendors</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-value">0</div>
              <div className="stat-label">Pending Verification</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-value">0</div>
              <div className="stat-label">Open Complaints</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}