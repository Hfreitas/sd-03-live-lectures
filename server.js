const net = require('net');
const PORT = 3000;
const sockets = [];
let guestId = 0;

const broadcastMessage = (from, message) => {
  sockets
    .filter((socket) => socket.guest !== from)
    .forEach((socket) => socket.write(message));
};

/**
 * Função que é executada quando um socket é criado
 */
const onNewConnection = (socket) => {
  guestId++;

  socket.guest = `Guest ${guestId}`;
  sockets.push(socket);

  socket.write('Boas vindas ao chat!');

  broadcastMessage(socket.guest, `${socket.guest} entrou no chat`);

  socket.on('end', () => {
    sockets.splice(sockets.indexOf(socket), 1);

    const message = `${socket.guest} deixou o chat\n`;

    broadcastMessage(socket.guest, message);
  });

  socket.on('data', (data) => {
    const message = `${socket.guest} > ${data.toString('utf-8')}`;

    broadcastMessage(socket.guest, message);
  });
};

const server = net.createServer(onNewConnection);

server.on('error', (err) => {
  console.error('Erro ao subir o servidor', err);
});

server.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
