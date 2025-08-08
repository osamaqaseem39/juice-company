const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  createFlavor, 
  getAllFlavors, 
  getFlavor, 
  updateFlavor, 
  deleteFlavor,
  addSizeToFlavor,
  updateSizeInFlavor,
  deleteSizeFromFlavor,
  getFlavorsByBrand
} = require('../controllers/flavorController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Size:
 *       type: object
 *       required:
 *         - sizeLabel
 *         - price
 *         - weight
 *       properties:
 *         sizeLabel:
 *           type: string
 *           description: Size label (e.g., "250ml", "500ml", "1L")
 *         price:
 *           type: number
 *           minimum: 0
 *           description: Price for this size
 *         imageUrl:
 *           type: string
 *           description: URL to size-specific image
 *         stock:
 *           type: number
 *           minimum: 0
 *           default: 0
 *           description: Available stock quantity
 *         barcode:
 *           type: string
 *           description: Product barcode
 *         weight:
 *           type: number
 *           description: Weight in grams
 *         dimensions:
 *           type: object
 *           properties:
 *             height:
 *               type: number
 *               description: Height in cm
 *             width:
 *               type: number
 *               description: Width in cm
 *             depth:
 *               type: number
 *               description: Depth in cm
 *         isAvailable:
 *           type: boolean
 *           default: true
 *           description: Whether this size is available
 *     
 *     Flavor:
 *       type: object
 *       required:
 *         - brandId
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the flavor
 *         brandId:
 *           type: string
 *           description: Reference to the brand
 *         name:
 *           type: string
 *           description: Flavor name
 *         description:
 *           type: string
 *           description: Flavor description
 *         imageUrl:
 *           type: string
 *           description: URL to flavor image
 *         flavorProfile:
 *           type: string
 *           enum: [sweet, tart, citrus, tropical, berry, herbal, spicy, smooth]
 *           default: sweet
 *           description: Flavor profile category
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           description: List of ingredients
 *         nutritionalInfo:
 *           type: object
 *           properties:
 *             calories:
 *               type: number
 *               description: Calories per serving
 *             protein:
 *               type: number
 *               description: Protein content in grams
 *             carbs:
 *               type: number
 *               description: Carbohydrate content in grams
 *             fat:
 *               type: number
 *               description: Fat content in grams
 *             fiber:
 *               type: number
 *               description: Fiber content in grams
 *             sugar:
 *               type: number
 *               description: Sugar content in grams
 *             vitaminC:
 *               type: number
 *               description: Vitamin C content in mg
 *             potassium:
 *               type: number
 *               description: Potassium content in mg
 *         allergens:
 *           type: array
 *           items:
 *             type: string
 *             enum: [nuts, dairy, soy, gluten, eggs, none]
 *           default: [none]
 *           description: List of allergens
 *         certifications:
 *           type: array
 *           items:
 *             type: string
 *             enum: [organic, non-gmo, vegan, gluten-free, dairy-free, kosher, halal]
 *           default: []
 *           description: Product certifications
 *         sizes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Size'
 *           description: Available sizes for this flavor
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Search tags
 *         featured:
 *           type: boolean
 *           default: false
 *           description: Whether this flavor is featured
 *         status:
 *           type: string
 *           enum: [active, inactive, discontinued, seasonal]
 *           default: active
 *           description: Flavor status
 *         seasonality:
 *           type: object
 *           properties:
 *             startMonth:
 *               type: number
 *               minimum: 1
 *               maximum: 12
 *               description: Start month for seasonal availability
 *             endMonth:
 *               type: number
 *               minimum: 1
 *               maximum: 12
 *               description: End month for seasonal availability
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the flavor was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the flavor was last updated
 */

// Set up multer storage for flavor images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/flavors/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/flavors:
 *   post:
 *     summary: Create a new flavor
 *     tags: [Flavors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - brandId
 *               - name
 *             properties:
 *               brandId:
 *                 type: string
 *                 description: Brand ID
 *               name:
 *                 type: string
 *                 description: Flavor name
 *               description:
 *                 type: string
 *                 description: Flavor description
 *               imageUrl:
 *                 type: string
 *                 description: URL to flavor image
 *               flavorProfile:
 *                 type: string
 *                 enum: [sweet, tart, citrus, tropical, berry, herbal, spicy, smooth]
 *                 description: Flavor profile
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients
 *               allergens:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [nuts, dairy, soy, gluten, eggs, none]
 *                 description: List of allergens
 *               certifications:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [organic, non-gmo, vegan, gluten-free, dairy-free, kosher, halal]
 *                 description: Product certifications
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Search tags
 *               featured:
 *                 type: boolean
 *                 description: Whether this flavor is featured
 *               status:
 *                 type: string
 *                 enum: [active, inactive, discontinued, seasonal]
 *                 description: Flavor status
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Flavor image file
 *     responses:
 *       201:
 *         description: Flavor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Flavor'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Brand not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   get:
 *     summary: Get all flavors with filtering and pagination
 *     tags: [Flavors]
 *     parameters:
 *       - in: query
 *         name: brandId
 *         schema:
 *           type: string
 *         description: Filter by brand ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, discontinued, seasonal]
 *         description: Filter by status
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Filter by featured status
 *       - in: query
 *         name: flavorProfile
 *         schema:
 *           type: string
 *           enum: [sweet, tart, citrus, tropical, berry, herbal, spicy, smooth]
 *         description: Filter by flavor profile
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in name, description, ingredients, and tags
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Flavors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Flavor'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', upload.single('image'), createFlavor);
router.get('/', getAllFlavors);

/**
 * @swagger
 * /api/flavors/{id}:
 *   get:
 *     summary: Get flavor by ID
 *     tags: [Flavors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flavor ID
 *     responses:
 *       200:
 *         description: Flavor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Flavor'
 *       404:
 *         description: Flavor not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Update flavor
 *     tags: [Flavors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flavor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flavor'
 *     responses:
 *       200:
 *         description: Flavor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Flavor'
 *       404:
 *         description: Flavor not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete flavor
 *     tags: [Flavors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flavor ID
 *     responses:
 *       200:
 *         description: Flavor deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Flavor not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getFlavor);
router.put('/:id', updateFlavor);
router.delete('/:id', deleteFlavor);

/**
 * @swagger
 * /api/flavors/brand/{brandId}:
 *   get:
 *     summary: Get flavors by brand
 *     tags: [Flavors]
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand ID
 *     responses:
 *       200:
 *         description: Flavors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Flavor'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/brand/:brandId', getFlavorsByBrand);

/**
 * @swagger
 * /api/flavors/{id}/sizes:
 *   post:
 *     summary: Add size to flavor
 *     tags: [Flavors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flavor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Size'
 *     responses:
 *       201:
 *         description: Size added to flavor successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Flavor'
 *       404:
 *         description: Flavor not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:id/sizes', addSizeToFlavor);

/**
 * @swagger
 * /api/flavors/{flavorId}/sizes/{sizeId}:
 *   put:
 *     summary: Update size in flavor
 *     tags: [Flavors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: flavorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Flavor ID
 *       - in: path
 *         name: sizeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Size ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Size'
 *     responses:
 *       200:
 *         description: Size updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Flavor'
 *       404:
 *         description: Flavor or size not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete size from flavor
 *     tags: [Flavors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: flavorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Flavor ID
 *       - in: path
 *         name: sizeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Size ID
 *     responses:
 *       200:
 *         description: Size deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Flavor or size not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:flavorId/sizes/:sizeId', updateSizeInFlavor);
router.delete('/:flavorId/sizes/:sizeId', deleteSizeFromFlavor);

module.exports = router; 