# LocalLink – AI Powered Smart Local Vendor Discovery Platform

## 📱 Project Overview

LocalLink is a comprehensive full-stack web application that connects customers with trusted local vendors using location-based search, AI-powered recommendations, ratings, reviews, and trust scores.

### Key Features
- 🔍 **Location-Based Search** - Find vendors near you
- 🤖 **AI Recommendations** - Smart vendor suggestions based on location, ratings, and trust scores
- ⭐ **Rating & Review System** - Community-driven trust building
- 📅 **Booking Management** - Schedule services with vendors
- 📊 **Analytics Dashboard** - Track performance and insights
- 🔐 **Secure Authentication** - JWT + bcrypt for user security
- 👥 **Multi-Role Support** - Customer, Vendor, and Admin roles
- 📱 **Responsive Design** - Works on all devices

## 🏗️ Technology Stack

### Frontend
- **React.js 18** - UI library
- **Bootstrap 5** - Responsive styling
- **Axios** - HTTP client
- **React Router** - Navigation
- **Google Maps API** - Location mapping

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### AI & ML
- **Recommendation Engine** - Custom algorithm with location, rating, and trust score weighting
- **Trust Score Algorithm** - Dynamic calculation based on ratings, reviews, and vendor behavior

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📁 Project Structure

```
LocalLink/
├── backend/
│   ├── AI/
│   │   └── recommendationEngine.js          # AI recommendation logic
│   ├── config/
│   │   └── database.js                       # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js                 # Authentication logic
│   │   ├── userController.js                 # User management
│   │   ├── vendorController.js               # Vendor operations
│   │   ├── reviewController.js               # Review & rating
│   │   ├── bookingController.js              # Booking management
│   │   └── complainController.js             # Complaint handling
│   ├── middleware/
│   │   └── authMiddleware.js                 # JWT verification
│   ├── models/
│   │   ├── User.js                           # User schema
│   │   ├── Vendor.js                         # Vendor schema
│   │   ├── Review.js                         # Review schema
│   │   ├── Booking.js                        # Booking schema
│   │   └── Complaint.js                      # Complaint schema
│   ├── routes/
│   │   ├── auth.js                           # Auth endpoints
│   │   ├── users.js                          # User endpoints
│   │   ├── vendors.js                        # Vendor endpoints
│   │   ├── search.js                         # Search endpoints
│   │   ├── reviews.js                        # Review endpoints
│   │   ├── bookings.js                       # Booking endpoints
│   │   └── complaints.js                     # Complaint endpoints
│   ├── utils/
│   │   └── authUtils.js                      # Auth helpers
│   ├── package.json
│   ├── server.js                             # Express app entry
│   ├── .env.example                          # Environment template
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js                     # Navigation bar
│   │   │   ├── Footer.js                     # Footer
│   │   │   └── VendorCard.js                 # Vendor card component
│   │   ├── pages/
│   │   │   ├── customer/
│   │   │   │   ├── Home.js                   # Landing page
│   │   │   │   ├── Login.js                  # Customer login
│   │   │   │   ├── Register.js               # Customer registration
│   │   │   │   ├── SearchVendors.js          # Vendor search
│   │   │   │   ├── VendorDetails.js          # Vendor profile
│   │   │   │   ├── BookingHistory.js         # Booking history
│   │   │   │   ├── Dashboard.js              # Customer dashboard
│   │   │   │   └── Profile.js                # Customer profile
│   │   │   ├── vendor/
│   │   │   │   ├── VendorLogin.js            # Vendor login
│   │   │   │   ├── VendorDashboard.js        # Vendor dashboard
│   │   │   │   ├── ManageProfile.js          # Profile management
│   │   │   │   ├── ManageServices.js         # Service management
│   │   │   │   └── Reviews.js                # Review management
│   │   │   └── admin/
│   │   │       ├── AdminLogin.js             # Admin login
│   │   │       ├── AdminDashboard.js         # Admin dashboard
│   │   │       ├── VendorVerification.js     # Vendor verification
│   │   │       ├── UserManagement.js         # User management
│   │   │       └── Analytics.js              # Platform analytics
│   │   ├── services/
│   │   │   └── api.js                        # API integration
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml
├── .gitignore
├── README.md                                  # This file
├── QUICK_START.md                             # Quick setup guide
├── DEPLOYMENT.md                              # Deployment guide
└── API_DOCUMENTATION.md                       # API reference
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB 5.0+
- Docker (optional)
- Google Maps API key

### Installation

1. **Clone the repository**
```bash
cd "d:\smart local vendor discovery platform"
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
cp .env.example .env
# Edit .env with your API URL
```

4. **Start MongoDB**
- Option A: Local MongoDB
  ```bash
  mongod
  ```
- Option B: Docker
  ```bash
  docker run -d -p 27017:27017 --name locallink-mongo mongo:7.0
  ```

5. **Run Backend**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

6. **Run Frontend (in another terminal)**
```bash
cd frontend
npm start
# App opens on http://localhost:3000
```

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Step-by-step setup and testing
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment options
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference

## 👥 User Roles

### 1. Customer
- Register and login
- Search vendors by category, keyword, and location
- View vendor profiles and details
- Book services
- Submit ratings and reviews
- View booking history
- Customize profile

### 2. Vendor
- Register business with verification documents
- Create and manage vendor profile
- Add and manage services
- Receive and manage customer requests
- Track ratings and reviews
- View trustworthiness metrics
- Access vendor-specific dashboard

### 3. Admin
- Verify vendor registrations
- Manage all users and vendors
- Remove fake/spam reviews
- Handle customer complaints
- View platform analytics and growth metrics
- Manage system settings

## 🗄️ Database Collections

### Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (customer/vendor/admin),
  location: { type: Point, coordinates: [lon, lat] },
  avatar: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Vendors
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  businessName: String,
  category: String,
  description: String,
  location: { type: Point, coordinates: [lon, lat] },
  phone: String,
  email: String,
  website: String,
  rating: Number (0-5),
  trustScore: Number (0-100),
  verificationStatus: String (pending/verified/rejected),
  verificationDocuments: [String],
  profileViews: Number,
  responseTime: Number (hours),
  services: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Reviews
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  vendorId: ObjectId,
  rating: Number (1-5),
  comment: String,
  verified: Boolean,
  helpful: Number (votes),
  createdAt: Date,
  updatedAt: Date
}
```

