const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const Job = require('../models/Job');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/workers — All with filters + pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 8, category, city, minRating, isAvailable, sort } = req.query;
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (city) filter.city = new RegExp(city, 'i');
    if (minRating) filter.rating = { $gte: Number(minRating) };
    if (isAvailable !== undefined && isAvailable !== 'all') filter.isAvailable = isAvailable === 'true';

    let sortObj = { createdAt: -1 };
    if (sort === 'rating') sortObj = { rating: -1 };
    if (sort === 'price') sortObj = { pricePerHour: 1 };
    if (sort === 'experience') sortObj = { experience: -1 };

    const total = await Worker.countDocuments(filter);
    const workers = await Worker.find(filter)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-password');

    res.json({
      workers,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalWorkers: total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/workers/nearby
router.get('/nearby', async (req, res) => {
  try {
    const { lng, lat, maxDistance = 10000, category } = req.query;
    const filter = {
      isAvailable: true,
      isVerified: true,
      liveLocation: {
        $near: {
          $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
          $maxDistance: Number(maxDistance)
        }
      }
    };
    if (category && category !== 'all') filter.category = category;

    const workers = await Worker.find(filter).select('-password');
    res.json(workers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/worker/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const worker = await Worker.findById(req.user.id).select('-password');
    res.json(worker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/workers/:id
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id).select('-password');
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update availability
router.patch('/availability', authMiddleware, async (req, res) => {
  try {
    const { isAvailable } = req.body;
    
    const update = { isAvailable };
    
    // Clear location when going offline
    if (!isAvailable) {
      update['liveLocation.coordinates'] = [0, 0];
    }
    
    const worker = await Worker.findByIdAndUpdate(
      req.user.id, 
      update, 
      { new: true }
    ).select('-password');
    
    console.log('Worker availability updated:', worker.name, isAvailable);
    
    res.json({ 
      isAvailable: worker.isAvailable,
      message: isAvailable ? 'You are now online' : 'You are now offline'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update location
router.patch('/location', authMiddleware, async (req, res) => {
  try {
    const { coordinates } = req.body; // [longitude, latitude]
    
    if (!coordinates || coordinates.length !== 2) {
      return res.status(400).json({ message: 'Invalid coordinates' });
    }
    
    console.log('Saving location for worker:', req.user.id, coordinates);
    
    await Worker.findByIdAndUpdate(req.user.id, {
      'liveLocation.type': 'Point',
      'liveLocation.coordinates': coordinates
    });
    
    res.json({ success: true, coordinates });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/workers/profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password;
    const worker = await Worker.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(worker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/worker/nearby-jobs
router.get('/nearby-jobs', authMiddleware, async (req, res) => {
  try {
    const worker = await Worker.findById(req.user.id);
    if (!worker) return res.status(404).json({ message: 'Worker profile not found' });

    console.log(`[nearby-jobs] User: ${worker.name}, Category: ${worker.category}`);
    
    // Explicitly check for valid coordinates
    const coords = worker.liveLocation?.coordinates;
    const hasLocation = Array.isArray(coords) && coords.length === 2 && (coords[0] !== 0 || coords[1] !== 0);
    
    const query = {
      status: 'Pending',
      category: worker.category,
      rejectedBy: { $nin: [worker._id] }
    };

    if (hasLocation) {
      console.log(`[nearby-jobs] Applying location filter: ${coords}`);
      query.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: coords },
          $maxDistance: 50000 // 50km
        }
      };
    } else {
      console.log('[nearby-jobs] No valid location for worker, returning all category jobs');
    }

    const jobs = await Job.find(query)
      .populate('clientId', 'name phone city address')
      .sort({ createdAt: -1 });
    
    console.log(`[nearby-jobs] Success. Found ${jobs.length} jobs`);
    res.json(jobs);
  } catch (err) {
    console.error('[nearby-jobs] Error:', err);
    res.status(500).json({ 
      error: 'Query failed',
      details: err.message,
      suggestion: 'Check if Job documents have valid GeoJSON location structure'
    });
  }
});

// POST /api/worker/jobs/:id/accept
router.post('/jobs/:id/accept', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.status !== 'Pending') return res.status(400).json({ message: 'Job already accepted or processed' });

    job.status = 'Accepted';
    job.acceptedBy = req.user.id;
    job.acceptedAt = new Date();
    await job.save();

    // Mark worker as busy
    await Worker.findByIdAndUpdate(req.user.id, { isAvailable: false });

    // Return updated job with client details
    const updatedJob = await Job.findById(job._id).populate('clientId', 'name phone city');
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/worker/jobs/:id/reject
router.post('/jobs/:id/reject', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { rejectedBy: req.user.id } },
      { new: true }
    );
    if (!job) return res.status(404).json({ message: 'Job not found' });
    
    res.json({ message: 'Job rejected successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/worker/jobs/:id/complete
router.patch('/jobs/:id/complete', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, acceptedBy: req.user.id });
    if (!job) return res.status(404).json({ message: 'Job not found or not assigned to you' });
    
    job.status = 'Completed';
    job.completedAt = new Date();
    await job.save();

    // Update worker stats and availability
    await Worker.findByIdAndUpdate(req.user.id, { 
      $inc: { totalJobsDone: 1 },
      isAvailable: true 
    });
    
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/worker/jobs/:id/status (Legacy/General)
router.patch('/jobs/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findOne({ _id: req.params.id, acceptedBy: req.user.id });
    if (!job) return res.status(404).json({ message: 'Job not found or not assigned to you' });
    
    job.status = status;
    if (status === 'In-Progress') job.startedAt = new Date();
    await job.save();
    
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/worker/active-jobs (Currently accepted jobs)
router.get('/active-jobs', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ 
      acceptedBy: req.user.id, 
      status: 'Accepted' 
    }).populate('clientId', 'name phone city profilePhoto');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/worker/earnings
router.get('/earnings', authMiddleware, async (req, res) => {
  try {
    console.log(`[earnings] Fetching for worker ID: ${req.user.id}`);
    
    const jobs = await Job.find({ 
      acceptedBy: req.user.id, 
      status: 'Completed' 
    }).populate('clientId', 'name');
    
    const totalEarnings = jobs.reduce((sum, job) => {
      const budgetMax = (job.budget && typeof job.budget.max === 'number') ? job.budget.max : 0;
      return sum + budgetMax;
    }, 0);
    
    console.log(`[earnings] Worker: ${req.user.id}, Jobs: ${jobs.length}, Total: ₹${totalEarnings}`);
    res.json({ jobs, totalEarnings });
  } catch (err) {
    console.error('[earnings] Error:', err);
    res.status(500).json({ 
      error: 'Calculation failed',
      details: err.message
    });
  }
});

// DELETE /api/workers/:id (Remove this or update to self-delete)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) return res.status(403).json({ message: 'Unauthorized' });
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
