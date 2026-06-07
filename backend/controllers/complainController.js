const Complaint = require('../models/Complaint');
const User = require('../models/User');
const Vendor = require('../models/Vendor');

// Create complaint
exports.createComplaint = async (req, res) => {
  try {
    const {
      vendorId,
      bookingId,
      complaintType,
      description,
      evidence,
    } = req.body;

    if (!vendorId || !complaintType || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    if (description.length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Description must be at least 20 characters',
      });
    }

    const complaint = new Complaint({
      userId: req.user.userId,
      vendorId,
      bookingId,
      complaintType,
      description,
      evidence: evidence || [],
      status: 'open',
    });

    await complaint.save();

    res.status(201).json({
      success: true,
      message: 'Complaint filed successfully',
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating complaint: ' + error.message,
    });
  }
};

// Get user complaints
exports.getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.userId })
      .populate('vendorId', 'businessName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching complaints: ' + error.message,
    });
  }
};

// Get vendor complaints
exports.getVendorComplaints = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.userId });
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    const complaints = await Complaint.find({ vendorId: vendor._id })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching complaints: ' + error.message,
    });
  }
};

// Get all complaints (admin)
exports.getAllComplaints = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;

    let query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const complaints = await Complaint.find(query)
      .populate('userId', 'name email')
      .populate('vendorId', 'businessName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Complaint.countDocuments(query);

    res.status(200).json({
      success: true,
      complaints,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching complaints: ' + error.message,
    });
  }
};

// Get complaint details
exports.getComplaintDetails = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.complaintId)
      .populate('userId', 'name email phone')
      .populate('vendorId', 'businessName')
      .populate('assignedTo', 'name');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    // Check authorization
    if (
      complaint.userId.toString() !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this complaint',
      });
    }

    res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching complaint: ' + error.message,
    });
  }
};

// Update complaint status (admin)
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status, resolution, refundAmount } = req.body;

    const validStatuses = ['open', 'in-progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        status,
        resolution,
        refundAmount,
        resolutionDate: status === 'resolved' ? new Date() : null,
      },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Complaint status updated',
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating complaint: ' + error.message,
    });
  }
};

// Add vendor response to complaint
exports.addVendorResponse = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { vendorResponse } = req.body;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    // Check if user is the vendor
    const vendor = await Vendor.findOne({ userId: req.user.userId });
    if (!vendor || vendor._id.toString() !== complaint.vendorId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the vendor can respond',
      });
    }

    complaint.vendorResponse = vendorResponse;
    complaint.vendorResponseDate = new Date();
    await complaint.save();

    res.status(200).json({
      success: true,
      message: 'Response added',
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding response: ' + error.message,
    });
  }
};

// Add admin note to complaint
exports.addAdminNote = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { note } = req.body;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    complaint.notes.push({
      author: req.user.userId,
      note,
      createdAt: new Date(),
    });

    await complaint.save();

    res.status(200).json({
      success: true,
      message: 'Note added',
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding note: ' + error.message,
    });
  }
};

// Escalate complaint
exports.escalateComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        escalated: true,
        priority: 'high',
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Complaint escalated',
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error escalating complaint: ' + error.message,
    });
  }
};
