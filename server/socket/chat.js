const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

let io;

function initializeChat(server) {
  const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Auth middleware for socket connections
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication required'));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.user.id;
    console.log(`User ${userId} connected to chat`);

    // Join personal room
    socket.join(`user_${userId}`);

    // Join a conversation room
    socket.on('join_conversation', (conversationId) => {
      socket.join(`conversation_${conversationId}`);
    });

    // Send a message
    socket.on('send_message', (data) => {
      const { conversationId, recipientId, content } = data;
      const message = {
        conversation_id: conversationId,
        sender_id: userId,
        content,
        created_at: new Date().toISOString(),
        is_read: false,
      };

      // Emit to conversation room
      io.to(`conversation_${conversationId}`).emit('new_message', message);
      // Also notify recipient directly
      io.to(`user_${recipientId}`).emit('message_notification', {
        conversationId,
        senderId: userId,
        content,
      });
    });

    // Typing indicator
    socket.on('typing', ({ conversationId, recipientId }) => {
      socket.to(`conversation_${conversationId}`).emit('user_typing', {
        userId,
        conversationId,
      });
    });

    // Mark messages as read
    socket.on('mark_read', ({ conversationId }) => {
      socket.to(`conversation_${conversationId}`).emit('messages_read', {
        conversationId,
        readBy: userId,
      });
    });

    socket.on('disconnect', () => {
      console.log(`User ${userId} disconnected from chat`);
    });
  });

  return io;
}

function getIO() {
  return io;
}

module.exports = { initializeChat, getIO };
