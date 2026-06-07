import React from 'react';
import { Card, Badge, Button, ProgressBar } from 'react-bootstrap';
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaCheckCircle
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function VendorCard({ vendor }) {
  return (
    <Card
      className="h-100 border-0"
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
      }}
    >
      {/* Banner */}
      <div style={{ position: 'relative' }}>
        <Card.Img
          variant="top"
          src={
            vendor.banner ||
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72'
          }
          style={{
            height: '220px',
            objectFit: 'cover'
          }}
        />

        {vendor.verificationStatus === 'verified' && (
          <Badge
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background:
                'linear-gradient(135deg,#10B981,#059669)',
              padding: '8px 12px',
              borderRadius: '20px'
            }}
          >
            <FaCheckCircle className="me-1" />
            Verified
          </Badge>
        )}
      </div>

      <Card.Body>
        {/* Title */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="fw-bold mb-0">
            {vendor.businessName}
          </h5>

          <Badge
            bg="light"
            text="dark"
            className="border"
          >
            {vendor.category}
          </Badge>
        </div>

        {/* Rating */}
        <div className="d-flex align-items-center mb-2">
          <FaStar
            style={{
              color: '#fbbf24',
              marginRight: '6px'
            }}
          />

          <strong>
            {vendor.rating
              ? vendor.rating.toFixed(1)
              : 'New'}
          </strong>

          <span className="text-muted ms-2">
            ({vendor.totalReviews || 0} Reviews)
          </span>
        </div>

        {/* Description */}
        <p
          className="text-muted"
          style={{
            minHeight: '60px',
            fontSize: '14px'
          }}
        >
          {vendor.description?.length > 100
            ? vendor.description.substring(0, 100) + '...'
            : vendor.description}
        </p>

        {/* Location */}
        <div className="mb-2">
          <FaMapMarkerAlt
            className="me-2 text-danger"
          />

          <span className="text-muted">
            {vendor.city}, {vendor.state}
          </span>
        </div>

        {/* Phone */}
        <div className="mb-3">
          <FaPhone
            className="me-2 text-primary"
          />

          <span className="text-muted">
            {vendor.phone}
          </span>
        </div>

        {/* Trust Score */}
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <small>Trust Score</small>
            <small>{vendor.trustScore}/100</small>
          </div>

          <ProgressBar
            now={vendor.trustScore}
            style={{
              height: '8px',
              borderRadius: '10px'
            }}
          />
        </div>

        {/* Recommendation Score */}
        {vendor.recommendationScore && (
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <small>AI Match Score</small>
              <small>
                {vendor.recommendationScore}%
              </small>
            </div>

            <ProgressBar
              now={vendor.recommendationScore}
              variant="success"
              style={{
                height: '8px',
                borderRadius: '10px'
              }}
            />
          </div>
        )}

        {/* Button */}
        <Link
          to={`/vendor/${vendor._id}`}
          className="text-decoration-none"
        >
          <Button
            className="w-100 fw-bold"
            style={{
              border: 'none',
              borderRadius: '12px',
              background:
                'linear-gradient(135deg,#4F46E5,#7C3AED)'
            }}
          >
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}