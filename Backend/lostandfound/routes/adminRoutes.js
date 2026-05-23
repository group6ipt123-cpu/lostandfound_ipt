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

const adminAuth = async (req, res, next) => {
    const user = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(req.user.id) });
    if (!user || user.role !== 'admin') return res.json({ success: false, message: 'Admin access required' });
    next();
};

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     tags: [Admin]
 *     summary: Get dashboard statistics
 *     description: Retrieve platform statistics including user count, item counts, and status breakdown. Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: integer
 *                       example: 150
 *                     items:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         lost:
 *                           type: integer
 *                         found:
 *                           type: integer
 *                     pending:
 *                       type: integer
 *                       description: Items pending claims
 *                     claimed:
 *                       type: integer
 *                       description: Items with claims filed
 */
router.get('/stats', auth, adminAuth, async (req, res) => {
    try {
        const users = await mongoose.connection.db.collection('users').countDocuments();
        const items = await mongoose.connection.db.collection('items').countDocuments();
        const pending = await mongoose.connection.db.collection('items').countDocuments({ status: 'pending' });
        const claimed = await mongoose.connection.db.collection('items').countDocuments({ status: 'claimed' });
        const lost = await mongoose.connection.db.collection('items').countDocuments({ category: 'lost' });
        const found = await mongoose.connection.db.collection('items').countDocuments({ category: 'found' });
        res.json({ success: true, data: { users, items: { total: items, lost, found }, pending, claimed } });
    } catch (err) { res.json({ success: false, message: err.message }); }
});

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: Get all users
 *     description: Retrieve a list of all users in the platform. Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get('/users', auth, adminAuth, async (req, res) => {
    try {
        const users = await mongoose.connection.db.collection('users').find({}, { projection: { password: 0 } }).sort({ createdAt: -1 }).toArray();
        res.json({ success: true, data: users });
    } catch (err) { res.json({ success: false, message: err.message }); }
});

/**
 * @swagger
 * /api/admin/items/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update item status
 *     description: Update the status of an item (e.g., pending, claimed, verified, ready_for_pickup, closed, expired). Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["pending", "claimed", "verified", "ready_for_pickup", "closed", "expired"]
 *                 example: "verified"
 *     responses:
 *       200:
 *         description: Item status updated successfully
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
router.put('/items/:id', auth, adminAuth, async (req, res) => {
    try {
        const result = await mongoose.connection.db.collection('items').findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.id) }, { $set: { status: req.body.status } }, { returnDocument: 'after' }
        );
        res.json({ success: true, data: result });
    } catch (err) { res.json({ success: false, message: err.message }); }
});

/**
 * @swagger
 * /api/admin/items/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete an item
 *     description: Remove an item from the platform. Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID to delete
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Item deleted"
 *       400:
 *         description: Error deleting item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/items/:id', auth, adminAuth, async (req, res) => {
    try {
        await mongoose.connection.db.collection('items').deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.json({ success: true, message: 'Item deleted' });
    } catch (err) { res.json({ success: false, message: err.message }); }
});

module.exports = router;