const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const shiftRoutes = require('./routes/shifts');
const salaryRoutes = require('./routes/salary');
const conventionRoutes = require('./routes/conventions');

// Use routes
app.use('/api/shifts', shiftRoutes);
app.use('/api/salary', salaryRoutes);
app.use('/api/conventions', conventionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Zeitarbeit Manager Backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;