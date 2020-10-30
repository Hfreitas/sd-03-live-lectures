const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

app.post('/notification', controllers.notification.sendNotification(io));

app.use('/', express.static('./public', { extensions: ['html'] }));

app.use((err, _req, res, _) => {
  const status = err.status || 500;

  res.status(status).json({ ok: false, message: err.message });
});

io.on('connection', (socket) => {
  console.log('client connected');

  socket.emit('message', 'Hello!');
  socket.on(
    'adminNotification',
    controllers.notification.sendNotificationAdmin(socket)
  );
});

const { PORT = 3000 } = process.env;
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
