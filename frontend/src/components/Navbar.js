import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Badge
} from 'react-bootstrap';

import {
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaSearch,
  FaBell,
  FaStar,
  FaMapMarkerAlt,
  FaChartLine
} from 'react-icons/fa';

export default function NavbarComponent({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold d-flex align-items-center"
        >
          <FaHome className="me-2 text-primary" />

          <span
            style={{
              background:
                'linear-gradient(135deg,#4F46E5,#7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}
          >
            LocalLink
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">

            {user ? (
              <>
                {/* CUSTOMER NAVIGATION */}
                {user.role === 'customer' && (
                  <>
                    <Nav.Link as={Link} to="/search">
                      <FaSearch className="me-1" />
                      Discover Vendors
                    </Nav.Link>

                    <Nav.Link as={Link} to="/nearby">
                      <FaMapMarkerAlt className="me-1" />
                      Nearby Services
                    </Nav.Link>

                    <Nav.Link as={Link} to="/bookings">
                      Bookings
                    </Nav.Link>

                    <Nav.Link as={Link} to="/dashboard">
                      Dashboard
                    </Nav.Link>
                  </>
                )}

                {/* VENDOR NAVIGATION */}
                {user.role === 'vendor' && (
                  <>
                    <Nav.Link as={Link} to="/vendor/dashboard">
                      Dashboard
                    </Nav.Link>

                    <Nav.Link as={Link} to="/vendor/profile">
                      Profile
                    </Nav.Link>

                    <Nav.Link as={Link} to="/vendor/reviews">
                      <FaStar className="me-1" />
                      Reviews
                    </Nav.Link>

                    <Nav.Link as={Link} to="/vendor/analytics">
                      <FaChartLine className="me-1" />
                      Analytics
                    </Nav.Link>
                  </>
                )}

                {/* ADMIN NAVIGATION */}
                {user.role === 'admin' && (
                  <>
                    <Nav.Link as={Link} to="/admin/dashboard">
                      Dashboard
                    </Nav.Link>

                    <Nav.Link as={Link} to="/admin/verify-vendors">
                      Verify Vendors
                    </Nav.Link>

                    <Nav.Link as={Link} to="/admin/analytics">
                      Analytics
                    </Nav.Link>

                    <Nav.Link as={Link} to="/admin/users">
                      Users
                    </Nav.Link>
                  </>
                )}

                {/* Notification */}
                <Nav.Link className="position-relative">
                  <FaBell size={18} />

                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    3
                  </span>
                </Nav.Link>

                {/* User Dropdown */}
                <Dropdown align="end" className="ms-2">
                  <Dropdown.Toggle
                    variant="light"
                    className="border-0 shadow-sm d-flex align-items-center"
                  >
                    <div
                      className="rounded-circle text-white d-flex align-items-center justify-content-center me-2"
                      style={{
                        width: '35px',
                        height: '35px',
                        background:
                          'linear-gradient(135deg,#4F46E5,#7C3AED)',
                        fontWeight: 'bold'
                      }}
                    >
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <span className="me-2">
                      {user.name}
                    </span>

                    <Badge
                      bg="primary"
                      style={{
                        background:
                          'linear-gradient(135deg,#4F46E5,#7C3AED)'
                      }}
                    >
                      {user.role}
                    </Badge>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                      <FaUser className="me-2" />
                      My Profile
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                      onClick={handleLogout}
                      className="text-danger"
                    >
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary rounded-pill px-4 me-2"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn text-white rounded-pill px-4"
                  style={{
                    background:
                      'linear-gradient(135deg,#4F46E5,#7C3AED)',
                    border: 'none'
                  }}
                >
                  Get Started
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
