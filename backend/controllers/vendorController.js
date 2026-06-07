const Vendor = require('../models/Vendor');
const User = require('../models/User');
const Review = require('../models/Review');

// Create vendor profile
exports.createVendor = async (req, res) => {
  try {
    const {
      businessName,
      category,
      description,
      location,
      address,
      city,
      state,
      zipcode,
      phone,
      email,
      website,
      services,
      yearsInBusiness,
      employees,
      insuranceStatus,
    } = req.body;

    const existingVendor = await Vendor.findOne({ userId: req.user.userId });
    if (existingVendor) {
      return res.status(409).json({
        success: false,
        message: 'User already has a vendor profile',
      });
    }

    const vendor = new Vendor({
      userId: req.user.userId,
      businessName,
      category,
      description,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
      address,
      city,
      state,
      zipcode,
      phone,
      email,
      website,
      services: services || [],
      yearsInBusiness,
      employees,
      insuranceStatus: insuranceStatus || false,
    });

    await vendor.save();
    await User.findByIdAndUpdate(req.user.userId, { role: 'vendor' });

    res.status(201).json({
      success: true,
      message: 'Vendor profile created successfully',
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating vendor profile: ' + error.message,
    });
  }
};

// Get vendor profile
exports.getVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.vendorId)
      .populate('userId', 'name email phone avatar')
      .exec();

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    vendor.profileViews += 1;
    await vendor.save();

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vendor: ' + error.message,
    });
  }
};

// Update vendor profile
exports.updateVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.userId });
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor profile not found',
      });
    }

    const { businessName, description, phone, email, website, services } = req.body;
    if (businessName) vendor.businessName = businessName;
    if (description) vendor.description = description;
    if (phone) vendor.phone = phone;
    if (email) vendor.email = email;
    if (website) vendor.website = website;
    if (services) vendor.services = services;

    vendor.updatedAt = new Date();
    await vendor.save();

    res.status(200).json({
      success: true,
      message: 'Vendor profile updated',
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating vendor profile: ' + error.message,
    });
  }
};

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const { category, verified, page = 1, limit = 10 } = req.query;

    let query = {};
    if (category) query.category = category;
    if (verified) query.verificationStatus = 'verified';

    const vendors = await Vendor.find(query)
      .populate('userId', 'name email phone avatar')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ rating: -1 });

    const total = await Vendor.countDocuments(query);

    res.status(200).json({
      success: true,
      vendors,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vendors: ' + error.message,
    });
  }
};

// Get vendor for current user
exports.getMyVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.userId })
      .populate('userId', 'name email phone avatar');

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor profile not found',
      });
    }

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vendor profile: ' + error.message,
    });
  }
};

// Update trust score (admin only)
exports.updateTrustScore = async (req, res) => {
  try {
    const { vendorId, score } = req.body;
    if (score < 0 || score > 100) {
      return res.status(400).json({
        success: false,
        message: 'Trust score must be between 0 and 100',
      });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      { trustScore: score },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Trust score updated',
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating trust score: ' + error.message,
    });
  }
};

// Verify vendor (admin only)
exports.verifyVendor = async (req, res) => {
  try {
    const { vendorId, status } = req.body;
    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      { verificationStatus: status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `Vendor ${status} successfully`,
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying vendor: ' + error.message,
    });
  }
};

// Add to gallery
exports.addToGallery = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const vendor = await Vendor.findOne({ userId: req.user.userId });
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor profile not found',
      });
    }

    vendor.gallery.push(imageUrl);
    await vendor.save();

    res.status(200).json({
      success: true,
      message: 'Image added to gallery',
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding image: ' + error.message,
    });
  }
};

// Get pending vendors (admin)
exports.getPendingVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ verificationStatus: 'pending' })
      .populate('userId', 'name email phone');

    res.status(200).json({
      success: true,
      vendors,
      count: vendors.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending vendors: ' + error.message,
    });
  }
};

// 🔎 NEW: Search vendors by keyword, category, and location
exports.searchVendors = async (req, res) => {
  try {
    const { latitude, longitude, keyword, category, radius = 10 } = req.body;

    let query = {};
    if (keyword) {
      query.businessName = { $regex: keyword, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    if (latitude && longitude) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: radius * 1000, // radius in meters
        },
      };
    }

    const vendors = await Vendor.find(query)
      .populate('userId', 'name email phone avatar')
      .limit(20);

    res.status(200).json({
      success: true,
      results: vendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching vendors: ' + error.message,
    });
  }
};
