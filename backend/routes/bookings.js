const express = require('express');
const bookingController = require('../controllers/bookingController');
const { authMiddleware, checkRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Create booking (customer)
router.post('/', authMiddleware, checkRole('customer'), bookingController.createBooking);

// Get bookings for current user
router.get('/user/my-bookings', authMiddleware, checkRole('customer'), bookingController.getUserBookings);

// Get bookings for vendor
router.get('/vendor/my-bookings', authMiddleware, checkRole('vendor'), bookingController.getVendorBookings);

// Get booking details
router.get('/:bookingId', authMiddleware, bookingController.getBookingDetails);

// Update booking status (vendor)
router.put('/:bookingId/status', authMiddleware, checkRole('vendor'), bookingController.updateBookingStatus);

// Cancel booking
router.put('/:bookingId/cancel', authMiddleware, bookingController.cancelBooking);

// Add notes
router.put('/:bookingId/notes', authMiddleware, bookingController.addBookingNotes);

module.exports = router;
