require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.DB_URL || 'mongodb://127.0.0.1:27017/lostandfound')
    .then(() => console.log('Database connected'))
    .catch(err => console.error('DB Error:', err));

// ============ HELPER FUNCTIONS ============

const createNotification = async (userId, type, title, message, relatedItemId, relatedItemName, senderId = null) => {
    const notification = {
        userId: userId,
        type: type,
        title: title,
        message: message,
        relatedItemId: relatedItemId,
        relatedItemName: relatedItemName,
        senderId: senderId,
        isRead: false,
        createdAt: new Date()
    };
    
    const result = await mongoose.connection.db.collection('notifications').insertOne(notification);
    return { ...notification, _id: result.insertedId };
};

const checkItemMatch = (lostItem, foundItem) => {
    let matchScore = 0;
    let matchedFields = [];
    
    if (lostItem.name && foundItem.name) {
        const lostName = lostItem.name.toLowerCase();
        const foundName = foundItem.name.toLowerCase();
        if (lostName === foundName) {
            matchScore += 40;
            matchedFields.push('name');
        } else if (lostName.includes(foundName) || foundName.includes(lostName)) {
            matchScore += 20;
            matchedFields.push('name (partial)');
        }
    }
    
    if (lostItem.description && foundItem.description) {
        const lostKeywords = lostItem.description.toLowerCase().split(' ');
        const foundKeywords = foundItem.description.toLowerCase().split(' ');
        const commonWords = lostKeywords.filter(word => foundKeywords.includes(word) && word.length > 3);
        if (commonWords.length > 0) {
            matchScore += Math.min(commonWords.length * 5, 25);
            matchedFields.push('description keywords');
        }
    }
    
    if (lostItem.location && foundItem.location) {
        if (lostItem.location.toLowerCase() === foundItem.location.toLowerCase()) {
            matchScore += 20;
            matchedFields.push('location');
        }
    }
    
    if (lostItem.itemCategory && foundItem.itemCategory) {
        if (lostItem.itemCategory === foundItem.itemCategory) {
            matchScore += 15;
            matchedFields.push('category');
        }
    }
    
    return { isMatch: matchScore >= 50, matchScore, matchedFields };
};

// ============ AUTH ROUTES ============

// REGISTER
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, studentId, contactNumber } = req.body;
        const existing = await mongoose.connection.db.collection('users').findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.json({ success: false, message: 'User already exists' });
        }
        
        const user = { 
            name, 
            email: email.toLowerCase(), 
            password, 
            studentId, 
            contactNumber, 
            role: 'user', 
            createdAt: new Date() 
        };
        await mongoose.connection.db.collection('users').insertOne(user);
        res.json({ success: true, message: 'Registration successful' });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await mongoose.connection.db.collection('users').findOne({ email: email.toLowerCase(), password });
        if (!user) return res.json({ success: false, message: 'Invalid credentials' });
        
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });
        res.json({ 
            success: true, 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role, 
                studentId: user.studentId, 
                contactNumber: user.contactNumber 
            } 
        });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// GET CURRENT USER
app.get('/api/auth/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.json({ success: false, message: 'Authentication required' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const user = await mongoose.connection.db.collection('users').findOne(
            { _id: new mongoose.Types.ObjectId(decoded.id) },
            { projection: { password: 0 } }
        );
        if (!user) return res.json({ success: false, message: 'User not found' });
        res.json({ success: true, data: user });
    } catch (err) {
        res.json({ success: false, message: 'Invalid token' });
    }
});

// ============ ITEMS ROUTES ============

// GET all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await mongoose.connection.db.collection('items').find({}).sort({ createdAt: -1 }).toArray();
        res.json({ success: true, count: items.length, data: items });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// GET single item
