import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Form, Button, Card, Spinner
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function SearchVendors() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [locating, setLocating] = useState(true);
  const [location, setLocation] = useState(null);

  const navigate = useNavigate();

  const categories = [
    'Plumbing', 'Electrical', 'Carpentry', 'Cleaning', 'Painting', 'HVAC',
    'Landscaping', 'Roofing', 'Health', 'Beauty', 'Education', 'Repair'
  ];

  const getLocation = () => {
    setLocating(true);

    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocating(false);
        toast.success('Location detected');
      },
      (err) => {
        console.log(err);
        toast.error('Please enable location access');
        setLocating(false);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!location) {
      toast.error('Waiting for location...');
      getLocation();
      return;
    }

    // 🚀 Redirect to results page with query params
    navigate(
      `/vendors?keyword=${search}&category=${category}&lat=${location.latitude}&lng=${location.longitude}`
    );
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Find Local Vendors</h2>

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Control
                  placeholder="Search by business name or service..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>

              <Col md={4}>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={2}>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={locating}
                >
                  {locating ? 'Getting Location...' : 'Search'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

