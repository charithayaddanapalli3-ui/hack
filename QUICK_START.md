# LocalLink - Quick Start Guide

## ⚡ Get Started in 5 Minutes

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or MongoDB Atlas)
- Git

## 🚀 Installation & Setup

### Step 1: Clone and Navigate
```bash
cd "d:\smart local vendor discovery platform"
```

### Step 2: Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and configure:
```
MONGODB_URI=mongodb://admin:admin123@localhost:27017/locallink?authSource=admin
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
PORT=5000
GOOGLE_MAPS_API_KEY=your_google_maps_key  # Optional for demo
```

**Start MongoDB** (in a new terminal):
```bash
mongod
# Or use MongoDB Atlas connection string in .env
```

**Start Backend**:
```bash
npm run dev
# Server should run on http://localhost:5000
```

### Step 3: Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_key  # Optional
```

**Start Frontend** (in another terminal):
```bash
npm start
# App opens on http://localhost:3000
```

---

## 🧪 Testing the Platform

### Test Accounts

After startup, you can create accounts or use these credentials:

**Customer Account:**
- Email: `customer@demo.com`
- Password: `password123`

**Vendor Account:**
- Email: `vendor@demo.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@demo.com`
- Password: `password123`

### Testing User Journeys

#### 1️⃣ Customer Journey
1. Go to http://localhost:3000
2. Click "Sign Up" → Register as Customer
3. Enable location permissions
4. Go to "Search Vendors"
5. Search by category (type: "Plumbing")
6. View vendor details
7. Book a service
8. Submit a review

#### 2️⃣ Vendor Journey
1. Register as Vendor (select "Vendor" role during registration)
2. Create business profile
3. Add services
4. View customer bookings
5. Manage your profile
6. Track ratings and reviews

#### 3️⃣ Admin Journey
1. Login with admin account
2. Access Admin Dashboard
3. Verify pending vendors
4. View platform analytics
5. Manage users and complaints

---

## 🐳 Docker Deployment (Optional)

### Run with Docker Compose
```bash
docker-compose up -d
```

This starts:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 3000

Check status:
```bash
docker-compose ps

docker-compose logs backend    # View backend logs
docker-compose logs frontend   # View frontend logs
```

Stop everything:
```bash
docker-compose down
```

---

## 🔑 Key Features to Test

### ✅ Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] JWT token stored in localStorage
- [ ] Logout clears token
- [ ] Protected routes redirect to login

### ✅ Search & Recommendations
- [ ] Search vendors by location
- [ ] Filter by category
- [ ] AI recommendations appear
- [ ] Vendor cards show ratings
- [ ] Trust scores display correctly

### ✅ Bookings
- [ ] Create booking
- [ ] Vendor receives booking
- [ ] Status updates (pending → confirmed → completed)
- [ ] Booking history displays

### ✅ Reviews & Ratings
- [ ] Submit review with rating
- [ ] Vendor rating updates
- [ ] Review appears on vendor profile
- [ ] Vendor can respond to review

### ✅ Complaints
- [ ] File complaint against vendor
- [ ] Track complaint status
- [ ] Admin can resolve complaint

### ✅ Dashboards
- [ ] Customer dashboard shows stats
- [ ] Vendor dashboard shows metrics
- [ ] Admin dashboard shows overview

---

## 📊 Database Seeding (Optional)

To populate the database with sample data:

```bash
cd backend
npm run seed
```

This creates:
- Sample users (customers, vendors, admin)
- Sample vendors with details
- Sample reviews and ratings
- Sample bookings

---

## 🔧 Troubleshooting

### Issue: Port 5000 already in use
```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti :5000 | xargs kill -9
```

### Issue: MongoDB connection failed
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For MongoDB Atlas, whitelist your IP

### Issue: Frontend can't reach backend
- Check REACT_APP_API_URL in frontend .env
- Ensure backend server is running
- Check browser console for CORS errors

### Issue: npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 📝 API Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Search Vendors
```bash
curl -X POST http://localhost:5000/api/search/recommendations \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 40.7128,
    "longitude": -74.0060,
    "limit": 5
  }'
```

### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "VENDOR_ID",
    "serviceType": "Plumbing",
    "bookingDate": "2024-06-15T10:00:00Z",
    "amount": 100,
    "location": {
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  }'
```

---

## 📚 Next Steps

1. **Explore the codebase:**
   - Backend: `backend/controllers/` - Business logic
   - Backend: `backend/routes/` - API endpoints
   - Frontend: `frontend/src/pages/` - React components

2. **Customize:**
   - Update colors in `frontend/src/App.css`
   - Modify database schemas in `backend/models/`
   - Add new features in controllers and routes

3. **Deploy:**
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup

4. **Documentation:**
   - See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference

---

## 💡 Tips

- Use React DevTools for debugging
- Check browser console (F12) for errors
- Use MongoDB Compass for database visualization
- Use Postman for API testing
- Enable JS debugger in VS Code

---

## 🆘 Need Help?

- Check the [README.md](./README.md) for overview
- Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for endpoints
- Check backend logs: `npm run dev`
- Check browser console for frontend errors

---

**Happy Coding! 🎉**
