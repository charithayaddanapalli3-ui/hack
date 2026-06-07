const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Plumbing',
        'Electrical',
        'Carpentry',
        'Cleaning',
        'Painting',
        'HVAC',
        'Landscaping',
        'Roofing',
        'Health',
        'Beauty',
        'Education',
        'Repair',
        'Other',
      ],
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    city: String,
    state: String,
    zipcode: String,
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: String,
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    verificationDocuments: [String],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    trustScore: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    profileViews: {
      type: Number,
      default: 0,
    },
    responseTime: {
      type: Number, // in hours
      default: 24,
    },
    services: [String],
    yearsInBusiness: Number,
    employees: Number,
    insuranceStatus: {
      type: Boolean,
      default: false,
    },
    averageResponse: {
      type: Number,
      default: 0, // in hours
    },
    completionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    numberOfBookings: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    banner: String,
    gallery: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create geospatial index
vendorSchema.index({ location: '2dsphere' });

// Create text search index
vendorSchema.index({
  businessName: 'text',
  description: 'text',
  category: 'text',
  services: 'text',
});

module.exports = mongoose.model('Vendor', vendorSchema);
