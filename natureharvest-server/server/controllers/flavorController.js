const Flavor = require('../models/Flavor');
const fs = require('fs');
const path = require('path');

// Get all flavors
exports.getAllFlavors = async (req, res) => {
  try {
    const flavors = await Flavor.find().sort({ createdAt: -1 });
    res.json(flavors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get flavor by ID
exports.getFlavorById = async (req, res) => {
  try {
    const flavor = await Flavor.findById(req.params.id);
    if (!flavor) {
      return res.status(404).json({ error: 'Flavor not found' });
    }
    res.json(flavor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new flavor
exports.createFlavor = async (req, res) => {
  try {
    const { name, description } = req.body;
    let imagePath = null;

    if (req.file) {
      imagePath = `server/uploads/${req.file.filename}`;
    }

    const flavor = new Flavor({
      name,
      description,
      image: imagePath
    });

    const savedFlavor = await flavor.save();
    res.status(201).json(savedFlavor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update flavor
exports.updateFlavor = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updateData = { name, description };

    if (req.file) {
      updateData.image = `server/uploads/${req.file.filename}`;
      
      // Delete old image if exists
      const existingFlavor = await Flavor.findById(req.params.id);
      if (existingFlavor && existingFlavor.image) {
        const oldImagePath = path.join(__dirname, '..', existingFlavor.image.replace('server/', ''));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const flavor = await Flavor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!flavor) {
      return res.status(404).json({ error: 'Flavor not found' });
    }

    res.json(flavor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete flavor
exports.deleteFlavor = async (req, res) => {
  try {
    const flavor = await Flavor.findById(req.params.id);
    if (!flavor) {
      return res.status(404).json({ error: 'Flavor not found' });
    }

    // Delete image file if exists
    if (flavor.image) {
      const imagePath = path.join(__dirname, '..', flavor.image.replace('server/', ''));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Flavor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flavor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 