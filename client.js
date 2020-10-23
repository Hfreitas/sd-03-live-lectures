const net = require('net');
const client = new net.Socket();
const stdin = process.openStdin();

client.on('data', (data) => {
  console.log(data.toString('utf-8'));
});

client.on('close', () => {
  console.log('Você saiu da sala');
});

client.connect(3000, 'localhost', () => {
  stdin.addListener('data', (data) => {
    const message = data.toString('utf8').trim();

    client.write(message);
  });
});
