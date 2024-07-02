const express = require('express');
const router = new express.Router();
const ItemStore = require('../ItemStore');
const store = new ItemStore('items.json');

// Get all items
router.get('/', (req, res) => {
  res.json(store.getAllItems());
});

// Add a new item
router.post('/', (req, res) => {
  const { name, price } = req.body;
  const newItem = store.addItem(name, price);
  res.status(201).json({ added: newItem });
});

// Get a single item by name
router.get('/:name', (req, res) => {
  const item = store.getItem(req.params.name);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// Update an item by name
router.patch('/:name', (req, res) => {
  const { name, price } = req.body;
  const updatedItem = store.updateItem(req.params.name, name, price);
  if (!updatedItem) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json({ updated: updatedItem });
});

// Delete an item by name
router.delete('/:name', (req, res) => {
  const deletedItem = store.deleteItem(req.params.name);
  if (!deletedItem) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json({ message: 'Deleted' });
});

module.exports = router;
