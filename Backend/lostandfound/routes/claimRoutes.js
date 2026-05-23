const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');
const Item = require('../models/Item');
const Notification = require('../models/Notification');
const { protect, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /api/claims/{itemId}:
 *   post:
 *     tags: [Claims]
 *     summary: File a claim for an item
 *     description: User files a claim to request ownership of a found item or confirm ownership of a lost item. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID to claim
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - proofDescription
 *             properties:
 *               proofDescription:
 *                 type: string
 *                 description: Description of proof of ownership
 *                 example: "Item has my initials inside and unique scratch on the case"
 *     responses:
 *       201:
 *         description: Claim filed successfully
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
 *                       type: string
 *                     claimedBy:
 *                       type: string
 *                     proofDescription:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Item not available or user already filed claim
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
router.post('/:itemId', protect, authorize('user'), async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);
        
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        if (item.status !== 'pending') {
            return res.status(400).json({ success: false, message: 'This item is no longer available for claim' });
        }

        // Check if user already filed a claim
        const existingClaim = await Claim.findOne({
            item: item._id,
            claimedBy: req.user.id
        });

        if (existingClaim) {
            return res.status(400).json({ success: false, message: 'You already filed a claim for this item' });
        }

        // Create claim
        const claim = await Claim.create({
            item: item._id,
            claimedBy: req.user.id,
            proofDescription: req.body.proofDescription
        });

        // Update item status
        item.status = 'claimed';
        item.claimedBy = req.user.id;
        item.claimRequestedAt = Date.now();
        await item.save();

        // Notify item owner
        await Notification.create({
            recipient: item.reportedBy,
            type: 'claim_update',
            title: 'New Claim Filed',
            message: `${req.user.name} filed a claim for "${item.name}"`,
            item: item._id,
            claim: claim._id
        });

        // Notify admins
        const admins = await User.find({ role: 'admin' });
        for (const admin of admins) {
            await Notification.create({
                recipient: admin._id,
                type: 'claim_update',
                title: 'New Claim Requires Review',
                message: `${req.user.name} filed a claim for "${item.name}"`,
                item: item._id,
                claim: claim._id
            });
        }

        res.status(201).json({ success: true, data: claim });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

/**
 * @swagger
 * /api/claims:
 *   get:
 *     tags: [Claims]
 *     summary: Get claims
 *     description: Retrieve claims. Admins see all claims, regular users see only their own. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Claims retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       item:
 *                         $ref: '#/components/schemas/Item'
 *                       claimedBy:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                       proofDescription:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: ["pending", "verified", "rejected"]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */
// @route   GET /api/claims
// @desc    Get all claims (Admin sees all, User sees their own)
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let query = {};
        
        if (req.user.role !== 'admin') {
            query.claimedBy = req.user.id;
        }

        const claims = await Claim.find(query)
            .populate('item')
            .populate('claimedBy', 'name email')
            .populate('reviewedBy', 'name')
            .sort('-createdAt');

        res.status(200).json({ success: true, count: claims.length, data: claims });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

/**
 * @swagger
 * /api/claims/{claimId}/verify:
 *   put:
 *     tags: [Claims]
 *     summary: Verify a claim (Admin only)
 *     description: Admin verifies, approves, rejects, or marks a claim as ready for pickup. Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: claimId
 *         required: true
 *         schema:
 *           type: string
 *         description: Claim ID to verify
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
 *                 enum: ["verified", "approved", "rejected", "ready_for_pickup"]
 *                 description: New status for the claim
 *               adminNote:
 *                 type: string
 *                 description: Admin's note or reason for decision
 *     responses:
 *       200:
 *         description: Claim verified/updated successfully
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
 *                     status:
 *                       type: string
 *                     reviewedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Claim not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// @route   PUT /api/claims/:claimId/verify
// @desc    Verify a claim (Admin only)
// @access  Private/Admin
router.put('/:claimId/verify', protect, authorize('admin'), async (req, res) => {
    try {
        const { status, adminNote } = req.body;
        
        const claim = await Claim.findById(req.params.claimId)
            .populate('item')
            .populate('claimedBy');

        if (!claim) {
            return res.status(404).json({ success: false, message: 'Claim not found' });
        }

        claim.status = status;
        claim.adminNote = adminNote;
        claim.reviewedBy = req.user.id;
        claim.reviewedAt = Date.now();
        await claim.save();

        // Update item status
        const item = await Item.findById(claim.item._id);
        
        if (status === 'verified' || status === 'approved') {
            item.status = 'verified';
            item.verifiedBy = req.user.id;
            item.verifiedAt = Date.now();
            
            // Notify claimant
            await Notification.create({
                recipient: claim.claimedBy._id,
                type: 'verification',
                title: 'Claim Verified!',
                message: `Your claim for "${item.name}" has been verified. Please proceed to claim your item.`,
                item: item._id,
                claim: claim._id
            });
        } else if (status === 'ready_for_pickup') {
            item.status = 'ready_for_pickup';
            
            await Notification.create({
                recipient: claim.claimedBy._id,
                type: 'pickup_ready',
                title: 'Item Ready for Pickup!',
                message: `"${item.name}" is now ready for pickup. Please visit the lost and found office.`,
                item: item._id,
                claim: claim._id
            });
        } else if (status === 'rejected') {
            item.status = 'pending';
            item.claimedBy = null;
            item.claimRequestedAt = null;
            
            await Notification.create({
                recipient: claim.claimedBy._id,
                type: 'verification',
                title: 'Claim Not Verified',
                message: `Your claim for "${item.name}" could not be verified. Reason: ${adminNote || 'Insufficient proof'}`,
                item: item._id,
                claim: claim._id
            });
        }

        await item.save();

        res.status(200).json({ success: true, data: claim });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;