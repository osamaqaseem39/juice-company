const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/sizeController');
const upload = require('../middleware/uploadBrandCategoryImage');

// Get all sizes
router.get('/', sizeController.getAllSizes);

// Get size by ID
router.get('/:id', sizeController.getSizeById);

// Create new size
router.post('/', upload.single('image'), sizeController.createSize);

// Update size
router.put('/:id', upload.single('image'), sizeController.updateSize);

// Delete size
router.delete('/:id', sizeController.deleteSize);

module.exports = router; 