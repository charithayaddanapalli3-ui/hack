import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaPhone, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';

export default function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = React.useState(null);

  React.useEffect(() => {
    // Fetch vendor details - placeholder
    console.log('Fetching vendor:', id);
  }, [id]);

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <Button variant="outline-primary" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </Col>
      </Row>

      <Alert variant="info">
        Vendor details page - Coming soon. Vendor ID: {id}
      </Alert>

      <Row className="g-4">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h3>Vendor Profile</h3>
              <p>Business details, services, and description will appear here.</p>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h5>Reviews</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted">Reviews will be displayed here</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <h5 className="mb-3">Quick Info</h5>
              <div className="mb-3">
                <p className="mb-1">
                  <FaStar className="me-2 text-warning" /> Rating: N/A
                </p>
                <p className="mb-1">
                  <FaPhone className="me-2 text-primary" /> Phone: N/A
                </p>
                <p className="mb-1">
                  <FaMapMarkerAlt className="me-2 text-danger" /> Location: N/A
                </p>
              </div>
              <Button variant="primary" className="w-100 mb-2">
                <FaCalendar className="me-2" /> Book Now
              </Button>
              <Button variant="outline-primary" className="w-100">
                Contact Vendor
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
