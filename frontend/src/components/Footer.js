import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-auto pt-5 pb-3 bg-light border-top">
      <Container>
        <Row className="mb-4">
          <Col md={3} sm={6} className="mb-4 footer-section">
            <h6>About LocalLink</h6>
            <p className="small text-muted">
              Connecting customers with trusted local vendors through AI-powered recommendations.
            </p>
          </Col>
          <Col md={3} sm={6} className="mb-4 footer-section">
            <h6>Quick Links</h6>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#contact">Contact</a></li>
              <li><a href="/#privacy">Privacy Policy</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-4 footer-section">
            <h6>For Vendors</h6>
            <ul>
              <li><a href="/register">Register as Vendor</a></li>
              <li><a href="#">Vendor Guidelines</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-4 footer-section">
            <h6>Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={20} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="border-top pt-3">
          <Col md={6}>
            <p className="small text-muted">
              © {new Date().getFullYear()} LocalLink. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="small text-muted">
              Built with ❤️ for connecting communities
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
