const http = require('http');
const app = require('./app');
const { initializeChat } = require('./socket/chat');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.io for real-time chat
initializeChat(server);

server.listen(PORT, () => {
  console.log(`\n🚀 At Your Service API server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.io ready for real-time chat`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
