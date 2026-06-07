import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaTachometerAlt, FaBookmark, FaChartLine } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <Container className="py-4">
      <div className="dashboard-header text-white rounded p-4 mb-4">
        <h2><FaTachometerAlt className="me-2" />My Dashboard</h2>
        <p>Welcome to your customer dashboard</p>
      </div>

      <Alert variant="info">
        Your personalized dashboard content will appear here.
      </Alert>

      <Row className="g-4">
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-value">0</div>
              <div className="stat-label">Active Bookings</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-value">0</div>
              <div className="stat-label">Completed Services</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-value">0</div>
              <div className="stat-label">Favorite Vendors</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mt-4">
        <Col md={6}>
          <Card>
            <Card.Header><FaChartLine /> Recent Activity</Card.Header>
            <Card.Body>
              <p className="text-muted">No recent activity</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header><FaBookmark /> Recommendations</Card.Header>
            <Card.Body>
              <p className="text-muted">Your personalized recommendations</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
