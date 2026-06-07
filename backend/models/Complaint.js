const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: false,
    },
    complaintType: {
      type: String,
      enum: [
        'quality_of_service',
        'unprofessional_behavior',
        'no_show',
        'overcharging',
        'fraud',
        'harassment',
        'false_reviews',
        'other',
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 2000,
    },
    evidence: [String], // Photos or documents
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'closed'],
      default: 'open',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    resolution: String,
    resolutionDate: Date,
    refundAmount: Number,
    actionTaken: String,
    vendorResponse: String,
    vendorResponseDate: Date,
    escalated: {
      type: Boolean,
      default: false,
    },
    notes: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        note: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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

// Indexes
complaintSchema.index({ userId: 1, createdAt: -1 });
complaintSchema.index({ vendorId: 1 });
complaintSchema.index({ status: 1 });
complaintSchema.index({ priority: 1 });

module.exports = mongoose.model('Complaint', complaintSchema);
