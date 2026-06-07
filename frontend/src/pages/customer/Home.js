import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaShieldAlt, FaRocket } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="search-container">
        <Container>
          <Row className="align-items-center">
            <Col md={8} className="mx-auto text-center">
              <h1 className="display-4 fw-bold mb-3">Find Trusted Local Vendors</h1>
              <p className="lead mb-4">
                Discover verified local vendors powered by AI recommendations. Get the best services near you.
              </p>
              <Link to="/search">
               <Button
                  size="lg"
                  className="hero-search-btn"
                >
              <FaMapMarkerAlt className="me-2" />
              Search Vendors Near You
              </Button>
            </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Why Choose LocalLink?</h2>
        <Row className="g-4">
          <Col md={3} xs={6}>
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <FaMapMarkerAlt size={40} className="text-primary mb-3" />
                <h5>Location Based</h5>
                <p className="text-muted">Find vendors close to you</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xs={6}>
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <FaStar size={40} className="text-warning mb-3" />
                <h5>Trusted Ratings</h5>
                <p className="text-muted">Real reviews from customers</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xs={6}>
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <FaShieldAlt size={40} className="text-success mb-3" />
                <h5>Verified Vendors</h5>
                <p className="text-muted">Secure & trustworthy</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xs={6}>
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <FaRocket size={40} className="text-danger mb-3" />
                <h5>AI Powered</h5>
                <p className="text-muted">Smart recommendations</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Getting Started */}
      <div className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2>Get Started in 3 Steps</h2>
              <ol className="mt-4">
                <li className="mb-3">
                  <strong>Search</strong> - Find vendors by category and location
                </li>
                <li className="mb-3">
                  <strong>Compare</strong> - Check ratings, reviews, and trust scores
                </li>
                <li className="mb-3">
                  <strong>Book</strong> - Book services and manage your bookings
                </li>
              </ol>
            </Col>
            <Col md={6}>
              <img
                src="https://via.placeholder.com/400x300?text=LocalLink"
                alt="Getting Started"
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-5 text-center bg-primary text-white rounded-3 m-4">
        <Container>
          <h2 className="mb-4">Ready to find your perfect vendor?</h2>
          <p className="lead mb-4">
            Join thousands of customers discovering trusted local services.
          </p>
          <Link to="/search">
            <Button size="lg" variant="light">
              Explore Vendors Now
            </Button>
          </Link>
        </Container>
      </div>
    </>
  );
}
