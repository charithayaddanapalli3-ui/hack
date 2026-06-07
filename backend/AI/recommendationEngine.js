const Vendor = require('../models/Vendor');
const Review = require('../models/Review');

/**
 * LocalLink AI Recommendation Engine
 * Recommends vendors based on:
 * - Location proximity (40% weight)
 * - Vendor rating (30% weight)
 * - Trust score (30% weight)
 */

// Calculate location score based on distance
const calculateLocationScore = (userCoordinates, vendorCoordinates) => {
  const R = 6371; // Earth's radius in kilometers

  const lat1 = (userCoordinates[1] * Math.PI) / 180;
  const lat2 = (vendorCoordinates[1] * Math.PI) / 180;
  const deltaLat = ((vendorCoordinates[1] - userCoordinates[1]) * Math.PI) / 180;
  const deltaLon = ((vendorCoordinates[0] - userCoordinates[0]) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  // Convert distance to score (closer = higher score)
  // Max distance considered: 50 km
  const maxDistance = 50;
  const locationScore = Math.max(0, (1 - distance / maxDistance) * 100);

  return Math.min(100, locationScore);
};

// Calculate rating score
const calculateRatingScore = (rating) => {
  // Convert 0-5 rating to 0-100 score
  return (rating / 5) * 100;
};

// Calculate trust score from vendor trust score
const calculateTrustScore = (vendor) => {
  // Use vendor's existing trust score
  return vendor.trustScore;
};

// Calculate final recommendation score
const calculateRecommendationScore = (vendor, userCoordinates) => {
  const locationWeight = parseFloat(process.env.LOCATION_WEIGHT) || 0.4;
  const ratingWeight = parseFloat(process.env.RATING_WEIGHT) || 0.3;
  const trustWeight = parseFloat(process.env.TRUST_WEIGHT) || 0.3;

  const locationScore = calculateLocationScore(userCoordinates, vendor.location.coordinates);
  const ratingScore = calculateRatingScore(vendor.rating);
  const trustScore = calculateTrustScore(vendor);

  const finalScore =
    locationScore * locationWeight +
    ratingScore * ratingWeight +
    trustScore * trustWeight;

  return {
    finalScore: Math.round(finalScore),
    locationScore: Math.round(locationScore),
    ratingScore: Math.round(ratingScore),
    trustScore: Math.round(trustScore),
  };
};

// Get recommendations for a user
exports.getRecommendations = async (userCoordinates, category = null, limit = 10) => {
  try {
    const searchRadius = parseInt(process.env.SEARCH_RADIUS) || 5000; // 5km in meters

    let query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: userCoordinates, // [longitude, latitude]
          },
          $maxDistance: searchRadius,
        },
      },
      verificationStatus: 'verified',
      active: true,
    };

    if (category) {
      query.category = category;
    }

    const vendors = await Vendor.find(query).limit(limit);

    // Calculate scores and sort
    const recommendedVendors = vendors
      .map((vendor) => ({
        vendor,
        scores: calculateRecommendationScore(vendor, userCoordinates),
      }))
      .sort((a, b) => b.scores.finalScore - a.scores.finalScore)
      .slice(0, limit)
      .map((item) => ({
        ...item.vendor.toObject(),
        recommendationScore: item.scores.finalScore,
        scoreBreakdown: {
          locationScore: item.scores.locationScore,
          ratingScore: item.scores.ratingScore,
          trustScore: item.scores.trustScore,
        },
      }));

    return recommendedVendors;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

// Get recommendations by category
exports.getRecommendationsByCategory = async (userCoordinates, category, limit = 10) => {
  return await exports.getRecommendations(userCoordinates, category, limit);
};

