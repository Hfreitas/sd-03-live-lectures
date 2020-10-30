const showNotification = (title, body) => {
  const notification = new Notification(title, { body });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // The tab has become visible so clear the now-stale Notification.
      notification.close();
    }
  });
};

Notification.requestPermission().then((result) => {
  if (['denied', 'default'].includes(result)) {
    return alert('Libere as notificações!');
  }

  const socket = io();

  socket.on('message', (message) => {
    showNotification('System message', message);
  });

  socket.on('notification', ({ title, message }) => {
    showNotification(title, message);
  });
});
