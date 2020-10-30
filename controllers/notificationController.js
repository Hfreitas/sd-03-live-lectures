const rescue = require('express-rescue');

const sendNotification = (io) =>
  rescue((req, res) => {
    const { title, message } = req.body;

    // eslint-disable-next-line no-use-before-define
    io.emit('notification', { title, message });

    res.status(200).json({ ok: true });
  });

const sendNotificationAdmin = (socket) => ({ title, message }) => {
  socket.broadcast.emit('notification', { title, message });
};

module.exports = {
  sendNotification,
  sendNotificationAdmin,
};
