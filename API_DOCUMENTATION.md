# LocalLink API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. Register
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password123",
  "confirmPassword": "secure_password123",
  "phone": "+1-555-0000",
  "role": "customer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "63f7d8c...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### 2. Login
**POST** `/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "secure_password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

### 3. Get Current User
**GET** `/auth/me` (Protected)

Get current logged-in user details.

**Response:**
```json
{
  "success": true,
  "user": { ... }
}
```

### 4. Update Profile
**PUT** `/auth/profile` (Protected)

Update user profile information.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "phone": "+1-555-1111",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipcode": "10001"
}
```

---

## Vendor Endpoints

### 1. Create Vendor Profile
**POST** `/vendors` (Protected, Vendor/Admin only)

Create a vendor business profile.

**Request Body:**
```json
{
  "businessName": "ABC Plumbing",
  "category": "Plumbing",
  "description": "Professional plumbing services...",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "phone": "+1-555-0000",
  "email": "info@abcplumbing.com",
  "services": ["Leak repair", "Installation"]
}
```

### 2. Get All Vendors
**GET** `/vendors?category=Plumbing&page=1&limit=10`

Retrieve list of vendors with optional filters.

**Query Parameters:**
- `category` - Filter by category
- `verified` - Filter by verification status
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)

### 3. Get Vendor Details
**GET** `/vendors/:vendorId`

Get detailed information about a specific vendor.

### 4. Get My Vendor Profile
**GET** `/vendors/me/profile` (Protected)

Get current user's vendor profile.

### 5. Update Vendor Profile
**PUT** `/vendors/profile` (Protected, Vendor)

Update vendor business profile.

### 6. Verify Vendor
**PUT** `/vendors/verify/:vendorId` (Protected, Admin)

Verify or reject a vendor.

**Request Body:**
```json
{
  "status": "verified"
}
```

---

## Search & Recommendations

### 1. Search Vendors
**POST** `/search/search` (Protected)

Search vendors by location, keyword, and category.

**Request Body:**
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "keyword": "plumbing",
  "category": "Plumbing"
}
```

### 2. Get Recommendations
**POST** `/search/recommendations` (Protected)

Get AI-powered vendor recommendations.

**Request Body:**
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "category": "Plumbing",
  "limit": 10
}
```

### 3. Get Trending Vendors
**POST** `/search/trending` (Protected)

Get trending vendors in your area.

### 4. Get Popular Categories
**POST** `/search/categories` (Protected)

Get popular service categories near you.

---

## Review Endpoints

### 1. Add Review
**POST** `/reviews` (Protected)

Submit a review for a vendor.

**Request Body:**
```json
{
  "vendorId": "63f7d8c...",
  "rating": 5,
  "comment": "Excellent service, very professional!",
  "categories": {
    "cleanliness": 5,
    "communication": 4,
    "punctuality": 5
  }
}
```

### 2. Get Vendor Reviews
**GET** `/reviews/vendor/:vendorId?page=1&limit=10`

Get all reviews for a vendor.

### 3. Update Review
**PUT** `/reviews/:reviewId` (Protected)

Update your review.

### 4. Delete Review
**DELETE** `/reviews/:reviewId` (Protected)

Delete a review.

### 5. Mark Review Helpful
**POST** `/reviews/:reviewId/helpful` (Protected)

Mark a review as helpful.

---

## Booking Endpoints

### 1. Create Booking
**POST** `/bookings` (Protected)

Create a new booking.

**Request Body:**
```json
{
  "vendorId": "63f7d8c...",
  "serviceType": "Leak Repair",
  "description": "Leaky kitchen faucet",
  "bookingDate": "2024-06-15T10:00:00Z",
  "preferredTime": "10:00 AM",
  "duration": 2,
  "amount": 150,
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "address": "123 Main St, NY"
}
```

### 2. Get User Bookings
**GET** `/bookings/user/my-bookings?status=confirmed&page=1` (Protected)

Get all bookings for current user.

### 3. Get Vendor Bookings
**GET** `/bookings/vendor/my-bookings?status=pending` (Protected)

Get all bookings for vendor.

### 4. Update Booking Status
**PUT** `/bookings/:bookingId/status` (Protected)

Update booking status (vendor only).

**Request Body:**
```json
{
  "status": "confirmed"
}
```

Valid statuses: `pending`, `confirmed`, `in-progress`, `completed`, `cancelled`

### 5. Cancel Booking
**PUT** `/bookings/:bookingId/cancel` (Protected)

Cancel a booking.

**Request Body:**
```json
{
  "reason": "No longer needed"
}
```

---

## Complaint Endpoints

### 1. Create Complaint
**POST** `/complaints` (Protected)

File a complaint against a vendor.

**Request Body:**
```json
{
  "vendorId": "63f7d8c...",
  "bookingId": "63f7d8c...",
  "complaintType": "quality_of_service",
  "description": "Service was incomplete...",
  "evidence": ["photo_url1", "photo_url2"]
}
```

### 2. Get User Complaints
**GET** `/complaints/user/my-complaints` (Protected)

Get all complaints filed by current user.

### 3. Get All Complaints
**GET** `/complaints?status=open&priority=high&page=1` (Protected, Admin)

Get all complaints (admin only).

### 4. Update Complaint Status
**PUT** `/complaints/:complaintId/status` (Protected, Admin)

Update complaint status and resolution.

**Request Body:**
```json
{
  "status": "resolved",
  "resolution": "Refund issued",
  "refundAmount": 150
}
```

### 5. Escalate Complaint
**PUT** `/complaints/:complaintId/escalate` (Protected, Admin)

Escalate a complaint to high priority.

---

## Error Responses

All errors return with appropriate HTTP status codes:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

---

## Rate Limiting

The API implements rate limiting:
- **Window:** 15 minutes
- **Max Requests:** 100 per window

Excess requests return `429 Too Many Requests`.

---

## Examples

### Register as Customer
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Search Vendors
```bash
curl -X POST http://localhost:5000/api/search/search \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 40.7128,
    "longitude": -74.0060,
    "keyword": "plumbing"
  }'
```

---

For more information, see the [README.md](../README.md).
