const express = require('express');
const vendorController = require('../controllers/vendorController');
const { authMiddleware, checkRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', vendorController.getAllVendors);
router.get('/:vendorId', vendorController.getVendorProfile);

// Protected routes - Vendor only
router.post('/', authMiddleware, checkRole('vendor', 'admin'), vendorController.createVendor);
router.put('/profile', authMiddleware, checkRole('vendor'), vendorController.updateVendorProfile);
router.get('/me/profile', authMiddleware, checkRole('vendor'), vendorController.getMyVendorProfile);
router.post('/gallery', authMiddleware, checkRole('vendor'), vendorController.addToGallery);

// Admin only routes
router.get('/pending', authMiddleware, checkRole('admin'), vendorController.getPendingVendors);
router.put('/verify/:vendorId', authMiddleware, checkRole('admin'), vendorController.verifyVendor);
router.put('/trust-score/:vendorId', authMiddleware, checkRole('admin'), vendorController.updateTrustScore);

module.exports = router;
