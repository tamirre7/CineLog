require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Swagger and File System Imports
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

// Import the secure database connection
require('./db/database');

// Import our routes
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// ==========================================
// Swagger Configuration (External YAML)
// ==========================================
// Read the YAML file from the hard drive and parse it into a JavaScript object
const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));

// Setup the Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ==========================================
// API Routes (Forwarding)
// ==========================================
app.use('/api/media', mediaRoutes);

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
  console.log(`📄 Swagger docs available at http://localhost:${port}/api-docs`);
});
