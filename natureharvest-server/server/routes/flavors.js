const express = require('express');
const router = express.Router();
const flavorController = require('../controllers/flavorController');
const upload = require('../middleware/uploadBrandCategoryImage');

// Get all flavors
router.get('/', flavorController.getAllFlavors);

// Get flavor by ID
router.get('/:id', flavorController.getFlavorById);

// Create new flavor
router.post('/', upload.single('image'), flavorController.createFlavor);

// Update flavor
router.put('/:id', upload.single('image'), flavorController.updateFlavor);

// Delete flavor
router.delete('/:id', flavorController.deleteFlavor);

module.exports = router; 