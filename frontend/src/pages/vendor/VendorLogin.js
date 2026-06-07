import React from 'react';
import { Container, Card, Alert, Form, Button, Row, Col } from 'react-bootstrap';
import { FaStore } from 'react-icons/fa';

export default function VendorLogin() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <h3 className="text-center mb-4 text-primary fw-bold">
                <FaStore className="me-2" /> Vendor Login
              </h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="vendor@email.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="••••••••" />
                </Form.Group>
                <Button variant="primary" className="w-100">Login as Vendor</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
