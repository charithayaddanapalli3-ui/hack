const express = require('express');
const complaintController = require('../controllers/complainController');
const { authMiddleware, checkRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Create complaint (customer)
router.post('/', authMiddleware, checkRole('customer'), complaintController.createComplaint);

// Get user complaints
router.get('/user/my-complaints', authMiddleware, checkRole('customer'), complaintController.getUserComplaints);

// Get vendor complaints
router.get('/vendor/my-complaints', authMiddleware, checkRole('vendor'), complaintController.getVendorComplaints);

// Get complaint details
router.get('/:complaintId', authMiddleware, complaintController.getComplaintDetails);

// Admin routes
router.get('/', authMiddleware, checkRole('admin'), complaintController.getAllComplaints);
router.put('/:complaintId/status', authMiddleware, checkRole('admin'), complaintController.updateComplaintStatus);
router.put('/:complaintId/escalate', authMiddleware, checkRole('admin'), complaintController.escalateComplaint);
router.post('/:complaintId/note', authMiddleware, checkRole('admin'), complaintController.addAdminNote);

// Vendor response
router.post('/:complaintId/response', authMiddleware, checkRole('vendor'), complaintController.addVendorResponse);

module.exports = router;