// Search vendors with text and location
exports.searchVendors = async (userCoordinates, searchQuery, category = null, limit = 10) => {
  try {
    const searchRadius = parseInt(process.env.SEARCH_RADIUS) || 5000;

    let query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: userCoordinates,
          },
          $maxDistance: searchRadius,
        },
      },
      verificationStatus: 'verified',
      active: true,
    };

    // Add text search if query provided
    if (searchQuery) {
      query.$text = { $search: searchQuery };
    }

    if (category) {
      query.category = category;
    }

    const vendors = await Vendor.find(query).limit(limit);

    // Calculate scores
    const recommendedVendors = vendors
      .map((vendor) => ({
        vendor,
        scores: calculateRecommendationScore(vendor, userCoordinates),
      }))
      .sort((a, b) => b.scores.finalScore - a.scores.finalScore)
      .map((item) => ({
        ...item.vendor.toObject(),
        recommendationScore: item.scores.finalScore,
        scoreBreakdown: {
          locationScore: item.scores.locationScore,
          ratingScore: item.scores.ratingScore,
          trustScore: item.scores.trustScore,
        },
      }));

    return recommendedVendors;
  } catch (error) {
    console.error('Error searching vendors:', error);
    throw error;
  }
};

// Update vendor trust score based on reviews and booking history
exports.updateVendorTrustScore = async (vendorId) => {
  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return;

    // Get all reviews
    const reviews = await Review.find({ vendorId: vendorId, flagged: false });

    // Calculate base trust score
    let trustScore = 50; // Start at 50%

    // Factor 1: Rating (max +30%)
    if (vendor.rating) {
      trustScore += (vendor.rating / 5) * 30;
    }

    // Factor 2: Number of reviews and consistency (+10%)
    if (reviews.length > 10) {
      trustScore += 10;
    } else if (reviews.length > 5) {
      trustScore += 5;
    }

    // Factor 3: Verification status (+20%)
    if (vendor.verificationStatus === 'verified') {
      trustScore += 20;
    }

    // Factor 4: Completion rate (+15%)
    if (vendor.completionRate) {
      trustScore += (vendor.completionRate / 100) * 15;
    }

    // Factor 5: Response time penalty (-5 for slow responses)
    if (vendor.averageResponse > 24) {
      trustScore -= 5;
    }

    // Ensure score stays between 0-100
    trustScore = Math.max(0, Math.min(100, trustScore));

    vendor.trustScore = Math.round(trustScore);
    await vendor.save();

    return vendor;
  } catch (error) {
    console.error('Error updating trust score:', error);
    throw error;
  }
};

// Get trending vendors
exports.getTrendingVendors = async (userCoordinates, limit = 5) => {
  try {
    const searchRadius = parseInt(process.env.SEARCH_RADIUS) || 5000;

    const vendors = await Vendor.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: userCoordinates,
          },
          $maxDistance: searchRadius,
        },
      },
      verificationStatus: 'verified',
      active: true,
    })
      .sort({ profileViews: -1, rating: -1 })
      .limit(limit);

    const trendingVendors = vendors.map((vendor) => {
      const scores = calculateRecommendationScore(vendor, userCoordinates);
      return {
        ...vendor.toObject(),
        recommendationScore: scores.finalScore,
        scoreBreakdown: {
          locationScore: scores.locationScore,
          ratingScore: scores.ratingScore,
          trustScore: scores.trustScore,
        },
      };
    });

    return trendingVendors;
  } catch (error) {
    console.error('Error getting trending vendors:', error);
    throw error;
  }
};

// Get popular categories
exports.getPopularCategories = async (userCoordinates) => {
  try {
    const searchRadius = parseInt(process.env.SEARCH_RADIUS) || 5000;

    const categories = await Vendor.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: userCoordinates,
          },
          distanceField: 'distance',
          maxDistance: searchRadius,
          query: {
            verificationStatus: 'verified',
            active: true,
          },
        },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgRating: { $avg: '$rating' },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return categories;
  } catch (error) {
    console.error('Error getting popular categories:', error);
    throw error;
  }
};
