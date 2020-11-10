import { useEffect, useRef, useState } from 'react';
import './App.css';

const io = window.io;

function App() {
  const [username, setUsername] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const socket = useRef();

  useEffect(() => {
    const newUsername = prompt('Digite seu nome de usuário');

    socket.current = io('http://localhost:3000');

    setUsername(newUsername);
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit('set-username', { username });

      socket.current.on('user-joined', ({ username }) => {
        setOnlineUsers((onlineUsers) => {
          if (onlineUsers.includes(username)) return onlineUsers;
          return onlineUsers.concat([username]);
        });
      });

      socket.current.on('user-left', ({ username }) => {
        setOnlineUsers((onlineUsers) =>
          onlineUsers.filter((onlineUsername) => onlineUsername !== username)
        );
      });

      socket.current.on('message', (message) => {
        setMessages([...messages, message]);
      });
    }
  }, [username, socket]);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Chat Messages - {username}</h1>
      </header>
      <section>
        <ul>
          {messages.map((message) => (
            <li key={`${message.from}-${message.timestamp}`}>
              {message.from}: {message.text} -{' '}
              {new Date(message.timestamp).toLocaleDateString('pt-BR')}
            </li>
          ))}
        </ul>
      </section>
      <hr />
      <section>
        <h2>Online users:</h2>
        <ul>
          {onlineUsers.filter(Boolean).map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
