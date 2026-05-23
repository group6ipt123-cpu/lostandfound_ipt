const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const Item = require('../models/Item');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/inquiries/{itemId}:
 *   post:
 *     tags: [Inquiries]
 *     summary: Create an inquiry for an item
 *     description: User creates an inquiry to ask about a lost/found item. Cannot inquire about own items. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID to inquire about
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Is this item still available? I think it might be mine."
 *     responses:
 *       201:
 *         description: Inquiry created successfully
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
 *                     item:
 *                       type: object
 *                     sender:
 *                       type: object
 *                     receiver:
 *                       type: object
 *                     message:
 *                       type: string
 *                     status:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Cannot inquire about own item or duplicate inquiry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// @route   POST /api/inquiries/:itemId
// @desc    Create inquiry for an item
// @access  Private
router.post('/:itemId', protect, async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId).populate('reportedBy');
        
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        // Check if user is inquiring about their own item
        if (item.reportedBy._id.toString() === req.user.id) {
            return res.status(400).json({ success: false, message: 'Cannot inquire about your own item' });
        }

        // Check if inquiry already exists
        const existingInquiry = await Inquiry.findOne({
            item: item._id,
            sender: req.user.id,
            status: { $nin: ['closed', 'resolved'] }
        });

        if (existingInquiry) {
            return res.status(400).json({ 
                success: false, 
                message: 'You already have an active inquiry for this item',
                inquiryId: existingInquiry._id
            });
        }

        // Create inquiry
        const inquiry = await Inquiry.create({
            item: item._id,
            sender: req.user.id,
            receiver: item.reportedBy._id,
            message: req.body.message,
            status: 'pending'
        });

        // Create notification for item owner
        await Notification.create({
            recipient: item.reportedBy._id,
            type: 'inquiry',
            title: 'New Inquiry',
            message: `${req.user.name} is inquiring about "${item.name}"`,
            item: item._id,
            inquiry: inquiry._id
        });

        const populatedInquiry = await Inquiry.findById(inquiry._id)
            .populate('item', 'name category location')
            .populate('sender', 'name email')
            .populate('receiver', 'name email');

        res.status(201).json({ success: true, data: populatedInquiry });
    } catch (error) {
        console.error('Inquiry creation error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

/**
 * @swagger
 * /api/inquiries:
 *   get:
 *     tags: [Inquiries]
 *     summary: Get user's inquiries
 *     description: Retrieve all inquiries sent by or received by the user. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inquiries retrieved successfully
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
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       item:
 *                         $ref: '#/components/schemas/Item'
 *                       sender:
 *                         $ref: '#/components/schemas/User'
 *                       receiver:
 *                         $ref: '#/components/schemas/User'
 *                       message:
 *                         type: string
 *                       status:
 *                         type: string
 *                       replies:
 *                         type: array
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */
// @route   GET /api/inquiries
// @desc    Get user's inquiries (sent and received)
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const inquiries = await Inquiry.find({
            $or: [{ sender: req.user.id }, { receiver: req.user.id }]
        })
        .populate('item', 'name category location status image')
        .populate('sender', 'name email')
        .populate('receiver', 'name email')
        .populate('replies.sender', 'name')
        .sort('-createdAt');

        res.status(200).json({ success: true, data: inquiries });
    } catch (error) {
        console.error('Get inquiries error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

/**
 * @swagger
 * /api/inquiries/{id}:
 *   get:
 *     tags: [Inquiries]
 *     summary: Get a single inquiry
 *     description: Retrieve details of a specific inquiry. User must be sender, receiver, or admin. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry ID
 *     responses:
 *       200:
 *         description: Inquiry retrieved successfully
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
 *                     item:
 *                       $ref: '#/components/schemas/Item'
 *                     sender:
 *                       $ref: '#/components/schemas/User'
 *                     receiver:
 *                       $ref: '#/components/schemas/User'
 *                     message:
 *                       type: string
 *                     replies:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           sender:
 *                             type: object
 *                           message:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *       404:
 *         description: Inquiry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// @route   GET /api/inquiries/:id
// @desc    Get single inquiry
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id)
            .populate('item', 'name category location status image')
            .populate('sender', 'name email')
            .populate('receiver', 'name email')
            .populate('replies.sender', 'name');

        if (!inquiry) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }

        // Check if user is part of this inquiry
        if (inquiry.sender._id.toString() !== req.user.id && 
            inquiry.receiver._id.toString() !== req.user.id &&
            req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        res.status(200).json({ success: true, data: inquiry });
    } catch (error) {
        console.error('Get inquiry error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

/**
 * @swagger
 * /api/inquiries/{id}/reply:
 *   post:
 *     tags: [Inquiries]
 *     summary: Reply to an inquiry
 *     description: Send a reply to an inquiry. User must be sender or receiver. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry ID to reply to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Yes, it's still available! When can you pick it up?"
 *     responses:
 *       200:
 *         description: Reply sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: Inquiry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// @route   POST /api/inquiries/:id/reply
// @desc    Reply to an inquiry
// @access  Private
router.post('/:id/reply', protect, async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id)
            .populate('sender', 'name')
            .populate('receiver', 'name')
            .populate('item', 'name');

        if (!inquiry) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }

        // Check if user is part of this inquiry
        if (inquiry.sender._id.toString() !== req.user.id && 
            inquiry.receiver._id.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        if (!req.body.message || !req.body.message.trim()) {
            return res.status(400).json({ success: false, message: 'Message is required' });
        }

        // Add reply
        inquiry.replies.push({
            sender: req.user.id,
            message: req.body.message
        });

        inquiry.status = 'replied';
        await inquiry.save();

        // Determine recipient for notification
        const recipientId = inquiry.sender._id.toString() === req.user.id 
            ? inquiry.receiver._id 
            : inquiry.sender._id;

        // Create notification
        await Notification.create({
            recipient: recipientId,
            type: 'inquiry_reply',
            title: 'New Reply',
            message: `${req.user.name} replied to inquiry about "${inquiry.item.name}"`,
            item: inquiry.item._id,
            inquiry: inquiry._id
        });

        const updatedInquiry = await Inquiry.findById(inquiry._id)
            .populate('item', 'name category location')
            .populate('sender', 'name email')
            .populate('receiver', 'name email')
            .populate('replies.sender', 'name');

        res.status(200).json({ success: true, data: updatedInquiry });
    } catch (error) {
        console.error('Reply error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

/**
 * @swagger
 * /api/inquiries/{id}/status:
 *   put:
 *     tags: [Inquiries]
 *     summary: Update inquiry status
 *     description: Update the status of an inquiry (e.g., pending, replied, closed, resolved). Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry ID to update
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
 *                 enum: ["pending", "replied", "closed", "resolved"]
 *                 example: "resolved"
 *     responses:
 *       200:
 *         description: Inquiry status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: Inquiry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// @route   PUT /api/inquiries/:id/status
// @desc    Update inquiry status
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
    try {
        const { status } = req.body;
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }

        // Check authorization
        if (inquiry.sender.toString() !== req.user.id && 
            inquiry.receiver.toString() !== req.user.id &&
            req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        inquiry.status = status;
        await inquiry.save();

        res.status(200).json({ success: true, data: inquiry });
    } catch (error) {
        console.error('Status update error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;