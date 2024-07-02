const express = require('express');
const app = express();
const itemsRoutes = require('./routes/items');

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files for the front-end
app.use(express.static('public'));

// Use the items routes
app.use('/items', itemsRoutes);

// Error handler for 404 - Not Found
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
