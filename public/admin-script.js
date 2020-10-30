const titleInput = document.getElementById('title');
const messageInput = document.getElementById('message');
const submitButton = document.getElementById('submit');

const showNotification = (title, body) => {
  const notification = new Notification(title, { body });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // The tab has become visible so clear the now-stale Notification.
      notification.close();
    }
  });
};

const socket = io();

socket.on('connect', () => {
  showNotification('Socket conectado');
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const message = messageInput.value;

  socket.emit('adminNotification', { title, message });
});
