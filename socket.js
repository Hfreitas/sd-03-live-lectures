const http = require('http');

const socketIo = require('socket.io');

const authController = require('./controllers/authController');
const notificationController = require('./controllers/notificationController');

const notifications = [];

module.exports = () => {
  const httpServer = http.createServer();
  const io = socketIo(httpServer);

  io.on('connection', (socket) => {
    socket.emit('history', notifications);
    socket.on('login', authController.login(socket));
    socket.on('notification', notificationController.handleNotificationEvent(socket, notifications));
  });

  return {
    ioServer: httpServer,
    io,
  };
};
