import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';

export default function ManageProfile() {
  return (
    <Container className="py-4">
      <h2 className="mb-4"><FaEdit className="me-2" />Manage Business Profile</h2>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Business Name</Form.Label>
              <Form.Control placeholder="Your business name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option>Select Category</option>
                <option>Plumbing</option>
                <option>Electrical</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Business description" />
            </Form.Group>
            <Button variant="primary">Save Changes</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
