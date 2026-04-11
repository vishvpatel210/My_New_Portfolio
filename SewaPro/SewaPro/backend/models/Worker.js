const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, default: 'worker' },
  category: {
    type: String,
    enum: ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Mason', 'Welder'],
    required: true
  },
  experience: { type: Number, default: 0 },
  pricePerHour: { type: Number, default: 100 },
  skills: [String],
  bio: String,
  profilePhoto: { type: String, default: '' },
  idProof: { type: String, default: '' },
  city: String,
  address: String,
  isVerified: { type: Boolean, default: true },
  isAvailable: { type: Boolean, default: false },
  liveLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  totalJobsDone: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

workerSchema.index({ liveLocation: '2dsphere' });

workerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Worker', workerSchema);
