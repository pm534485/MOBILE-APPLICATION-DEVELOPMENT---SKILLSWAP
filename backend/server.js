const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'SkillSwap API is healthy and operational',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  });
});

// App Info
app.get('/', (req, res) => {
  res.json({
    name: 'SkillSwap Marketplace REST API',
    version: '1.0.0',
    endpoints: [
      '/api/health',
      '/api/auth/register',
      '/api/auth/login',
      '/api/gigs',
      '/api/users',
      '/api/bookings',
    ],
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/gigs', require('./routes/gigRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SkillSwap Backend] Server running on port ${PORT} (listening on 0.0.0.0)`);
});
