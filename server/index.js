const express = require('express');
const socketIo = require('socket.io');

const app = express();

app.get('/ping', (_, res) => res.status(200).json({ message: 'pong' }));

const { PORT = 3000 } = process.env;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = socketIo(server);

io.on('connect', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('set-username', ({ username }) => {
    socket.username = username;

    io.emit('user-joined', { username });

    socket.emit('message', {
      from: 'Server',
      text: `Boas vindas ao chat, ${username}`,
      timestamp: new Date(),
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-left', { username: socket.username });
  });
});