### Bookings
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  vendorId: ObjectId,
  serviceType: String,
  bookingDate: Date,
  status: String (pending/confirmed/completed/cancelled),
  amount: Number,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaints
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  vendorId: ObjectId,
  description: String,
  status: String (open/in-progress/resolved/closed),
  priority: String (low/medium/high),
  resolution: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🤖 AI Recommendation Algorithm

The recommendation engine uses a weighted scoring formula:

```
Final Score = (40% × Location Score) + (30% × Rating Score) + (30% × Trust Score)

Where:
- Location Score: Based on distance and geospatial proximity
- Rating Score: Average rating normalized to 0-100
- Trust Score: Dynamic calculation based on verification, reviews, and conduct
```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs with salt rounds
- **Input Validation** - Sanitization of all inputs
- **Role-Based Access Control** - Permission management
- **API Rate Limiting** - Prevent abuse
- **CORS Configuration** - Cross-origin security

## 📊 Dashboards

### Customer Dashboard
- Booking history with status tracking
- Favorite vendors list
- Personalized recommendations
- Active bookings
- Reviews written

### Vendor Dashboard
- Profile view statistics
- Pending customer requests
- Rating overview
- Trust score trends
- Service performance

### Admin Dashboard
- Platform metrics (total users, vendors, bookings)
- Pending vendor verifications
- Complaint queue
- User and vendor growth analytics
- System health monitoring

## 🐳 Docker Deployment

Run entire stack with Docker Compose:

```bash
docker-compose up -d
```

This starts:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 3000

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://admin:admin123@localhost:27017/locallink?authSource=admin
JWT_SECRET=your_very_secret_jwt_key_change_this
NODE_ENV=development
PORT=5000
GOOGLE_MAPS_API_KEY=your_google_maps_key
ADMIN_EMAIL=admin@locallink.com
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## 🧪 Testing

### Test Accounts (after running seeds)

**Admin**
- Email: admin@locallink.com
- Password: admin123

**Vendor**
- Email: vendor1@locallink.com
- Password: vendor123

**Customer**
- Email: customer1@locallink.com
- Password: customer123

## 📖 API Endpoints Overview

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/vendors` - Get all vendors
- `GET /api/vendors/search` - Search vendors
- `POST /api/vendors` - Create vendor profile
- `GET /api/vendors/:id` - Get vendor details
- `POST /api/reviews` - Submit review
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `POST /api/complaints` - File complaint

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete reference.

## 🚢 Deployment Options

Detailed deployment instructions available in [DEPLOYMENT.md](./DEPLOYMENT.md)

**Supported Platforms:**
- Heroku
- AWS (EC2, ECS, Lambda)
- DigitalOcean
- Vercel (frontend)
- Netlify (frontend)
- Azure

## 📞 Support & Contribution

For issues, questions, or contributions, please open an issue on the repository.

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ for connecting customers with trusted local vendors**
