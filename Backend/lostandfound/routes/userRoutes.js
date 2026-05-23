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
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Get user profile
 *     description: Retrieve the authenticated user's profile information including stats. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
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
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     studentId:
 *                       type: string
 *                     contactNumber:
 *                       type: string
 *                     stats:
 *                       type: object
 *                       properties:
 *                         itemsReported:
 *                           type: integer
 *                         itemsClaimed:
 *                           type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 */
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(req.user.id) }, { projection: { password: 0 } });
        const itemsReported = await mongoose.connection.db.collection('items').countDocuments({ userId: req.user.id });
        const itemsClaimed = await mongoose.connection.db.collection('items').countDocuments({ claimedBy: req.user.id });
        res.json({ success: true, data: { ...user, stats: { itemsReported, itemsClaimed } } });
    } catch (err) { res.json({ success: false, message: err.message }); }
});

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     tags: [Users]
 *     summary: Update user profile
 *     description: Update the authenticated user's profile information. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan Dela Cruz"
 *               studentId:
 *                 type: string
 *                 example: "22-12975-964"
 *               contactNumber:
 *                 type: string
 *                 example: "09123456789"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, studentId, contactNumber } = req.body;
        const result = await mongoose.connection.db.collection('users').findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.user.id) }, { $set: { name, studentId, contactNumber } },
            { returnDocument: 'after', projection: { password: 0 } }
        );
        res.json({ success: true, data: result });
    } catch (err) { res.json({ success: false, message: err.message }); }
});

module.exports = router;