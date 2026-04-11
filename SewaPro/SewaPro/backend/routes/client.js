const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Job = require('../models/Job');
const Worker = require('../models/Worker');
const Rating = require('../models/Rating');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/client/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const client = await Client.findById(req.user.id).select('-password');
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/client/profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/client/jobs (post a new job request)
router.post('/jobs', authMiddleware, async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, clientId: req.user.id, status: 'Pending' });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/client/jobs (their own posted jobs)
router.get('/jobs', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ clientId: req.user.id })
      .populate('acceptedBy', 'name phone profilePhoto category rating pricePerHour')
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/client/jobs/:id (cancel job)
router.delete('/jobs/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, clientId: req.user.id });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.status !== 'Pending') return res.status(400).json({ message: 'Cannot cancel job once accepted' });
    
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/client/jobs/:id/rate (rate worker after completion)
router.post('/jobs/:id/rate', authMiddleware, async (req, res) => {
  try {
    const { rating, review } = req.body;
    const job = await Job.findOne({ _id: req.params.id, clientId: req.user.id });
    
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.status !== 'Completed') return res.status(400).json({ message: 'Can only rate completed jobs' });
    if (job.isRated) return res.status(400).json({ message: 'Job already rated' });

    // Update worker average rating
    const worker = await Worker.findById(job.acceptedBy);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    const totalReviews = worker.totalReviews || 0;
    const currentRating = worker.rating || 0;
    
    const updatedRatingCount = totalReviews + 1;
    const updatedRatingValue = ((currentRating * totalReviews) + rating) / updatedRatingCount;
    
    worker.rating = Math.round(updatedRatingValue * 10) / 10;
    worker.totalReviews = updatedRatingCount;
    await worker.save();

    // Update job with rating info
    job.rating = rating;
    job.review = review;
    job.isRated = true;
    job.ratedAt = new Date();
    await job.save();

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/client/bookings
router.get('/bookings', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ 
      clientId: req.user.id, 
      status: { $in: ['Accepted', 'In-Progress', 'Completed'] } 
    }).populate('acceptedBy', 'name phone category');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
