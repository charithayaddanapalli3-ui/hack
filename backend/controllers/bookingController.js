const Booking = require('../models/Booking');
const Vendor = require('../models/Vendor');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const {
      vendorId,
      serviceType,
      description,
      bookingDate,
      preferredTime,
      duration,
      amount,
      location,
      address,
      notes,
    } = req.body;

    // Validate booking date
    const bookingDateTime = new Date(bookingDate);
    if (bookingDateTime < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Booking date must be in the future',
      });
    }

    // Check if vendor exists
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    const booking = new Booking({
      userId: req.user.userId,
      vendorId,
      serviceType,
      description,
      bookingDate: bookingDateTime,
      preferredTime,
      duration: duration || 1,
      amount,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
      address,
      notes,
      status: 'pending',
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating booking: ' + error.message,
    });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let query = { userId: req.user.userId };
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('vendorId', 'businessName phone email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ bookingDate: -1 });

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings: ' + error.message,
    });
  }
};

// Get vendor bookings
exports.getVendorBookings = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.userId });
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    const { page = 1, limit = 10, status } = req.query;

    let query = { vendorId: vendor._id };
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('userId', 'name phone email avatar')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ bookingDate: -1 });

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vendor bookings: ' + error.message,
    });
  }
};

// Get booking details
exports.getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate('userId', 'name phone email avatar')
      .populate('vendorId', 'businessName phone email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check authorization
    if (
      booking.userId.toString() !== req.user.userId &&
      (await Vendor.findOne({ userId: req.user.userId, _id: booking.vendorId })) === null &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking',
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking: ' + error.message,
    });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check authorization (vendor or admin)
    const vendor = await Vendor.findOne({ userId: req.user.userId });
    if (
      booking.vendorId.toString() !== vendor?._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking',
      });
    }

    booking.status = status;
    booking.updatedAt = new Date();
    await booking.save();

    // Update vendor booking count if completed
    if (status === 'completed') {
      await Vendor.findByIdAndUpdate(
        booking.vendorId,
        { $inc: { numberOfBookings: 1 } }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking: ' + error.message,
    });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel this booking',
      });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = reason;
    booking.cancelledBy = booking.userId.toString() === req.user.userId ? 'customer' : 'vendor';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking: ' + error.message,
    });
  }
};

// Add notes to booking
exports.addBookingNotes = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { notes } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    const vendor = await Vendor.findOne({ userId: req.user.userId });
    if (booking.vendorId.toString() === vendor?._id.toString()) {
      booking.vendorNotes = notes;
    } else if (booking.userId.toString() === req.user.userId) {
      booking.customerNotes = notes;
    } else {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Notes added',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding notes: ' + error.message,
    });
  }
};
