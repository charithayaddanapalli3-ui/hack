const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const Vendor = require('../models/Vendor');

const router = express.Router();

/**
 * 🔎 Search vendors by location, keyword, and category
 * POST /api/vendors/search
 */
router.post('/vendors/search', authMiddleware, async (req, res) => {
  try {
    const { latitude, longitude, keyword, category, radius = 10 } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required',
      });
    }

    let query = {};
    if (keyword) {
      query.businessName = { $regex: keyword, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    // Geo filter (requires Vendor.location to be indexed as 2dsphere)
    query.location = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: radius * 1000, // radius in meters
      },
    };

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
});

/**
 * 📌 Get recommendations (simple version: top-rated vendors near user)
 * POST /api/vendors/recommendations
 */
router.post('/vendors/recommendations', authMiddleware, async (req, res) => {
  try {
    const { latitude, longitude, category, limit = 10 } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required',
      });
    }

    let query = {};
    if (category) query.category = category;

    query.location = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: 10000, // 10 km default
      },
    };

    const recommendations = await Vendor.find(query)
      .sort({ rating: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting recommendations: ' + error.message,
    });
  }
});

/**
 * 🔥 Get trending vendors (most profile views near user)
 * POST /api/vendors/trending
 */
router.post('/vendors/trending', authMiddleware, async (req, res) => {
  try {
    const { latitude, longitude, limit = 5 } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required',
      });
    }

    const trending = await Vendor.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    })
      .sort({ profileViews: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      trending,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting trending vendors: ' + error.message,
    });
  }
});

/**
 * 📊 Get popular categories near user
 * POST /api/vendors/categories
 */
router.post('/vendors/categories', authMiddleware, async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required',
      });
    }

    const vendors = await Vendor.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },
          distanceField: 'distance',
          maxDistance: 10000,
          spherical: true,
        },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      categories: vendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting categories: ' + error.message,
    });
  }
});

module.exports = router;
