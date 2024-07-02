const express = require('express');
const router = new express.Router();
const items = require('../fakeDb');

// Get all items
router.get('/', (req, res) => {
  res.json(items);
});

// Add a new item
router.post('/', (req, res) => {
  const { name, price } = req.body;
  const newItem = { name, price };
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

// Get a single item by name
router.get('/:name', (req, res) => {
  const item = items.find(i => i.name === req.params.name);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// Update an item by name
router.patch('/:name', (req, res) => {
  const item = items.find(i => i.name === req.params.name);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  item.name = req.body.name || item.name;
  item.price = req.body.price || item.price;
  res.json({ updated: item });
});

// Delete an item by name
router.delete('/:name', (req, res) => {
  const itemIndex = items.findIndex(i => i.name === req.params.name);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  items.splice(itemIndex, 1);
  res.json({ message: 'Deleted' });
});

module.exports = router;
