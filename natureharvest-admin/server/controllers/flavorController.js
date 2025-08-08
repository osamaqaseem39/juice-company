const Flavor = require('../models/Flavor');
const Brand = require('../models/Brand');

// Create a new flavor
const createFlavor = async (req, res) => {
  try {
    const flavorData = req.body;
    
    // Validate brand exists
    const brand = await Brand.findById(flavorData.brandId);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    const flavor = new Flavor(flavorData);
    await flavor.save();

    res.status(201).json({
      message: 'Flavor created successfully',
      data: flavor
    });
  } catch (error) {
    console.error('Error creating flavor:', error);
    res.status(500).json({ message: 'Error creating flavor', error: error.message });
  }
};

// Get all flavors
const getAllFlavors = async (req, res) => {
  try {
    const { 
      brandId, 
      status, 
      featured, 
      flavorProfile, 
      search,
      page = 1,
      limit = 10
    } = req.query;

    let query = {};

    // Filter by brand
    if (brandId) {
      query.brandId = brandId;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by featured
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    // Filter by flavor profile
    if (flavorProfile) {
      query.flavorProfile = flavorProfile;
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    
    const flavors = await Flavor.find(query)
      .populate('brand', 'name logo')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Flavor.countDocuments(query);

    res.json({
      message: 'Flavors retrieved successfully',
      data: flavors,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error getting flavors:', error);
    res.status(500).json({ message: 'Error getting flavors', error: error.message });
  }
};

// Get flavor by ID
const getFlavor = async (req, res) => {
  try {
    const flavor = await Flavor.findById(req.params.id).populate('brand', 'name logo');
    
    if (!flavor) {
      return res.status(404).json({ message: 'Flavor not found' });
    }

    res.json({
      message: 'Flavor retrieved successfully',
      data: flavor
    });
  } catch (error) {
    console.error('Error getting flavor:', error);
    res.status(500).json({ message: 'Error getting flavor', error: error.message });
  }
};

// Update flavor
const updateFlavor = async (req, res) => {
  try {
    const flavor = await Flavor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('brand', 'name logo');

    if (!flavor) {
      return res.status(404).json({ message: 'Flavor not found' });
    }

    res.json({
      message: 'Flavor updated successfully',
      data: flavor
    });
  } catch (error) {
    console.error('Error updating flavor:', error);
    res.status(500).json({ message: 'Error updating flavor', error: error.message });
  }
};

// Delete flavor
const deleteFlavor = async (req, res) => {
  try {
    const flavor = await Flavor.findByIdAndDelete(req.params.id);
    
    if (!flavor) {
      return res.status(404).json({ message: 'Flavor not found' });
    }

    res.json({ message: 'Flavor deleted successfully' });
  } catch (error) {
    console.error('Error deleting flavor:', error);
    res.status(500).json({ message: 'Error deleting flavor', error: error.message });
  }
};

// Add size to flavor
const addSizeToFlavor = async (req, res) => {
  try {
    const flavor = await Flavor.findById(req.params.id);
    
    if (!flavor) {
      return res.status(404).json({ message: 'Flavor not found' });
    }

    flavor.sizes.push(req.body);
    await flavor.save();

    res.status(201).json({
      message: 'Size added to flavor successfully',
      data: flavor
    });
  } catch (error) {
    console.error('Error adding size to flavor:', error);
    res.status(500).json({ message: 'Error adding size to flavor', error: error.message });
  }
};

// Update size in flavor
const updateSizeInFlavor = async (req, res) => {
  try {
    const { flavorId, sizeId } = req.params;
    
    const flavor = await Flavor.findById(flavorId);
    if (!flavor) {
      return res.status(404).json({ message: 'Flavor not found' });
    }

    const size = flavor.sizes.id(sizeId);
    if (!size) {
      return res.status(404).json({ message: 'Size not found' });
    }

    Object.assign(size, req.body);
    await flavor.save();

    res.json({
      message: 'Size updated successfully',
      data: flavor
    });
  } catch (error) {
    console.error('Error updating size:', error);
    res.status(500).json({ message: 'Error updating size', error: error.message });
  }
};

// Delete size from flavor
const deleteSizeFromFlavor = async (req, res) => {
  try {
    const { flavorId, sizeId } = req.params;
    
    const flavor = await Flavor.findById(flavorId);
    if (!flavor) {
      return res.status(404).json({ message: 'Flavor not found' });
    }

    flavor.sizes.pull(sizeId);
    await flavor.save();

    res.json({ message: 'Size deleted successfully' });
  } catch (error) {
    console.error('Error deleting size:', error);
    res.status(500).json({ message: 'Error deleting size', error: error.message });
  }
};

// Get flavors by brand
const getFlavorsByBrand = async (req, res) => {
  try {
    const flavors = await Flavor.find({ brandId: req.params.brandId })
      .populate('brand', 'name logo')
      .sort({ name: 1 });

    res.json({
      message: 'Flavors retrieved successfully',
      data: flavors
    });
  } catch (error) {
    console.error('Error getting flavors by brand:', error);
    res.status(500).json({ message: 'Error getting flavors by brand', error: error.message });
  }
};

module.exports = {
  createFlavor,
  getAllFlavors,
  getFlavor,
  updateFlavor,
  deleteFlavor,
  addSizeToFlavor,
  updateSizeInFlavor,
  deleteSizeFromFlavor,
  getFlavorsByBrand
}; 