const sendNotification = (io) => (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(422).json({ message: 'Missing notification text' });
  }

  io.emit('notification', text);

  res.status(200).json({ message: 'Notification sent' });
};

const handleNotificationEvent = (socket, notifications) => (text) => {
  notifications.push(text);
  socket.broadcast.emit('notification', text);
};

module.exports = {
  sendNotification,
  handleNotificationEvent,
};
