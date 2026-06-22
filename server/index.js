require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import the secure database connection (this triggers the connection log)
require('./db/database');

// Import our routes
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
const port = process.env.PORT || 3000;

// ==========================================
// Middlewares
// ==========================================
app.use(cors()); // Allow requests from the React frontend
app.use(express.json()); // Allow the server to parse JSON data

// ==========================================
// API Routes (Forwarding)
// ==========================================

// Forward any request starting with '/api/media' to the mediaRoutes file
app.use('/api/media', mediaRoutes);

// Simple health check route to verify the server is running
app.get('/api/health', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'CineLog Server is ALIVE!' });
});

// ==========================================
// Start Server
// ==========================================
app.listen(port, () => {
  console.log(`🚀 CineLog Server is running on http://localhost:${port}`);
});
