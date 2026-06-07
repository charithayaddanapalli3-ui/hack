const express = require('express');
const reviewController = require('../controllers/reviewController');
const { authMiddleware, checkRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/vendor/:vendorId', reviewController.getVendorReviews);

// Protected routes - Customers and Vendors
router.post('/', authMiddleware, checkRole('customer'), reviewController.addReview);
router.get('/user/my-reviews', authMiddleware, reviewController.getUserReviews);

// Update/Delete (owner only)
router.put('/:reviewId', authMiddleware, reviewController.updateReview);
router.delete('/:reviewId', authMiddleware, reviewController.deleteReview);

// Helpful
router.post('/:reviewId/helpful', authMiddleware, reviewController.markHelpful);

// Vendor response
router.post('/:reviewId/response', authMiddleware, checkRole('vendor'), reviewController.addVendorResponse);

// Admin routes
router.post('/:reviewId/flag', authMiddleware, checkRole('admin'), reviewController.flagReview);

module.exports = router;
