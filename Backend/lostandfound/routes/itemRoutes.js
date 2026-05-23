const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.json({ success: false, message: 'Authentication required' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        next();
    } catch (err) {
        res.json({ success: false, message: 'Invalid token' });
    }
};

/**
 * @swagger
 * /api/items:
 *   get:
 *     tags: [Items]
 *     summary: Get all items
 *     description: Retrieve all lost and found items, sorted by creation date (newest first)
 *     responses:
 *       200:
 *         description: Items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 */
router.get('/', async (req, res) => {
    try {
        const items = await mongoose.connection.db.collection('items').find({}).sort({ createdAt: -1 }).toArray();
        res.json({ success: true, count: items.length, data: items });
    } catch (err) { res.json({ success: false, message: err.message }); }
});

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     tags: [Items]
 *     summary: Get a specific item by ID
 *     description: Retrieve detailed information about a single lost/found item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     responses:
 *       200:
 *         description: Item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', async (req, res) => {
    try {
        const item = await mongoose.connection.db.collection('items').findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        if (!item) return res.json({ success: false, message: 'Item not found' });
        res.json({ success: true, data: item });
    } catch (err) { res.json({ success: false, message: err.message }); }
});

/**
 * @swagger
 * /api/items:
 *   post:
 *     tags: [Items]
 *     summary: Post a new lost or found item
 *     description: Create a new item report (lost or found). Requires authentication.
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
 *               - category
 *               - itemCategory
 *               - location
 *               - date
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Lost Wallet"
 *               description:
 *                 type: string
 *                 example: "Brown leather wallet with student ID inside"
 *               category:
 *                 type: string
 *                 enum: ["lost", "found"]
 *                 example: "lost"
 *               itemCategory:
 *                 type: string
 *                 example: "Wallet/Purse"
 *               location:
 *                 type: string
 *                 example: "Main Library, 3rd Floor"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-20"
 *               image:
 *                 type: string
 *                 example: "base64_encoded_image_or_url"
 *     responses:
 *       200:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Item'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', auth, async (req, res) => {
    try {
        const user = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(req.user.id) });
        const item = {
            name: req.body.name, description: req.body.description, category: req.body.category,
            itemCategory: req.body.itemCategory, location: req.body.location, date: new Date(req.body.date),
            image: req.body.image || null, status: 'pending', createdAt: new Date(),
            userId: req.user.id, userName: user.name, userEmail: user.email,
            userStudentId: user.studentId || null, userContactNumber: user.contactNumber || null
        };
        const result = await mongoose.connection.db.collection('items').insertOne(item);
        res.json({ success: true, data: { ...item, _id: result.insertedId } });
    } catch (err) { res.json({ success: false, message: err.message }); }
});

/**
 * @swagger
 * /api/items/{itemId}/mark-claimed:
 *   post:
 *     tags: [Items]
 *     summary: Mark an item as claimed
 *     description: Update item status to claimed (for item owners/reporters). Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID to mark as claimed
 *     responses:
 *       200:
 *         description: Item marked as claimed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Item marked as claimed"
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Not authorized (only item owner can mark as claimed)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:itemId/mark-claimed', auth, async (req, res) => {
    try {
        const item = await mongoose.connection.db.collection('items').findOne({ _id: new mongoose.Types.ObjectId(req.params.itemId) });
        if (!item) return res.json({ success: false, message: 'Item not found' });
        if (item.userId !== req.user.id) return res.json({ success: false, message: 'Not authorized' });
        await mongoose.connection.db.collection('items').updateOne({ _id: new mongoose.Types.ObjectId(req.params.itemId) }, { $set: { status: 'claimed', claimedAt: new Date() } });
        res.json({ success: true, message: 'Item marked as claimed' });
    } catch (err) { res.json({ success: false, message: err.message }); }
});

module.exports = router;