const Size = require('../models/Size');
const fs = require('fs');
const path = require('path');

// Get all sizes
exports.getAllSizes = async (req, res) => {
  try {
    const sizes = await Size.find().sort({ createdAt: -1 });
    res.json(sizes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get size by ID
exports.getSizeById = async (req, res) => {
  try {
    const size = await Size.findById(req.params.id);
    if (!size) {
      return res.status(404).json({ error: 'Size not found' });
    }
    res.json(size);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new size
exports.createSize = async (req, res) => {
  try {
    const { name, description } = req.body;
    let imagePath = null;

    if (req.file) {
      imagePath = `server/uploads/${req.file.filename}`;
    }

    const size = new Size({
      name,
      description,
      image: imagePath
    });

    const savedSize = await size.save();
    res.status(201).json(savedSize);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update size
exports.updateSize = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updateData = { name, description };

    if (req.file) {
      updateData.image = `server/uploads/${req.file.filename}`;
      
      // Delete old image if exists
      const existingSize = await Size.findById(req.params.id);
      if (existingSize && existingSize.image) {
        const oldImagePath = path.join(__dirname, '..', existingSize.image.replace('server/', ''));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const size = await Size.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!size) {
      return res.status(404).json({ error: 'Size not found' });
    }

    res.json(size);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete size
exports.deleteSize = async (req, res) => {
  try {
    const size = await Size.findById(req.params.id);
    if (!size) {
      return res.status(404).json({ error: 'Size not found' });
    }

    // Delete image file if exists
    if (size.image) {
      const imagePath = path.join(__dirname, '..', size.image.replace('server/', ''));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Size.findByIdAndDelete(req.params.id);
    res.json({ message: 'Size deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 