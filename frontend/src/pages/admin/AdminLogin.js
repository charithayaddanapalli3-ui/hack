import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaShieldAlt } from 'react-icons/fa';

export default function AdminLogin() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <h3 className="text-center mb-4 text-primary fw-bold">
                <FaShieldAlt className="me-2" /> Admin Login
              </h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="admin@email.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="••••••••" />
                </Form.Group>
                <Button variant="primary" className="w-100">Login as Admin</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
