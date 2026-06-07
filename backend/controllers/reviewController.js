const Review = require('../models/Review');
const Vendor = require('../models/Vendor');
const Booking = require('../models/Booking');

// Add review
exports.addReview = async (req, res) => {
  try {
    const { vendorId, rating, comment, categories, photos } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }

    if (comment.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Comment must be at least 10 characters',
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

    const review = new Review({
      userId: req.user.userId,
      vendorId,
      rating,
      comment,
      categories: categories || {},
      photos: photos || [],
    });

    await review.save();

    // Update vendor rating
    const reviews = await Review.find({ vendorId });
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    vendor.rating = averageRating;
    vendor.totalReviews = reviews.length;
    await vendor.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review: ' + error.message,
    });
  }
};

// Get vendor reviews
exports.getVendorReviews = async (req, res) => {
  try {
    const { vendorId, page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({ vendorId, flagged: false })
      .populate('userId', 'name avatar')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments({ vendorId, flagged: false });

    res.status(200).json({
      success: true,
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews: ' + error.message,
    });
  }
};

// Get user reviews
exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.userId })
      .populate('vendorId', 'businessName');

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user reviews: ' + error.message,
    });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment, categories } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check if user is review owner
    if (review.userId.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review',
      });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    if (categories) review.categories = categories;

    await review.save();

    // Update vendor rating
    const reviews = await Review.find({ vendorId: review.vendorId });
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Vendor.findByIdAndUpdate(review.vendorId, {
      rating: averageRating,
      totalReviews: reviews.length,
    });

    res.status(200).json({
      success: true,
      message: 'Review updated',
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating review: ' + error.message,
    });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check if user is review owner or admin
    if (review.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review',
      });
    }

    await Review.findByIdAndDelete(reviewId);

    // Update vendor rating
    const reviews = await Review.find({ vendorId: review.vendorId });
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0;

    await Vendor.findByIdAndUpdate(review.vendorId, {
      rating: averageRating,
      totalReviews: reviews.length,
    });

    res.status(200).json({
      success: true,
      message: 'Review deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting review: ' + error.message,
    });
  }
};

// Flag review (spam/fake)
exports.flagReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { reason } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { flagged: true, flagReason: reason },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review flagged',
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error flagging review: ' + error.message,
    });
  }
};

// Add vendor response to review
exports.addVendorResponse = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { vendorResponse } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check if user is vendor
    const vendor = await Vendor.findOne({ userId: req.user.userId });
    if (!vendor) {
      return res.status(403).json({
        success: false,
        message: 'Only vendors can respond to reviews',
      });
    }

    review.responses.push({
      vendorResponse,
      responseDate: new Date(),
    });

    await review.save();

    res.status(200).json({
      success: true,
      message: 'Response added to review',
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding response: ' + error.message,
    });
  }
};

// Mark review as helpful
exports.markHelpful = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { $inc: { helpful: 1 } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Review marked as helpful',
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error marking review: ' + error.message,
    });
  }
};
