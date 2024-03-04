const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
require('./db'); // Make sure this path is correct

// Routers
const emailSequenceRouter = require('./routes/emailSequences'); // Make sure this path is correct

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sequences', emailSequenceRouter);

// Add a simple route for a health check
app.get('/api/health', (req, res) => {
  res.send('Server is healthy');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
