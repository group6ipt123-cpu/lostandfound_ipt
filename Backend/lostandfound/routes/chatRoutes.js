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

const createNotification = async (userId, type, title, message, relatedItemId, relatedItemName, senderId = null) => {
    const notification = { userId, type, title, message, relatedItemId, relatedItemName, senderId, isRead: false, createdAt: new Date() };
    const result = await mongoose.connection.db.collection('notifications').insertOne(notification);
    return { ...notification, _id: result.insertedId };
};

/**
 * @swagger
 * /api/chat/room:
 *   post:
 *     tags: [Chat]
 *     summary: Create or get a chat room
 *     description: Create a new chat room between two users for a specific item, or retrieve existing one. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - ownerId
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID of the item being discussed
 *               ownerId:
 *                 type: string
 *                 description: ID of the other user to chat with
 *     responses:
 *       200:
 *         description: Chat room created/retrieved successfully
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
 *                     itemId:
 *                       type: string
 *                     participants:
 *                       type: array
 *                       items:
 *                         type: string
 *                     item:
 *                       $ref: '#/components/schemas/Item'
 *                     otherUser:
 *                       $ref: '#/components/schemas/User'
 *                     messages:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Message'
 */
// Create or get chat room
router.post('/room', auth, async (req, res) => {
    try {
        const { itemId, ownerId } = req.body;
        let room = await mongoose.connection.db.collection('chatrooms').findOne({ itemId, participants: { $all: [req.user.id, ownerId] } });
        if (!room) {
            const newRoom = { itemId, participants: [req.user.id, ownerId], createdAt: new Date(), lastMessage: null, lastMessageTime: null };
            const result = await mongoose.connection.db.collection('chatrooms').insertOne(newRoom);
            room = { ...newRoom, _id: result.insertedId };
        }
        const item = await mongoose.connection.db.collection('items').findOne({ _id: new mongoose.Types.ObjectId(itemId) });
        const otherId = room.participants.find(p => p !== req.user.id);
        const otherUser = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(otherId) }, { projection: { password: 0 } });
        const messages = await mongoose.connection.db.collection('messages').find({ roomId: room._id.toString() }).sort({ createdAt: 1 }).toArray();
        res.json({ success: true, data: { ...room, item, otherUser, messages } });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

/**
 * @swagger
 * /api/chat/rooms:
 *   get:
 *     tags: [Chat]
 *     summary: Get all chat rooms for the current user
 *     description: Retrieve all chat rooms where the user is a participant, sorted by last message time. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chat rooms retrieved successfully
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
 *                       itemId:
 *                         type: string
 *                       participants:
 *                         type: array
 *                         items:
 *                           type: string
 *                       item:
 *                         $ref: '#/components/schemas/Item'
 *                       otherUser:
 *                         $ref: '#/components/schemas/User'
 *                       lastMessage:
 *                         type: string
 *                       lastMessageTime:
 *                         type: string
 *                         format: date-time
 */
// Get all chat rooms for user
router.get('/rooms', auth, async (req, res) => {
    try {
        const rooms = await mongoose.connection.db.collection('chatrooms').find({ participants: req.user.id }).sort({ lastMessageTime: -1 }).toArray();
        const enriched = [];
        for (const room of rooms) {
            const item = await mongoose.connection.db.collection('items').findOne({ _id: new mongoose.Types.ObjectId(room.itemId) });
            const otherId = room.participants.find(p => p !== req.user.id);
            const otherUser = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(otherId) }, { projection: { password: 0 } });
            enriched.push({ ...room, item, otherUser });
        }
        res.json({ success: true, data: enriched });
    } catch (err) { res.json({ success: false, message: err.message }); }
});

/**
 * @swagger
 * /api/chat/messages/{roomId}:
 *   get:
 *     tags: [Chat]
 *     summary: Get messages from a chat room
 *     description: Retrieve all messages from a specific chat room. User must be a participant. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat room ID
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
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
 *                     $ref: '#/components/schemas/Message'
 *       403:
 *         description: Access denied (not a participant)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Get messages for a room
router.get('/messages/:roomId', auth, async (req, res) => {
    try {
        const room = await mongoose.connection.db.collection('chatrooms').findOne({ _id: new mongoose.Types.ObjectId(req.params.roomId), participants: req.user.id });
        if (!room) return res.status(403).json({ success: false, message: 'Access denied' });
        const messages = await mongoose.connection.db.collection('messages').find({ roomId: req.params.roomId }).sort({ createdAt: 1 }).toArray();
        res.json({ success: true, data: messages });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

/**
 * @swagger
 * /api/chat/message:
 *   post:
 *     tags: [Chat]
 *     summary: Send a message in a chat room
 *     description: Send a new message to a chat room. User must be a participant. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - message
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: Chat room ID
 *               message:
 *                 type: string
 *                 description: Message content
 *                 example: "Is this item still available?"
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       400:
 *         description: Message is empty
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied (not a participant)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Send message
router.post('/message', auth, async (req, res) => {
    try {
        const { roomId, message } = req.body;
        if (!message || !message.trim()) return res.status(400).json({ success: false, message: 'Message required' });
        
        const room = await mongoose.connection.db.collection('chatrooms').findOne({ _id: new mongoose.Types.ObjectId(roomId), participants: req.user.id });
        if (!room) return res.status(403).json({ success: false, message: 'Access denied' });
        
        const sender = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(req.user.id) });
        const item = await mongoose.connection.db.collection('items').findOne({ _id: new mongoose.Types.ObjectId(room.itemId) });
        
        const newMessage = { roomId, senderId: req.user.id, senderName: sender.name, message: message.trim(), createdAt: new Date(), read: false };
        const result = await mongoose.connection.db.collection('messages').insertOne(newMessage);
        
        await mongoose.connection.db.collection('chatrooms').updateOne({ _id: new mongoose.Types.ObjectId(roomId) }, { $set: { lastMessage: message.trim(), lastMessageTime: new Date() } });
        
        // Notify other participant
        const otherId = room.participants.find(p => p !== req.user.id);
        if (otherId) {
            await createNotification(otherId, 'new_message', 'New Message', `${sender.name} sent you a message about "${item?.name || 'an item'}"`, room.itemId, item?.name || 'Item', req.user.id);
        }
        
        res.json({ success: true, data: { ...newMessage, _id: result.insertedId } });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

/**
 * @swagger
 * /api/chat/messages/read/{roomId}:
 *   put:
 *     tags: [Chat]
 *     summary: Mark all messages in a room as read
 *     description: Mark all unread messages from other participants as read. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat room ID
 *     responses:
 *       200:
 *         description: Messages marked as read successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */
// Mark messages as read
router.put('/messages/read/:roomId', auth, async (req, res) => {
    try {
        await mongoose.connection.db.collection('messages').updateMany({ roomId: req.params.roomId, senderId: { $ne: req.user.id }, read: false }, { $set: { read: true } });
        res.json({ success: true });
    } catch (err) { res.json({ success: false, message: err.message }); }
});

module.exports = router;