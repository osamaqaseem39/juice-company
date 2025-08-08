const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the subcategory
 *         name:
 *           type: string
 *           description: Subcategory name
 *         description:
 *           type: string
 *           description: Subcategory description
 *         category:
 *           type: string
 *           description: Parent category ID
 *         image:
 *           type: string
 *           description: URL to the subcategory image
 *         isActive:
 *           type: boolean
 *           description: Whether the subcategory is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the subcategory was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the subcategory was last updated
 */

/**
 * @swagger
 * /api/subcategories:
 *   get:
 *     summary: Get all subcategories
 *     tags: [SubCategories]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by parent category ID
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: List of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', subcategoryController.getSubcategories);

/**
 * @swagger
 * /api/subcategories/nested:
 *   get:
 *     summary: Get subcategories with parent category information
 *     tags: [SubCategories]
 *     responses:
 *       200:
 *         description: List of subcategories with parent category info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   image:
 *                     type: string
 *                   isActive:
 *                     type: boolean
 *                   category:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/nested', subcategoryController.getNestedSubcategories);

/**
 * @swagger
 * /api/subcategories/{id}:
 *   get:
 *     summary: Get a subcategory by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Subcategory ID
 *     responses:
 *       200:
 *         description: Subcategory details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       404:
 *         description: Subcategory not found
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
router.get('/:id', subcategoryController.getSubcategory);

/**
 * @swagger
 * /api/subcategories:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 description: Subcategory name
 *               description:
 *                 type: string
 *                 description: Subcategory description
 *               category:
 *                 type: string
 *                 description: Parent category ID
 *               isActive:
 *                 type: boolean
 *                 description: Whether the subcategory is active
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
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
router.post('/', subcategoryController.createSubcategory);

/**
 * @swagger
 * /api/subcategories/{id}:
 *   put:
 *     summary: Update a subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Subcategory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Subcategory name
 *               description:
 *                 type: string
 *                 description: Subcategory description
 *               category:
 *                 type: string
 *                 description: Parent category ID
 *               isActive:
 *                 type: boolean
 *                 description: Whether the subcategory is active
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Subcategory not found
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
router.put('/:id', subcategoryController.updateSubcategory);

/**
 * @swagger
 * /api/subcategories/{id}:
 *   delete:
 *     summary: Delete a subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Subcategory ID
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subcategory deleted successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Subcategory not found
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
router.delete('/:id', subcategoryController.deleteSubcategory);

module.exports = router; 