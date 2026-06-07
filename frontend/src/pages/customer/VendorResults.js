import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { searchAPI } from '../../services/api';
import VendorCard from '../../components/VendorCard';

export default function VendorResults() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const keyword = queryParams.get('keyword') || '';
  const category = queryParams.get('category') || '';
  const lat = queryParams.get('lat');
  const lng = queryParams.get('lng');

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await searchAPI.search({
          latitude: lat,
          longitude: lng,
          keyword,
          category,
        });
        setVendors(response.data.results || []);
      } catch (err) {
        console.error(err);
        setError('Error fetching vendors');
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, [keyword, category, lat, lng]);

  return (
    <Container className="py-4">
      <h2 className="mb-4">Vendor Results</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : vendors.length > 0 ? (
        <Row className="g-4">
          {vendors.map((vendor) => (
            <Col md={6} lg={4} key={vendor._id}>
              <VendorCard vendor={vendor} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="text-center">
          No vendors found. Try adjusting your search criteria.
        </Alert>
      )}
    </Container>
  );
}