app.get('/api/items/:id', async (req, res) => {
    try {
        const item = await mongoose.connection.db.collection('items').findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        if (!item) return res.json({ success: false, message: 'Item not found' });
        res.json({ success: true, data: item });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// POST create item
app.post('/api/items', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.json({ success: false, message: 'Authentication required' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const user = await mongoose.connection.db.collection('users').findOne(
            { _id: new mongoose.Types.ObjectId(decoded.id) }
        );
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        
        const item = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            itemCategory: req.body.itemCategory,
            location: req.body.location,
            date: new Date(req.body.date),
            image: req.body.image || null,
            status: 'pending',
            claimedBy: null,
            claimedAt: null,
            createdAt: new Date(),
            userId: decoded.id,
            userName: user.name,
            userEmail: user.email,
            userStudentId: user.studentId || null,
            userContactNumber: user.contactNumber || null
        };
        
        const result = await mongoose.connection.db.collection('items').insertOne(item);
        const newItem = { ...item, _id: result.insertedId };
        
        if (item.category === 'lost') {
            const foundItems = await mongoose.connection.db.collection('items')
                .find({ category: 'found', status: 'pending' })
                .toArray();
            
            for (const foundItem of foundItems) {
                const match = checkItemMatch(item, foundItem);
                if (match.isMatch) {
                    await createNotification(
                        foundItem.userId,
                        'potential_match',
                        '🔍 Potential Match for Your Found Item',
                        `Someone lost a "${item.name}" that matches your found item "${foundItem.name}". Match score: ${match.matchScore}%`,
                        item._id,
                        item.name,
                        null
                    );
                    
                    await createNotification(
                        item.userId,
                        'potential_match',
                        '🔍 Potential Match for Your Lost Item',
                        `A found item "${foundItem.name}" matches your lost "${item.name}". Match score: ${match.matchScore}%`,
                        foundItem._id,
                        foundItem.name,
                        null
                    );
                }
            }
        } else if (item.category === 'found') {
            const lostItems = await mongoose.connection.db.collection('items')
                .find({ category: 'lost', status: 'pending' })
                .toArray();
            
            for (const lostItem of lostItems) {
                const match = checkItemMatch(lostItem, item);
                if (match.isMatch) {
                    await createNotification(
                        lostItem.userId,
                        'potential_match',
                        '🔍 Potential Match for Your Lost Item',
                        `A found item "${item.name}" matches your lost "${lostItem.name}". Match score: ${match.matchScore}%`,
                        item._id,
                        item.name,
                        null
                    );
                    
                    await createNotification(
                        item.userId,
                        'potential_match',
                        '🔍 Potential Match for Your Found Item',
                        `Someone lost a "${lostItem.name}" that matches your found item "${item.name}". Match score: ${match.matchScore}%`,
                        lostItem._id,
                        lostItem.name,
                        null
                    );
                }
            }
        }
        
        res.json({ success: true, data: newItem });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// Mark item as claimed
app.post('/api/items/:itemId/mark-claimed', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.json({ success: false, message: 'Authentication required' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const { claimerId } = req.body;
        
        const item = await mongoose.connection.db.collection('items').findOne({ 
            _id: new mongoose.Types.ObjectId(req.params.itemId) 
        });
        
        if (!item) return res.json({ success: false, message: 'Item not found' });
        
        if (item.userId !== decoded.id) {
            return res.json({ success: false, message: 'Only the item owner can mark it as claimed' });
        }
        
        if (item.status === 'claimed') {
            return res.json({ success: false, message: 'Item already claimed' });
        }
        
        await mongoose.connection.db.collection('items').findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.itemId) },
            { 
                $set: { 
                    status: 'claimed', 
                    claimedBy: claimerId,
                    claimedAt: new Date()
                } 
            }
        );
        
        await createNotification(
            claimerId,
            'item_claimed',
            '✅ Item Claim Confirmed',
            `The owner of "${item.name}" has confirmed your claim. The item has been returned successfully!`,
            item._id,
            item.name,
            null
        );
        
        res.json({ success: true, message: 'Item marked as claimed' });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// ============ NOTIFICATION ROUTES ============

app.get('/api/notifications', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.json({ success: false, message: 'Authentication required' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const notifications = await mongoose.connection.db.collection('notifications')
            .find({ userId: decoded.id })
            .sort({ createdAt: -1 })
            .toArray();
        
        const unreadCount = notifications.filter(n => !n.isRead).length;
        res.json({ success: true, data: notifications, unreadCount });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.put('/api/notifications/:id/read', async (req, res) => {
    try {
        await mongoose.connection.db.collection('notifications').updateOne(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { $set: { isRead: true } }
        );
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.put('/api/notifications/read-all', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.json({ success: false, message: 'Authentication required' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        await mongoose.connection.db.collection('notifications').updateMany(
            { userId: decoded.id, isRead: false },
            { $set: { isRead: true } }
        );
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// ============ CHAT ROUTES ============

// Create or get chat room
app.post('/api/chat/room', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const { itemId, ownerId } = req.body;
        
        if (!itemId || !ownerId) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        
        let chatRoom = await mongoose.connection.db.collection('chatrooms').findOne({
            itemId: itemId,
            participants: { $all: [decoded.id, ownerId] }
        });
        
        if (!chatRoom) {
            const newRoom = {
                itemId: itemId,
                participants: [decoded.id, ownerId],
                createdAt: new Date(),
                lastMessage: null,
                lastMessageTime: null
            };
            const result = await mongoose.connection.db.collection('chatrooms').insertOne(newRoom);
            chatRoom = { ...newRoom, _id: result.insertedId };
        }
        
        res.json({ success: true, data: chatRoom });
    } catch (err) {
        console.error('Error creating chat room:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get messages for a chat room
app.get('/api/chat/messages/:roomId', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const { roomId } = req.params;
        
        const chatRoom = await mongoose.connection.db.collection('chatrooms').findOne({
            _id: new mongoose.Types.ObjectId(roomId),
            participants: decoded.id
        });
        
        if (!chatRoom) {
            return res.status(403).json({ success: false, message: 'Access denied - You are not a participant in this chat' });
        }
        
        const messages = await mongoose.connection.db.collection('messages')
            .find({ roomId: roomId })
            .sort({ createdAt: 1 })
            .toArray();
        
        res.json({ success: true, data: messages });
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Send message
app.post('/api/chat/message', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const { roomId, message } = req.body;
        
        if (!roomId || !message || message.trim() === '') {
            return res.status(400).json({ success: false, message: 'Message cannot be empty' });
        }
        
        const chatRoom = await mongoose.connection.db.collection('chatrooms').findOne({
            _id: new mongoose.Types.ObjectId(roomId),
            participants: decoded.id
        });
        
        if (!chatRoom) {
            return res.status(403).json({ success: false, message: 'Access denied - You are not a participant in this chat' });
        }
        
        const sender = await mongoose.connection.db.collection('users').findOne(
            { _id: new mongoose.Types.ObjectId(decoded.id) }
        );
        
        if (!sender) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        const item = await mongoose.connection.db.collection('items').findOne({
            _id: new mongoose.Types.ObjectId(chatRoom.itemId)
        });
        
        const newMessage = {
            roomId: roomId,
            senderId: decoded.id,
            senderName: sender.name,
            message: message.trim(),
            createdAt: new Date(),
            read: false
        };
        
        const result = await mongoose.connection.db.collection('messages').insertOne(newMessage);
        
        await mongoose.connection.db.collection('chatrooms').updateOne(
            { _id: new mongoose.Types.ObjectId(roomId) },
            { 
                $set: { 
                    lastMessage: message.trim(), 
                    lastMessageTime: new Date() 
                } 
            }
        );
        
        const otherParticipantId = chatRoom.participants.find(p => p !== decoded.id);
        if (otherParticipantId) {
            await createNotification(
                otherParticipantId,
                'new_message',
                '💬 New Message Received',
                `${sender.name} sent you a message about "${item?.name || 'item'}": "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"`,
                chatRoom.itemId,
                item?.name || 'Item',
                decoded.id
            );
        }
        
        res.json({ success: true, data: { ...newMessage, _id: result.insertedId } });
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Mark messages as read
app.put('/api/chat/messages/read/:roomId', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.json({ success: false, message: 'Authentication required' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const { roomId } = req.params;
        
        const chatRoom = await mongoose.connection.db.collection('chatrooms').findOne({
            _id: new mongoose.Types.ObjectId(roomId),
            participants: decoded.id
        });
        
        if (!chatRoom) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        
        await mongoose.connection.db.collection('messages').updateMany(
            { roomId: roomId, senderId: { $ne: decoded.id }, read: false },
            { $set: { read: true } }
        );
        
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// Get user's chat rooms
app.get('/api/chat/rooms', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.json({ success: false, message: 'Authentication required' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        
        const chatRooms = await mongoose.connection.db.collection('chatrooms')
            .find({ participants: decoded.id })
            .sort({ lastMessageTime: -1 })
            .toArray();
        
        const enrichedRooms = [];
        for (const room of chatRooms) {
            const item = await mongoose.connection.db.collection('items').findOne(
                { _id: new mongoose.Types.ObjectId(room.itemId) }
            );
            
            const otherParticipantId = room.participants.find(p => p !== decoded.id);
            const otherUser = await mongoose.connection.db.collection('users').findOne(
                { _id: new mongoose.Types.ObjectId(otherParticipantId) },
                { projection: { password: 0 } }
            );
            
            const messages = await mongoose.connection.db.collection('messages')
                .find({ roomId: room._id.toString() })
                .sort({ createdAt: -1 })
                .limit(1)
                .toArray();
            
            enrichedRooms.push({
                ...room,
                item: item,
                otherUser: otherUser,
                lastMessage: messages[0]?.message || null,
                lastMessageTime: messages[0]?.createdAt || room.lastMessageTime,
                lastMessageSender: messages[0]?.senderName || null
            });
        }
        
        res.json({ success: true, data: enrichedRooms });
    } catch (err) {
        console.error('Error fetching chat rooms:', err);
        res.json({ success: false, message: err.message });
    }
});

// ============ USER ROUTES ============

// GET profile
app.get('/api/users/profile', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.json({ success: false, message: 'Authentication required' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const user = await mongoose.connection.db.collection('users').findOne(
            { _id: new mongoose.Types.ObjectId(decoded.id) },
            { projection: { password: 0 } }
        );
        if (!user) return res.json({ success: false, message: 'User not found' });
        
        const itemsReported = await mongoose.connection.db.collection('items').countDocuments({ userId: decoded.id });
        const itemsClaimed = await mongoose.connection.db.collection('items').countDocuments({ claimedBy: decoded.id });
        const unreadNotifications = await mongoose.connection.db.collection('notifications').countDocuments({ userId: decoded.id, isRead: false });
        
        res.json({ success: true, data: { ...user, stats: { itemsReported, itemsClaimed, unreadNotifications } } });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// PUT update profile
app.put('/api/users/profile', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.json({ success: false, message: 'Authentication required' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const { name, studentId, contactNumber } = req.body;
        
        const result = await mongoose.connection.db.collection('users').findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(decoded.id) },
            { $set: { name, studentId, contactNumber } },
            { returnDocument: 'after', projection: { password: 0 } }
        );
        
        res.json({ success: true, data: result });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// ============ ADMIN ROUTES ============

// GET admin stats
app.get('/api/admin/stats', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.json({ success: false, message: 'Authentication required' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const adminUser = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(decoded.id) });
        
        if (!adminUser || adminUser.role !== 'admin') {
            return res.json({ success: false, message: 'Admin access required' });
        }
        
        const totalUsers = await mongoose.connection.db.collection('users').countDocuments();
        const totalItems = await mongoose.connection.db.collection('items').countDocuments();
        const pendingItems = await mongoose.connection.db.collection('items').countDocuments({ status: 'pending' });
        const claimedItems = await mongoose.connection.db.collection('items').countDocuments({ status: 'claimed' });
        const lostItems = await mongoose.connection.db.collection('items').countDocuments({ category: 'lost' });
        const foundItems = await mongoose.connection.db.collection('items').countDocuments({ category: 'found' });
        
        res.json({
            success: true,
            data: {
                users: totalUsers,
                items: { total: totalItems, lost: lostItems, found: foundItems },
                pending: pendingItems,
                claimed: claimedItems
            }
        });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// GET all users (admin)
app.get('/api/admin/users', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.json({ success: false, message: 'Authentication required' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const adminUser = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(decoded.id) });
        
        if (!adminUser || adminUser.role !== 'admin') {
            return res.json({ success: false, message: 'Admin access required' });
        }
        
        const users = await mongoose.connection.db.collection('users').find({}, { projection: { password: 0 } }).sort({ createdAt: -1 }).toArray();
        res.json({ success: true, count: users.length, data: users });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// PUT update item status (admin)
app.put('/api/admin/items/:id', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.json({ success: false, message: 'Authentication required' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const adminUser = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(decoded.id) });
        
        if (!adminUser || adminUser.role !== 'admin') {
            return res.json({ success: false, message: 'Admin access required' });
        }
        
        const result = await mongoose.connection.db.collection('items').findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { $set: { status: req.body.status, verifiedAt: new Date() } },
            { returnDocument: 'after' }
        );
        if (!result) return res.json({ success: false, message: 'Item not found' });
        res.json({ success: true, data: result });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// DELETE item (admin)
app.delete('/api/admin/items/:id', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.json({ success: false, message: 'Authentication required' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const adminUser = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(decoded.id) });
        
        if (!adminUser || adminUser.role !== 'admin') {
            return res.json({ success: false, message: 'Admin access required' });
        }
        
        await mongoose.connection.db.collection('items').deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.json({ success: true, message: 'Item deleted' });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// ============ SWAGGER CONFIGURATION ============

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Lost and Found API',
            version: '1.0.0',
            description: 'Complete API for Lost and Found System with Notifications and Chat',
            contact: {
                name: 'API Support',
                email: 'support@lostandfound.com'
            }
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [] // We'll manually define paths since we're not using separate files
};

// Manually define Swagger paths
const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'Lost and Found API',
        version: '1.0.0',
        description: 'Complete API for Lost and Found System with Notifications and Chat'
    },
    servers: [{ url: `http://localhost:${PORT}`, description: 'Local server' }],
    components: {
        securitySchemes: {
            bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
        }
    },
    paths: {
        '/api/auth/register': {
            post: {
                tags: ['Auth'],
                summary: 'Register new user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    email: { type: 'string' },
                                    password: { type: 'string' },
                                    studentId: { type: 'string' },
                                    contactNumber: { type: 'string' }
                                },
                                required: ['name', 'email', 'password']
                            }
                        }
                    }
                },
                responses: { '200': { description: 'Success' } }
            }
        },
        '/api/auth/login': {
            post: {
                tags: ['Auth'],
                summary: 'Login user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string' },
                                    password: { type: 'string' }
                                },
                                required: ['email', 'password']
                            }
                        }
                    }
                },
                responses: { '200': { description: 'Login successful' } }
            }
        },
        '/api/items': {
            get: { 
                tags: ['Items'], 
                summary: 'Get all items', 
                security: [{ bearerAuth: [] }],
                responses: { '200': { description: 'List of items' } } 
            },
            post: { 
                tags: ['Items'], 
                summary: 'Create item', 
                security: [{ bearerAuth: [] }],
                responses: { '201': { description: 'Item created' } } 
            }
        },
        '/api/users/profile': {
            get: { 
                tags: ['Users'], 
                summary: 'Get user profile', 
                security: [{ bearerAuth: [] }],
                responses: { '200': { description: 'User profile' } } 
            },
            put: { 
                tags: ['Users'], 
                summary: 'Update user profile', 
                security: [{ bearerAuth: [] }],
                responses: { '200': { description: 'Profile updated' } } 
            }
        },
        '/api/notifications': {
            get: { 
                tags: ['Notifications'], 
                summary: 'Get user notifications', 
                security: [{ bearerAuth: [] }],
                responses: { '200': { description: 'List of notifications' } } 
            }
        },
        '/api/chat/rooms': {
            get: { 
                tags: ['Chat'], 
                summary: 'Get user chat rooms', 
                security: [{ bearerAuth: [] }],
                responses: { '200': { description: 'List of chat rooms' } } 
            }
        },
        '/api/admin/stats': {
            get: { 
                tags: ['Admin'], 
                summary: 'Get system stats', 
                security: [{ bearerAuth: [] }],
                responses: { '200': { description: 'System statistics' } } 
            }
        }
    }
};

// ============ INITIALIZE COLLECTIONS ============
const initializeCollections = async () => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);
        
        if (!collectionNames.includes('chatrooms')) {
            await mongoose.connection.db.createCollection('chatrooms');
            console.log('Created chatrooms collection');
        }
        if (!collectionNames.includes('messages')) {
            await mongoose.connection.db.createCollection('messages');
            console.log('Created messages collection');
        }
        if (!collectionNames.includes('notifications')) {
            await mongoose.connection.db.createCollection('notifications');
            console.log('Created notifications collection');
        }
        
        await mongoose.connection.db.collection('chatrooms').createIndex({ participants: 1 });
        await mongoose.connection.db.collection('messages').createIndex({ roomId: 1, createdAt: 1 });
        await mongoose.connection.db.collection('notifications').createIndex({ userId: 1, createdAt: -1 });
        
        console.log('All collections and indexes ready');
    } catch (err) {
        console.error('Error initializing collections:', err);
    }
};

// ============ SWAGGER UI ============
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============ HOME ============
app.get('/', (req, res) => res.send('Lost and Found API running'));

// Initialize collections and start server
initializeCollections().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});